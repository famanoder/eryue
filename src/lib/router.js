import routerMapping from '@eryue/koa-router-mapping';
import {getArgType} from '@eryue/utils';
import compose from 'koa-compose';

const router = new routerMapping({rebindHandles});

export function rebindHandles(handles) {
  if(getArgType(handles).isFunction) {
    handles = [handles];
  }

  const newHandles = handles.map(handle => {
    return async (cx, next) => {
      await handle.call(cx, {
        config: cx.config,
        context: cx,
        next,
        service: cx.service
      });
    }
  });
  return compose(newHandles);
}

export default router;
export async function loadRoutes(cx, next) {
  const useRoutes = router.mapRoutes();
  await useRoutes.apply(cx, arguments);
}