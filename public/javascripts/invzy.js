var app = angular.module('Invzy', ['ngResource', 'ngRoute']);

console.log("here");

app.config(['$routeProvider', function($routeProvider){
	console.log("reached app.config in invzy");
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/instruments', {
            templateUrl: 'partials/instruments.html',
            controller: 'HomeCtrl'
        })
        .when('/add-instrument', {
            templateUrl: 'partials/instrument-form.html',
            controller: 'AddinstrumentCtrl'
        })
        .when('/instrument/:id', {
            templateUrl: 'partials/instrument-form.html',
            controller: 'EditinstrumentCtrl'
        })
        .when('/instrument/delete/:id', {
            templateUrl: 'partials/instrument-delete.html',
            controller: 'DeleteinstrumentCtrl'
        })
        .when('/prices', {
            templateUrl: 'partials/prices.html',
            controller: 'PricesHomeCtrl'
        })
        .when('/portfolios', {
            templateUrl: 'partials/portfolios.html',
            controller: 'PortfoliosHomeCtrl'
        })
        .when('/add-portfolio', {
            templateUrl: 'partials/portfolio-form.html',
            controller: 'AddPortfolioCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
    	var instruments = $resource('/api/instruments');
        instruments.query(function(instruments){
            $scope.instruments = instruments;
        });
    }]);

app.controller('AddinstrumentCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
        	console.log("trying to save new instrument");
            var instruments = $resource('/api/instruments');
            instruments.save($scope.instrument, function(){
                $location.path('/');
            });
        };
    }]);

app.controller('EditinstrumentCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){	
        var instruments = $resource('/api/instruments/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        instruments.get({ id: $routeParams.id }, function(instrument){
            $scope.instrument = instrument;
        });

        $scope.save = function(){
        	
            instruments.update($scope.instrument, function(){
            	
                $location.path('/');
            });
        }
    }]);

app.controller('DeleteinstrumentCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){	
        var instruments = $resource('/api/instruments/:id');

        instruments.get({ id: $routeParams.id }, function(instrument){
            $scope.instrument = instrument;
        });

        $scope.delete = function(){
        	console.log("get's to delete, but does nothing?");
        	
            instruments.delete({id: $routeParams.id}, function(instrument){
            	
            	console.log("inside instruments.delete");
                $location.path('/');
            });
        }
    }]);

//Prices Controllers
app.controller('PricesHomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var prices = $resource('/api/prices');
        prices.query(function(prices){
            $scope.prices = prices;
        });
    }]);


//Portfolios Controllers
app.controller('PortfoliosHomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var portfolios = $resource('/api/portfolios');
        portfolios.query(function(portfolios){
            $scope.portfolios = portfolios;
        });
    }]);

app.controller('AddPortfolioCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            console.log("trying to save new portfolio");
            var portfolios = $resource('/api/portfolios');
            portfolios.save($scope.portfolio, function(){
                $location.path('/');
            });
        };
    }]);