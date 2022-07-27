const express = require('express');
const request = require( 'request')
const bodyParser = require('body-parser')
/*
定义变量
 */
const app = express();

/*
固定设置
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
本服务配置
 */
const originSetting = {
    hostname: 'localhost',
    port: 3033
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

app.get('/test', function (req,res) {
    const data = {}
    request({
        url: `https://api.juejin.cn/interact_api/v1/pin_tab_lead?aid=2608&uuid=7054458182139151913`,//请求路径
        method: "get",//请求方式，默认为get
        headers: {//设置请求头
            "content-type": "application/json",
        },
        body: JSON.stringify(data)//post参数字符串
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });
})

app.post('/api/*', function (req, res) {
    console.log(Object.keys(req))
    const url = `url${req.url}`
    request({
        url: url,//请求路径
        method: "post",//请求方式，默认为get
        headers: {//设置请求头
            "content-type": "application/json",
        },
        body: JSON.stringify(req.body)//post参数字符串
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });
});

/*
启动本地服务
 */
const utils = require('./utils.js')
const localIp = utils.getLocalIp();
const http = app.listen(originSetting.port, localIp, function (){
    const port = http.address().port;
    console.log(`本地服务为：http://localhost:${port}`)
});
