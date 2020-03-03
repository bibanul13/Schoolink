const router = require('express').Router();
const { timetable, 
    timetableByDay, 
    timetableByClass,
    registerStudent } = require('./user.controller');
const authorize = require('../../auth/token_validation');
const errorHandler = require('../../middleware/errorHandler');
const {validate, dataValidation} = require('../../auth/registerValidation');

router.post('/register/student', dataValidation(), validate, registerStudent);

router.get('/timetable', timetable);
router.get('/timetable/class', timetableByClass);
router.get('/timetable/class/day',timetableByDay);

router.use(errorHandler);

module.exports = router;

