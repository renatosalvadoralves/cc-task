
const config = require("config")
const axios = require("axios").default

const getInvestmentById = async (id) => {
  try {
    const {data} = await axios.get(`${config.investmentsServiceUrl}/investments/${id}`)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

const postInvestmentExport = async (csvString) => {
  try {
    await axios.post(`${config.investmentsServiceUrl}/investments/export`, {body: csvString})
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getInvestmentById,
  postInvestmentExport,
}
