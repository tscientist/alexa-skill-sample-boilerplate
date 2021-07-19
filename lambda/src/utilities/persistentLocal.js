require("dotenv").config();
const AWS = require("aws-sdk");

const ddbAdapter = require("ask-sdk-dynamodb-persistence-adapter");

var myDynamoDB = new AWS.DynamoDB({
  endpoint: "http://localhost:8000", // If you change the default url, change it here
  // eslint-disable-next-line no-undef
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // eslint-disable-next-line no-undef
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
  apiVersion: "latest",
});

function getPersistenceAdapter() {
  return new ddbAdapter.DynamoDbPersistenceAdapter({
    dynamoDBClient: myDynamoDB,
    tableName: "alexa-self-hosted-dynamodb",
    createTable: true,
  });
}

module.exports = {
  getPersistenceAdapter,
};
