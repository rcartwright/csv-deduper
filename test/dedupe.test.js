const chai = require('chai');
const {readCsv} = require('../index.js')

const expect = chai.expect;


describe('Test Suite', function(){
  it('should pass', function(){
  
    const csvContent = readCsv()
    console.log('csvContent', csvContent)
    expect(true).to.equal(true);
  });
});