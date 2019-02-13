var express = require('express');
const Fortnite = require('fortnite-api');
var path = require('path')
var cors = require('cors')
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static( __dirname + '/public/dist' ));

let fortniteAPI = new Fortnite(
    [
        "dansk1731@gmail.com",
        "justforapi111",
        "MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=",
        "ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ="
    ],
    {
        debug: true
    }
);

app.post('/api/info', function (req, res) {
    app.player = req.body.player;
    app.platform = req.body.platform;
    res.json({player: app.player, platform: app.platform})
});

app.get('/api/stats', function(req, res, next) {
    request({
      url: 'https://api.fortnitetracker.com/v1/profile/'+app.platform+'/'+app.player,
      headers: {'TRN-Api-Key': 'c7f953e4-8b85-4ac0-a56b-c2a9c61b5a88'}
    }).pipe(res);
});

app.get('/api/news', function(req, res) {
    fortniteAPI.login().then(() => {
        fortniteAPI
            .getFortniteNews("en")
            .then(news => {
                res.json(news);
            })
            .catch(err => {
                res.json(err);
            });
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

app.listen(8000, () => {
    console.log('Server listening on port 8000...');
});
