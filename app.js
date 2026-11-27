require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Producto = require('./models/Producto')

const app = express()

app.use(express.json())

// Conexion con la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conexion exitosa a MongoDB')
    })
    .catch((error) => {
        console.error('Error al conectar con MongoDB:', error.message)
    })


// GET - Listar todos los productos
app.get('/productos', async (req, res) => {
    try {
        // Consultar todos los productos en MongoDB
        const productos = await Producto.find()

        // Mostrar los productos encontrados
        res.status(200).json(productos)

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos'
        })
    }
})

// GET - Obtener un producto por id
app.get('/productos/:id', async (req, res) => {
    try {
        // Buscar el producto por su ID en MongoDB
        const producto = await Producto.findById(req.params.id)

        // Verificar si el producto existe
        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            })
        }

        // Mostrar el producto encontrado
        res.status(200).json(producto)

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'Id no valido'
            })
        }

        res.status(500).json({
            mensaje: 'Error al obtener el producto'
        })
    }
})

// ============================================================
// PRÁCTICA 7: Operaciones CRUD con MongoDB
// ============================================================

// POST /productos - Crear nuevo producto
app.post('/productos', async (req, res) => {
    try {
        // Obtener los datos del producto
        const { nombre, descripcion, precio } = req.body

        // Validar los campos obligatorios
        if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            })
        }

        // Crear y guardar el producto en MongoDB
        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio
        })

        // Responder con el producto creado
        res.status(201).json(nuevoProducto)

    } catch (error) {
        // Controlar los errores de validacion
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                mensaje: 'Datos del producto no validos'
            })
        }

        res.status(500).json({
            mensaje: 'Error al crear el producto'
        })
    }
})

// PUT /productos/:id - Actualizar producto
app.put('/productos/:id', async (req, res) => {
    try {
        // Obtener el ID del producto
        const id = req.params.id

        // Obtener los nuevos datos
        const { nombre, descripcion, precio } = req.body

        // Validar los campos obligatorios
        if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            })
        }

        // Buscar y actualizar el producto en MongoDB
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { nombre, descripcion, precio },
            { new: true, runValidators: true }
        )

        // Verificar si el producto existe
        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            })
        }

        // Devolver el producto actualizado
        res.status(200).json(productoActualizado)

    } catch (error) {
        // Verificar si el ID es invalido
        if (error.name === 'CastError' && error.path === '_id') {
            return res.status(400).json({
                mensaje: 'Id no valido'
            })
        }

        // Controlar los errores de validacion
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'Datos del producto no validos'
            })
        }

        res.status(500).json({
            mensaje: 'Error al actualizar el producto'
        })
    }
})


// DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', async (req, res) => {
    try {
        // Obtener el ID del producto
        const id = req.params.id

        // Buscar y eliminar el producto de MongoDB
        const productoEliminado = await Producto.findByIdAndDelete(id)

        // Verificar si el producto existe
        if (!productoEliminado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            })
        }

        // Confirmar la eliminacion
        res.status(200).json({
            mensaje: 'Producto eliminado',
            producto: productoEliminado
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'Id no valido'
            })
        }

        res.status(500).json({
            mensaje: 'Error al eliminar el producto'
        })
    }
})


// Aqui configuramos el puerto del servidor
const PORT = process.env.PORT || 3000

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
