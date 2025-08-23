/*
    path: api/usuarios

*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuarios');

const router = Router();

// Obtener usuarios
router.get('/', validarJWT, getUsuarios);

// Crear usuario (nueva ruta)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('role', 'El role debe ser user o admin').isIn(['user', 'admin']),
    validarCampos
], crearUsuario);

// Actualizar usuario
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role debe ser user o admin').isIn(['user', 'admin']),
    validarCampos
], actualizarUsuario);

// Eliminar usuario
router.delete('/:id', [
    validarJWT
], eliminarUsuario);

module.exports = router;
