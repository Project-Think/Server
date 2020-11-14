// 模拟数据

// 生成模拟数据
const createMock = () => {
  const { Article } = require("../model");
  const { article_title: T1, article_tags: T2 } = require("./const");
  const { mock, Random } = require("mockjs");
  global.DBA = []; // 这是一个全局的文章数据数组
  // 生成1000条文章数据
  for (let i = 0; i < 1000; i++) {
    DBA.push(
      new Article(
        mock({
          id: i,
          title: T1[Random.integer(0, 10)],
          authorID: Date.now(),
          authorName: mock("@cname"),
          "type|1": ["default", "news"],
          tags: [T2[Random.integer(0, 3)]],
          "isRecommend|1": true,
          likeCount: Random.integer(0, 10000),
          viewCount: Random.integer(0, 100000),
          date: Date.now() - Random.integer(0, 1000 * 60 * 60 * 24 * 30 * 12),
          content: Random.cparagraph(10, 100),
        })
      )
    );
  }
};

module.exports = { createMock };
