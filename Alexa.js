var request = require('request');

exports.handler = (event, context) => {

    try {

        if (event.session.new) {
            // New Session
            console.log("NEW SESSION");
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // Launch Request
                console.log(`LAUNCH REQUEST`);
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Welcome to robot. Who's Pills do you need", true),
                        {}
                    )
                );
                break;

            case "IntentRequest":
                // Intent Request
                console.log(`INTENT REQUEST`);
                var url = 'http://54.152.44.131:3000/getpill'
                console.log("Send to "+ url);
                switch(event.request.intent.name) {
                    case "GetBobsPills":
                        var bobsUrl = url + '?pill=b'
                        console.log("Send to "+ bobsUrl);
                        request({url:bobsUrl}, function(err, res, body) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log(res.statusCode)
                        });
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Dispensing Bobs Pills`, true),
                                {}
                            )
                        );
                        break;

                    case "GetJohnsPills":
                        var johnsUrl = url + '?pill=a'
                        console.log("Send to "+ johnsUrl);
                        request({url:johnsUrl}, function(err, res, body) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log(res.statusCode)
                        });
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Dispensing Johns Pills`, true),
                                {}
                            )
                        );
                        break;

                    default:
                        throw "Invalid intent";
                }

                break;

            case "SessionEndedRequest":
                // Session Ended Request
                console.log(`SESSION ENDED REQUEST`);
                break;

            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);

        }

    } catch(error) { context.fail(`Exception: ${error}`) }

};

// Helpers
var buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    };

};

var generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };

};
