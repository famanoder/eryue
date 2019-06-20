import routerMapping from '@eryue/koa-router-mapping';
import injector from '@eryue/injector';
import {getArgType, getArgsFromFunc} from '@eryue/utils';
import compose from 'koa-compose';
import { BODY } from './context-names';

const router = new routerMapping({rebindHandles});

export function rebindHandles(handles) {
  if(getArgType(handles).isFunction) {
    handles = [handles];
  }

  const newHandles = handles.map(handle => {
    return async (cx, next) => {
      const beInjected = {
        context: cx,
        config: cx.config,
        helper: cx.helper,
        next,
        service: cx.service
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