var express = require('express'),
    config = require('./server/configure');

app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

// create http server to listen for connections
// app.get('/', (req, res) => {
//     res.send('Hello world');
// });
var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});