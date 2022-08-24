import {csvToJson, jsonToCsv, filterDuplicates} from './lib/dedupe.js'

const filterCSV = (file, strategy) => {
    const csv = csvToJson(file)
    const filteredContent = filterDuplicates(csv, strategy)
    return jsonToCsv(file, filteredContent)
}

export default filterCSV