import { uploadFiles } from '../../modules';

async function Login(cx, next){
	let token = cx.jwt.sign({name: 'famanoder', age: 24});
	cx.body = {
		success:true,
		result:token
	};
}

const APIs = {
	'/api/user/login': {
		type:'post',
		handle:Login
	},
	'/action': uploadFiles,
	// just a default route type
	__setDefaultType__:'post'
}

export default APIs;
