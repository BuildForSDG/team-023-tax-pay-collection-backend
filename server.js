const http = require('http');
const app = require('./src/app');

const port = process.env.PORT || 1234;

app.set(port);
const server = http.createServer(app);

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`App running on ${port}!`));
