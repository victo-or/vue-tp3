const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const corsOption = {
    origin: 'http://localhost:8082'
}

app.use(cors(corsOption))

const db = require('./app/models')
// Sequelize
db.connex.sync()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

// route
require('./app/routes/product.route')(app)

// // test
// app.get('/', (req,res) => {
//     res.json({message: 'Welcome'})
// })

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})