//!!READ THE README.md FILE
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

    //get all timetable table from db
    timetable: async (req, res) => {
        getTimetable((err, results) => {
            if (err) return err;
            return res.status(200).json({
                results
            });
        });
    },

    //get timetabble based on class and hour
    timetableByDay: async (req, res) => {
        const hour = req.body;
        getTimetableByDay(hour, (err, results) => {
            if (err) return err;
            return res.status(200).json({
                results
            });
        });
    },

    //get timetable by class
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
        //generate Token with student_id (??? generate it with email ??? insecure???)
        data.token = JWT.sign({
                student_id: data.student_id
            },
            process.env.TOKEN_STRING, {
                expiresIn: '10min' // set expiration time 10 minutes
            })
        postRegisterStudent(data, err => {
            if (err) return res.status(500).json({
                err
            });
            next();
            return res.status(200).json('User registered');
        });
    },

    //this should maybe be in middleware folder in a separate folder?
    //method for verifying token stored in database -- updating verified status to 1(true) if valid and delete the token from students table
    verifyHash: async (req, res, next) => {
        const token = req.params.token; // get token from the request url
        const decodedToken = await JWT.verify(token, process.env.TOKEN_STRING, (err, decoded) => {
            if (err) res.status(500).json({
                err                              // store the decoded token if valid
            });
            return decoded;
        })
        //const decodedToken = JWT.decode(token);
        await putLinkVerification(decodedToken.student_id, (err, results) => {
            if (err) return res.status(500).json({
                err
            });
            if (results.changedRows === 0) return res.status(500).json(
                'Account already verified!'    // if there are no changed rows in the table ===> user is already verified
            )
            next();
            console.log(results);
            return res.status(200).json('Verification successfull!');
        })
    }
}