// SQLite3 封装
const sqlite3 = require("sqlite3").verbose();
var db;
exports.db = db;

// 打开数据库
exports.open = function (path) {
  return new Promise(function (resolve) {
    this.db = new sqlite3.Database(path, function (err) {
      if (err) reject("Open error: " + err.message);
      else resolve(path + " opened");
    });
  });
};

// 运行SQL语句
exports.run = function (query) {
  return new Promise(function (resolve, reject) {
    this.db.run(query, function (err) {
      if (err) reject(err.message);
      else resolve(true);
    });
  });
};

// 获取一条查询结果
exports.get = function (query, params) {
  return new Promise(function (resolve, reject) {
    this.db.get(query, params, function (err, row) {
      if (err) reject("Read error: " + err.message);
      else {
        resolve(row);
      }
    });
  });
};

// 获取所有查询结果
exports.all = function (query, params) {
  return new Promise(function (resolve, reject) {
    if (params == undefined) params = [];

    this.db.all(query, params, function (err, rows) {
      if (err) reject("Read error: " + err.message);
      else {
        resolve(rows);
      }
    });
  });
};

exports.each = function (query, params, action) {
  return new Promise(function (resolve, reject) {
    var db = this.db;
    db.serialize(function () {
      db.each(query, params, function (err, row) {
        if (err) reject("Read error: " + err.message);
        else {
          if (row) {
            action(row);
          }
        }
      });
      db.get("", function (err, row) {
        resolve(true);
      });
    });
  });
};

// 关闭数据库
exports.close = function () {
  return new Promise(function (resolve, reject) {
    this.db.close();
    resolve(true);
  });
};
