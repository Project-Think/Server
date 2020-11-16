// 数据模型

// ! 用户对象
class User {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.password = obj.password || "123456"; // 密码
    this.likeArticleList = obj.likeArticleList || []; // 点赞的文章列表id
    this.token = obj.token || "abcdef"; // 安全字符串
  }
}

// ! 文章对象
class Article {
  constructor(obj) {
    this.id = obj.id; // 文章id
    this.title = obj.title; // 文章标题
    this.user = {
      id: obj.userID,
      name: DBU[obj.userID].name,
      url: `/u/${obj.userID}`, // 用户链接
    }; // 文章作者名
    this.type = obj.type || "default"; // 文章类型
    this.tags = obj.tags || []; // 文章标签列表
    this.isRecommend = obj.isRecommend || false; // 是否为推荐文章
    this.isOrigin = obj.isOrigin || true; // 是否为原创文章
    this.likeCount = obj.likeCount || 0; // 点赞数
    this.viewCount = obj.viewCount || 0; // 阅读数
    this.date = obj.date || Date.now(); // 发布时间戳
    this.content = obj.content || "这是文章内容。"; // 文章内容
    this.comments = obj.comments || []; // 评论列表
    this.url = `/a/${obj.id}`; // 文章链接
    this.imgUrl = obj.imgUrl || ""; // 文章图片链接
  }
}

// ! 问题对象
class Question {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.user = {
      id: obj.userID,
      name: DBU[obj.userID].name,
      url: `/u/${obj.userID}`, // 用户链接
    };
    this.tags = obj.tags || []; // 标签列表
    this.likeCount = obj.likeCount || 0; // 点赞数
    this.followCount = obj.followCount || 0; // 关注数
    this.viewCount = obj.viewCount || 0; // 阅读数
    this.date = obj.date || Date.now() - 10000; // 发布时间
    this.content = obj.content || "这是问题"; // 问题内容
    this.newAnswersTime = obj.newAnswersTime || 0; // 最新回答时间
    this.answers = obj.answers || []; // 回答
    this.comments = obj.comments || []; // 评论
  }
}

// ! 回答对象
class Answer {
  constructor(obj) {
    this.id = obj.id;
    this.questionID = obj.questionID; // 对应的问题id
    this.user = {
      id: obj.userID,
      name: DBU[obj.userID].name,
      url: `/u/${obj.userID}`, // 用户链接
    };
    this.content = obj.content; // 内容
    this.likeCount = obj.likeCount || 0; // 点赞数
    this.viewCount = obj.viewCount || 0; // 阅读数
    this.date = obj.date || Date.now() - 5000; // 发布时间
  }
}

// ! 课程对象
class Course {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.imgUrl = obj.imgUrl || "";
    this.cost = obj.cost;
    this.originCost = obj.originCost; // 原价
    this.isRecommend = obj.isRecommend || false; // 是否为推荐课程
    this.date = obj.date; // 发布时间戳
  }
}

// ! 活动对象
class Active {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.imgUrl = obj.imgUrl; // 图片
    this.time = obj.time;
    this.date = obj.date;
    this.city = obj.city || "深圳";
    this.type = obj.type || "未归类";
  }
}

module.exports = {
  Article,
  Question,
  Answer,
  User,
  Course,
  Active,
};
