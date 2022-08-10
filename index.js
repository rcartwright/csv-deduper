const fs = require("fs");

module.exports = {
    readCsv: () => {
        const content = fs.readFileSync('./test/test.csv', 'utf8')
        const [headerRow, ...rows] = content.split('\r\n');
        const headers = headerRow.split(',');

        return rows.map((row, index) => 
            row
            .split(',')
            .reduce(
                (object, value, index) => ({
                    ...object,
                    [headers[index]]: value,
                }),{}
            )
        );
    }
}