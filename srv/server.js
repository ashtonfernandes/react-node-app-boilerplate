const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var compression = require('compression');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = process.cwd() + '/public';

app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use((req, res, next) => {
        if (req.secure) next();
        else res.redirect(`https://${req.headers.host}${req.url}`);
    });
}

var HandlerModule = require('./handler/handler');
var serverAPI = require('../srv/routes/api');

let handler = new HandlerModule();
app.use('/api', serverAPI(handler));

app.use(express.static(PUBLIC_DIR));
app.get('/*', (req, res) => {
    res.sendFile(path.join(`${PUBLIC_DIR}`, `/index.html`), (err) => {
        if (err) {
            console.log('err', err);
          res.status(500).send(err)
        }
    })
})

var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at port:' + port);
});
