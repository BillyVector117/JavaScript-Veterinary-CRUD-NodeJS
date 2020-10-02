const mongoose = require('mongoose'); // Requerir modulo de mongoose
const Schema = mongoose.Schema; // Requerir las funciones de Schema

// Instanciar un nuevo Schema
const mascotaSchema = new Schema({ // Esquema/estructura de una mascota
    // Aqui estan las definiciones de los documentos
    nombre: String,
    descripcion: String
})

//Crear modelo
const Mascota = mongoose.model('Mascota', mascotaSchema);

//Exportamos el modelo
module.exports = Mascota;