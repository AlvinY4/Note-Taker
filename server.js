const express = require('express'); 
const fs = require('fs'); 
const path = require('path'); 

const PORT = process.env.PORT || 3000; 
const app = express(); 

app.use(express.static(__dirname + '/public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true})); 

require('./routes/routes')(app); 

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT); 
}); 

