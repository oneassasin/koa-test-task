import config from './config';
import * as conditional from 'koa-conditional-get';
import * as etag from 'koa-etag';
import * as Koa from 'koa';
import * as debug from 'debug';
import {createContainer} from 'awilix'
import {loadControllers, scopePerRequest} from 'awilix-koa'

const log = debug('test:app');

const app = new Koa();
const container = createContainer();

container.loadModules(
    [
        ['services/*.js', Lifetime.SCOPED],
    ],
    {
        formatName: 'camelCase'
    }
);

app.use(conditional());
app.use(etag());

app.use(scopePerRequest(container));
app.use(loadControllers('routes/*.js', {cwd: __dirname}));

app.on('error', (err, ctx) => {
    log('Error', err);
    ctx.throw(500, 'Internal server error');
});

app.listen(config.PORT);
