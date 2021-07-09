const keys = require('../keys')

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Recovery password',
    html: `
            <h1>Are you forgot password?</h1>
            <p> If not - just ignore this email</p>
            <p>Else - follow link</p>
            <p> <a href="${keys.BASE_URL}/auth/password/${token}">Recovery</a></p>
            <hr />
            <a href="${keys.BASE_URL}">Go to store</a>
        `
  }
}
