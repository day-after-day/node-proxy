const os=require("os");

function getLocalIp(){
    const networkInterfaces=os.networkInterfaces();
    const ipItemList = networkInterfaces['WLAN'] || networkInterfaces['以太网'] || networkInterfaces['ens192']
    const ipItem = ipItemList.find( i => i.family === 'IPv4')
    return ipItem.address
}


module.exports = {
    getLocalIp
}
