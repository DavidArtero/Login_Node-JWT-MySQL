const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//router para vistas
router.get('/', (req, res) =>{
    res.render('index');
});

router.get('/login', (req, res) =>{
    res.render('login');
});

router.get('/register', (req, res) =>{
    res.render('register');
});

//router para métodos del controlador
router.post('/register', authController.register);



module.exports = router;