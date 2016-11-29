

angular.module('livecode').controller('MarketController', function($scope, $routeParams, Market, Auth, AuthWaitForLogged) {
	if (AuthWaitForLogged == null) {
		// nobody is logged in
		$scope.isLoggedIn = false;
	}
	else {
		// somebody is logged in
		$scope.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);
		$scope.welcomeMessage = "Hey "+$scope.currentUser.display_name;
	}
	
	console.log($routeParams.commodity_id);
	$scope.market=Market.getMarket($routeParams.commodity_id);
	$scope.bids=Market.getBids($routeParams.commodity_id);
	$scope.offers=Market.getOffers($routeParams.commodity_id);

	
	$scope.addListing = function() {
		$("#addListingModal").modal('show');

	};

	$scope.addNewListing = function(newListing) {
		console.log ("add new listing triggered");
		newListing.userid=AuthWaitForLogged.uid;
		if (newListing.type=="buy") {
			Market.addBid(newListing, $routeParams.commodity_id);
		}
		else if (newListing.type=="sell") {
		Market.addOffer(newListing, $routeParams.commodity_id);
		}
		else {
			alert("please enter whether you're buying or selling")
		}

	};
	$scope.sorterFunc = function(item){
   	return parseInt(item.price);
};


});

