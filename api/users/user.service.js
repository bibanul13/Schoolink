const pool = require('../../config/database');


module.exports = {

    getTimetable : async callBack => {
        await pool.query(
            `SELECT * FROM cnmv.timetable `,
            [],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        
        );
    },

    getTimetableByDay : async (data, callBack) => {
        await pool.query(
            `SELECT day, hour, subject_id, classroom FROM cnmv.timetable WHERE day = ? AND class = ? `, 
            [
                data.day,
                data.class
            ],                                
            (error, results, fields) => {                           
                if (error) return callBack(error);   
                return callBack(null, results);
            }
        
        );
    },

    getTimetableByClass : async (Class, callBack) =>{
        await pool.query(
            `SELECT * FROM timetable WHERE class = ?`,
            [Class],
            (error, results, fields) => {                           
                if (error) return callBack(error); 
                return callBack(null, results);
            }
        );
    },

    postRegisterStudent : (data, callBack) =>{
        const student_id = data.class_id + '_' + data.code;
        pool.query(
            `
            INSERT INTO cnmv.students 
            (student_id, first_name, last_name, email, mobile_number, class_id, password)
            VALUES(?,?,?,?,?,?,?)`,
            [
                student_id,
                data.first_name,
                data.last_name,
                data.email,
                data.mobile_number,
                data.class_id,
                data.password
            ],
            (error, results, fields) => {                           
                if (error) return callBack(error); 
                return callBack(null, results);
            }
        )
    }
};