//!!READ THE README.md FILE
const router = require('express').Router();
const {
    timetable,
    timetableByDay,
    timetableByClass,
    registerStudent,
    verifyHash
} = require('./user.controller');
const errorHandler = require('../../middleware/errorHandler');
const {
    validate,
    dataValidation
} = require('../../auth/registerValidation');
const sendVerificationMail = require('../../auth/emailVerification');

router.use(errorHandler);

router.get('/timetable', timetable);
router.get('/timetable/class', timetableByClass);
router.get('/timetable/class/day', timetableByDay);


router.post('/register/student', dataValidation(), validate, registerStudent, sendVerificationMail);

router.put('/register/student/verify/:token', verifyHash)

module.exports = router;