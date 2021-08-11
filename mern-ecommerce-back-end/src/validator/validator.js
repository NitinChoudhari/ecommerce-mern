const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = ([
    check('firstname')
        .notEmpty()
        .withMessage('Enter your firstname.'),
    check('lastname')
        .notEmpty()
        .withMessage('Enter your lastname.'),
    check('email')
        .isEmail()
        .withMessage('Enter valid email address.'),
    check('password')
        .isLength({ min: 7 })
        .withMessage('Enter password of atleast 7 characters.')
]
);

exports.validateSigninRequest = ([
    check('email')
        .isEmail()
        .withMessage('Enter valid email address.'),
    check('password')
        .isLength({ min: 7 })
        .withMessage('Enter password of atleast 7 characters.')
]);

exports.isvalidateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0)
        return res.status(400).json({ error: errors.array()[0].msg })
    next();
}
