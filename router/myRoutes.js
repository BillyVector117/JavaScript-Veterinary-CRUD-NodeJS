const express = require('express'); // Libreria para configurar servidor
const router = express.Router(); // Acceder a todas las propiedades de Router.

// Configuración de rutas con 'Router'
router.get('/', (req, res) => { // Requerir la pagina/ruta raiz, index
    res.render("index",{Title: 'This is index Page'}) // Respuesta del server
})
router.get('/settings', (req, res) => { // Requerir la pagina/ruta settings
    res.render("settings",{Title: 'This is the settings Page using Ejs'}) // Respuesta del server
})
router.get('/contact', (req, res) => { // Requerir la pagina/ruta contact
    res.render("contact", {Title: 'This is the Contact Page using Ejs'}) // Respuesta del server
})
module.exports = router; // Exportamos este modulo (Router)
