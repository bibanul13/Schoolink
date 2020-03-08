let verifyCode = (class_id, code) => {
    const class_codes = require('./codes');
    for (let i = 0; i < class_codes[class_id].length; i++) {
        if (code == class_codes[class_id][i]) return true;
    }
    return false;
}

module.exports = verifyCode;