const Alexa = require("ask-sdk-core");
const yes = require("../responses/yes");

const YesIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) ===
                "IntentRequest" &&
            Alexa.getIntentName(handlerInput.requestEnvelope) ===
                "AMAZON.YesIntent"
        );
    },
    handle(handlerInput) {
        const speakOutput = yes.YES_MSG();

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};

module.exports = {
    YesIntentHandler,
};
