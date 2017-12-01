import colors from 'colors/safe';

export default async function(ctx, next){
	let t = Date.now();
	await next();
	let status = ctx.response.status,
		ms = Date.now()-t;
	console.log([
		colors.blue(ctx.request.method),
		ctx.request.url,
		status==200?colors.green(status):colors.yellow(status),
		ms>=1000?colors.red(`${ms}ms`):`${ms}ms`
	].join(' '));
}