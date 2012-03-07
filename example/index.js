jQuery(function() {
	var btapp = new Btapp;
	btapp.connect({'queries':'btapp/'});
	var advertiser = new BtappAdvertiser({
		btapp: btapp
	});
	advertiser.bind('all', _.bind(console.log, console));
});