// This module creates a Squema to define the data type structure (like tables in SQL Database)
const mongoose = require("mongoose"); // 'mongoose' allows to use mongoDB methods
const Schema = mongoose.Schema; // Schema methods is required to created a documents structure

// Instantiate a new schema (Structure/Schema for new Pet)
const mascotaSchema = new Schema({
  // Document properties and types
  nombre: String,
  descripcion: String,
});

// Make model and save as 'Mascota' using 'mascotaSchema' as Schema
const Mascota = mongoose.model("Mascota", mascotaSchema);

// Model export
module.exports = Mascota;
