//Procedimientos para controlar lógico de la autentificación
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const {promisify} = require('util');


//Procedimiento para registrarnos
exports.register = async (req, res)=>{
    console.log("hello from authController");
    
    
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.pass;
    
    console.log(name + ("-")+ user + ("-")+ pass)
    
    }
