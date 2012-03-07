window.BtappAdvertiser = Backbone.Model.extend({
	initialize: function() {
		_.bindAll(this);
		this.DEFAULT_ADVERTISING_INTERVAL = 3000;
		this.interval = null;

		assert(this.get('btapp'), 'BtappAdvertiser requires a btapp attribute');
		//make sure we (will?) have access to btapp/sendappmsg/
		assert(_.any(this.get('btapp').queries, function(query) {
			var matches = query.match(/btapp\/((sendappmsg|\*)\/)?/);
			var complete_match = (query === matches[0]);
			return complete_match;
		}), 'there is no query in the btapp queries that will provide access to \'btapp/sendappmsg/\'');
		//make sure we (will?) have access to btapp/events/
		assert(_.any(this.get('btapp').queries, function(query) {
			var matches = query.match(/btapp\/((events|\*)\/)?((appMessage|\*)\/)?/);
			var complete_match = (query === matches[0]);
			return complete_match;
		}), 'there is no query in the btapp queries that will provide access to \'btapp/events/appMessage/\'');

		if(this.get('btapp').bt.sendappmsg) {
			this.start_advertising();
		}
		if(this.get('btapp').get('events') && this.get('btapp').get('events').get('appMessage')) {
			this.start_listening();
		}
		this.get('btapp').bind('add:bt:sendappmsg', this.start_advertising);
		this.get('btapp').bind('remove:bt:sendappmsg', this.stop_advertising);
		this.get('btapp').bind('add:events', this.start_listening);
	},
	start_listening: function() {
		assert(this.get('btapp').get('events'));
		this.get('btapp').get('events').bt.set(function() {}, 'appMessage', this.advertisement_recieved);
	},
	advertisement_recieved: function(message) {
		this.trigger('advertiser:receive', JSON.parse(message));
	},
	start_advertising: function() {
		assert(!this.interval);
		assert(this.get('btapp').bt.sendappmsg);
		this.advertise();
		this.interval = setInterval(this.advertise, this.get('interval') || this.DEFAULT_ADVERTISING_INTERVAL);
	},
	stop_advertising: function() {
		assert(this.interval);
		clearInterval(this.interval);
		this.interval = null;
	},
	advertise: function() {
		assert(this.get('btapp').bt.sendappmsg);
		var data = {
			image: jQuery("link[rel='icon']").attr('href'),
			link: jQuery(location).attr('href'),
			title: jQuery(document).attr('title')
		};
		//give the listener a chance to fiddle with the data before sending.
		this.trigger('advertiser:send', data);
		this.get('btapp').bt.sendappmsg(function() {}, JSON.stringify(data));
	}
});