var fs = require('fs'),
    xml2js = require('xml2js');
 
var parser = new xml2js.Parser();
fs.readFile("/Users/julianbeck/Documents/Programming/node/LAI/samples/Commented_XML.xml", function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log(result)
        fs.writeFileSync('./result.json', JSON.stringify(result) , 'utf-8'); 
    });
});