const fs = require('fs'); 
const path = require('path'); 


module.exports = (app) => {
    let notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

    app.get('/api/notes', (req, res) => {
        return res.json(notes);
    }); 

    app.post('/api/notes', (req, res) => {
        let noteId; 
        if (notes.length) {
            noteId = Math.max(...(notes.map(note => note.id)));
        } else {
            noteId = 0;
        }
        console.log(noteId); 

        const id = noteId + 1; 

        notes.push({id, ...req.body });
        res.json(notes.slice(-1)); 
    }); 

    app.delete('/api/notes/:id', (req, res) => {
        let findNote = notes.find(({ id }) => id === JSON.parse(req.params.id)); 
        notes.splice(notes.indexOf(findNote), 1);
        res.end("Note has been Deleted"); 
    }); 

    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    }); 

    function updateFile() {
        fs.writeFile('db/db.json', JSON.stringify(notes, '\t'),err => {
            if (err) throw err; 
            return true;
        }); 
    }; 

};

