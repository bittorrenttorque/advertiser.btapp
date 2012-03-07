<link rel="icon" href="docs/images/favicon.ico">

<img id="logo" src="http://www.pwmckenna.com/img/bittorrent_medium.png" />

# Advertiser.btapp.js

This provides an easy way for two sites to communicate with each other via Torque. Most importantly the toolbar is listening using the same functionality and will add a docked icon that launches your app if you send it a message.  
  
Simply listen for the two events.

__advertiser:send__  
Is passed an object with *image*, *link*, and *title* fields that you can fiddle with before the message is actually sent. By default they point to your site's icon, url, and title.

__advertiser:receive__  
Is passed an object that was sent via Torque. You will (should?) receive your own messages. Keep in mind that other apps can send any information that they choose, so don't make any assumptions about what will exist.  
  

### Creating torrents
<div class="run" title="Run"></div>
```javascript
btapp.bt.browseforfiles(function () {}, function(files) {
	_.each(files, function(value, key) {
			btapp.bt.create(
				function(ret) {
					alert('called create for ' + value);
				}, 
				'', 
				[value], 
				function(hash) {
					alert('torrent created for ' + value);
				}
			);
	});
});
```



#### Example
To connect to the plugin client on your local machine...  
```javascript  
btapp = new Btapp;  
```  
// You need to create the advertiser after connecting, as it will assert if your connect call's query filter doesn't include what the advertiser needs.  
// If you decide to get fancy with your queries to reduce the data being transferred from the client, make sure your query strings looks something like the following...  
// ['btapp/sendappmsg/', 'btapp/events/appMessage/']  ... the default of ['btapp/'] will also work of course.  
```javascript  
btapp.connect({  
	queries: ['btapp/sendappmsg/', 'btapp/events/appMessage/']  
});  
  
advertiser = new BtappAdvertiser({  
	btapp: btapp  
});  
  
advertiser.bind('all', _.bind(console.log, console));  
```

//The last line should just spit out the two messages as they happen. Feel free to provide an *interval* attribute to dictate how often messages are sent. The default is every three seconds.
