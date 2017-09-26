import {
	simpleTemplate
} from '../modules';
import indexView from '../views';

async function Index(cx,next){
	cx.type='text/html';

	const htm=simpleTemplate(indexView);
	cx.response.body=htm;
}

const pageRoutes = {
	'/':Index,
	// just a default route type
	__setDefaultType__:'get'
}

export default pageRoutes;


