# 项目简介
搭建本地代理服务，解决跨域问题，用于开发阶段测试联调。

**ps：本项目仅为基础级别的插件使用**

## 项目特点
1，本项目主体为插件 `http-proxy-middleware` 的实际用例
2，对于某些代理（如http 转 https）时依旧报权限问题的特殊接口，尝试用node自带的 request 解决

## 使用方式
````
npm run http-proxy-middleware
````

## demo用例
### 第一步：安装依赖
````
npm i
````

### 第二步：启动代理服务器
````
npm run http-proxy-middleware
````

### 第三步：启动本地页面(需要提前安装 vue 快速原型开发插件)
[vue快速原型开发](https://cli.vuejs.org/zh/guide/prototyping.html#%E5%BF%AB%E9%80%9F%E5%8E%9F%E5%9E%8B%E5%BC%80%E5%8F%91)

````
npm run vue-server
````

### 第四步：测试代理服务器能接受跨域请求
打开页面 `http://localhost:8080/` ,点击文本为 `/page` 的按钮，请求成功则表示本接口接受跨域请求

### 第五步：启动一个需要被代理的服务示例
````
npm run http
````

### 第六步：测试代理服务器是否能正常代理到目标服务器
*ps：可以尝试一下直接请求目标服务器，会报跨域问题*

点击文本为 `/api` 的按钮


## https服务请求代理
上面的代理默认都是 http 到http之间的代理， 下面简单介绍一下http 到https之间代理的情况。

### 第一步：测试示例接口是否能正常请求
点击文本为 `//juejin/web/user/login/?account_sdk_source=web` 的按钮，会发现 http代理到https的情况没什么不同。

但是对于某些https接口而言，此时代理依旧会出现神秘的`cors xxxxx`报错。

### 解决某些异常情况下，代理依旧会有 'cors xxxxx' 报错的问题
解决方案：使用 node 的 request 请求，不借助代理插件，自己手写一个请求。

````
npm run request
````
浏览器输入 `http://本机ip地址:3033/test` 可以发现次https请求也可以被代理，可以通过设置匹配规则 `'/api/*'`
来用`request` 请求你想要请求的所有内容

