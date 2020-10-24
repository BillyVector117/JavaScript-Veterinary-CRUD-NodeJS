const mongoose = require('mongoose'); // Requerir modulo de mongoose (Modelar mongoDB)
const Schema = mongoose.Schema; // Requerir las funciones de Schema para pocer hacer una estructura en la db

// Instanciar un nuevo Schema
const mascotaSchema = new Schema({ // Esquema/estructura de una mascota
    // Aqui estan las definiciones de los documentos
    nombre: String,
    descripcion: String
})

//Crear modelo
const Mascota = mongoose.model('Mascota', mascotaSchema); // guardar el Modelo como Mascota 

//Exportamos el modelo
module.exports = Mascota;