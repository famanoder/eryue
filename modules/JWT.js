import jwt from 'jsonwebtoken';
import config from '../conf';

async function JWT(){
	let { support, secret, expire } = config.JWT;
	let cx = this.context;
	if (support) {
		cx.jwt = {
			sign(data, opts) {
				return new Promise((resolve, reject) => {
					let token = null;
					try {
						token = jwt.sign(data, secret, Object.assign({
							expiresIn: expire
						}, opts));
						resolve(token);
					} catch(e) {
						console.log(e);
						reject(e.message);
					}
				});
			},
			verify(token){
				try{
					return jwt.verify(token, secret);
				} catch(e) {
					console.log(e)
					return e.message;
				}
			}
		}
	};
}

export default JWT;