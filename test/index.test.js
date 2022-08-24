import chai from 'chai'
import filterCSV from '../index.js'
import {csvToJson} from '../lib/dedupe.js'

const expect = chai.expect;

describe('filterCSV function', () => {
  it('should output correct key values', () => {
    const file = filterCSV('./test/stubs_and_output/many_records.csv', 'email')
    const updatedCsv = csvToJson(file)

    expect(updatedCsv.length).to.equal(7);
    expect(updatedCsv[0]['First Name']).to.equal('Rachel');
    expect(updatedCsv[0]['Last Name']).to.equal('Cartwright');
    expect(updatedCsv[0]['Email']).to.equal('stormchica@gmail.com');
    expect(updatedCsv[0]['Phone']).to.equal('816-377-3519');

    expect(updatedCsv[1]['First Name']).to.equal('Ashley');
    expect(updatedCsv[1]['Last Name']).to.equal('Johnson');
    expect(updatedCsv[1]['Email']).to.equal('test_email5@email.com');
    expect(updatedCsv[1]['Phone']).to.equal('816-888-8888');

    expect(updatedCsv[2]['First Name']).to.equal('Jamie');
    expect(updatedCsv[2]['Last Name']).to.equal('Cat');
    expect(updatedCsv[2]['Email']).to.equal('jamie_the_cat@gmail.com');
    expect(updatedCsv[2]['Phone']).to.equal('816-985-6565');

    expect(updatedCsv[3]['First Name']).to.equal('Rachel');
    expect(updatedCsv[3]['Last Name']).to.equal('Cartwright');
    expect(updatedCsv[3]['Email']).to.equal('test_email3@email.com');
    expect(updatedCsv[3]['Phone']).to.equal('816-377-3519');

    expect(updatedCsv[4]['First Name']).to.equal('Snowie');
    expect(updatedCsv[4]['Last Name']).to.equal('Cat');
    expect(updatedCsv[4]['Email']).to.equal('snowie_the_cat@gmail.com');
    expect(updatedCsv[4]['Phone']).to.equal('816-555-9898');

    expect(updatedCsv[5]['First Name']).to.equal('Stevie');
    expect(updatedCsv[5]['Last Name']).to.equal('N/A');
    expect(updatedCsv[5]['Email']).to.equal('stevie_the_cat@gmail.com');
    expect(updatedCsv[5]['Phone']).to.equal('345-345-3435');

    expect(updatedCsv[6]['First Name']).to.equal('Chloe');
    expect(updatedCsv[6]['Last Name']).to.equal('Cat');
    expect(updatedCsv[6]['Email']).to.equal('chloe_the_cat@gmail.com');
    expect(updatedCsv[6]['Phone']).to.equal('234-435-6345');
  });
});