angular.module('livecode').factory('Market', function($firebaseArray, $firebaseObject) {
	var marketRef = firebase.database().ref().child("markets");
	var marketListingBuyRef = firebase.database().ref().child("market_listings_buy");
	var marketListingSellRef = firebase.database().ref().child("market_listings_sell");

	var Market = {
		markets: [],

		addNewMarket: function(newMarket) {
			var market={
				commodity:newMarket,
				numberofbids:0,
				numberofoffers:0,
				numberoftransactions:0
			};
			return Market.markets.$add(market);
		},

		getMarkets: function() {
			return Market.markets;
		},

		getMarket: function(market_id) {
			var individualMarketRef = marketRef.child(market_id);
			return $firebaseObject(individualMarketRef);
		},

		saveMarket: function(theMarket) {
			return theMarket.$save();
		},

		addBid: function(newListing, commodity_id) {
			var individualMarketRef = marketListingBuyRef.child(commodity_id);
			var listings= $firebaseArray(individualMarketRef);
			return listings.$add(newListing);
		},
		addOffer: function(newListing, commodity_id) {
			var individualMarketRef = marketListingSellRef.child(commodity_id);
			var listings= $firebaseArray(individualMarketRef);
			return listings.$add(newListing);
		},

		getBids: function(market_id) {
			var individualMarketRef = marketListingBuyRef.child(market_id);
			return $firebaseArray(individualMarketRef);
		},
		
		getOffers: function(market_id) {
			var individualMarketRef = marketListingSellRef.child(market_id);
			return $firebaseArray(individualMarketRef);
		},


	};



	Market.markets = $firebaseArray(marketRef);

	return Market;
});