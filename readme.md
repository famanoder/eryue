>Koa2是如此的简洁！ let`s do it !

* koa2-base整理了一个小站点基本所需的模块
* 简单配置就切换到https
* 除了视图模板没有，因为你可以选择你喜欢的，哪怕用ES6的字符模板
* Mongodb的启动必须做ip加端口、身份权限认证
* 统一管理路由：分为页面路由（默认GET）和API路由（默认POST）

### 开始

1、git clone https://github.com/famanoder/Koa2-base.git

2、cd Koa2-base

3、npm install -d

4、npm i supervisor -g -d

5、npm start 或 npm run watch

6、浏览器输入http://localhost:9000即可

7、测试api:

  > a. curl http://localhost:9000/api/user/login
  
  > b. curl -d '' http://localhost:9000/api/user/1234567890.userId
  
  > c. curl -d '' http://localhost:9000/api/user/logout
  





Koa2真的很简洁，你值得一试！
