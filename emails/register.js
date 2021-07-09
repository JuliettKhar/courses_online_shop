const keys = require('../keys')

module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Successful register',
        html: `
            <h1>Welcome!</h1>
            <p> Your account was created with email - ${email}</p>
            <hr />
            <a href="${keys.BASE_URL}">Go to store</a>
        `
    }
}