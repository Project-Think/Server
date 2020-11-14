// 中间件
module.exports = (app) => {
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));
  // 模拟数据
  const data = require("../mock");

  // 测试接口
  // get
  app.get("/api/test", (req, res) => {
    const id = req.query.id;
    res.status(200);
    res.json(data[id]);
  });

  // post
  app.post("/api/test", (req, res) => {
    // * type: www-form-urlencoded
    data.push(req.body);
    res.json({ code: 200, message: "ok" });
  });
};
