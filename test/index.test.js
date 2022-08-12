const chai = require('chai');
const sanitizeCsv = require('../index')
const {readCsv} = require('../lib/dedupe')

const expect = chai.expect;

describe('sanitizeCsv function', () => {
  it('should output correct key values', () => {
    const file = sanitizeCsv('./test/stubs_and_output/few_records.csv', 'email')

    const updatedCsv = readCsv(file)

    expect(updatedCsv[0]['First Name']).to.equal('Rachel');
    expect(updatedCsv[0]['Last Name']).to.equal('Cartwright');
    expect(updatedCsv[0]['Email']).to.equal('stormchica@gmail.com');
    expect(updatedCsv[0]['Phone']).to.equal('816-377-3519');
  });
});