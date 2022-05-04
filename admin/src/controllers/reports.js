const {formatBodyCsv, writeCsv} = require("../services/reports")
const {postInvestmentExport} = require("../services/investments")
const {getCompanies} = require("../services/financial")

exports.generateCsv = async (req, res) => {
  try {
    const companies = await getCompanies()
    const bodyFormmated = formatBodyCsv(req.body, companies)
    const header = "|User|,|First Name|,|Last Name|,|Date|,|Holding|,|Value|"

    const csvString = writeCsv(header, bodyFormmated)
    await postInvestmentExport(csvString)

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error)
  }
}
