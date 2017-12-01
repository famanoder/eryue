import Koa from 'koa';
import https from 'https';
import mongo from 'koa-mongo';
import favicon from 'koa-favicon';
import KoaRouter from 'koa-router';
import convert from 'koa-convert';
import catchError from 'koa-onerror';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import staticCache from 'koa-static';

import { hasStaticDir, JWT } from './modules';
import { reqInfo } from './middleware';

import routes from './routes';
import conf from './conf';

const debug = require('debug')('koa2-base: app');

const {
	SSL,
	staticDir,
	mongoOption,
	port
} = conf;

// import open from 'open';

const app = new Koa();

const key = SSL.support? fs.readFileSync(SSL.key):'';
const cert = SSL.support? fs.readFileSync(SSL.cert):'';
const server =  SSL.support
			  ? https.createServer({key, cert}, app.callback())
			  : app;

const router = KoaRouter();

//catch error 500
//options:redirect
catchError(app);
// hasStaticDir
hasStaticDir([staticDir,conf.upload.uploadedDir]);
// use jwt
// or you can use session and cookie
JWT.call(app);
//small logger
app.use(reqInfo);
//parse post
app.use(bodyParser());
//compresion
app.use(compress());
//favicon.ico
app.use(convert(favicon(`${staticDir}/favicon.ico`)));
//static files
app.use(convert(staticCache(`${staticDir}`)));

/* 
* link mongo to cx 
*/
// app.use(mongo(mongoOption));

/*
*  link connet db method to cx and return a collection
*/
// app.use(async (cx,next)=>{
// 	cx.linkDbCollection = (col)=>{
// 		return cx.mongo.db(mongoOption.db).collection(col);
// 	}
// 	await next();
// });

//routes
app.use(routes(router));

server.listen(port, err => {
	if (err) {
		debug(err);
	} else {
		debug(`a koa app is started at %d port...`, port);
	};
});
// open(`http://localhost:${port}`);
