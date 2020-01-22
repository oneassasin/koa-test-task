require('@babel/register');

const config = require('./config');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const Koa = require('koa');
const debug = require('debug');
const {createContainer, Lifetime} = require('awilix');
const {loadControllers, scopePerRequest} = require('awilix-koa');
const koaValidator = require('koa-async-validator');
const bodyParser = require('koa-bodyparser');

const log = debug('test:app');

const app = new Koa();
const container = createContainer();

app.use(bodyParser());
app.use(koaValidator());

app.use(conditional());
app.use(etag());

container.loadModules(
    [
        ['services/*.js', Lifetime.SCOPED],
    ],
    {
        formatName: 'camelCase'
    }
);

app.use(scopePerRequest(container));
app.use(loadControllers('routes/*.js', {cwd: __dirname}));

app.on('error', (err, ctx) => {
    log('Error', err);
    ctx.throw(500, 'Internal server error');
});

app.listen(config.APP_PORT);

log(`Application was started on port ${config.APP_PORT}`);
