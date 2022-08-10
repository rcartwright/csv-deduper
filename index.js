const fs = require("fs");

module.exports = {
    readCsv: (file) => {
        const content = fs.readFileSync(file, 'utf8')
        const delimiter = ','
        const [headerRow, ...rows] = content.split('\r\n');
        const headers = headerRow.split(delimiter);

        return rows.map((row, index) => 
            row
            .split(delimiter)
            .reduce(
                (object, value, index) => ({
                    ...object,
                    [headers[index]]: value,
                }),{}
            )
        );
    },

    // writeCSV: () => {
    //     fs.writeFileSync("./test/test_output.csv", data);
    // }
}