const { response } = require('express');
const Categoria = require('../models/categoria');

const getCategorias = async (req, res = response) => {
    try {
        const { activo } = req.query;
        let filtro = {};
        
        if (activo !== undefined) {
            filtro.activo = activo === 'true';
        }
        
        const categorias = await Categoria.find(filtro)
            .sort({ nombre: 1 });
        
        res.json({
            ok: true,
            categorias
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener categorías'
        });
    }
};

const getCategoria = async (req, res = response) => {
    try {
        const { uid } = req.params;
        
        const categoria = await Categoria.findById(uid);
        
        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoría no encontrada'
            });
        }
        
        res.json({
            ok: true,
            categoria
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener categoría'
        });
    }
};

const crearCategoria = async (req, res = response) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
    
    try {
        // Verificar que req.body existe y no está vacío
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se recibieron datos en el cuerpo de la petición'
            });
        }

        const { nombre, descripcion } = req.body;
        
        // Verificar que nombre existe
        if (!nombre) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre es obligatorio'
            });
        }
        
        // Verificar si ya existe una categoría con el mismo nombre
        const categoriaExistente = await Categoria.findOne({ nombre });
        if (categoriaExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoría con ese nombre'
            });
        }
        
        const categoria = new Categoria({
            nombre,
            descripcion
        });
        
        await categoria.save();
        
        res.json({
            ok: true,
            categoria
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear categoría'
        });
    }
};

const actualizarCategoria = async (req, res = response) => {
    try {
        const { uid } = req.params;
        
        // Verificar que req.body existe y no está vacío
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se recibieron datos en el cuerpo de la petición'
            });
        }
        
        const { nombre, descripcion, activo } = req.body;
        
        // Verificar si la categoría existe
        const categoria = await Categoria.findById(uid);
        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoría no encontrada'
            });
        }
        
        // Si se está cambiando el nombre, verificar que no exista otra categoría con ese nombre
        if (nombre && nombre !== categoria.nombre) {
            const categoriaExistente = await Categoria.findOne({ nombre });
            if (categoriaExistente) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una categoría con ese nombre'
                });
            }
        }
        
        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            uid,
            { nombre, descripcion, activo },
            { new: true, runValidators: true }
        );
        
        res.json({
            ok: true,
            categoria: categoriaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar categoría'
        });
    }
};

const eliminarCategoria = async (req, res = response) => {
    try {
        const { uid } = req.params;
        
        // Verificar si la categoría existe
        const categoria = await Categoria.findById(uid);
        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoría no encontrada'
            });
        }
        
        // Soft delete - cambiar activo a false
        const categoriaEliminada = await Categoria.findByIdAndUpdate(
            uid,
            { activo: false },
            { new: true }
        );
        
        res.json({
            ok: true,
            categoria: categoriaEliminada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar categoría'
        });
    }
};

module.exports = {
    getCategorias,
    getCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};