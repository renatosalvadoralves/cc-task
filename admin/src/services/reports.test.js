const {formatBodyCsv, writeCsv} = require("../services/reports")
const fs = require("fs")

describe("Unit Test formatBodyCsv", () => {
  it("should format correctly to csv", () => {

    const companies = [{
      "id": "1",
      "name": "The Big Investment Company",
      "address": "14 Square Place",
      "postcode": "SW18UU",
      "frn": "234165",
    }, {
      "id": "2",
      "name": "The Small Investment Company",
      "address": "12 Circle Square",
      "postcode": "SW18UD",
      "frn": "773388",
    }, {
      "id": "3",
      "name": "Capital Investments",
      "address": "1 Capital Road",
      "postcode": "SW18UT",
      "frn": "078592",
    }]

    const arrange = [{
      input: [{
        "id": "1",
        "userId": "1",
        "firstName": "Billy",
        "lastName": "Bob",
        "investmentTotal": 1400,
        "date": "2020-01-01",
        "holdings": [{"id": "2", "investmentPercentage": 1}],
      }, {
        "id": "2",
        "userId": "2",
        "firstName": "Sheila",
        "lastName": "Aussie",
        "investmentTotal": 20000,
        "date": "2020-01-01",
        "holdings": [{"id": "1", "investmentPercentage": 0.5}, {"id": "2", "investmentPercentage": 0.5}],
      }],
      output: [{
        "userId": "1",
        "firstName": "Billy",
        "lastName": "Bob",
        "date": "2020-01-01",
        "holding": "The Small Investment Company",
        "value": "1400",
      }, {
        "userId": "2",
        "firstName": "Sheila",
        "lastName": "Aussie",
        "date": "2020-01-01",
        "holding": "The Big Investment Company | The Small Investment Company",
        "value": "10000 | 10000",
      }],
    }]

    for (const i of arrange) {
      const bodyFormmated = formatBodyCsv(i.input, companies)
      expect(bodyFormmated).toStrictEqual(i.output)
    }
  })
})
describe("Unit Test Write Csv", () => {

  it("should write csv", () => {
    const filterSpycreateWriteStream = jest.spyOn(fs, "createWriteStream")

    const arrange = [
      {
        input: {
          header: "|User|,|First Name|,|Last Name|,|Date|,|Holding|,|Value|",
          body: [
            {
              userId: "1",
              firstName: "Billy",
              lastName: "Bob",
              date: "2020-01-01",
              holding: "The Small Investment Company",
              value: "1400",
            },
          ],
        },
        output: "|User|,|First Name|,|Last Name|,|Date|,|Holding|,|Value|\n1,Billy,Bob,2020-01-01,The Small Investment Company,1400",
      }]

    for (const i of arrange) {
      const csvString = writeCsv(i.input.header, i.input.body)
      expect(csvString).toStrictEqual(i.output)
      expect(filterSpycreateWriteStream).toHaveBeenCalled()
    }
  })
})
