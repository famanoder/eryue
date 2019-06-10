import routerMapping from '@eryue/koa-router-mapping';

const router = new routerMapping();

export default router;
export async function loadRoutes(cx, next) {
  const useRoutes = router.mapRoutes();
  await useRoutes.apply(cx, arguments);
}