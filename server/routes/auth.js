const { Router } = require('express');
const { crearUsuario, loginUsuario, renewToken, nombreAutor } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


//crear nuevo usuario
router.post('/new', [
    //check('nombre del campo', 'mensaje de error').validacion
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'Password es corto').isLength({ min: 6 }),
    validarCampos, //no lleva () porque lo estoy mandando llamar, no ejecutando

],crearUsuario) 

//Login usuario
router.post('/', [
    //check('nombre del campo', 'mensaje de error').validacion
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'Password es corto').isLength({ min: 6 }),
    validarCampos,
],loginUsuario)

//Validar y revalidar token
router.get('/renew', validarJWT,renewToken),
router.get('/getname/:uid', nombreAutor)

module.exports = router;