CSV-Deduper
===

## Description
  This program finds and removes duplicate rows from csvs to prevent duplicate data from getting saved internally.

  This is built to import from a csv, then it removes duplicate rows from csvs by finding a duplicate email or phone number depending on which duplicate detection strategy is set. It then creates a new csv with the new filtered data.

## Use
  Call sanitizeCsv with the first argument being the directory of the csv that you want to read from and the second argument being the duplicate detection strategy that you want to use. The 3 strategies are email, phone, or email_or_phone.

  Note: The csv currently works the following headers: First Name, Last Name, Email, Phone

## Install & Dependence
- install node v16.16.0
- `npm install` to install the 2 test dependencies

## Run Tests
- for Linux users - npm run test-linux
- for Windows users - npm run test-windows
  
## License
MIT
