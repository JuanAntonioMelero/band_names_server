const { Schema, model } = require('mongoose');

const ProductoSchema = Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        precio: {
            type: Number,
            required: true,
            min: 0
        },
        areapreparacion: {
            type: String,
            required: true,
            trim: true
        },
        categoria: {
            type: String,
            required: true,
            trim: true
        },
        imagen: {
            type: String,
            required: false,
            trim: true
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

ProductoSchema.pre('findOneAndUpdate', function() {
    this.set({ fechaActualizacion: new Date() });
});

module.exports = model('Producto', ProductoSchema);