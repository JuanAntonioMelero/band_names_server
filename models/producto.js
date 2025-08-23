const { Schema, model } = require('mongoose');

const ProductoSchema = Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: false,
        },
        precio: {
            type: Number,
            required: true,
            min: 0
        },
        categoria: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        codigo: {
            type: String,
            required: true,
            unique: true
        },
        activo: {
            type: Boolean,
            default: true
        },
        fechaCreacion: {
            type: Date,
            default: Date.now
        },
        fechaActualizacion: {
            type: Date,
            default: Date.now
        }
    }
);

ProductoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

// Middleware para actualizar fechaActualizacion antes de guardar
ProductoSchema.pre('findOneAndUpdate', function() {
    this.set({ fechaActualizacion: new Date() });
});

module.exports = model('Producto', ProductoSchema);