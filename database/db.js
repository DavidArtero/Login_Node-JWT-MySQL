const mysql = require('mysql');

const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : 'root',
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    
})

conexion.connect((error)=>{
    if(error){
        console.log('Error de conexión:' + error)
        return;
    }

    console.log('Conectado a la Base de Datos');
});

module.exports = conexion;