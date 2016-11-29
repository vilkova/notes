var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var fs = require("fs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'angular-tutorial',
    resave: true,
    saveUninitialized: true
}));

app.get('/notes', function (req, res) {
    res.send(req.session.notes || []);
});

app.post("/notes", function (req, res) {
    if (!req.session.notes) {
        req.session.notes = [];
        req.session.last_note_id = 0;
    }
    var note = req.body;
    note.id = req.session.last_note_id;
    req.session.last_note_id++;
    req.session.notes.push(note);
    console.log("Note with id " + note.id + " is added: " + note.text);
    res.end();
});

app.delete("/notes", function (req, res) {
    var id = req.query.id;
    var notes = req.session.notes || [];
    var updatedNotesList = [];
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id != id) {
            updatedNotesList.push(notes[i]);
        }
    }
    req.session.notes = updatedNotesList;
    console.log("Note with id " + req.query.id + " is deleted: " + req.query.text);
    res.end();
})

//
// app.get("/notes", function (req, res) {
//     var notes = [
//         {text: "note 1"},
//         {text: "note 2"},
//         {text: "note 3"}
//     ];
//     res.send(notes);
// });


console.log("Start nodejs");
app.listen(3000);