require('dotenv').config()
const express = require('express')
const db = require('./config/db');
const port = process.env.PORT
const app = express()


// ====== ROUTING EXAMPLE ======
const exerciseRoute = require('./Routes/exercise')
app.use('/exercise', exerciseRoute)

const userRoute = require('./Routes/userRoute.js')
app.use('/user', userRoute)

// ===== BOILERPLATE CODE ===== 
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})