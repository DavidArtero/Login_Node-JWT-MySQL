//Procedimientos para controlar lógico de la autentificación
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");

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
    try {
        const user = req.body.user;
        const pass = req.body.pass;
        console.log(user + " " + pass)
        
    } catch (error) {
        console.log(error);
    }
}