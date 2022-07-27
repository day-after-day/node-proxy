const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser')

/*
定义变量
 */
const app = express();
const utils = require('./utils.js')
const localIp = utils.getLocalIp();
/*
固定设置
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
本服务配置
 */
const originSetting = {
    port: 3000
}

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Test")
    res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Authorization", "*");
    next()
})

/*
1，测试服务是否成功启动
2，测试跨域问题是否已解决
 */
app.get('/page', function (req, res) {
    res.send({code: 0, message: 'test-test is ok !'})
});

/*
http => http 代理请求示例
 */
app.use('/api', createProxyMiddleware({
    target: `http://${localIp}:3001/`,
    changeOrigin: true,
    pathRewrite:{
        '/api': '/test'
    }
}));

/*
http => https 代理请求示例 （和上面没什么不同）
设置本地服务请求路径， 并设置代理
 */
app.use('/juejin', createProxyMiddleware({
    target: 'https://juejin.cn/passport/',
    changeOrigin: true,
    pathRewrite: {
        '^juejin': ''
    }
}));
/*
启动本地服务
 */
const http = app.listen(originSetting.port, localIp, function (){
    const host = http.address().address;
    const port = http.address().port;
    console.log(`本地服务为：http://${host}:${port}`)
});
