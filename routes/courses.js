const {Router} = require('express');
const router = Router();
const Course = require('../models/course');
const auth = require('../middleware/auth');
const {courseValidators} = require('../utils/validators')
const {validationResult} = require('express-validator/check');

function isOwner(course, req) {
  return course.userId.toString() === req.user._id.toString()
}

router.get('/', async (req, res) => {
  res.set('Content-Security-Policy', 'default-src *; img-src *; style-src *; font-src https://fonts.gstatic.com data:; script-src https://cdnjs.cloudflare.com;');

  try {
    const courses = await Course.find().lean();
    const userId = req.user ? req.user._id.toString() : null

    res.render('courses', {
      title: "Courses",
      isCourses: true,
      userId,
      courses
    });
  } catch (e) {
    console.log(e);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).lean();
    res.render('course', {
      layout: 'empty',
      title: `Course ${course.title}`,
      course
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id/edit', auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
  try {
    const course = await Course.findById(req.params.id).lean();

    if (!isOwner(course, req)) {
      return res.redirect('/courses')
    }
    res.render('course-edit', {
      title: `Edit ${course.title}`,
      course
    })
  } catch (e) {
    console.log(e)
  }

})

router.post('/edit', courseValidators, auth, async (req, res) => {
  const errors = validationResult(req);
  const {id} = req.body;

  if (!errors.isEmpty()) {
    req.flash('registerError', errors.array()[0].msg)
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }
  try {
    const {id} = req.body;
    delete req.body.id;
    const course = await Course.findById(id);

    if (!isOwner(course, req)) {
      return res.redirect('/courses');
    }
    Object.assign(course, req.body);
    await course.save();

    res.redirect('/courses')

  } catch (e) {

  }

})

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id,
      userId: req.user._id
    });
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }

})

module.exports = router;
