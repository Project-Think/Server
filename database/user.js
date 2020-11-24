const SQLite = require("./sqlite3");

// 初始化用户表
const userInit = async function () {
  await SQLite.run(
    `CREATE TABLE USER(
      id integer NOT NULL PRIMARY KEY, 
      name text,
      password text,
      phone integer,
      rp integer,
      token text
      )
    `
  );
};

// 获取所有用户对象
const userGetTotal = async function () {
  const result = await SQLite.all(`SELECT * FROM USER`);
  return result;
};

// ! 更新用户对象
const userUpdate = async function (u) {
  const sql = `
  UPDATE USER 
  SET 
    password=${u.password},
    auth=${u.phone},
    status=${u.rp}, 
    token="${u.token}",
  WHERE
    id = ${u.id} 
  `;
  await SQLite.run(sql);
};

// ! 插入用户对象
const userInsert = async function (u) {
  let sql = `
  INSERT INTO USER
  (
    id, 
    name, 
    password, 
    phone, 
    token, 
    rp, 
  ) 
  VALUES 
  (
    ${u.id}, 
    '${u.name}', 
    '${u.password}', 
    ${u.phone}, 
    '${u.token}', 
    ${u.rp}, 
    )`;
  await SQLite.run(sql);
};

module.exports = {
  userInit,
  userGetTotal,
  userUpdate,
  userInsert,
};
