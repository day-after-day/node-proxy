var https = require('https'),
    httpProxy = require('http-proxy');

httpProxy.createProxyServer({
    target: 'https://baidu.com',
    agent  : https.globalAgent,
    headers: {
        host: 'baidu.com'
    }
}).listen(8012);
