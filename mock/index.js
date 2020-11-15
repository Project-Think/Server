// 模拟数据

// 生成模拟数据
const createMock = () => {
  const { Article, Question, Answer, User } = require("../model");
  const {
    article_title: T1,
    article_tags: T2,
    article_content,
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
          likeCount: Random.integer(0, 3000),
          viewCount: Random.integer(0, 100000),
          date: Date.now() - Random.integer(0, 1000 * 60 * 60 * 24 * 30 * 12),
          content: Random.cword(article_content, 100, 1000),
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
          title: T1[Random.integer(0, T1.length - 1)],
          userID: Random.integer(0, 499),
          tags: [T2[Random.integer(0, T2.length - 1)]],
          likeCount: Random.integer(0, 1000),
          followCount: Random.integer(0, 500),
          viewCount: Random.integer(0, 10000),
          date:
            Date.now() -
            Random.integer(
              1000 * 60 * 60 * 24 * 30 * 4,
              1000 * 60 * 60 * 24 * 30 * 11
            ),
          content: Random.cword(article_content, 100, 1000),
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
        date: Date.now() - Random.integer(0, 1000 * 60 * 60 * 24 * 30 * 4),
      })
    );
  }

  console.log(`${Date.now()} 生成10000个答案数据成功`);
};

module.exports = { createMock };
