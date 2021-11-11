const app = require('express').Router();
const { builtinModules } = require('module');
const path = require('path');

app.get('/', (req, res ) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = app