const chai = require('chai');
const {readCsv, writeCSV, filterDuplicates} = require('../index.js')

const expect = chai.expect;


describe('readCsv function', () => {
  it('should output correct key values', () => {
    const csvContent = readCsv('./test/test.csv')

    expect(csvContent[0]['First Name']).to.equal('Rachel');
    expect(csvContent[0]['Last Name']).to.equal('Cartwright');
    expect(csvContent[0]['Email']).to.equal('stormchica@gmail.com');
    expect(csvContent[0]['Phone']).to.equal('816-377-3519');
  });
});

// describe('writeCsv function', () => {
//   it('should output csv', () => {
//     const csvContent = readCsv('./test/test.csv')
//     const csvFile = writeCSV('./test/test_output.csv', csvContent)
//     console.log('csvFile', csvFile)
    
//   });
// });

describe('filterDuplicates function', () => {
  it('should output correct key values', () => {
    const csvContent = [
      {
        'First Name': 'Rachel',
        'Last Name': 'Cartwright',
        'Email': 'stormchica@gmail.com',
        'Phone': '816-377-3519'
      },
      {
        'First Name': 'Ashley',
        'Last Name': 'Johnson',
        'Email': 'stormchica@gmail.com',
        'Phone': '816-888-8888'
      }
    ]

    const noDups = filterDuplicates(csvContent)
    console.log('noDups', noDups)

    expect(noDups.length).to.equal(1);
    expect(noDups[0]['First Name']).to.equal('Rachel')
    expect(noDups[0]['Last Name']).to.equal('Cartwright')
    expect(noDups[0]['Email']).to.equal('stormchica@gmail.com')
    expect(noDups[0]['Phone']).to.equal('816-377-3519')
  });
});