const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        descripcion: {
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

CategoriaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

CategoriaSchema.pre('findOneAndUpdate', function() {
    this.set({ fechaActualizacion: Date.now() });
});

module.exports = model('Categoria', CategoriaSchema);