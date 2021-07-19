const Alexa = require("ask-sdk-core");
const welcomeResponses = require("../responses/welcome");
const util = require("../utilities/util");

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) ===
            "LaunchRequest"
        );
    },
    handle(handlerInput) {
        const responseMsg = util.formatSpecialCaracters(
            welcomeResponses.LAUNCH_MSG()
        );
        const speakOutput = responseMsg;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) ===
                "IntentRequest" &&
            Alexa.getIntentName(handlerInput.requestEnvelope) ===
                "HelloWorldIntent"
        );
    },
    handle(handlerInput) {
        const speakOutput = welcomeResponses.HELLO_WORLD_MSG();

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(
                "add a reprompt if you want to keep the session open for the user to respond"
            )
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) ===
                "IntentRequest" &&
            (Alexa.getIntentName(handlerInput.requestEnvelope) ===
                "AMAZON.CancelIntent" ||
                Alexa.getIntentName(handlerInput.requestEnvelope) ===
                    "AMAZON.StopIntent")
        );
    },
    handle(handlerInput) {
        const speakOutput = "Goodbye!";

        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) ===
            "SessionEndedRequest"
        );
    },
    handle(handlerInput) {
        console.log(
            `~~~~ Session ended: ${JSON.stringify(
                handlerInput.requestEnvelope
            )}`
        );
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    },
};

module.exports = {
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    SessionEndedRequestHandler,
    CancelAndStopIntentHandler,
};
