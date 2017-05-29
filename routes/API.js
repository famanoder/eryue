import uploadFiles from '../mids/uploadFiles';

async function Login(cx,next){
	let token=cx.jwt.sign({name:'hufeng',age:24});
	cx.response.body={
		success:true,
		result:token
	};
}
async function getUserInfo(cx,next){
	let payload = cx.jwt.verify();
	// let userInfo = await cx.linkDbCollection('users').find({userId:'123abc'}).toArray()[0];
	cx.response.body=payload;
}

const APIs = {
	'/api/user/login':{
		type:'get',
		handle:Login
	},
	'/api/user/:userId':getUserInfo,
	'/action':uploadFiles,
	// just a default route type
	__setDefaultType__:'post'
}

export default APIs;
