//Procedimientos para controlar lógico de la autentificación
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");
const swal = require('sweetalert');
const dotenv = require('dotenv');

//Procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.pass;

    let passHash = await bcryptjs.hash(pass, 8);
    
    //Insertar datos en tabla usuarios
    conexion.query(
      "INSERT INTO users SET ?",
      { user: user, name: name, pass: passHash },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Procedimiento loggin
exports.login = async (req, res) => {
  console.log("hello from login")
  
    try {
        const user = req.body.user;
        const pass = req.body.pass;
        console.log(user + " " + pass)

        if( !user || !pass ){
            res.render('login',{
              alert: true,
              alertTitle:"Advertencia",
              alertMessage: "Ingrese un usuario y password",
              alertIcon: 'info',
              showConfirmButton: true,
              timer: false,
              ruta: 'login'
            })
        }else{
          conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) =>{
            console.log(results[0].pass)
            
            if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass)) ){
              console.log("comparacion password")
              res.render('login',{
                  alert: true,
                  alertTitle:"Error",
                  alertMessage: "El usuario y la contraseña no son correctos",
                  alertIcon: 'error',
                  showConfirmButton: true,
                  timer: false,
                  ruta: 'login'
                })
            }else{
              //inicio sesión correcto
              const id = results[0].id;
              const token = jwt.sign({id:id}, process.env.JWT_SECRETO,{
                expiresIn: process.env.JWT_TIEMPO_EXPIRA 
              })
              console.log("token " + token + " \npara el usuario: " + user);

              const cookiesOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 *60 * 1000),
                httpOnly: true
              }
               res.cookie('jwt', token, cookiesOptions);
               res.render('login', {
                alert: true,
                alertTitle:"Conexión exitosa",
                alertMessage: "¡Login correcto!",
                alertIcon: 'sucess',
                showConfirmButton: false,
                timer: 2000,
                ruta: '/'
              })
            }
          })

        }
        
    } catch (error) {
        console.log(error);
    }
}