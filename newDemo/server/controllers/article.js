/**
├── controllers
    └── article.js
Controller控制器，是MVC中的部分C，此处的控制器主要负责功能处理部分：

1、收集、验证请求参数并绑定到命令对象；
2、将命令对象交给业务对象，由业务对象处理并返回模型数据；

*/
const ArticleModel = require("../modules/article");

class articleController{
    // 创建文章
    static async create(ctx){
        //接受客户端
        let req = ctx.request.body;
        if(req.title && req.author && req.content && req.category){
            try{
                //创建文章模型
                const ret = await ArticleModel.createArticle(req);
                //把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await ArticleModel.getArticleDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code:200,
                    msg:'创建文章成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code:412,
                    msg:'创建文章失败',
                    data:err
                }
            }
        }
        else{
            ctx.response.status = 416;
            ctx.body = {
                code:416,
                msg:'参数不齐全',
            }
        }
    }

    //获取文章详情
    //param ctx
    static async detial(ctx){
        let id = ctx.params.id;

        if(id){
            try{
                //查询文章详情模型
                let data = await ArticleModel.getArticleDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code:200,
                    msg:'查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code:412,
                    msg:'查询失败',
                    data
                }
            }
        }
        else{
            ctx.response.status = 416;
            ctx.body = {
                code:416,
                msg:'文章ID必须传'
            }
        }
    }
}

module.exports = articleController;