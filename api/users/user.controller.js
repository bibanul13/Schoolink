const {
    getTimetable,
    getTimetableByDay,
    getTimetableByClass,
    postRegisterStudent,
    putLinkVerification
} = require('./user.service.js');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const errorHandler = require('../../middleware/errorHandler');
const verifyCode = require('../../auth/codeVerification');
const sendVerificationMail = require('../../auth/emailVerification');


module.exports = {
    timetable: async (req, res) => {
        getTimetable((err, results) => {
            if (err) return err;
            return res.status(200).json({
                results
            });
        });
    },

    timetableByDay: async (req, res) => {
        const hour = req.body;
        getTimetableByDay(hour, (err, results) => {
            if (err) return err;
            return res.status(200).json({
                results
            });
        });
    },

    timetableByClass: async (req, res) => {
        const Class = req.body;
        getTimetableByClass(Class, (err, results) => {
            if (err) return res.json({
                err
            });
            return res.status(200).json({
                results
            });
        });
    },

    registerStudent: async (req, res, next) => {
        const salt = bcrypt.genSaltSync(12);
        let data = req.body;
        //Generating student_id to store in database
        data.student_id = data.class_id + '_' + data.student_code;
        data.password = bcrypt.hashSync(data.password, salt); //Hash password
        //Check for valid student code
        if (!verifyCode(data.class_id, data.student_code)) return res.status(501).json("Invalid student_id");
        //generate Token with email, student_id
        data.token = JWT.sign({
                student_id: data.student_id
            },
            process.env.TOKEN_STRING, {
                expiresIn: '10min'
            })
        postRegisterStudent(data, err => {
            if (err) return res.status(500).json({
                err
            });
            next();
            return res.status(200).json('User registered');
        });
    },

    verifyHash: async (req, res, next) => {
        const token = req.params.token;
        const decodedToken = await JWT.verify(token, process.env.TOKEN_STRING, (err, decoded) => {
            if (err) res.status(500).json({
                err
            });
            return decoded;
        })
        //const decodedToken = JWT.decode(token);
        await putLinkVerification(decodedToken.student_id, (err, results) => {
            if (err) return res.status(500).json({
                err
            });
            next();
            return res.status(200).json('Verification success!');
        })
    }
}