const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const {
    getCategorias,
    getCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categorias');

const router = Router();

// Obtener todas las categorías
router.get('/', validarJWT, getCategorias);

// Obtener categoría por ID
router.get('/:uid', validarJWT, getCategoria);

// Crear nueva categoría
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre debe tener entre 2 y 50 caracteres').isLength({ min: 2, max: 50 }),
        validarCampos
    ],
    crearCategoria
);

// Actualizar categoría
router.put('/:uid',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre debe tener entre 2 y 50 caracteres').isLength({ min: 2, max: 50 }),
        validarCampos
    ],
    actualizarCategoria
);

// Eliminar categoría (soft delete)
router.delete('/:uid', validarJWT, eliminarCategoria);

module.exports = router;