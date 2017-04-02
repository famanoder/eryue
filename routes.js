
export default function(router){
	
	router.get('/',async (cx,next)=>{
		cx.type='text/html';
		cx.response.body=`Hello Koa2 !`;
	});

	router.post('/action',async (cx,next)=>{
		console.log(cx.request.body);
		var d='';
		cx.req.on('data',(ck)=>{
			d+=ck;
		});
		cx.req.on('end',()=>{
			console.log(d)
		});
		cx.response.body='posted';
	});

	// not defined router redirect to 404
	['get','post','put','del'].forEach((m)=>{
		router[m]('*',async (cx,next)=>{
			await next();
			cx.response.redirect('/404.html');
		});
	});
	
}
