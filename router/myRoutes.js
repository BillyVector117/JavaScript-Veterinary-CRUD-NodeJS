// This module contains the main routes
const express = require('express'); // To create a server
const router = express.Router(); // Access to Router Methods

//Routes settings for 'Router'
router.get('/', (req, res) => { // When Url is in Index
// First param is render() method and stores/server response the invoqued file (search in /views path), then send JSON as second param
    res.render("index",{Title: 'This is index Page'})
})
router.get('/settings', (req, res) => {
    res.render("settings",{Title: 'This is a settings Page using EJS'})
})
router.get('/contact', (req, res) => {
    res.render("contact", {Title: 'This is a Contact Page using EJS'})
})
module.exports = router;
