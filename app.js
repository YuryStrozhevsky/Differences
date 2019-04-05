const server = require('koa-static');
const koa = require('koa');
const app = new koa();

app.use(server(__dirname + '/application'));

app.listen(8080);

console.log('listening on port 8080');