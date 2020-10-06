const express = require('express') // Libreria para configurar servidor
const bodyParser = require('body-parser') // Libreria para leer el body 
const app = express() // Variable para usar el modulo de express

// Configuración de bodyParser: parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

require('dotenv').config() // Libreria para cargar variables de entorno

const port = process.env.PORT || 3000; // Sera dinamico
// ----------------Conexión a base de datos (MongoDB)----------------
// Variables de entorno estan en un archivo .env y Heroku
const mongoose = require('mongoose'); // Libreria para conexión a db (MongoDB)

// Conexión a la db con las variables de entorno
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lyluq.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, // URI de la db
  {useNewUrlParser: true, useUnifiedTopology: true} // Evitar mensajes de db en la consola
  )
    .then(() => console.log('Database connected succesfully'))
    .catch(e => console.log(e)) // Muestra error si hay.

// template Engine (ejs)
app.set('view engine', 'ejs'); // Usar ejs
app.use(express.static(__dirname + '/public')) // Crear Middleare, dirname hace alusion a la ruta configurada
//res.send('text') si trabajamos sin template engines, .render('Textfile', {title:title}) si tenemos uno (ejs,pug,etc)
// Rutas de la API/Web
app.use('/', require('./router/myRoutes')); // La ruta se configura si usamos ej. /api...
app.use('/mascotas', require('./router/mascotas')); // La ruta se configura si usamos ej. /api...

app.use((req, res, next) => { // Middleware para 404 page
    res.status(404).render("error", { Title: 'THIS ERROR 404 PAGE USING EJS', Descrp: 'Description generated using ejs template engine'}) // Respuesta 404
})
app.listen(port, () => { // Escuchador del servidor
  console.log(`server listening on port ${port}`)
})
















/*
// Crear servidor sin Express ( Vanilla Node)
const http = require('http'); // Modulo por defecto de NodeJs
const server = http.createServer((req, res) => { // Creamos el server
  res.end('Answer request v2') // Respuesta del server
})
const port = 3000; // Puerto a escuchar
server.listen(port, () =>{ // Servidor escuchando en el puerto 3000
  console.log(`Listening server on port ${port}`) // Respuesta del servidor
}) // Nodemon (watch del server), se instala globalno
*/