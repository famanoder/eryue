伪代码 plan：

1. 基于 Koajs，并且增强 Koajs；
2. 装饰器版 Koajs => Middleware
3. 重新包装 context
4. 依赖注入，区分model/controler/helper/render
5. Router => function => call({注入对象}) Filter
6. 默认启用的 middleware => config => enable

<!-- 
@Mongodb
@Mongoose
@MySQL 
-->

@BeforeStart
@Config
@Middleware
@Inject({
UserControler,
UserModel,
Logger
})
@Router
export class App extends Eryue {
...config
onerror() {},
onstart() {}
}

App.start()
http.createServer(new App().callback()).listen();

@Controler({
model: ['user', 'order', 'helper'],
service: []
})
export class UserControler {
constructor(user, order, helper) {
<!-- this.user = user;
this.order = order; -->
}
async getUserList(id) {
this.helper.curl('/');
const users = await this.user.findById(id);
return users;
}
}

@Model({

})
export class UserModel {

}

async function getUserList(eryueCtx = {controler}, _ctx = {body, query, params}) {
if(!body.id) {
return this.response.failed(401, 'unauth...');
}
const userList = await controler.getUserList(body.id);
this.response.success(200, userList);
}