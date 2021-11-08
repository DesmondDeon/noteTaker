const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const db = require('/db/db.json');

function createNote(dbArray) {
    const addnewNote = [];
    for (let i = 0; i < dbArray.length; i++) {
        const newNote = dbArray[i];
        newNote.id = i + 1;
        addnewNote[i] = newNote
    }
    return addnewNote;
}

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));



app.get('/index', (req, res ) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get('/api/notes', (req, res, next) => {
    fs.readFile(db, 'utf-8', (err, data) =>{
        if(err) {
            throw err;
        }
        const wholeData = JSON.parse(data);
        let result = [];
        for (let i in wholeData.notes) {
            if (i) {
                result.push(wholeData.notes[i])
            }
            else{
                return [];
                }
            }
            return result;
        })
    })

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const postnewNote = req.body;
    dbList.push(postnewNote);
    dbList = createNote(dbList);
    res.send('Note Post Working');
});

// Delete Note Action
app.delete('/api/notes/:id', (req, res) => {
    let DeletedNote = req.params.id;
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if(err) {
            console.log(err)
            res.sendStatus(500);
            return;
        } try {
            let json = JSON.parse(data);
        } catch (e) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        for (let i = 0; i < json.length; i++) {
            if (json[i].id === DeletedNote) {
                json.splice(i, 1);
                return;
            }
            
        }

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), (err) => {
            if(err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.send('Successfully deleted!')
        });
    });
});

// Bind and Listen to the specified PORT
app.listen(PORT, function(){
    console.log(`App listening to PORT: ${PORT}`);
});



