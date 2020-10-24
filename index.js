const express = require('express') // Libreria para configurar servidor
const bodyParser = require('body-parser') // Libreria para leer el body 
const mongoose = require('mongoose'); // Libreria para conexión a db (MongoDB)
const app = express() // Variable para usar el modulo de express

// Configuración de bodyParser: parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

require('dotenv').config() // Libreria para cargar variables de entorno

const port = process.env.PORT || 3000; // Sera dinamico en Heroku, si no, sera el 3000

// ----------------Conexión a base de datos (MongoDB)----------------

// Conexión a la db con las variables de entorno (se encuentran en un archivo .env y en Heroku)
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lyluq.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, // Metodo de Mongoose para conectar a db, primer argumento la uri, segundo objeto con configuración
  {useNewUrlParser: true, useUnifiedTopology: true} // Objeto para configurar alertas emergentes en la terminal
  )
    .then(() => console.log('Database connected succesfully')) // Mensaje exitoso al conectarse
    .catch(e => console.log(e)) // Mensaje error si lo hay

// template Engine (ejs)
app.set('view engine', 'ejs'); // Usar ejs como plantilla
app.use(express.static(__dirname + '/public')) // Crear Middleare, __dirname hace alusion a la ruta configurada
//res.send('text') si trabajamos sin template engines (pagina estatica), .render('Textfile', {title:title}) si tenemos uno (ejs,pug,etc)

// Rutas de la API/Web
app.use('/', require('./router/myRoutes')); // La ruta se configura si usamos ej. /api...
app.use('/mascotas', require('./router/mascotas')); // La ruta se configura si usamos ej. /api...

app.use((req, res, next) => { // Middleware para página 404
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