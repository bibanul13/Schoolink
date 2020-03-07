const {body, validationResult}  = require('express-validator');

const dataValidation = () =>{

    const passMin = 10;
    const passMax = 50;
   return [
       body('password')
            .notEmpty().withMessage('Password can\'t be empty')
            .isLength({ min : passMin , max : passMax}).withMessage(`Password must be minimum ${passMin}, maximum ${passMax} characters long`)
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit'),
       body('email')
            .isEmail().withMessage('Invalid e-mail format')
            .notEmpty().withMessage('Email can\'t be empty'),
       body('first_name')
            .notEmpty().withMessage('First name can\'t be empty'),
       body('last_name')
            .notEmpty().withMessage('Last name can\'t be empty'),
       body('mobile_number')
            .notEmpty().withMessage('Mobile number can\'t be empty')
            .isMobilePhone().withMessage('Invalid phone number format'),
       body('class_id')
            .notEmpty().withMessage('Class id can\'t be empty')
    ]
} 

const validate = async (req , res , next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const extErrors = [];
    errors.array().map(err => extErrors.push({[err.param] : err.msg}));

    return res.status(422).json({extErrors});
}

module.exports={
    dataValidation,
    validate
}