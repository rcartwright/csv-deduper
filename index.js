const fs = require("fs");

module.exports = {
    readCsv: function () {
        return fs.readFile('./test/test.csv', "utf8", function (err, data) {
            console.log(data);
        }); 
    }
}