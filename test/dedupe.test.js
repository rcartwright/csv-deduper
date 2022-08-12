const chai = require('chai');
const {readCsv, writeCSV, filterDuplicates} = require('../lib/dedupe')

const expect = chai.expect;

describe('readCsv function', () => {
  it('should output correct key values', () => {
    const csvContent = readCsv('./test/stubs/test.csv')

    expect(csvContent[0]['First Name']).to.equal('Rachel');
    expect(csvContent[0]['Last Name']).to.equal('Cartwright');
    expect(csvContent[0]['Email']).to.equal('stormchica@gmail.com');
    expect(csvContent[0]['Phone']).to.equal('816-377-3519');
  });
});

describe('writeCsv function', () => {
  it('should output csv', () => {
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
    const csvFile = writeCSV('./test/output/test_output.csv', csvContent)
    console.log('csvFile', csvFile)
    
  });
});

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
});

// test other 2 helper functions
// test when some values have nothing
// test when there's spaces around values