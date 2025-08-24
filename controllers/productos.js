const { response } = require('express');
const Producto = require('../models/producto');

const getProductos = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;
        const limite = Number(req.query.limite) || 20;
        const activo = req.query.activo !== undefined ? req.query.activo === 'true' : undefined;
        
        let filtro = {};
        if (activo !== undefined) {
            filtro.activo = activo;
        }

        const productos = await Producto
            .find(filtro)
            .sort({ fechaCreacion: -1 })
            .skip(desde)
            .limit(limite);

        const total = await Producto.countDocuments(filtro);

        res.json({
            ok: true,
            productos,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
};

const getProducto = async (req, res = response) => {
    try {
        const uid = req.params.id;
        
        const producto = await Producto.findById(uid);
        
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        res.json({
            ok: true,
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
};

const crearProducto = async (req, res = response) => {
    try {
        const { nombre, precio, areapreparacion, categoria, imagen } = req.body;

        // Validar campos obligatorios
        if (!nombre || !precio || !areapreparacion || !categoria) {
            return res.status(400).json({
                ok: false,
                msg: 'Los campos nombre, precio, área de preparación y categoría son obligatorios'
            });
        }

        // Crear producto
        const producto = new Producto({
            nombre,
            precio,
            areapreparacion,
            categoria,
            imagen: imagen || null
        });

        await producto.save();

        res.json({
            ok: true,
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
};

const actualizarProducto = async (req, res = response) => {
    try {
        const uid = req.params.id;
        const { nombre, precio, areapreparacion, categoria, imagen, activo } = req.body;

        // Verificar si el producto existe
        const producto = await Producto.findById(uid);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        // Actualizar producto
        const productoActualizado = await Producto.findByIdAndUpdate(
            uid,
            { nombre, precio, areapreparacion, categoria, imagen, activo },
            { new: true }
        );

        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
};

const eliminarProducto = async (req, res = response) => {
    try {
        const uid = req.params.id;

        // Verificar si el producto existe
        const producto = await Producto.findById(uid);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        // Eliminación lógica (cambiar activo a false)
        const productoEliminado = await Producto.findByIdAndUpdate(
            uid,
            { activo: false },
            { new: true }
        );

        res.json({
            ok: true,
            msg: 'Producto eliminado correctamente',
            producto: productoEliminado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
};

const eliminarProductoPermanente = async (req, res = response) => {
    try {
        const uid = req.params.id;

        // Verificar si el producto existe
        const producto = await Producto.findById(uid);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        // Eliminación física
        await Producto.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Producto eliminado permanentemente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
};

module.exports = {
    getProductos,
    getProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    eliminarProductoPermanente
};