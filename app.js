import Koa from 'koa';
import http from 'https';
import mongo from 'koa-mongo';
import favicon from 'koa-favicon';
import KoaRouter from 'koa-router';
import convert from 'koa-convert';
import catchError from 'koa-onerror';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import staticCache from 'koa-static';

import JWT from './mids/JWT';
import reqInfo from './mids/reqInfo';
import htmlMinify from './mids/html-minify';
import routes from './routes';
import conf from './conf';
// import open from 'open';

const app=new Koa();

const ssl = conf.SSL;
const key = ssl.support?fs.readFileSync(ssl.key):'';
const cert = ssl.support?fs.readFileSync(ssl.cert):'';
const server =  ssl.support
			  ? https.createServer({key,cert},app.callback())
			  : app;

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
// app.use(htmlMinify({collapseWhitespace:true}));
//favicon.ico
app.use(convert(favicon(`${conf.staticDir}/favicon.ico`)));
//static files
app.use(convert(staticCache(`${conf.staticDir}`,{index:false})));

/* 
* link mongo to cx 
*/
// app.use(mongo(conf.mongoOption));

/*
*  link connet db method to cx and return a collection
*/
// app.use(async (cx,next)=>{
// 	cx.linkDbCollection = (col)=>{
// 		return cx.mongo.db(conf.mongoOption.db).collection(col);
// 	}
// 	await next();
// });

// use jwt to protect restful API
// or you can use session and cookie
app.use(JWT);

//routes
app.use(routes(router));

server.listen(conf.port,(err)=>{
	if (err) {
		console.log(err);
	}else{
		console.log(`a koa app is started at ${conf.port} port...`);
	};
});

// open(`http://localhost:${conf.port}`);
