/*
    path: api/login
*/
const { Router,response } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

// router.post('/new',crearUsuario); sin validacion

//añadimos validacion con express-validator
router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos,
] ,crearUsuario);

//login
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos,
] ,login);

//renovar token. Llamada al controlador renewToken que está dentro controllers/auth
router.get('/renew',validarJWT, renewToken);

module.exports =router;