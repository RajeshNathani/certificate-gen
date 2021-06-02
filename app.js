const express = require('express')
const fs = require('fs')
const pdf = require('pdfkit')
const moment = require('moment')
var bodyParser = require('body-parser')
var path = require('path');
const app = express();
const port = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
const doc = new pdf({
    layout : 'landscape',
    size : "A4"
})
/**/

app.get('/' , (req, res)=>{
    res.send('index.html')
})

app.get('/gen', (req, res)=>{
    const username = req.query.name
    const text = `Mr/Ms ${username} was an active member of the Students' Technical and Innovation Club, Medi-Caps University. He/she was a part of one of the largest communities in the University campus for the session of 2020-21.`
    doc.pipe(fs.createWriteStream(`${username}.pdf`))
    doc.image('certificate.jpeg', 0, 0, {width : 800})
    doc.fontSize(20).text(text, 100, 250, {
        align: 'center',
        width: 600
    })
    doc.end();
    const file = `${username}.pdf`
    res.download(file)
})

app.listen(port)
console.log("running on" + port)