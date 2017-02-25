var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/invzy');

//TODO:  Update all methods below, and test they work
//TODO:  Implement forms and views to support methods below

//loading the list of portfolios
router.get('/', function(req, res) {
    var collection = db.get('portfolios');
    collection.find({}, function(err, portfolios){
        if (err) throw err;
      	res.json(portfolios);
    });
});

//saving(creating) a new portfolio
router.post('/', function(req, res){
	console.log("saving new portfolio");
    var collection = db.get('portfolios');
    collection.insert({
        name: req.body.name,
        instruments: []
    }, function(err, portfolio){
        if (err) throw err;

        res.json(portfolio);
    });
});

//Getting an individual portfolio
router.get('/:id', function(req, res) {
    var collection = db.get('portfolios');
    collection.findOne({ _id: req.params.id }, function(err, portfolio){
        if (err) throw err;

      	res.json(portfolio);
    });
});

//Saving (updating) an individual portfolio
router.put('/:id', function(req, res){
    var collection = db.get('portfolios');
    collection.update({
        _id: req.params.id
    },
    {
        name: req.body.name,
        instruments: []
    }, function(err, portfolio){
        if (err) throw err;

        res.json(portfolio);
    });
});

//Deleting) an individual portfolio
router.delete('/:id', function(req, res){
	console.log("get's to delete endpoint?  Or not?");
    var collection = db.get('portfolios');
    collection.remove({
        _id: req.params.id
    }, function(err, portfolio){
        if (err) throw err;

        res.json(portfolio);
    });
});

module.exports = router;