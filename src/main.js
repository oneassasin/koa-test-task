require('@babel/register');

const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const Koa = require('koa');
const debug = require('debug');
const {createContainer, asClass} = require('awilix');
const {loadControllers, scopePerRequest} = require('awilix-koa');
const bodyParser = require('koa-bodyparser');

const config = require('./config');
const MySqlService = require('./services/MySqlService');
const BooksService = require('./services/BooksService');

const log = debug('test:app');

const app = new Koa();
const container = createContainer();

app.use(bodyParser());

app.use(conditional());
app.use(etag());

container.register({
    mySqlService: asClass(MySqlService).scoped(),
    booksService: asClass(BooksService).scoped()
});

app.use(scopePerRequest(container));
app.use(loadControllers('routes/*.js', {cwd: __dirname}));

app.on('error', (err, ctx) => {
    log('Error', err);
    ctx.status = 500;
    ctx.body = 'Internal server error';
});

app.listen(config.APP_PORT);

log(`Application was started on port ${config.APP_PORT}`);
