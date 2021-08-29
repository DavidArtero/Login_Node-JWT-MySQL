//Servidor con Express
const express = require ('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

app.listen(3000,()=>{
    console.log("Server UP running in http://localhost:3000");
})
