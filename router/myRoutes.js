const express = require('express'); // Libreria para configurar servidor
const router = express.Router(); // Acceder a todas las propiedades de Router.

// Configuración de rutas con 'Router'
router.get('/', (req, res) => { // Requerir la pagina/ruta raiz, index
    res.render("index",{Title: 'This is index Page'}) // Respuesta del server, renderizar el archivo index
})
router.get('/settings', (req, res) => { // Requerir la pagina/ruta settings
    res.render("settings",{Title: 'This is a settings Page using Ejs'}) // Respuesta del server, renderizar el archivo settings mas mensaje
})
router.get('/contact', (req, res) => { // Requerir la pagina/ruta contact
    res.render("contact", {Title: 'This is a Contact Page using Ejs'}) // Respuesta del server, renderizar el archivo contact mas mensaje
})
module.exports = router; // Exportamos este modulo (router)
