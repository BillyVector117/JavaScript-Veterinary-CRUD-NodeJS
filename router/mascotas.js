// This module contains CRUD Routes
const express = require("express"); // Allows to setting server
const router = express.Router(); // Access to Router methods
const Mascota = require("../models/mascota"); // Import Mascota Schema/Model created by Mongoose

// Complete Url: "/mascotas/" // Async function because is using asyncronous actions in mongoDB
router.get("/", async (req, res) => {
  // Try searching documents in Database
  try {
    const arrayMascotasDB = await Mascota.find(); // Get and save all documents from 'Mascota' Model/Schema, (model.find())
    // console.log(arrayMascotasDB) // Store all dcouments from collection

    // Render (mascotas.ejs from /views) and send all documents/the collection as JSON format
    res.render("mascotas", {
      // Data from Database sent
      arrayMascotas: arrayMascotasDB,
      /* Static response, but that is how looks like data from database (test)
            // Static way to mascotas render
                arrayMascotas: [
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
    });
  } catch (error) {
    console.error(error);
  }
});
// Complete Url: ('/mascotas/crear') // Allows to create a new document/mascota
router.get("/crear", (req, res) => {
  // Render (crear.ejs from /views)
  res.render("crear");
});

// Complete Url: "/mascotas/" WITH POST METHOD (Data-Form), when operation is finished redirect to Home '/mascotas'
router.post("/", async (req, res) => {
  const body = req.body; // Captura body-Form, values (body-parser Library)

  try {
    // Forma 1
    const mascotaDB = new Mascota(body); // With the same Model/Schema properties create a new Mascota using data-Form value (Body-Form)(nombre,descr)
    await mascotaDB.save();
    // Forma 2
    /* await Mascota.create(body) // Create a new Document/Mascota setting body-Form (values) */
    console.log("Mascota creada: ", mascotaDB);
    res.redirect("/mascotas"); // To ensure the new document is created, redirect to Home section
  } catch (error) {
    console.log(error);
  }
});

// Complete Url: mascotas/"idDinamico" (:iD) // EDIT
router.get("/:id", async (req, res) => {
  // Dinamic route to EDIT a document/Mascota, :id from Url-Params is readed by Backend
  const id = req.params.id; // Read Url:Params (:id) (In mongoDB id property is: _id)
  // Return 'detalle.ejs' in case _id document/mascota exists,otherwise return 'detalle.ejs' with an error (catch)
  try {
    const mascotaDB = await Mascota.findOne({ _id: id }); // Search in the Model/Schema the document that match with the same id from Url-Params
    console.log("ID encontrado", mascotaDB);
    // Store data in 'detalle.ejs' sending the previous found document/mascota
    res.render("detalle", {
      mascota: mascotaDB,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.render("detalle", {
      error: true,
      mensaje: "No se encuentra el id solicitado",
    });
  }
});

// Complete Url: /mascotas/${:id} // This action is effected by fetch() with 'DELETE' headers in 'detalle.ejs' Script
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Delete a document/mascota with specific :id (from Url-Params)
    const mascotaDB = await Mascota.findByIdAndDelete({ _id: id });
    // if mascotaDB(deleted document) is successfully deleted
    if (mascotaDB) {
      res.json({
        estado: true,
        mensaje: "Eliminado",
      });
    } else {
      res.json({
        estado: false,
        mensaje: "Algo ocurrio al eliminar :(",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Complete Url: /mascotas/${:id} // This action is effected by fetch() with 'UPDATE/PUT' headers in 'detalle.ejs' Script
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body; // req.body is new/modified data-Form-value
  try {
    // Search and update the found document/mascota with the new data-Form-values
    // id: id, body: body
    const mascotaDB = await Mascota.findByIdAndUpdate(id, body, {
      userFindAndModify: false,
    });
    console.log("Updated pet/mascota: ", mascotaDB);
    res.json({
      estado: true,
      mensaje: "Editadó",
    });
  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: "Fallo al editar",
    });
  }
});
module.exports = router;
