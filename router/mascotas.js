const express = require('express'); // Libreria para configurar servidor
const router = express.Router(); // Acceder a todas las propiedades del metodo de Express (Router).
const Mascota = require('../models/mascota') // Requerimos el modulo/archivo de mascota (Esquema/modelo de mascota)

router.get('/', async (req, res) => { // Ruta configurada de renderización para nuestra vista, los datos vienen de mongoDB, entonces sera asincrona (todas las demas rutas llevaran en la url /mascotas/....)

   // Intenta realizar la busqueda en la base de datos
    try {
        const arrayMascotasDB = await Mascota.find() // Obtiene todos los documentos del esquema/modelo de mascota y los guarda en arrayMascotasDB, (model.find())
        console.log(arrayMascotasDB) // Mostramos por consola los datos de la colección Mascota

        res.render('mascotas', { // Renderizamos en el archivo mascotas (html) el resultado de los datos .render('fileName, options(object)) (Asi, en dicho archivo podremos usar el objeto arrayMascotas)
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
    } catch (error) { // Muestra el error si lo hay
        console.log(error)
    }
})
// ('/mascotas/crear') 
router.get('/crear', (req, res) => { // Ruta configurada para crear mascotas, renderiza el archivo crear, que se encuentra en views
    res.render('crear') // Renderiza el archivo crear (crear.ejs)
})

// Al dar submit en el formulario de crear mascotas, (dirigira nuevamente a '/mascotas')
router.post('/', async (req, res) => { // Ruta configurada para enviar a la db las mascotas creadas
    const body = req.body // Capturamos el body del form (libreria body-parser)

    try {
        // Forma 1
         const mascotaDB = new Mascota(body) // Contruimos una nueva mascota con las mismas propiedades del modelo, pasandole como valores el body del formulario (nombre,descr)
         await mascotaDB.save() // guardar en MongoDB la mascota creada
         // Forma 2
         /* await Mascota.create(body) // Crea una nueva mascota pasandole como parametro body (el cuerpo del form) */
         console.log('Mascota creada: ', mascotaDB) // Imprimir en consola la mascota creada
         res.redirect('/mascotas') // Redireccionar al usuario al listado de mascotas (asi se vera reflejado la nueva mascota recien creada)
    } catch (error) { // Si hay un error, imprimelo
        console.log(error)
    }
})

router.get('/:id', async(req, res) => { // Ruta DINAMICA configurada para editar alguna mascota, el id de la ruta es leida a través del backend (se renderiza con el archivo), la ruta se vera (mascotas/'idDinamico')
    const id = req.params.id // Leemos la url (id) (En mongoDB el id es asi: _id)
    // En caso de que se encuentre un id de la mascota, retorna a la página de 'detalle', de lo contrario tambien retorna a 'detalle' pero con un error (catch)
    try {
        const mascotaDB = await Mascota.findOne({ _id:id }) // Buscado el primer elemento que coincida con el mismo id dentro del modelo de la base de datos
        console.log('ID encontrado', mascotaDB) // Mostrar en consola el resultado/ respuesta del servidor
        res.render('detalle', { // Una vez obtenida la respuesta mostrarla en una vista correspondiente (detalle.ejs, dentro de views), con propiedades adicionales que contendran los valores recien encontrados por la db
            mascota: mascotaDB, // mascota contiene el objeto o detalle 
            error: false // No habra errores si se muestra esta respuesta por parte del servidor
        })
    } catch (error) { // En caso de que haya un error
        console.log(error)
        res.render('detalle', { // Mostrar el objeto o la respuesta en una vista correspondiente (detalle), pero con los valores del objeto diferentes
            error: true, //El error tornara a true
            mensaje: 'No se encuentra el id solicitado' // Mensaje del error
        })
    }
})

router.delete('/:id', async(req, res) => { // Ruta configurada para eliminar una mascota
    const id = req.params.id // Leemos la url (id) (En mongoDB el id es asi: _id)
    try {
        // Eliminar un documento con un id en especifico y devuelve un json
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id}) //  Guarda el documento con el id que le dimos 'delete',  por medio del query de mongoDB
        if (mascotaDB) { // Si encuentra el id a eliminar, entonces se puede eliminar con un json...
            res.json({ // Se crea una respuesta tipo json
                estado: true, // Con estado true (Se pudó eliminar)
                mensaje: 'Eliminado' // Con mensaje de que se pudo eliminar
            })
        } else {
            res.json({ // Se crea una respuesta tipo json con respuesta de que no se pudo eliminar
                estado: true, // Con estado false (NO se pudó eliminar)
                mensaje: 'Fallo al eliminar' // Con mensaje de que se no se pudo eliminar
             })
        }
    } catch (error) {       
    }
})

router.put('/:id', async(req, res) => { // Ruta configurada para modificar mascotas, renderiza el archivo detalle, en views (mascotas/detalle)
    const id = req.params.id // Leemos la url (id) (En mongoDB el id es asi: _id)
    const body = req.body // Capturamos el body del form ya modificados

    try { // Intenta, encontrar el id de la mascota y actualizarlo/editarlo
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, {userFindAndModify: false}) // Query mongoDB para actualizar campos
        console.log(mascotaDB) // Muestra por consola que mascota se esta editando
        res.json({ // Retorna la respuesta en formato json
            estado: true, // con un valor de estado true
            mensaje: 'Editado' // Y un mensaje de editado
        })
    } catch (error) {
        console.log(error)
        res.json({ // Retorna la respuesta en formato json
            estado: true, // con un valor de estado false (fallo)
            mensaje: 'Fallo al editar' // Y un mensaje de no editado
        })
    }
})

module.exports = router