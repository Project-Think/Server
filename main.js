// 服务器主文件
const express = require("express");
const app = express();

// 引入配置
const config = require("./config");
config(app);

// 开启中间件
const middleware = require("./middleware");
middleware(app);

// 生成模拟数据
const { createMock } = require("./mock");
createMock();

console.log(DBA);

// 启动服务器
app.listen(port, () => {
  console.log(`服务器成功运行在 ${port} 端口`);
});
