// levantar servidor express

const express = require("express")
const app = express()

const PORT = 3000

const dbConnection = require ("./config/db")
dbConnection();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
res.send('funciona')
})

app.listen(PORT, () =>{
  console.log(`El servidor esta escuchando en http://localhost:${PORT}`)
})