// 模拟数据

// 生成模拟数据
const createMock = () => {
  const {
    Article,
    Question,
    Answer,
    User,
    Active,
    Course,
  } = require("../model");
  const {
    article_title,
    article_tags,
    answer_title,
    active_title,
    course_title,
  } = require("./const");
  const { Random: R } = require("mockjs");

  // 生成100个用户数据
  global.DBU = []; // 全局用户数据
  for (let id = 0; id < 100; id++) {
    DBU.push(
      new User({
        id,
        name: R.cname(),
        password: R.string("lower", 6, 32),
        phone: "12345678901",
        token: R.string(63),
        rp: R.integer(0, 10000), // 声望
      })
    );
  }
  console.log(`${Date.now()} 生成100条用户数据成功`);

  // 生成10000条文章数据
  global.DBA = []; // 这是一个全局的文章数据数组
  for (let id = 0; id < 10000; id++) {
    DBA.push(
      new Article({
        id,
        title: R.pick(article_title),
        userID: R.integer(0, 99),
        type: [R.pick(["default", "news"])],
        tags: [R.pick(article_tags)],
        isRecommend: R.boolean(),
        isOrigin: R.boolean(),
        likeCount: R.integer(0, 1000),
        viewCount: R.integer(0, 10000),
        date: Date.now() - R.integer(1000 * 60, 1000 * 60 * 60 * 24 * 30),
        content: R.cparagraph(5, 300),
        imgUrl: "http://39.108.227.2:8888/img/" + R.integer(0, 6) + ".jpg",
      })
    );
  }
  console.log(`${Date.now()} 生成1000条文章数据成功`);

  // 生成1000条问题
  global.DBQ = []; // 这是一个全局的问题数据数组
  for (let id = 0; id < 1000; id++) {
    DBQ.push(
      new Question({
        id,
        title: R.pick(answer_title),
        userID: R.integer(0, 99),
        tags: [R.pick(article_tags)],
        likeCount: R.integer(0, 1000),
        followCount: R.integer(0, 500),
        collectionCount: R.integer(0, 100),
        viewCount: R.integer(0, 10000),
        date: Date.now() - R.integer(0, 1000 * 60 * 60 * 24 * 30 * 2),
        content: R.cparagraph(5, 100),
      })
    );
  }
  console.log(`${Date.now()} 生成500条问题数据成功`);

  // 生成5000条答案
  global.DBP = [];
  for (let id = 0; id < 5000; id++) {
    const j = R.integer(0, 400);
    DBQ[j].answers.push(id);
    DBP.push(
      new Answer({
        id,
        questionID: j,
        userID: R.integer(0, 99),
        content: R.cparagraph(5, 300),
        likeCount: R.integer(0, 1000),
        viewCount: R.integer(0, 10000),
        date: Date.now() - R.integer(0, 1000 * 60 * 60 * 24 * 30 * 10),
      })
    );
  }

  console.log(`${Date.now()} 生成10000个答案数据成功`);

  // 生成100个课程
  global.DBS = [];
  for (let id = 0; id < 100; id++) {
    DBS.push(
      new Course({
        id,
        title: R.pick(course_title),
        cost: R.integer(10, 100), // 当前价格
        originCost: R.integer(100, 500), // 原价
        imgUrl:
          "http://39.108.227.2:8888/img/course/" + R.integer(0, 6) + ".jpg",
        date: Date.now() - R.integer(0, 1000 * 60 * 60 * 24 * 30),
        isRecommend: R.boolean(),
      })
    );
  }
  console.log(`${Date.now()} 生成100个课程数据成功`);

  // 生成20个活动
  global.DBX = [];
  for (let id = 0; id < 20; id++) {
    DBX.push(
      new Active({
        id,
        title: R.pick(active_title),
        imgUrl:
          "http://39.108.227.2:8888/img/course/" + R.integer(0, 6) + ".jpg",
        time: Date.now() + R.integer(0, 1000 * 60 * 60 * 24 * 365),
        time2: R.integer(1, 72),
        date: Date.now() - R.integer(0, 1000 * 60 * 60 * 24 * 30),
        city: R.city(),
        type: "无",
      })
    );
  }

  console.log(`${Date.now()} 生成20个活动数据成功`);
};

module.exports = { createMock };
