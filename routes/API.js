const {uploadFiles} = require('../mids');

async function Login(cx,next){
	let token=cx.jwt.sign({name:'hufeng',age:24});
	cx.response.body={
		success:true,
		result:token
	};
}
async function getUserInfo(cx,next){
	// let payload = cx.jwt.verify();
	// let userInfo = await cx.linkDbCollection('users').find({}).toArray();
	cx.response.body='userInfo';
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
