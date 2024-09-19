require('dotenv').config()
const express = require('express')
const db = require('./config/db');
const port = process.env.PORT
const app = express()

// ====== MIDDLEWARE =======
// Middleware Logger
const loggerMiddleware = require('./middlewares/loggerMiddleware');
app.use(loggerMiddleware);

// Cors (Cross Origin Resource Sharing)
const cors = require('cors');
const whitelist = ['https://www.mysite.com', 'https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:5050']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by Cors'), true)
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Json Parsing
app.use(express.json());

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