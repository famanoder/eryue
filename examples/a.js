let obj={
	'/users': async cx => cx.body='users list',
	'us/er': {
		'/list/': async cx => cx.body='user list 1',
		'order/': async cx => cx.body='user orders'
	},
	'/order/': {
		'list': {
			'use/rdetail': async cx => cx.body='user order detail' ,
			'names': 'asdddddd'
		},
		'account': {
			'list': async cx => cx.body='order account list',
			'detail': async cx => cx.body='order account detail'
		}
	} 
};
let routes = {};
var path = require('path');
function mapRoutesConf(conf, parentKey) {
	let routesConf = Object.keys(conf);
	routesConf.forEach(rf => {
		let routeHandle = conf[rf];
		let key = path.join(parentKey || '', rf);
		if(typeof routeHandle === 'function') {
			routes[key] = routeHandle;
		}else if(typeof routeHandle === 'object') {
			mapRoutesConf(routeHandle, key);
		}
	})
};
mapRoutesConf(obj);
console.log(routes);