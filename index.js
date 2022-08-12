const {readCsv, writeCSV, filterDuplicates} = require('./lib/dedupe')

module.exports =
    filterCSV = (file, strategy) => {
        const csv = readCsv(file)
        const filteredContent = filterDuplicates(csv, strategy)
        return writeCSV(file, filteredContent)
    }