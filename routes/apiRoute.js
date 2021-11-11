const fs = require('fs');
let db = require('../db/db.json');
const app =require('express').Router();

app.get('/api/notes', (req, res, next) => {
    res.json(db)
    })

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const postnewNote = req.body;
    db.push(postnewNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2))
    res.json(db)
});

// Delete Note Action
app.delete('/api/notes/:id', (req, res) => {
    const destoryNote = req.params.id;
    const deletedNote = db.findIndex(({ id }) => id === req.params.id);
    if (deletedNote >= 0){
        db.splice(destoryNote, 1);
    }
    res.send(req.body)
});

module.exports = app