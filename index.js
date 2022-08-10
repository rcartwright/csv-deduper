const fs = require("fs");

module.exports = {
    readCsv: (file) => {
        const content = fs.readFileSync(file, 'utf8')
        const delimiter = ','
        const [headerRow, ...rows] = content.split('\r\n');
        const headers = headerRow.split(delimiter);

        return rows.map((row) => 
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

    filterDuplicates: (content, strategy = 'email') => {
        const newArray = []
        // sanitize input, remove spaces, make lowercase, etc
        // if email already exists, don't add row
        // if phone already exists, don't add row
        // if same phone and same email exists, don't add row
        content.forEach((row) => {
            let indexOf;

            switch (strategy) {
                case 'email':
                    indexOf = newArray.findIndex(x => x.email == row.email)
                    break;
                case 'phone':
                    indexOf = newArray.findIndex(x => x.phone == row.phone)
                case 'both':
                    indexOf = newArray.findIndex(x => x.email == row.email && x.phone == row.phone)
            }
            
            if (indexOf === -1) {
                newArray.push(row)
            }
        })
        return newArray
    },
    
    writeCSV: (file, content) => {
        // create another function that has 2 inputs
        // return fs.writeFileSync(file, content);
    }
}