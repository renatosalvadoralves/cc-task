const {formatBodyCsv, writeCsv} = require("../services/reports")
const {postInvestmentExport} = require("../services/investments")

exports.generateCsv = async (req, res) => {
  try {
    const bodyFormmated = await formatBodyCsv(req.body)
    const header = "|User|,|First Name|,|Last Name|,|Date|,|Holding|,|Value|"

    const csvString = writeCsv(header, bodyFormmated)
    await postInvestmentExport(csvString)

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error)
  }
}
