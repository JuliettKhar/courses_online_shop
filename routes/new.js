const Course = require("../models/course");
const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth');
const {courseValidators} = require('../utils/validators')
const {validationResult} = require('express-validator/check');

router.get('/', auth, (req, res) => {
  res.render('new', {
    title: "Add course",
    isNew: true
  });
});

router.post('/', courseValidators, auth, async (req, res) => {
  const errors = validationResult(req);
  const {title, price, image} = req.body;

  if (!errors.isEmpty()) {
    req.flash('registerError', errors.array()[0].msg)
    return res.status(422).render('new', {
      title: "Add course",
      isNew: true,
      error: errors.array()[0].msg,
      data: {title, price, image}
    })
  }


  const course = new Course({title, price, image, userId: req.user});

  try {
    await course.save();
    res.redirect('/courses');
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;
