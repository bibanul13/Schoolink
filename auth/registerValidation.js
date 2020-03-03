const {body, validationResult}  = require('express-validator');

const dataValidation = () =>{
   return [
       body('password').isLength({ min : 5 }).notEmpty(),
       body('email').isEmail(),
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

