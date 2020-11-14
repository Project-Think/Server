// 配置目录
const express = require("express");
module.exports = (app) => {
  // 静态目录
  app.use(express.static(__dirname + "/static"));
  // 设置跨域
  app.use("/api", (req, res, next) => {
    // 设置响应头
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Content-Type": "application/json; charset=utf-8",
    });
    req.method === "OPTIONS" ? res.status(204).end() : next();
  });
  // 端口
  global.port = 80;
};
