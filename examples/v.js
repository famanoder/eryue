import { startApp, beforeStart, Middlewares, Injector, Router } from '../lib/eryue';

@beforeStart(koaApp => {
	koaApp.context.name = 'haha';
	console.log('a app is ready to start ...');
})
@Middlewares([
	async (cx, next) => {
		let assd= new cx.abc();
		console.log(assd.c);
		cx.getName(cx);
		console.log(cx.name)
		await next();
	}
]) 
@Injector({
	abc: class A{ c=1 },
	getName: async cx => console.log(cx.query)
})
@Router.get('/api', {
	'users': [
		async (cx, next) => {
			cx.body='users list';
			await next();
		},
		async cx => cx.body+=' .....'
	],
	'user': {
		'list': async cx => cx.body='user list 1',
		'order': async cx => cx.body='user orders'
	},
	'order': {
		'list': {
			'userdetail': async cx => cx.body='user order detail' ,
			'names': 'asdddddd'
		},
		'account': {
			'list': async cx => cx.body='order account list',
			'detail': async cx => cx.body='order account detail'
		}
	} 
})
@Router.post({
	'api/user/login': async cx => cx.body='a post request'
})
class App {
	port = 1234
	staticOptions = './static'
	appVersion = '1.0.0'
}


startApp(App, {
	key:'../lets/famanoder.com-key.pem',
	cert:'../lets/famanoder.com-crt.pem'
}).then(port => console.log(`a app started at port: ${port} !`));

