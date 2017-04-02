import Koa from 'koa';
import http from 'https';
import mongo from 'koa-mongo';
import favicon from 'koa-favicon';
import KoaRouter from 'koa-router';
import convert from 'koa-convert'
import catchError from 'koa-onerror'
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import staticCache from 'koa-static-cache';
import reqInfo from './mids/reqInfo';
import htmlMinify from './mids/html-minify';
import routes from './routes';
import conf from './conf';
// import open from 'open';

const app=new Koa();
/*
* https
* https.createServer({
*	key:fs.readFileSync('key.pem', 'utf8'),
* 	cert:fs.readFileSync('crt.pem', 'utf8')
* },app.callback()).listen(conf.port||443);
*/


const router=KoaRouter();

//catch error 500
//options:redirect
catchError(app);
//small logger
app.use(reqInfo);
//parse post
app.use(bodyParser());
//compresion
app.use(compress());
//html-minify
app.use(htmlMinify({collapseWhitespace:true}));
//favicon.ico
app.use(convert(favicon(`${conf.staticDir}/favicon.ico`)));
//static files
app.use(convert(staticCache(`${conf.staticDir}`,{gzip:true})));

/* link mongo to cx
*  app.use(mongo(conf.mongoOption));
*/

//routes
routes(router);
app.use(router.routes());

app.listen(conf.port);

console.log(`a koa app is started at ${conf.port} port...`);
// open(`http://localhost:${conf.port}`);
