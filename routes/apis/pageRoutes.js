import { simpleTemplate } from '../../modules';
import indexView from '../../views';

async function Index(cx,next){
	const features=[
		'could use HTTPS',
		'support restful API',
		'could use mongoDB',
		'could use redisPool',
		'support upload with formidable',
		'a safety jsonp supported',
		'a very simple view'
	];
	const htm = simpleTemplate(indexView, {
		title:'welcome to my site !',
		welcome:'Hello, Koa2 !',
		features() {
			return features.map((f,i)=>{
				return `<p>${i+1}. ${f}</p>`;
			}).join('');
		},
		email:'915905174@qq.com'
	});
	cx.body+= htm;
}
async function preIndex(cx, next){
	cx.type='text/html';
	// cx.set('content-type','application/json; charset=utf-8');
	cx.body='something...';
	next();
}
const pageRoutes = {
	'/': [preIndex, Index],
	// '/test_jsonp': async function(cx, next){
	// 	cx.jsonp({
	// 		name:'hufeng',
	// 		age:'24'
	// 	});
	// },
	// just a default route type
	__setDefaultType__: 'get'
}

export default pageRoutes;


