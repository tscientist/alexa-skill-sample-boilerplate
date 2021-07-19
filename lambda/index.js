/* eslint-disable no-unused-vars */
/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require("ask-sdk-core");
// import util
const service = require("./src/utilities/services");

const persistent = require("./src/utilities/persistentLocal"); // user local
//const persistent = require("./src/utilities/persistentLambda") // use on lambda

// iniciate persistenceAdapter
const persistenceAdapter = persistent.getPersistenceAdapter();
const {
  welcomeIntents,
  helpIntents,
  fallbackIntents,
  yesIntents,
  noIntents,
} = require("./src/intents/index.js");

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const LoadAttributesRequestInterceptor = {
  async process(handlerInput) {
    const persistentAttributes =
      await handlerInput.attributesManager.getPersistentAttributes();

    // Check if user is invoking the skill the first time and initialize preset values
    if (persistentAttributes && !persistenceAdapter.firstAccess) {
      // User first access to skill
      handlerInput.attributesManager.setPersistentAttributes({
        firstAccess: true,
      });
    }
  },
};

// If you disable the skill and reenable it the userId might change and you loose the persistent attributes saved below as userId is the primary key
const SaveAttributesResponseInterceptor = {
  async process(handlerInput, response) {
    await handlerInput.attributesManager.savePersistentAttributes();
  },
};
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Sorry, I had trouble doing what you asked. Please try again.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    welcomeIntents.LaunchRequestHandler,
    welcomeIntents.HelloWorldIntentHandler,
    helpIntents.HelpIntentHandler,
    welcomeIntents.CancelAndStopIntentHandler,
    fallbackIntents.FallbackIntentHandler,
    welcomeIntents.SessionEndedRequestHandler,
    yesIntents.YesIntentHandler,
    noIntents.NoIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LoadAttributesRequestInterceptor)
  .addResponseInterceptors(SaveAttributesResponseInterceptor)
  .withPersistenceAdapter(persistenceAdapter)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();
