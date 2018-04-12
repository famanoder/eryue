declare class App {}
type DecoratorFunc = (target: object) => any

export function beforeStart(callback: Promise<void>): DecoratorFunc
export function Middlewares(middlewares: Array<(cx: any, next: any) => Promise<void>>): DecoratorFunc
export function Injector(obj: object): DecoratorFunc
export module Router {
  export function get(param: string | object, conf?: object): DecoratorFunc
  export function post(param: string | object, conf?: object): DecoratorFunc
  export function put(param: string | object, conf?: object): DecoratorFunc
  export function del(param: string | object, conf?: object): DecoratorFunc
}
export function startApp(app: App): Promise<any>