
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const getTemperaments = require("./src/controllers/getTemperaments.js")

// Syncing all the models at once.

getTemperaments()
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
