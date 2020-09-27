const express = require('express') // Libreria para configurar servidor
const app = express() // Variable para usar el modulo de express
const port = process.env.PORT || 3000; // Sera dinamico
// template Engine (ejs)
app.set('view engine', 'ejs'); // Usar ejs
app.use(express.static(__dirname + '/public')) // Crear Middleare, dirname hace alusion a la ruta configurada
//res.send('text') si trabajamos sin template engines, .render('Textfile', {title:title}) si tenemos uno (ejs,pug,etc)
app.get('/', (req, res) => { // Requerir la pagina/ruta raiz, index
  res.render("index",{Title: 'This is index Page'}) // Respuesta del server
})
app.get('/settings', (req, res) => { // Requerir la pagina/ruta settings
  res.render("settings",{Title: 'This is the settings Page using Ejs'}) // Respuesta del server
  })
app.get('/contact', (req, res) => { // Requerir la pagina/ruta contact
  res.render('This is the contact Page') // Respuesta del server
})
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