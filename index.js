const {readCsv, writeCSV, filterDuplicates} = require('./lib/dedupe')

module.exports =
    sanitizeCsv = (file, strategy) => {
        const csv = readCsv(file)
        const filteredContent = filterDuplicates(csv, strategy)
        return writeCSV(file, filteredContent)
    }