// 数据库一些封装
const SQLite = require("./sqlite3.js");

// 打开数据库
async function databaseOPEN() {
  await SQLite.open("./main.db");
}

// 关闭数据库
async function databaseCLOSE() {
  await SQLite.close();
}

module.exports = {
  databaseOPEN,
  databaseCLOSE,
};
