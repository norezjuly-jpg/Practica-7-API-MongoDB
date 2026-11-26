
# Práctica 7 - API de productos con MongoDB

## Autora

Yuliana Alexandra Mateo
Matrícula: 2025-0909

## Descripción

En esta práctica desarrollé una API REST para gestionar productos, utilizando Node.js, Express, Mongoose y MongoDB.

A diferencia de la práctica anterior, los productos se almacenan en una base de datos, lo que permite conservar la información después de reiniciar el servidor.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Thunder Client
- MongoDB Compass
- Visual Studio Code

## Funcionalidades

- Listar todos los productos.
- Consultar un producto por su ID.
- Crear nuevos productos.
- Actualizar productos existentes.
- Eliminar productos.
- Validar los campos obligatorios.
- Manejar errores.
- Mantener la persistencia de los datos.

## Rutas de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /productos | Listar todos los productos |
| GET | /productos/:id | Buscar un producto por ID |
| POST | /productos | Crear un producto |
| PUT | /productos/:id | Actualizar un producto |
| DELETE | /productos/:id | Eliminar un producto |

## Instalación y ejecución

1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Tener MongoDB instalado y en ejecución.
4. Crear un archivo `.env` en la carpeta principal.
5. Configurar las siguientes variables de entorno:

```env
MONGODB_URI=mongodb://localhost:27017/tienda
PORT=3000
```

6. Ejecutar el servidor con `npm run dev`.

El servidor estará disponible en http://localhost:3000.

## Pruebas realizadas

Se realizaron ocho pruebas utilizando Thunder Client para comprobar el funcionamiento de las rutas, las validaciones, el manejo de errores y la persistencia de los datos.

También se verificaron los productos almacenados mediante MongoDB Compass.

## Conclusión

Con esta practica aprendi a conectar una API REST con MongoDB, utilizar Mongoose para gestionar los productos y almacenar la información de manera persistente.


