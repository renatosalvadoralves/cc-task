const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const index = require("./routes/index")
const investmentsRoute = require("./routes/investments")
const reportsRoute = require("./routes/reports")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))
app.use("/", index)
app.use("/investments", investmentsRoute)
app.use("/reports", reportsRoute)

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
