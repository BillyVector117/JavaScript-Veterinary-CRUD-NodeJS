const express = require('express'); // Libreria para configurar servidor
const router = express.Router(); // Acceder a todas las propiedades de Router.
const Mascota = require('../models/mascota') // Requerimos el modulo/archivo de mascota (Esquema de mascota)
router.get('/', async (req, res) => { // Ruta configurada de renderización para nuestra vista, los datos se treran de mongoDB, entonces sera asincrona
   // Intenta realizar la busqueda en la base de datos
    try {
        const arrayMascotasDB = await Mascota.find() // Obtiene todos los documentos del esquema/modelo de mascota y los guarda en arrayMascotasDB, (model.find())
        console.log(arrayMascotasDB) // Mostramos por consola los datos de la colección Mascota

        res.render('mascotas', { // Renderizamos en el archivo mascotas (html) el resultado de los datos
            arrayMascotas: arrayMascotasDB 
/* Respuesta estatica (test)            
                arrayMascotas: [ // Render de mascotas de forma estatica
                {
                id: '01',
                nombre: 'rex',
                descripcion: 'rex descripcion'
                },
                {
                id: '02',
                nombre: 'hex',
                descripcion: 'hex descripcion'
                }
            ] */
        })
    } catch (error) { // Catch por si encuentra un error
        console.log(error)
    }
})
module.exports = router