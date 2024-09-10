require('dotenv').config()
const express = require('express')
const db = require('./db');
const port = process.env.PORT
const app = express()


// ====== ROUTING EXAMPLE ======
const exerciseRoute = require('./Routes/exercise')
app.use('/exercise', exerciseRoute)



// ===== BOILERPLATE CODE ===== 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})








/*
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
*/