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

  // ! 首页接口数据
  {
    // * 返回标签列表数据
    app.get("/api/getTags", (req, res) => {
      const { article_tags: result } = require("../mock/const");
      res.json({ code: 200, message: "ok", data: result });
    });
    // * 返回推荐的文章列表数据
    app.get("/api/getRecommendArticle", (req, res) => {
      const result = DBA.filter((item) => {
        return item.isRecommend;
      });
      if (result.length > 100) {
        result.length = 100;
      }
      res.json({ code: 200, message: "ok", data: result });
    });
    // * 返回热门的文章列表数据
    app.get("/api/getHotArticle", (req, res) => {
      const result = DBA.filter((item) => {
        return item.likeCount > 1000;
      });
      const data = result.sort((a, b) => {
        return b.likeCount - a.likeCount;
      });
      res.json({ code: 200, message: "ok", data });
    });
    // * 返回最新的文章列表数据
    app.get("/api/getNewArticle", (req, res) => {
      const result = DBA.filter((item) => {
        return item.date > Date.now() - 1000 * 60 * 60 * 24 * 7;
      });
      const data = result.sort((a, b) => {
        return b.date - a.date;
      });
      res.json({ code: 200, message: "ok", data: result });
    });
  }
};
