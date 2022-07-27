const express = require('express');

const app = express();

const originSetting = {
    port: 3001
}

app.get('/test', function (req, res) {
    res.send({code: 0, message: '成功拿到后端服务器的返回信息：test is ok !'})
});

const utils = require('./utils.js')
const localIp = utils.getLocalIp();
const http = app.listen(originSetting.port, localIp, function (){
    const host = http.address().address;
    const port = http.address().port;
    console.log(`本地服务为：http://${host}:${port}`)
});
