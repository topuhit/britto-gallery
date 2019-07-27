var fs = require("fs");
const dirTree = require("directory-tree");

var express = require('express')
var compression = require('compression')

var app = express()
app.use(compression())

const tree = dirTree("./gallery/");

var path = require('path');
app.use(express.static('gallery'))
app.use('/gallery', express.static(path.join(__dirname, 'gallery')))






var gallery;

fs.writeFile("./gallery.txt", JSON.stringify(tree), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    fs.readFile('./gallery.txt', function read(err, data) {
    if (err) {
        throw err;
    }
    var jsonContent = JSON.parse(data);
    gallery = jsonContent;
});

}); 




 
app.get('/api/gallery', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
  res.send(gallery)
})
 

app.get('/api/tour-details', function (req, res) {
        fs.readFile('./tour-details.js', function read(err, data) {
        if (err) {
            throw err;
        }
        var tourDetails = JSON.parse(data);
        res.send(tourDetails)
    });
  
})
 

app.listen(3000)