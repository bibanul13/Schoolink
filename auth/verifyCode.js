const fs = require('fs');

let verifyCode = ( code, filePath = 'C:/PROJECTS/LMVapi/auth/codes.json') => {
   let codes = fs.readFileSync(filePath,'utf8' ,err => {
       if (err) throw err;
       codes = JSON.parse(codes);
   });
   let codesArr = codes.replace(/\[/g ,'').replace(/\]/g,'').replace(/"/g,'').replace(/ /g,'').split(',');
   for (let i of codesArr) {
       if (code == i) return true;
    }
    return false;
}

module.exports = verifyCode;
