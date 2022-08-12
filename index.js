module.exports =
    sanitizeCsv = (file, strategy) => {
        const csv = theobject.readCsv(file)
        const filteredContent = theobject.filterDuplicates(csv, strategy)
        return theObject.writeCSV(file, filteredContent)
    }