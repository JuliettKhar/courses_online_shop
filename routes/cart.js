const {Router} = require('express');
const router = Router();
const Course = require("../models/course");
const auth = require('../middleware/auth');

function mapCartItems(cart) {
  return cart.items.map(item => ({
      ...item.courseId._doc,
      count: item.count,
      id: item.courseId.id
    })
  )
}

function computePrice(courses) {
  return courses.reduce((total, course) => {
    return total += course.price * course.count
  }, 0)
}

router.post('/add', auth, async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);

  res.redirect('/cart');
})

router.get('/', auth, async (req, res) => {
  res.set('Content-Security-Policy', 'default-src \'self\'; style-src *; font-src https://fonts.gstatic.com data:; script-src \'self\' https://cdnjs.cloudflare.com;');

  const user = await req.user.populate('cart.items.courseId').execPopulate()
  const courses = mapCartItems(user.cart)

  res.render('cart', {
    title: 'Cart',
    isCart: true,
    courses,
    price: computePrice(courses)
  })
});

router.delete('/remove/:id', auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate('cart.items.courseId').execPopulate()
  const courses = mapCartItems(user.cart);
  const cart = {
    courses,
    price: computePrice(courses)
  }

  res.status(200).json(cart)
})


module.exports = router;
