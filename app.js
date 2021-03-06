/**
 * Created by deepak on 31/05/15.
 */

var express = require('express'),
    _ = require('underscore'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/MEAN_App',
    port = 3000,
    _db,
    ObjectId = require('mongodb').ObjectID,
    path = require('path');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.use('/js', express.static(__dirname));

mongoClient.connect(url, function(err, db) {
    if(err) {
        console.log('error in connecting to mongoDB ', err);
    } else {
        _db = db;
        console.log('connected to mongoDB');
        app.listen(port, function() {
            console.log('listening for requests on localhost:%s', port);
        });
    }
});

app.use(bodyParser.json());

app.get('/users', function(req, res) {
    var users = _db.collection('users');
    users.find({}).toArray(function (err, users) {
        if(err) {
            console.log('error in fetching users ', err);
        } else {
            res.send(users);
        }
    });
});


app.get('/users/:userId', function(req, res) {
    var userId = req.params.userId;
    var users = _db.collection('users');
    users.find({"_id": new ObjectId(userId)}).toArray(function(err, user) {
        res.send(user);
    });
});


app.post('/users', function(req, res) {
    var user = req.body;
    var users = _db.collection('users');
    users.save(user, function(err, users) {
        res.json(users);
    });
});


app.put('/users/:userId', function(req, res) {
    var userId = req.params.userId,
        newName = req.body.name;
    var users = _db.collection('users');
    users.updateOne({"_id": new ObjectId(userId)}, { 'name' : newName }, function (err, user) {
        res.send(user);
    })
});


app.delete('/users/:userId', function(req, res) {
    var userId = req.params.userId;
    var users = _db.collection('users');
    users.removeOne({"_id": new ObjectId(userId)}, function (err, user) {
        res.send(user);
    });
});