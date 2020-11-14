// 服务器主文件
const express = require("express");
const app = express();

// 引入配置
const config = require("./config");
config(app);

// 启动服务器
app.listen(port, () => {
  console.log(`服务器成功运行在 ${port} 端口`);
});
