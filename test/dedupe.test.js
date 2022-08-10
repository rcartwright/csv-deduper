const chai = require('chai');
const {readCsv} = require('../index.js')

const expect = chai.expect;


describe('readCsv function', () => {
  it('should output correct key values', () => {
    const csvContent = readCsv()

    expect(csvContent[0]['First Name']).to.equal('Rachel');
    expect(csvContent[0]['Last Name']).to.equal('Cartwright');
    expect(csvContent[0]['Email']).to.equal('stormchica@gmail.com');
    expect(csvContent[0]['Phone']).to.equal('816-377-3519');
  });
});