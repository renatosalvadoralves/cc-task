const {getInvestmentById} = require("../services/investments")

exports.getById = async (req, res) => {
  try {
    const {id} = req.params

    const result = await getInvestmentById(id)
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}
