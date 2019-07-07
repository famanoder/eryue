import compose from 'koa-compose';
import injector from '@eryue/injector';
import routerMapping from '@eryue/koa-router-mapping';
import {getArgType, getArgsFromFunc} from '@eryue/utils';
import {BODY, ERYUE_CONTEXT} from './context-names';

const router = new routerMapping({rebindHandles});

export function rebindHandles(handles) {
  if(getArgType(handles).isFunction) {
    handles = [handles];
  }

  const newHandles = handles.map(handle => {
    return async (cx, next) => {
      const [eryueContext] = injector.resolve(ERYUE_CONTEXT);
      const beInjected = {
        ...{
          next,
          context: cx
        }, 
        ...eryueContext
      }
      const injectedArgs = getArgsFromFunc(handle);
      if(injectedArgs.length) {
        const injected = injectedArgs.map(arg => {
          return arg.startsWith('$')? beInjected[arg.slice(1)]: undefined;
        });
        await handle.apply(cx, injected);
      }
      
      const [$body] = injector.resolve(BODY);
      if($body) {
        const {status, body} = $body;
        cx.status = status;
        cx.body = body;
      }else{
        //
      }
    }
  });
  return compose(newHandles);
}

export default router;
export async function loadRoutes(cx, next) {
  const useRoutes = router.mapRoutes();
  await useRoutes.apply(cx, arguments);
}