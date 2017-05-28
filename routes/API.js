
async function Login(cx,next){
	cx.response.body='login';
}
async function Logout(cx,next){
	cx.response.body='logout';
}
async function getUserInfo(cx,next){
	cx.response.body=cx.params.userId;
}

const APIs = {
	'/api/user/login':{
		type:'get',
		handle:Login
	},
	'/api/user/logout':Logout,
	'/api/user/:userId':getUserInfo,
	// just a default route type
	__setDefaultType__:'post'
}

export default APIs;
