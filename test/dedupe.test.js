import chai from'chai'
import {csvToJson, jsonToCsv, filterDuplicates} from'../lib/dedupe.js'

const expect = chai.expect;


describe('filterDuplicates function', () => {
  it('should remove objects that have duplicate emails when strategy is set to email', () => {
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

    const filteredContent = filterDuplicates(csvContent, 'email')

    expect(filteredContent.length).to.equal(1);
    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('Cartwright')
    expect(filteredContent[0]['Email']).to.equal('stormchica@gmail.com')
    expect(filteredContent[0]['Phone']).to.equal('816-377-3519')
  });

  it('should not remove objects that have duplicate phones when strategy is set to email', () => {
    const csvContent = [
      {
        'First Name': 'Rachel',
        'Last Name': 'Cartwright',
        'Email': 'email_1@email.com',
        'Phone': '816-377-3519'
      },
      {
        'First Name': 'Ashley',
        'Last Name': 'Johnson',
        'Email': 'email_2@email.com',
        'Phone': '816-377-3519'
      }
    ]

    const filteredContent = filterDuplicates(csvContent, 'email')

    expect(filteredContent.length).to.equal(2);
    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('Cartwright')
    expect(filteredContent[0]['Email']).to.equal('email_1@email.com')
    expect(filteredContent[0]['Phone']).to.equal('816-377-3519')
  });

  it('should remove objects that have duplicate phones when strategy is set to phone', () => {
    const csvContent = [
      {
        'First Name': 'Rachel',
        'Last Name': 'Cartwright',
        'Email': 'email_1@email.com',
        'Phone': '816-377-3519'
      },
      {
        'First Name': 'Ashley',
        'Last Name': 'Johnson',
        'Email': 'email_2@email.com',
        'Phone': '816-377-3519'
      }
    ]

    const filteredContent = filterDuplicates(csvContent, 'phone')

    expect(filteredContent.length).to.equal(1);
    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('Cartwright')
    expect(filteredContent[0]['Email']).to.equal('email_1@email.com')
    expect(filteredContent[0]['Phone']).to.equal('816-377-3519')
  });

  it('should not remove objects that have duplicate emails when strategy is set to phone', () => {
    const csvContent = [
      {
        'First Name': 'Rachel',
        'Last Name': 'Cartwright',
        'Email': 'email_1@email.com',
        'Phone': '816-377-3519'
      },
      {
        'First Name': 'Ashley',
        'Last Name': 'Johnson',
        'Email': 'email_1@email.com',
        'Phone': '123-888-8785'
      }
    ]

    const filteredContent = filterDuplicates(csvContent, 'phone')

    expect(filteredContent.length).to.equal(2);
    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('Cartwright')
    expect(filteredContent[0]['Email']).to.equal('email_1@email.com')
    expect(filteredContent[0]['Phone']).to.equal('816-377-3519')
  });

  it('should remove objects that have duplicate phones when strategy is set to email_or_phone', () => {
    const csvContent = [
      {
        'First Name': 'Rachel',
        'Last Name': 'Cartwright',
        'Email': 'email_1@email.com',
        'Phone': '816-377-3519'
      },
      {
        'First Name': 'Ashley',
        'Last Name': 'Johnson',
        'Email': 'email_2@email.com',
        'Phone': '816-377-3519'
      }
    ]

    const filteredContent = filterDuplicates(csvContent, 'email_or_phone')

    expect(filteredContent.length).to.equal(1);
    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('Cartwright')
    expect(filteredContent[0]['Email']).to.equal('email_1@email.com')
    expect(filteredContent[0]['Phone']).to.equal('816-377-3519')
  });

  it('should remove objects that have duplicate emails when strategy is set to email_or_phone', () => {
    const csvContent = [
      {
        'First Name': 'Rachel',
        'Last Name': 'Cartwright',
        'Email': 'email_1@email.com',
        'Phone': '816-377-3519'
      },
      {
        'First Name': 'Ashley',
        'Last Name': 'Johnson',
        'Email': 'email_1@email.com',
        'Phone': '123-888-8785'
      }
    ]

    const filteredContent = filterDuplicates(csvContent, 'email_or_phone')

    expect(filteredContent.length).to.equal(1);
    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('Cartwright')
    expect(filteredContent[0]['Email']).to.equal('email_1@email.com')
    expect(filteredContent[0]['Phone']).to.equal('816-377-3519')
  });

  it('should remove objects that have duplicate emails and duplicate phones when strategy is set to email_or_phone', () => {
    const csvContent = [
      {
        'First Name': 'Rachel',
        'Last Name': 'Cartwright',
        'Email': 'email_1@email.com',
        'Phone': '816-377-3519'
      },
      {
        'First Name': 'Ashley',
        'Last Name': 'Johnson',
        'Email': 'email_1@email.com',
        'Phone': '816-377-3519'
      }
    ]

    const filteredContent = filterDuplicates(csvContent, 'phone')

    expect(filteredContent.length).to.equal(1);
    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('Cartwright')
    expect(filteredContent[0]['Email']).to.equal('email_1@email.com')
    expect(filteredContent[0]['Phone']).to.equal('816-377-3519')
  });

  it('should convert empty values to show as N/A', () => {
    const csvContent = [
      {
        'First Name': 'Rachel',
        'Last Name': '',
        'Email': 'email_1@email.com',
        'Phone': '816-888-6767'
      }
    ]

    const filteredContent = filterDuplicates(csvContent, 'phone')

    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('N/A')
    expect(filteredContent[0]['Email']).to.equal('email_1@email.com')
    expect(filteredContent[0]['Phone']).to.equal('816-888-6767')
  });

  it('should remove whitespace', () => {
    const csvContent = [
      {
        'First Name': ' Rachel ',
        'Last Name': 'Cartwright',
        'Email': 'email_1@email.com',
        'Phone': '816-377-3519'
      }
    ]

    const filteredContent = filterDuplicates(csvContent, 'phone')

    expect(filteredContent[0]['First Name']).to.equal('Rachel')
    expect(filteredContent[0]['Last Name']).to.equal('Cartwright')
    expect(filteredContent[0]['Email']).to.equal('email_1@email.com')
    expect(filteredContent[0]['Phone']).to.equal('816-377-3519')
  });
});

describe('csvToJson function', () => {
  it('should output correct key values', () => {
    const csvContent = csvToJson('./test/stubs_and_output/few_records.csv')

    expect(csvContent[0]['First Name']).to.equal('Rachel');
    expect(csvContent[0]['Last Name']).to.equal('Cartwright');
    expect(csvContent[0]['Email']).to.equal('stormchica@gmail.com');
    expect(csvContent[0]['Phone']).to.equal('816-377-3519');
  });
});

describe('jsonToCsv function', () => {
  it('should write csv with correct contents', () => {
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
    const file = jsonToCsv('./test/stubs_and_output/jsonToCsv.csv', csvContent)
    const updatedCsv = csvToJson(file)

    expect(updatedCsv.length).to.equal(2);
    expect(updatedCsv[0]['First Name']).to.equal('Rachel');
    expect(updatedCsv[0]['Last Name']).to.equal('Cartwright');
    expect(updatedCsv[0]['Email']).to.equal('stormchica@gmail.com');
    expect(updatedCsv[0]['Phone']).to.equal('816-377-3519');
  });
});