// 中间件
module.exports = (app) => {
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));
  // 模拟数据
  const data = require("../mock");

  // ! 首页接口数据
  {
    // * 返回标签列表数据
    app.get("/api/getTags", (req, res) => {
      const { article_tags: result } = require("../mock/const");
      res.json({ code: 200, message: "ok", data: result });
    });
    // * 返回推荐的文章列表数据
    app.get("/api/getArticleList/recommend", (req, res) => {
      const result = DBA.filter((item) => {
        return item.isRecommend;
      });
      if (result.length > 100) {
        result.length = 100;
      }
      res.json({ code: 200, message: "ok", data: result });
    });
    // * 返回热门的文章列表数据
    app.get("/api/getArticleList/hot", (req, res) => {
      const result = DBA.filter((item) => {
        return item.likeCount > 1000;
      });
      const data = result.sort((a, b) => {
        return b.likeCount - a.likeCount;
      });
      res.json({ code: 200, message: "ok", data });
    });
    // * 返回最新的文章列表数据
    app.get("/api/getArticleList/new", (req, res) => {
      const result = DBA.filter((item) => {
        return item.date > Date.now() - 1000 * 60 * 60 * 24 * 7;
      });
      const data = result.sort((a, b) => {
        return b.date - a.date;
      });
      res.json({ code: 200, message: "ok", data });
    });
    // * 根据标签返回文章列表数据
    app.get("/api/getArticleList/byTag", (req, res) => {
      const tag = req.query.tag;
      if (tag) {
        const data = DBA.filter((item) => {
          return item.tags.includes(tag);
        });
        if (data.length > 200) data.length = 200;
        res.json({ code: 200, message: "ok", data });
      } else {
        res.json({ code: 400, message: "缺少必要参数", data: null });
      }
    });
  }
  // ! 详情
  {
    // * 根据id返回文章数据
    app.get("/api/getArticle/byID", (req, res) => {
      let id = req.query.id;
      if (id) {
        try {
          id = parseInt(id);
          const data = DBA[id];
          // 阅读量加一
          if (data) {
            data.viewCount++;
          }
          res.json({ code: 200, message: "ok", data });
        } catch (e) {
          res.json({ code: 400, message: "参数异常", data: null });
        }
      } else {
        res.json({ code: 400, message: "缺少必要参数", data: null });
      }
    });
    // * 根据id返回用户数据
    app.get("/api/user", (req, res) => {
      let id = req.query.id;
      if (id) {
        try {
          id = parseInt(id);
          const data = DBU[id];
          res.json({ code: 200, message: "ok", data });
        } catch (e) {
          res.json({ code: 400, message: "参数异常", data: null });
        }
      } else {
        res.json({ code: 400, message: "缺少必要参数", data: null });
      }
    });
  }
  // ! 问答接口数据
  {
    // * 获取最新问答列表
    app.get("/api/question/new", (req, res) => {
      const result = DBQ.filter((item) => {
        return item.date > Date.now() - 1000 * 60 * 60 * 24 * 7;
      });
      const data = result.sort((a, b) => {
        return b.date - a.date;
      });
      res.json({ code: 200, message: "ok", data });
    });
    // * 获取等待回答列表
    app.get("/api/question/wait", (req, res) => {
      const data = DBQ.filter((item) => {
        return item.answers.length === 0;
      });
      res.json({ code: 200, message: "ok", data });
    });
    // * 获取热门回答列表
    app.get("/api/question/hot", (req, res) => {
      let data = DBQ.filter((item) => {
        return item.viewCount > 8000;
      });
      data = data.sort((a, b) => {
        return b.likeCount - a.likeCount;
      });
      res.json({ code: 200, message: "ok", data });
    });
  }
};
