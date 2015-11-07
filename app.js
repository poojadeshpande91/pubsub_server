var sys = require('sys'),
    prompt = require('prompt'),
    xmpp = require('node-xmpp'),
    colors = require('colors'),
    events = require('events'),
    parseString = require('xml2js').parseString;
    nodeXmppClient = require('xmpp-client');

prompt.start();

var choice; 

var client = new nodeXmppClient.Client({
    jid: "eassie@roidsoftware.com",
    password: "12345678"
  }, function(){});


console.log('Create Node with Name - 1');
console.log('Create Node without Name - 2');
console.log('Discover all Nodes - 3');
console.log('Delete Node - 4');
console.log('Publish to a Node - 5');
console.log('Subscribe to a Node - 6');
console.log('Enter Appropiate Choice');


var pubsubClient = client.pubsub('pubsub.roidsoftware.com');

prompt.get('choice', function(err, result) {
  switch(parseInt(result.choice)) {
    case 1:
      prompt.get('nodeName', function(err, result) {
        console.log('nodeName: ' + result.nodeName);
        pubsubClient.createNodeWithName(result.nodeName, function() {
          console.log('Node Created');
        });
      });
    break;

    case 2:
      pubsubClient.createNodeWithoutName(function() {
        console.log('Node Created');
      });
    break;

    case 3:
      pubsubClient.discoNodes(function(){
        console.log('discovery nodes callback');
      });
    break;

    case 4:
      prompt.get('nodeName', function(err, result) {
        console.log('nodeName: ' + result.nodeName);
        pubsubClient.deleteNode(result.nodeName, function() {
          console.log('Node Deleted');
        });
      });
    break;

    case 5:
      var node,
          content;

      prompt.get(['node', 'content'], function(err, result) {
        node = result.node;
        // content = result.content
        pubsubClient.publish(result.node, result.content);
      });
    break;

    case 6:
      var node;
      prompt.get('nodeName', function(err, result) {
        pubsubClient.subscribe(result.nodeName, function (pubsub, event, stanza) {
          console.log(stanza.toString());
        }, function (subscription, subscriptionId) {
          console.log("Status: " + subscription);
          console.log("Subscribed to " + subscriptionId);
        });
      });
    break;
    default:
      console.log('Wrong choice or input');
    break;
  }
});