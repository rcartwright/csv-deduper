const {csvToJson, jsonToCsv, filterDuplicates} = require('./lib/dedupe')

module.exports =
    filterCSV = (file, strategy) => {
        const csv = csvToJson(file)
        const filteredContent = filterDuplicates(csv, strategy)
        return jsonToCsv(file, filteredContent)
    }