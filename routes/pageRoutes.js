import {
	simpleTemplate
} from '../modules';
import indexView from '../views';

async function Index(cx,next){
	cx.type='text/html';

	const features=[
		'this is a simple template, and you can replace with what you like !',
		'with HTTPS easily !',
		"you can manage your site's routes easily !",
		'write restful API with JWT safety !',
		'use mongoDB easily !',
		'no longer callback hell !'
	];
	const htm=simpleTemplate(indexView,{
		title:'welcome to my site !',
		welcome:'Hello,Koa2 !',
		features(){
			return features.map((f,i)=>{
				return `<p>${i+1}. ${f}</p>`;
			}).join('');
		},
		email:'915905174@qq.com'
	});
	cx.response.body=htm;
}

const pageRoutes = {
	'/':Index,
	// just a default route type
	__setDefaultType__:'get'
}

export default pageRoutes;


