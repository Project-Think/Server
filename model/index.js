// 数据模型

// ! 文章对象
class Article {
  constructor(obj) {
    this.id = obj.id; // 文章id
    this.title = obj.title; // 文章标题
    this.author = {
      id: obj.authorID,
      name: obj.authorName, // 用户名
      url: `/u/${obj.authorID}`, // 用户链接
    }; // 文章作者名
    this.type = obj.type || "default"; // 文章类型
    this.tags = obj.tags || []; // 文章标签列表
    this.isRecommend = obj.isRecommend || false; // 是否为推荐文章
    this.likeCount = obj.likeCount || 0; // 点赞数
    this.viewCount = obj.viewCount || 0; // 阅读数
    this.date = obj.date || Date.now(); // 发布时间戳
    this.content = obj.content || "这是文章内容。"; // 文章内容
    this.comments = obj.comments || []; // 评论列表
    this.url = `/a/${obj.id}`; // 文章链接
  }
}

// ! 问题对象
class Question {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.quizzer = obj.quizzer; // 提问者
    this.tags = obj.tags || []; // 标签列表
    this.likeCount = obj.likeCount || 0; // 点赞数
    this.followCount = obj.followCount || 0; // 关注数
    this.date = obj.date || Date.now() - 10000; // 发布时间
    this.content = obj / content || "这是问题"; // 问题内容
    this.answers = obj.answers || []; // 回答列表
    this.newAnswersTime = obj.newAnswersTime || 0; // 最新回答时间
  }
}

// ! 回答对象
class Answer {}

// ! 评论对象
class Comment {}

// ! 用户对象
class User {}

module.exports = {
  Article,
};
