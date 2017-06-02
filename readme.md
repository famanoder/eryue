>Koa2是如此的简洁！ let`s do it !

* koa2-base整理了一个小站点基本所需的模块
* 简单配置就切换到https
* 使用JWT配合https，API接口安全性大大提升
* 内置简单的视图模板，因为你可以选择你喜欢的，哪怕用ES6的字符模板
* Mongodb的启动必须做ip加端口、身份权限认证
* 统一管理路由：分为页面路由（默认GET）和API路由（默认POST）
* 默认使用开启formidable上传文件
* 增加基于ioredis和generic-pool的redis连接池操作

### 开始

1、git clone https://github.com/famanoder/Koa2-base.git

2、cd Koa2-base

3、npm install -d

4、npm i supervisor -g -d

5、npm start 或 npm run watch

6、浏览器输入http://localhost:9000即可

7、测试api:

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.&nbsp;&nbsp;curl http://localhost:9000/api/user/login
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.&nbsp;&nbsp;curl -d auth=your_token http://localhost:9000/api/user/1234567890.userId
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.&nbsp;&nbsp;curl --form fileupload=@a.txt http://localhost:9000/action
  





Koa2真的很简洁，你值得一试！
