//Servidor con Express
const express = require ('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();


//Llamar al router
app.use('/', require('./routes/router'));

//Setear Motor de plantilla
app.set('view engine', 'ejs');

//Setear carpeta public para archivos estáticos
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Setear variables de entorno
dotenv.config({path: './env/.env'});

//Poder trabajar con cookies
//app.use(cookieParser);


app.listen(3000,()=>{
    console.log("Server UP running in http://localhost:3000");
});
