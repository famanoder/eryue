export default success => function(status, result, option = {}) {
  const arg = arguments;
  if(!arg.length) {
    status = 200;
    result = null;
  }

  if(arg.length === 1) {
    if(typeof status === 'number') {
      result = null;
    }else{
      result = status;
      status = 200;
    }
  }

  if(result && typeof result === 'string') {
    result = {
      message: result
    }
  }

  this.status = status;
  this.body = {
    success,
    result,
    ...option
  }

}
  // }
    
  // Array.apply(null, {length: 2}).forEach((k, i) => {
  //   const flag = !!i;
  //   Object.defineProperty(cx, (flag? 'success': 'failed'), {
  //     value: function() {
  //       _resBody(flag).apply(this, arguments);
  //     }
  //   });
  // });
// }