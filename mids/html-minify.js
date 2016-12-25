import minify from 'html-minifier';

export default function(options) {
    return async (cx,next)=>{
      await next();
      if (!cx.response.is('html')) return
      var body = cx.response.body
    console.log(body)
      if (!body) return
      // too lazy to handle streams
      if (typeof body.pipe === 'function') return
      if (Buffer.isBuffer(body)) body = body.toString('utf8')
      else if (typeof body === 'object') return

      cx.response.body = minify.minify(body, options);
    }

    
}