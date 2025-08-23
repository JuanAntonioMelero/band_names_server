/*
    path: api/productos
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const {
    getProductos,
    getProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    eliminarProductoPermanente
} = require('../controllers/productos');

const router = Router();

// Obtener todos los productos
router.get('/', validarJWT, getProductos);

// Obtener un producto por ID
router.get('/:id', validarJWT, getProducto);

// Crear producto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio y debe ser un número').isNumeric(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    check('stock', 'El stock debe ser un número').optional().isNumeric(),
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto);

// Actualizar producto
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').optional().not().isEmpty(),
    check('precio', 'El precio debe ser un número').optional().isNumeric(),
    check('categoria', 'La categoría es obligatoria').optional().not().isEmpty(),
    check('stock', 'El stock debe ser un número').optional().isNumeric(),
    check('codigo', 'El código es obligatorio').optional().not().isEmpty(),
    validarCampos
], actualizarProducto);

// Eliminar producto (eliminación lógica)
router.delete('/:id', [
    validarJWT
], eliminarProducto);

// Eliminar producto permanentemente
router.delete('/permanente/:id', [
    validarJWT
], eliminarProductoPermanente);

module.exports = router;