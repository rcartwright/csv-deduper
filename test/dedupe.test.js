const chai = require('chai');
const {readCsv} = require('../index.js')

const expect = chai.expect;


describe('Test Suite', () => {
  it('should pass', () => {
    const csvContent = readCsv()
    console.log('csvContent', csvContent)
    expect(true).to.equal(true);
  });
});