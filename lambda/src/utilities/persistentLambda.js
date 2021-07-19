require("dotenv").config();

const ddbAdapter = require("ask-sdk-dynamodb-persistence-adapter");

function getPersistenceAdapter() {
  return new ddbAdapter.DynamoDbPersistenceAdapter({
    // eslint-disable-next-line no-undef
    tableName: process.env.DYNAMODB_PERSISTENCE_TABLE_NAME,
  });
}

module.exports = {
  getPersistenceAdapter,
};
