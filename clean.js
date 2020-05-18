/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
require('dotenv-safe').config();
const fs = require('fs');
const initMongo = require('./config/mongo');

const modelsPath = './app/models';
const { removeExtensionFromFile } = require('./app/middleware/utils');

initMongo();

// Loop models path and loads every file as a model except index file
const models = fs.readdirSync(modelsPath).filter((file) => removeExtensionFromFile(file) !== 'index');

const deleteModelFromDB = (model) => new Promise((resolve, reject) => {
  const modelBody = require(`./app/models/${model}`);
  modelBody.deleteMany({}, (err, row) => {
    if (err) {
      reject(err);
    } else {
      resolve(row);
    }
  });
});

const clean = async () => {
  try {
    const promiseArray = models.map(async (model) => await deleteModelFromDB(model));
    await Promise.all(promiseArray);
    console.log('Cleanup complete!');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

clean();
