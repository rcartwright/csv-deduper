const fs = require("fs");

module.exports = {
    readCsv: function () {
        return fs.readFile('./test/test.csv', "utf8", function (err, data) {
            const [headerRow, ...rows] = data.split('\r\n');
            const headers = headerRow.split(',');

            const csvObjects = rows.map((row, index) => {
                const theRow = row.split(',')
                console.log('theRow', theRow)
                return theRow.reduce(
                    (object, value, index) => ({
                        ...object,
                        [headers[index]]: value,
                    }),{}
                )
            });
            console.log('csvObjects', csvObjects)
        }); 
    }
}