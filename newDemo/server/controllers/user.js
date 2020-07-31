/**
├── controllers
    └── user.js
Controller控制器，是MVC中的部分C，此处的控制器主要负责功能处理部分：

1、收集、验证请求参数并绑定到命令对象；
2、将命令对象交给业务对象，由业务对象处理并返回模型数据；

*/
const UserModel = require("../modules/user");

class userController {
    // 创建用户
    static async create(ctx) {
        //接收客户端
        let req = ctx.request.body;
        console.log("客户端参数")
        console.log(req);
        if (req.username && req.password && req.role) {
            console.log("进来了");
            try {
                //创建用户模型
                const ret = await UserModel.createUser(req);
                //把刚刚新建的文章ID查询用户详情，且返回新创建的用户信息
                const data = await UserModel.getUserDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建用户成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建用户失败',
                    data: err
                }
            }
        }
        else {
            console.log("没进来");
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐全',
            }
        }
    }

    //获取用户详情
    //param ctx
    static async detial(ctx) {
        let id = ctx.params.id;

        if (id) {
            try {
                //查询用户详情模型
                let data = await UserModel.getUserDetail(id);
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
                msg: '用户ID必须传'
            }
        }
    }

    //获取
    static async getUserInfo(ctx) {
        let req = ctx.request.body;
        console.log("获得request主体");
        console.log(req);
        if (req.username && req.password && req.role) {
            console.log("进来了");
            try {
                //查询用户详情模型
                let data = await UserModel.getUser(req);
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
            console.log("没进来");
            console.log(req.username);
            console.log(req.password);
            console.log(req.role);
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐全'
            }
        }

        // /login?a=2&b=3,get query = {a:2,b:3}
        // /login/4444 /login/:username = params{username=444}
        // /login    post{uartname:9,pwd:3} request.body = {}
    }
}

module.exports = userController;