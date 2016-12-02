var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'angular-tutorial',
    resave: true,
    saveUninitialized: true
}));

//init db
var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));

db.open(function () {
    db.collection('notes', function (error, notes) {
        {
            db.notes = notes;
        }
    });
    db.collection('sections', function (error, sections) {
        {
            db.sections = sections;
        }
    });
    db.collection('users', function (error, users) {
        {
            db.users = users;
        }
    });


    console.log("mongo db is opened!");
});

/*
 Get and store notes in DB
 */
app.get("/notes", function (req, res) {
    db.notes.find(req.query).toArray(function (err, items) {
        res.send(items);
    });
});

app.post("/notes", function (req, res) {
    var count = db.notes.find().count();
    req.body.order = count;
    db.notes.insert(req.body);
    res.end();
});

app.delete("/notes", function (req, res) {
    var id = new ObjectID(req.query.id);
    console.log(id);
    db.notes.remove({_id: id}, function (err) {
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});

// app.post("/order", function (req, res) {
//     // var id = new ObjectID(req.query.id);
//     var note = db.notes.find().sort({order: -1}).limit(1);
//     console.log(note);
//
// });

app.get("/sections", function (req, res) {
    var userName = req.session.userName || "demo";
    console.log(userName)
    db.users.find({name: userName})
        .toArray(function (err, items) {
            var user = items[0];
            res.send(user.sections);
        });
});

app.post("/sections/replace", function (req, res) {
    var userName = req.session.userName || "demo";
    db.users.update({name: userName},
        {$set: {sections: req.body}},
        function () {
            res.end();
        });
});

app.get("/checkUser", function (req, res) {
    db.users.find({name: req.query.user}).toArray(function (err, items) {
        res.send(items.length < 1);
    });
});

app.post("/users", function (req, res) {
    console.log(req.body);
    db.users.insert(req.body, function (resp) {
        req.session.userName = req.body.userName;
        res.end();
    });
});

app.get("/notes", function (req, res) {
    setUserQuery(req);
    db.notes.find(req.query).toArray(function (err, items) {
        res.send(items);
    });
});

app.post("/login", function (req, res) {
    db.users.find(
        {
            name: req.body.login,
            password: req.body.password
        })
        .toArray(function (err, items) {
            console.log(items)
            if (items.length > 0) {
                req.session.userName = req.body.login;
            }
            res.send(items.length > 0);
        });
});

app.get("/logout", function (req, res) {
    req.session.userName = null;
    res.end();
});

function setUserQuery(req) {
    req.query.userName = req.session.userName || "demo";
};


/*
 Get notes from session

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

 */
console.log("Start nodejs");
app.listen(3000);