/*
    path: api/usuarios

*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validarJWT');

const { getUsuarios } = require('../controllers/usuarios');

const router = Router();



//router.get('/', validarJWT, getUsuarios);
router.get('/', getUsuarios);
module.exports = router;
