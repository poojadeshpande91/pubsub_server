var sys = require('sys'),
    prompt = require('prompt'),
    xmpp = require('node-xmpp'),
    colors = require('colors'),
    events = require('events'),
    nodeXmppClient = require('xmpp-client');

  prompt.start();

var client = new nodeXmppClient.Client({
    jid: "eassie@roidsoftware.com",
    password: "12345678"
  }, function(){});

client.on('online', function() {
    console.log('I m online');
    var pubsubClient = client.pubsub('pubsub.roidsoftware.com');

    prompt.get('nodeName', function(err, result) {
      console.log('  nodeName: ' + result.nodeName);
      pubsubClient.createNodeWithName(result.nodeName, function() {
        console.log('created');
      });
    });

});

// client.on('online', function() {
//     console.log('I m online');
//     var pubsubClient = client.pubsub('pubsub.roidsoftware.com');
//     pubsubClient.createNodeWithoutName(function() {
//       console.log('created');
//   });
// });