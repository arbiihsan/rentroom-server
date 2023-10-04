require("dotenv").config();
const express = require('express')
const app = express()
// const port = process.env.PORT || 3000
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(errorHandler)

app.get('/movies', (req, res) => {
    res.json({ message: 'response movies' })
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app