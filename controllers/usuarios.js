const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde)
        .limit(20)

    
    res.json({
        ok: true,
        usuarios,
    })
}

// Actualizar usuario
const actualizarUsuario = async ( req, res = response ) => {
    try {
        const uid = req.params.id;
        const { nombre, email, role } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar si el email ya existe en otro usuario
        if (email !== usuario.email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El email ya está registrado'
                });
            }
        }

        // Actualizar usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            uid,
            { nombre, email, role },
            { new: true }
        );

        res.json({
            ok: true,
            usuario: {
                uid: usuarioActualizado._id,
                nombre: usuarioActualizado.nombre,
                email: usuarioActualizado.email,
                role: usuarioActualizado.role,
                online: usuarioActualizado.online
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
}

// Eliminar usuario
const eliminarUsuario = async ( req, res = response ) => {
    try {
        const uid = req.params.id;

        // Verificar si el usuario existe
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar que no se elimine a sí mismo
        if (uid === req.uid) {
            return res.status(400).json({
                ok: false,
                msg: 'No puedes eliminarte a ti mismo'
            });
        }

        // Eliminar usuario
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
}

module.exports = {
    getUsuarios,
    actualizarUsuario,
    eliminarUsuario
}