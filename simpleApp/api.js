var EventEmitter = require("events").EventEmitter;
var https = require("https");
var http = require("http");
var util = require("util");

/**
 * An EventEmitter to get D&D Api Call.
 * @param type
 * @param value
 * @constructor
 */
function ApiCall(type, value) {
    value = value.replace(" ", "+");

    EventEmitter.call(this);

    callEmitter = this;

    //Connect to the API URL (http://dnd5eapi.co/api/spells/?)
    var request = http.get("http://www.dnd5eapi.co/api/spells/?" + type + "=" + value, function (response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            callEmitter.emit("error", new Error("There was an error getting the search for " + type + ": " + value + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
            callEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if (response.statusCode === 200) {
                try {
                    //Parse the data
                    var call = JSON.parse(body);
                    callEmitter.emit("end", call);
                } catch (error) {
                    callEmitter.emit("error", error);
                }
            }
        }).on("error", function (error) {
            callEmitter.emit("error", error);
        });
    });
}

util.inherits(ApiCall, EventEmitter);

module.exports = ApiCall;