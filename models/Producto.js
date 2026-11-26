const mongoose = require('mongoose')

// Aqui define la estructura de los productos
const productoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true,
        min: 0
    }

})

// Exportar el modelo Producto
module.exports = mongoose.model('Producto', productoSchema)