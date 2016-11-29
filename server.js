var express = require("express");
var app = express();
var path = require("path");

app.use(express.static('public'));

app.get("/notes", function (req, res) {
   var notes = [
       {text : "note 1"},
       {text : "note 2"},
       {text : "note 3"}
   ];
    res.send(notes);
});


console.log("Start nodejs");
app.listen(3000);