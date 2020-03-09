//!!READ THE README.md FILE
const pool = require('../../config/database');


module.exports = {

    //get whole timetable table
    getTimetable: async callBack => {
        await pool.query(
            `SELECT * FROM cnmv.timetable `,
            [],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }

        );
    },

    //get timetabble based on class and hour
    getTimetableByDay: async (data, callBack) => {
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

    //get timetable by class
    getTimetableByClass: async (Class, callBack) => {
        await pool.query(
            `SELECT * FROM timetable WHERE class = ?`,
            [Class],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // register a user with :
    //        --full name
    //        --email
    //        --password
    //        --phone number
    //        --given code
    //        --class id (a custom id for each student is made of : code + _ + class_id)
    postRegisterStudent: async (data, callBack) => {
        await pool.query(
            `
            INSERT INTO cnmv.students
            (student_id, first_name, last_name, email, mobile_number, class_id, password, verified_hash)
            VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.student_id, //composed of code + class_id
                data.first_name,
                data.last_name,
                data.email,
                data.mobile_number,
                data.class_id,
                data.password,
                data.token
            ],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        )
    },

    // getStudentEmail: async (email, callBack) => {
    //     await pool.query(
    //         `
    //     SELECT email FROM cnmv.students
    //     WHERE email = ?`,
    //         [email],
    //         (error, results, fields) => {
    //             if (error) return callBack(error);
    //             return callBack(null, results);
    //         })
    // },

    //update verified status in database and update it if the hash is good
    putLinkVerification: async (student_id, callBack) => {
        await pool.query(
            `
            UPDATE cnmv.students
            SET verified = 1 , verified_hash = null
            WHERE student_id = ? AND verified = 0`,
            [
                student_id,
            ],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            })
    },

    // updateVerified: async (data, callBack) => {
    //     await pool.query(
    //         `
    //         DELETE verified_hash FROM cnmv.students
    //         WHERE student_id = ? AND verified = 1 `,
    //         [
    //             data.student_id,
    //             data.email
    //         ],
    //         (error, results, fields) => {
    //             if (error) return callBack(error);
    //             return callBack(null, results);
    //         })
    // },
};