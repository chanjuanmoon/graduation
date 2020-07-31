/**
├── controllers
    └── source.js
Controller控制器，是MVC中的部分C，此处的控制器主要负责功能处理部分：

1、收集、验证请求参数并绑定到命令对象；
2、将命令对象交给业务对象，由业务对象处理并返回模型数据；

*/
const SourceModel = require("../modules/source");

class sourceController {
    // 创建资源
    static async create(ctx) {
        //接受客户端
        let req = ctx.request.body;
        if (req.name && req.author && req.url && req.menu_name && req.state) {
            try {
                //创建资源模型
                const ret = await SourceModel.createSource(req);
                //把刚刚新建的资源ID查询资源详情，且返回新创建的资源信息
                const data = await SourceModel.getsourceDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建资源成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建资源失败',
                    data: err
                }
            }
        }
        else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐全',
            }
        }
    }

    //获取资源详情
    //param ctx   get  参数 id
    static async detial(ctx) {
        let id = ctx.params.id;

        if (id) {
            try {
                //查询资源详情模型
                let data = await SourceModel.getsourceDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data:err
                }
            }
        }
        else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '资源ID必须传'
            }
        }
    }

    //获取全部资源
    static async getAllSource(ctx) {
        let req = ctx.request.body;

        if(req.menu_name){
            try {
                //查询用户详情模型
                let data = await SourceModel.getSourceAll(req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data:err
                }
            }
        }
        else{
            console.log("没进来");
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐全'
            } 
        }
    
    }

    //模糊查询 获取资源
    static async getSourceVague(ctx){
        let req = ctx.request.body;
        if(req.name){
            try {
                console.log("进来了");
                //查询资源详情模型
                let data = await SourceModel.getSourceVague(req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data:err
                }
            }
        }
        else{
            console.log("没进来");
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐全'
            } 
        }
    }
}


module.exports = sourceController;