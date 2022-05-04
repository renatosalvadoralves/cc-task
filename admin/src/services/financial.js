
const config = require("config")
const axios = require("axios").default

const getCompanies = async () => {
  try {
    const {data} = await axios.get(`${config.financialServiceUrl}/companies`)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getCompanies,
}
