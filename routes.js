import {ObjectID} from 'BSON';
export default function(router){
	let tpl=`
		<form method="POST" action="/action/fsfcf" enctype="multipart/form-data">
			<input type="file" value="" name="user">	
			<p><input type="submit" value="Submit"></p>
		</form>
		<form method="POST" action="/action" enctype="multipart/form-data">
			<input type="file" value="" name="user">	
			<p><input type="submit" value="Submit"></p>
		</form>
	`;

	router.get('/',async (cx,next)=>{
		let doc=await cx.mongo.db('myBlog').collection('articals').find(_id:ObjectID('aecae8a3a3ceaf0a1')).toArray();
		cx.type='text/html';
		console.log(doc[0].content);
		cx.response.body=`Hello Koa2 !`;
	});
	router.get('/:name',async (ctx,next)=>{
		ctx.type='text/html';
		ctx.response.body=tpl;
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
