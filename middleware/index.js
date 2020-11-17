// 中间件
const bodyParser = require("body-parser");
// 加密密码用的
const md5 = require("blueimp-md5");

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));

  // ! 首页接口数据
  {
    // * 返回标签列表数据
    app.get("/api/tags", (req, res) => {
      const { article_tags: data } = require("../mock/const");
      res.json({ code: 200, message: "ok", data });
    });
    // * 返回推荐的文章列表数据
    app.get("/api/articleList/recommend", (req, res) => {
      const data = DBA.filter((item) => {
        return item.isRecommend;
      });
      if (data.length > 500) data.length = 500;
      res.json({ code: 200, message: "ok", data });
    });
    // * 返回热门的文章列表数据
    app.get("/api/articleList/hot", (req, res) => {
      const type = req.query.type;
      let time = 1000 * 60 * 60 * 24;
      switch (type) {
        case "":
        case "day":
          time = 1000 * 60 * 60 * 24;
          break;
        case "week":
          time = 1000 * 60 * 60 * 24 * 7;
          break;
        case "mouth":
          time = 1000 * 60 * 60 * 24 * 30;
          break;
      }
      let data = DBA.filter((item) => {
        return item.date > Date.now() - time;
      });
      data = data.filter((item) => {
        return item.likeCount > 500;
      });
      data = data.sort((a, b) => {
        return b.likeCount - a.likeCount;
      });
      if (data.length > 500) data.length = 500;

      res.json({ code: 200, message: "ok", data });
    });
    // * 返回最新的文章列表数据
    app.get("/api/articleList/new", (req, res) => {
      let data = DBA.filter((item) => {
        return item.date > Date.now() - 1000 * 60 * 60 * 24 * 7;
      });
      data = data.sort((a, b) => {
        return b.date - a.date;
      });
      if (data.length > 500) data.length = 500;
      res.json({ code: 200, message: "ok", data });
    });
    // * 根据标签返回文章列表数据
    app.get("/api/articleList/byTag", (req, res) => {
      const tag = req.query.tag;
      if (tag) {
        const data = DBA.filter((item) => {
          return item.tags.includes(tag);
        });
        if (data.length > 100) data.length = 100;
        res.json({ code: 200, message: "ok", data });
      } else {
        res.json({ code: 400, message: "缺少必要参数", data: null });
      }
    });
  }
  // ! 详情
  {
    // * 根据id返回文章数据
    app.get("/api/article", (req, res) => {
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
      let data = DBQ.filter((item) => {
        return item.date > Date.now() - 1000 * 60 * 60 * 24 * 7;
      });
      console.log(data);
      data = data.sort((a, b) => {
        return b.date - a.date;
      });
      if (data.length > 100) data.length = 100;
      res.json({ code: 200, message: "ok", data });
    });
    // * 获取等待回答列表
    app.get("/api/question/wait", (req, res) => {
      const data = DBQ.filter((item) => {
        return item.answers.length === 0;
      });
      if (data.length > 100) data.length = 100;
      res.json({ code: 200, message: "ok", data });
    });
    // * 获取热门回答列表
    app.get("/api/question/hot", (req, res) => {
      const type = req.query.type;
      let time = 1000 * 60 * 60 * 24;
      switch (type) {
        case "":
        case "day":
          time = 1000 * 60 * 60 * 24;
          break;
        case "week":
          time = 1000 * 60 * 60 * 24 * 7;
          break;
        case "mouth":
          time = 1000 * 60 * 60 * 24 * 30;
          break;
      }
      let data1 = DBP.filter((item) => {
        return item.date > Date.now() - time;
      });

      data1 = data1.filter((item) => {
        return item.viewCount > 8000;
      });
      data1 = data1.sort((a, b) => {
        return b.likeCount - a.likeCount;
      });
      let data = data1.map((item) => {
        DBQ[item.questionID].answers = item;
        return DBQ[item.questionID];
      });
      if (data.length > 500) data.length = 500;
      res.json({ code: 200, message: "ok", data });
    });
  }
  // ! 资讯
  {
    // * 返回资讯列表
    app.get("/api/news", (req, res) => {
      const data = DBA.filter((item) => {
        return item.type === "news";
      });
      if (data.length > 500) data.length = 500;
      res.json({ code: 200, message: "ok", data });
    });
  }
  // ! 课程
  {
    // * 返回推荐课程列表
    app.get("/api/course/recommend", (req, res) => {
      let data = DBS.filter((item) => {
        return item.isRecommend;
      });
      if (data.length > 6) data.length = 6;
      res.json({ code: 200, message: "ok", data });
    });
    // * 返回新上好课列表
    app.get("/api/course/new", (req, res) => {
      let data = DBS.filter((item) => {
        return item.date > Date.now() - 86400 * 1000 * 30;
      });
      data = data.sort((a, b) => {
        return b.date - a.date;
      });
      if (data.length > 6) data.length = 6;
      res.json({ code: 200, message: "ok", data });
    });
  }
  // ! 活动
  {
    // * 返回活动列表数据
    app.get("/api/events/list", (req, res) => {
      let data = DBX.filter((item) => {
        return true;
      });
      res.json({ code: 200, message: "ok", data });
    });
    // * 根据id返回具体的活动
    app.get("/api/events", (req, res) => {
      let id = req.query.id;
      if (id) {
        try {
          id = parseInt(id);
          const data = DBX[id];
          res.json({ code: 200, message: "ok", data });
        } catch (e) {
          res.json({ code: 400, message: "参数异常", data: null });
        }
      } else {
        res.json({ code: 400, message: "缺少必要参数", data: null });
      }
    });
    
  }
  // ! 登录注册
  {
    // ! 注册
    app.post("/api/register", (req, res) => {
      const result = req.body;
      let {
        user_name: name,
        user_phone: phone,
        user_password: password,
      } = result;
      // ! 简单校验
      if (!(name || phone || password)) {
        res.json({ code: 400, message: "数据不完整，请检查数据", data: null });
        return;
      }
      // 加密
      password = md5(password);
      // ! 检查这个用户是否存在
      DBU.forEach((item) => {
        if (item.name === name) {
          res.json({ code: 400, message: "该用户已经存在", data: null });
          return;
        }
      });
      // 存入数据库
      const { Random: R } = require("mockjs");
      DBU.push({ id: DBU.length, name, password, phone, token: R.string(63) });
      // 设置cookie
      let hour = 3600000;
      req.session.cookie.expires = new Date(Date.now() + hour);
      req.session.cookie.maxAge = hour;
      req.session.isLogin = true;
      res.json({
        code: 200,
        message: "ok",
        data: DBU[DBU.length - 1],
      });
      console.log(DBU);
    });
    // ! 登录
    app.post("/api/login", (req, res) => {
      const result = req.body;
      let { user_name: name, user_password: password } = result;
      // ! 简单校验
      if (!(name || password)) {
        res.json({ code: 400, message: "数据异常，请重新输入", data: null });
        return;
      }
      // 加密
      password = md5(password);
      // ! 检查这个用户是否存在
      let i = -1;
      DBU.forEach((item, index) => {
        if (item.name === name || item.phone === name) {
          i = index;
        }
      });
      if (i === -1) {
        res.json({
          code: 400,
          message: "账号或者密码错误",
          data: null,
        });
        return;
      }
      // 设置cookie
      let hour = 3600000;
      req.session.cookie.expires = new Date(Date.now() + hour);
      req.session.cookie.maxAge = hour;
      req.session.isLogin = true;
      res.json({
        code: 200,
        message: "ok",
        data: DBU[i],
      });
    });
    // 登出
    app.post("/api/logout", (req, res) => {
      // 设置cookie
      req.session.isLogin = false;
      res.json({
        code: 200,
        message: "ok",
        data: null,
      });
    });
  }
};
