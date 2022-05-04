const fs = require("fs")

const formatBodyCsv = (body, companies) => {
  try {
    const data = body.map(user => {
      const holding = user.holdings.map(holding => {
        const companyName = companies.find(company => company.id === holding.id).name

        return ({
          name: companyName,
          value: user.investmentTotal * holding.investmentPercentage,
        })
      })

      delete user.holdings
      delete user.id
      delete user.investmentTotal

      return ({
        ...user,
        holding: holding.map(e => e.name).join(" | "),
        value: holding.map(e => e.value).join(" | "),
      })
    })

    return data
  } catch (error) {
    throw new Error(error)
  }
}

const writeCsv = (header, body, filePath = "data.csv") => {
  try {
    const values = body.map(o => Object.values(o).join(",")).join("\n")
    const csv = header + "\n" + values

    const writeStream = fs.createWriteStream(filePath)
    writeStream.write(csv)

    return csv
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  formatBodyCsv,
  writeCsv,
}

