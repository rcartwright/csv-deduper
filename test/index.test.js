const chai = require('chai');
const sanitizeCsv = require('../index')

const expect = chai.expect;

// describe('sanitizeCsv function', () => {
//   it('should output correct key values', () => {
//     const csvContent = sanitizeCsv('./test/test.csv', 'email')
//     console.log('csvContent', csvContent)

//     expect(csvContent[0]['First Name']).to.equal('Rachel');
//     expect(csvContent[0]['Last Name']).to.equal('Cartwright');
//     expect(csvContent[0]['Email']).to.equal('stormchica@gmail.com');
//     expect(csvContent[0]['Phone']).to.equal('816-377-3519');
//   });
// });