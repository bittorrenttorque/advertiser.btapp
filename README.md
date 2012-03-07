<link rel="icon" href="docs/images/favicon.ico">

<img id="logo" src="http://www.pwmckenna.com/img/bittorrent_medium.png" />

# Advertiser.btapp.js

This provides an easy way for two sites to communicate with each other via Torque. Most importantly the toolbar is listening using the same functionality and will add a docked icon that launches your app if you send it a message.  
  
Simply listen for the two events.

__advertiser:send__  
Is passed an object with *image*, *link*, and *title* fields that you can fiddle with before the message is actually sent. By default they point to your site's icon, url, and title.

__advertiser:receive__  
Is passed an object that was sent via Torque. You will (should?) receive your own messages. Keep in mind that other apps can send any information that they choose, so don't make any assumptions about what will exist.  
  

### Usage:
```javascript
btapp = new Btapp;  
btapp.connect({  
	queries: ['btapp/sendappmsg/', 'btapp/events/appMessage/']  
});  
  
advertiser = new BtappAdvertiser({  
	btapp: btapp  
});  
  
advertiser.bind('all', _.bind(console.log, console));  
```
	
You can see this in action [here](http://pwmckenna.github.com/btapp_advertiser/example/index.html "advertiser"), and if you open the link multiple times you'll see the apps messaging each other (you'll see multiple recieve messages for every send).