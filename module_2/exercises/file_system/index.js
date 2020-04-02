const express = require('express');
const app = express();
const fs = require('fs');
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// fs.writeFile("public/test", () => {}, function(err) {
//     if (err) {
//         console.error(err);
//     }
//     console.log("File saved!");
// });

app.post('/api', (request, response) => {
    console.log(request.body);
    const data = request.body;
    let str = '{\"lat\": \"' + data.lat + '\", \"lon\": \"' + data.lon + '\"}' + '\n';
    // let fileContent = '';

    fs.readFile('public/latLon.txt',(err, data) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(data)
        // str += data;
        // console.log(str);
    })

    // str += fileContent;
    fs.writeFile("public/latLon.txt", str, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
});
