var c14n = require('xml-c14n')();
var xmldom = require("xmldom");

module.exports = function(RED) {
    function canonicalising(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var xmlData = msg.payload;
            var canonicaliser = c14n.createCanonicaliser("http://www.w3.org/2001/10/xml-exc-c14n#WithComments");
            var document = (new xmldom.DOMParser()).parseFromString(xmlData);

            canonicaliser.canonicalise(document.documentElement, function(err, res) {
                if (err) {
                   msg.payload = err;
                   node.error(msg);
                }
                msg.payload = res;
                node.send(msg);
            });
            
        });
    }
    RED.nodes.registerType("xmlc14n", canonicalising);
}
