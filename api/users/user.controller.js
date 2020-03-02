const { 
    getTimetable , 
    getTimetableByDay, 
    getTimetableByClass,
    postRegisterStudent } = require('./user.service.js');
const bcrypt = require('bcrypt');
const webToken = require('jsonwebtoken');
const errorHandler = require('../../middleware/errorHandler');

module.exports = {
    timetable : async (req ,res) => {
        getTimetable ((err, results) => {
            if (err) return err;
            return res.status(200).json({results});
        });
    },

    timetableByDay : async (req , res) =>{
        const hour = req.body;
        getTimetableByDay(hour,(err, results) =>{
            if(err) return err;
            return res.status(200).json({results}); 
        });
    },

    timetableByClass : async (req , res) =>{
        const  Class = req.body;
        getTimetableByClass(Class,(err, results) =>{
            if (err) return res.json({err});
            return res.status(200).json({results}); 
        });
    },

    registerStudent : async (req , res) =>{
        const salt =  bcrypt.genSaltSync(12);
        let data = req.body;
        data.password = bcrypt.hashSync(data.password, salt );
        postRegisterStudent(data, (err, results) => {
            if (err) return res.json({err});
            return res.status(200).json('User registered!');
        });
    }
}

