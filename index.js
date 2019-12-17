var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

app.get('/get_count', function (req, res) {
    let count = {};

    base('2019 Autumn').select({
        fields: ["課程名稱", "講師", "教材類型", "備註"],
        view: 'Grid view'
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            if(record.fields['備註'] === 'This 15 Speech' && record.fields['教材類型'] === "Slide") {
                if(!(record.fields['講師'] in count)){
                    count[record.fields['講師']] = 1;
                } else {
                    count[record.fields['講師']] += 1;
                }
            }
        });
        
        res.send(count);
    });
});

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});