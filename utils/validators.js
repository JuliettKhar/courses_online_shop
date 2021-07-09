const {body} = require('express-validator/check');
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Enter correct email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({email: value})
                if (user) {
                    return Promise.reject('This email is already taken')
                }
            } catch (e) {

            }
        })
        .normalizeEmail(),
    body('password', 'Password can\'t be less than 6 chars')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must be equal')
        }
        return true
    })
        .trim(),
    body('name')
        .isLength({min: 3}).withMessage('Name must be min 3 char')
        .trim(),
]

exports.loginValidators = [

]

exports.courseValidators = [
    body('title')
        .isLength({min: 3})
        .withMessage('Min length is 3 char')
        .trim(),
    body('price')
        .isNumeric()
        .withMessage('Price must be a number'),
    body('image', 'Add correct URL')
]