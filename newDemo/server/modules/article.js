/**
├── modules
    └── article.js
    创建实例
*/

//引入db.js
const db = require("../config/db");
//引入Sequelize对象
const Sequelize = db.sequelize;
//引入上一步的文章数据表模型文件
const Article = Sequelize.import("../schema/article");
//自动创建表
Article.sync({force:false});

class ArticleModel{
    // 创建文章模型
    static async createArticle(data){
        return await Article.create({
            title:data.title,//文章标题
            author:data.author,//文章作者
            content:data.content,//问藏内容
            category:data.category,//文章分类
        })
    }

    //查询文章详细数据
    // @param id 文章id
    static async getArticleDetail(id){
        return await Article.findOne({
            where :{
                id,
            },
        })
    }
}

module.exports = ArticleModel;