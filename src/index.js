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

// ==================== ROUTES ====================
// USER
const loginRoute = require('./Routes/loginRoute.js')
app.use('/', loginRoute)

const userRoute = require('./Routes/userRoute.js')
app.use('/user', userRoute)

const userBodyInfoRoute = require('./Routes/userBodyInfoRoute.js')
app.use('/body-info', userBodyInfoRoute)

const userFavouriteExerciseRoute = require('./Routes/userFavouriteExerciseRoute.js')
app.use('/favourite-exercise', userFavouriteExerciseRoute)



// EXERCISE
const exerciseRoute = require('./Routes/exercise')
app.use('/exercise', exerciseRoute)

// ===== BOILERPLATE CODE ===== 
app.get('/', (req, res) => {
  res.send('Hello Chlo')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})