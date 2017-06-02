import Redis from 'ioredis';
import poolModule from 'generic-pool';

const defaultOptions = {
	max: 100,
	min: 1,
	timeout: 30000,
	log: false
};

export default function createRedisPool(options) {
  options = options || {};
  if ('string' === typeof options) {
    options = { url: options };
  }
  options = Object.assign(defaultOptions, options);

  let _redisPool = poolModule.createPool({
    name:'koa-redis-pool',
    create(){
    	return new Promise((resolve,reject)=>{
    			let client=null;
		      if (options.url) {
		        client = new Redis(options.url);
		      } else {
		        client = new Redis(options);
		      }
		      client.once('error', (e)=> {
		        console.error(e);
		        reject(e);
		      });

		      client.once('connect', ()=> {
		        resolve(client);
		      });
    	});
      
    },
    destroy:client=> {
      client.end();
    }
  },{
    max : options.max,
    min : options.min, 
    idleTimeoutMillis : options.timeout,
    log : options.log 
  });
 
  return async (cx,next)=> {
    cx.redis = await _redisPool.acquire();
    if (!cx.redis) cx.throw('Fail to acquire one redis connection');

    try {
      await next();
    } catch (e) {
      throw e;
    } finally {
      _redisPool.release(cx.redis);
    }
  };
};