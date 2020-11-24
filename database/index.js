const { databaseOPEN } = require("./toggle");
const { userInit, userGetTotal, userUpdate, userInsert } = require("./user");
const { User } = require("../model");

module.exports = async () => {
  // 打开数据库
  databaseOPEN();

  // 初始化数据库
  // userInit();

  // 读取数据库数据
  const tempDB = await userGetTotal();
  tempDB.forEach((item) => {
    DBU.push(new User(item));
  });

  console.log("读取数据库成功！");
};
