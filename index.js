const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('routes.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
  console.log(req);
  next();
});

server.listen(3000, () => {
  console.log('JSON Server is running http://localhost:3000');
});
