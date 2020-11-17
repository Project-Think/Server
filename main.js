// 服务器主文件
const express = require("express");
const app = express();
const path = require("path");

// 静态目录
app.use(express.static(path.join(__dirname, "static")));

// 引入配置
const config = require("./config");
config(app);
// 设置WebSocket
const expressWS = require("express-ws");
const ws = require("./websocket");
expressWS(app);
app.use("/websocket", ws);

// 开启中间件
const middleware = require("./middleware");
middleware(app);

// 生成模拟数据
const { createMock } = require("./mock");
createMock();

// 启动服务器
app.listen(port, () => {
  console.log(`服务器成功运行在 ${port} 端口`);
});
