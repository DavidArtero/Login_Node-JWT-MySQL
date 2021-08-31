//Servidor con Express
const express = require ('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


const app = express();

//Parsear el body usando body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Llamar al router
app.use('/', require('./routes/router'));

//Setear motor de plantillas
app.set('view engine', 'ejs');

//Setear carpeta public para archivos estáticos
app.use(express.static('public'));

//Procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Setear variables de entorno
dotenv.config({path: './env/.env'});

//Poder trabajar con cookies
//app.use(cookieParser);


app.listen(3000,()=>{
    console.log("Server UP running in http://localhost:3000");
});
