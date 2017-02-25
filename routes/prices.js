var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/invzy');

//TODO:  Update all methods below, and test they work
//TODO:  Implement forms and views to support methods below

//loading the list of prices
router.get('/', function(req, res) {
    var collection = db.get('prices');
    collection.find({}, function(err, prices){
        if (err) throw err;
      	res.json(prices);
    });
});

//saving(creating) a new price
router.post('/', function(req, res){
	console.log("saving new price");
    var collection = db.get('prices');
    collection.insert({
        instrument: req.body.instrument_id,
        date: req.body.date,
        price: req.body.price
    }, function(err, price){
        if (err) throw err;

        res.json(price);
    });
});

//Getting an individual price
router.get('/:id', function(req, res) {
    var collection = db.get('prices');
    collection.findOne({ _id: req.params.id }, function(err, price){
        if (err) throw err;

      	res.json(price);
    });
});

//Getting prices for a particular instrument
router.get('/instrument', function(req, res) {
    var collection = db.get('prices');
    collection.findMany({ instrument: req.params.id  }, function(err, price){
        if (err) throw err;

        res.json(price);
    });
});

//Getting prices for a particular date
router.get('/date', function(req, res) {
    var collection = db.get('prices');
    collection.find({ date: {$gt: req.params.date, $lt: req.params.date-1} }, function(err, price){
        if (err) throw err;

        res.json(price);
    });
});

//Saving (updating) an individual price
router.put('/:id', function(req, res){
    var collection = db.get('prices');
    collection.update({
        _id: req.params.id
    },
    {
        instrument: req.body.instrument_id,
        date: req.body.date,
        price: req.body.price
    }, function(err, price){
        if (err) throw err;

        res.json(price);
    });
});

//Deleting) an individual price
router.delete('/:id', function(req, res){
	console.log("get's to delete endpoint?  Or not?");
    var collection = db.get('prices');
    collection.remove({
        _id: req.params.id
    }, function(err, price){
        if (err) throw err;

        res.json(price);
    });
});

module.exports = router;