var sys = require('sys'), 
    xmpp = require('node-xmpp'),
    colors = require('colors'),
    events = require('events'),
    nodeXmppClient = require('node-xmpp-client');

var client = new nodeXmppClient.Client({
    jid: "eassie@roidsoftware.com",
    password: "12345678"
  }, function() {
    console.log('client created');    
  });

client.on('online', function() {
    console.log('I m online');
    var pubsubClient = client.pubsub('pubsub.roidsoftware.com');
    pubsubClient.createNodeWithName("node27", function() {
      console.log('created');
  });
});

// client.on('online', function() {
//     console.log('I m online');
//     var pubsubClient = client.pubsub('pubsub.roidsoftware.com');
//     pubsubClient.createNodeWithoutName(function() {
//       console.log('created');
//   });
// });