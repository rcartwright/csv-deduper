const fs = require("fs");

function sanitizeField (field) {
    if (!field)
        return 'N/A'
    // format phone numbers
    // format emails
    return field.trim().toLowerCase()
}

function sanitizeName (field) {
    if (!field)
        return 'N/A'

    return field.trim()
}

module.exports = theobject = {
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

        if (!content) {
            return new Error('the content does not exist')
        }

        content.map((row) => {
            const email = sanitizeField(row['Email'])
            const phone = sanitizeField(row['Phone'])
            const firstName = sanitizeName(row['First Name'])
            const lastName = sanitizeName(row['Last Name'])
            let indexOf;

            switch (strategy) {
                case 'email':
                    indexOf = newArray.findIndex(x => x['Email'] == email)
                    break;
                case 'phone':
                    indexOf = newArray.findIndex(x => x['Phone'] === phone)
                    break;
                case 'email_or_phone':
                    indexOf = newArray.findIndex(x => x['Email'] == email || x['Phone'] === phone)
                    break;
            }
            
            // only add to array when if it doesn't exist
            if (indexOf === -1) {
                newArray.push(
                    {
                      'First Name': firstName,
                      'Last Name': lastName,
                      'Email': email,
                      'Phone': phone
                    }
                )
            }
        })
        return newArray
    },
    
    writeCSV: (file, content) => {
        const header = Object.keys(content[0]).join(',')
        const rows = content.map((_object) => 
            Object.values(_object).join(',')).join('\n')
            
        const csvContent = [header].concat(rows).join('\r\n')

        return fs.writeFileSync(file, csvContent);
    },

    sanitizeCsv: (file, strategy) => {
        const csv = theobject.readCsv(file)
        const filteredContent = theobject.filterDuplicates(csv, strategy)
        return theObject.writeCSV(file, filteredContent)
    }
}