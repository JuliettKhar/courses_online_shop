const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.set('Content-Security-Policy', 'default-src \'self\'; style-src *; font-src https://fonts.gstatic.com data:; script-src \'self\' https://cdnjs.cloudflare.com;');

  res.render('index', {
    title: "Main",
    isHome: true
  });
});

module.exports = router;
