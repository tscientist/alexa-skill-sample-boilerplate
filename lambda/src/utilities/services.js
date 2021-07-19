const AWS = require("aws-sdk");
require("dotenv").config();

const s3SigV4Client = new AWS.S3({
  signatureVersion: "v4",
});

function getS3PreSignedUrl(s3ObjectKey) {
  const bucketName = process.env.S3_PERSISTENCE_BUCKET;
  const s3PreSignedUrl = s3SigV4Client.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: s3ObjectKey,
    Expires: 60 * 1, // the Expires is capped for 1 minute
  });
  console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
  return s3PreSignedUrl;
}

/* *
  * Essa função verifica e troca todos os caracteres reservados da alexa pelos substitutos equivalentes.
  * A função recebe uma string e retorna uma string formatada para falar mesmo com os caracteres reservados.
  * Observação essa função não deve receber tags ssml, embora não vá quebrar a skill caso receba pode prejudicar
  * a resposta da alexa criando falas sem sentido e assim prejudicando a experiência do usuário.
. * */

module.exports = {
  getS3PreSignedUrl,
};
