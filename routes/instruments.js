var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/invzy');

//loading the list of instruments
router.get('/', function(req, res) {
    var collection = db.get('instruments');
    collection.find({}, function(err, instruments){
        if (err) throw err;
      	res.json(instruments);
    });
});

//saving(creating) a new instrument
router.post('/', function(req, res){
	console.log("saving new instrument");
    var collection = db.get('instruments');
    collection.insert({
        ticker: req.body.ticker,
        name: req.body.name
    }, function(err, instrument){
        if (err) throw err;

        res.json(instrument);
    });
});

//Getting an individual instrument
router.get('/:id', function(req, res) {
    var collection = db.get('instruments');
    collection.findOne({ _id: req.params.id }, function(err, instrument){
        if (err) throw err;

      	res.json(instrument);
    });
});

//Saving (updating) an individual instrument
router.put('/:id', function(req, res){
    var collection = db.get('instruments');
    collection.update({
        _id: req.params.id
    },
    {
        ticker: req.body.ticker,
        name: req.body.name
    }, function(err, instrument){
        if (err) throw err;

        res.json(instrument);
    });
});

//Deleting) an individual instrument
router.delete('/:id', function(req, res){
	console.log("get's to delete endpoint?  Or not?");
    var collection = db.get('instruments');
    collection.remove({
        _id: req.params.id
    }, function(err, instrument){
        if (err) throw err;

        res.json(instrument);
    });
});

module.exports = router;