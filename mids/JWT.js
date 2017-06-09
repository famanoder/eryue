import jwt from 'jsonwebtoken';
import config from '../conf';

async function JWT(cx,next){
	let {support,secret,expire} = config.JWT;
	if (support) {
		cx.jwt={
			sign(data,opts){
				let token = null;
				try {
					token = jwt.sign(data,secret,Object.assign({
						expiresIn:expire
					},opts));
				} catch(e) {
					console.log(e);
					return cx.response.body={
						success:false,
						result:e.message
					}
				}
				return token;
			},
			verify(token){
				return jwt.verify(cx.request.query.auth||cx.request.body.auth||cx.headers['auth']||token,secret);
			}
		}
	};
	await next();
}

export default JWT;