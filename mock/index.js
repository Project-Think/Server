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
    article_title: T1,
    article_tags: T2,
    answer_title,
    active_title,
    course_title,
  } = require("./const");
  const { mock, Random } = require("mockjs");

  // 生成1000个用户数据
  global.DBU = []; // 全局用户数据
  for (let i = 0; i < 1000; i++) {
    DBU.push(
      new User(
        mock({
          id: i,
          name: mock("@cname"),
          password: Random.string(),
          token: Random.string(63),
        })
      )
    );
  }
  console.log(`${Date.now()} 生成1000条用户数据成功`);

  // 生成1000条文章数据
  global.DBA = []; // 这是一个全局的文章数据数组
  for (let i = 0; i < 1000; i++) {
    DBA.push(
      new Article(
        mock({
          id: i,
          title: T1[Random.integer(0, T1.length - 1)],
          userID: Random.integer(0, 499),
          "type|1": ["default", "news"],
          tags: [T2[Random.integer(0, T2.length - 1)]],
          "isRecommend|1": true,
          "isOrigin|1": true,
          likeCount: Random.integer(0, 1000),
          viewCount: Random.integer(0, 10000),
          date:
            Date.now() - Random.integer(1000 * 60, 1000 * 60 * 60 * 24 * 30),
          content: mock("@cparagraph(5, 300)"),
          imgUrl: "http://39.108.227.2:8888/img/" + Random.integer(0, 6) + ".jpg",
        })
      )
    );
  }
  console.log(`${Date.now()} 生成1000条文章数据成功`);

  // 生成500条问题
  global.DBQ = []; // 这是一个全局的问题数据数组
  for (let i = 0; i < 500; i++) {
    DBQ.push(
      new Question(
        mock({
          id: i,
          title: answer_title[Random.integer(0, answer_title.length - 1)],
          userID: Random.integer(0, 499),
          tags: [T2[Random.integer(0, T2.length - 1)]],
          likeCount: Random.integer(0, 1000),
          followCount: Random.integer(0, 500),
          collectionCount: Random.integer(0, 100),
          viewCount: Random.integer(0, 10000),
          date: Date.now() - Random.integer(0, 1000 * 60 * 60 * 24 * 30 * 12),
          content: mock("@cparagraph(5, 100)"),
        })
      )
    );
  }
  console.log(`${Date.now()} 生成500条问题数据成功`);

  // 生成10000条答案
  global.DBP = [];
  for (let i = 0; i < 10000; i++) {
    const j = Random.integer(0, 400);
    DBQ[j].answers.push(i);
    DBP.push(
      new Answer({
        id: i,
        questionID: j,
        userID: Random.integer(0, 499),
        content: mock("@cparagraph(5, 300)"),
        likeCount: Random.integer(0, 1000),
        viewCount: Random.integer(0, 10000),
        date: Date.now() - Random.integer(0, 1000 * 60 * 60 * 24 * 30 * 10),
      })
    );
  }

  console.log(`${Date.now()} 生成10000个答案数据成功`);

  // 生成100个课程
  global.DBS = [];
  for (let i = 0; i < 100; i++) {
    DBS.push(
      new Course(
        mock({
          id: i,
          title: course_title[Random.integer(0, course_title.length - 1)],
          cost: Random.integer(10, 100), // 当前价格
          originCost: Random.integer(100, 500), // 原价
          imgUrl: "http://39.108.227.2:8888/img/course" + Random.integer(0, 6) + ".jpg",,
          date: Date.now() - Random.integer(0, 1000 * 60 * 60 * 24 * 30),
          "isRecommend|1": true,
        })
      )
    );
  }
  console.log(`${Date.now()} 生成100个课程数据成功`);

  // 生成100个活动
  global.DBX = [];
  for (let i = 0; i < 100; i++) {
    DBS.push(
      new Course({
        id: i,
        title: active_title[Random.integer(0, active_title.length - 1)],
        imgUrl: "http://39.108.227.2:8888/img/course" + Random.integer(0, 6) + ".jpg",,
        time: Date.now() + Random.integer(0, 1000 * 60 * 60 * 24 * 365),
        date: Date.now() - Random.integer(0, 1000 * 60 * 60 * 24 * 30),
        city: "深圳",
        type: "无",
      })
    );
  }

  console.log(`${Date.now()} 生成100个活动数据成功`);
  console.log(DBX);
};

module.exports = { createMock };
