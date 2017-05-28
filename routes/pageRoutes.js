async function Index(cx,next){
	cx.type='text/html';
	cx.response.body=`Hello Koa2 !`;
}

const pageRoutes = {
	'/':Index,
	// just a default route type
	__setDefaultType__:'get'
}

export default pageRoutes;


