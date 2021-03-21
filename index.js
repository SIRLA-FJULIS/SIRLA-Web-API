var express = require('express');
require('dotenv').config();
var app = express();
const PORT = process.env.PORT || 3000

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

// 名字權威檔
let name_auth = {
    "Arashi": ["王譽錚", "譽錚", "Arashi"],
    "Yan": ["邱妍瑛", "妍瑛", "Yan"],
    "🐟": ["王婕瑜", "婕瑜", "🐟"],
    "統神": ["黃丰嘉", "丰嘉", "chia", "統神"],
    "夜猫": ["李崇偉", "崇瑋", "夜猫"],
    "土豆": ["楊平", "土豆"],
    "許羊": ["許堃陽", "堃陽", "許羊"],
    "吳佳霓": ["吳佳霓"],
    "ㄇㄒ": ["ㄇㄒ", "蔡孟軒"],
    "辣母羊": ["楊斯丞"],
    "郭映嫻":["郭映嫻"],
    "Cindy Lin":["Cindy Lin", "林欣穎"],
    "UR🍐":["楊子右", "UR🍐"],
}

app.get('/get_count', function (req, res) {
    let count = {};
    for(let c in name_auth){
        count[c] = 0;
    }

    base('2021 Spring').select({
        fields: ["課程名稱", "講師", "教材類型", "備註"],
        view: 'Grid view'
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            if(record.fields['備註'] === 'This 15 Speech' && record.fields['教材類型'] === "Slides") {
                for(let n in name_auth){
                    if(name_auth[n].includes(record.fields['講師'])){
                        count[n] += 1;
                        break;
                    }
                }
            }
        });

        res.jsonp(count);
    });
});

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
