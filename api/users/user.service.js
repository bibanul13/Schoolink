const pool = require('../../config/database');


module.exports = {

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

    postRegisterStudent: async (data, callBack) => {
        await pool.query(
            `
            INSERT INTO cnmv.students
            (student_id, first_name, last_name, email, mobile_number, class_id, password, verified_hash)
            VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.student_id, //field in json request : student_code
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