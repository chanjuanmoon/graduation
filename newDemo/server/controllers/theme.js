/**
├── controllers
    └── theme.js
Controller控制器，是MVC中的部分C，此处的控制器主要负责功能处理部分：

1、收集、验证请求参数并绑定到命令对象；
2、将命令对象交给业务对象，由业务对象处理并返回模型数据；

*/
const ThemeModel = require("../modules/theme");

class themeController {
    // 创建用户
    static async create(ctx) {
        //接收客户端
        let req = ctx.request.body;
        console.log(req);
        if (req.title && req.user_id && req.content && req.theme_menu_id) {
            console.log("进来了");
            try {
                //创建主题模型
                const ret = await ThemeModel.createTheme(req);
                //把刚刚新建的主题ID查询主题详情，且返回新创建的主题信息
                const data = await ThemeModel.getThemeDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建主题成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建主题失败',
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

    //获取全部主题
    static async getAllThemeDetail(ctx) {
        let req = ctx.request.body;

        if (req) {
            console.log("进来了");
            try {
                //查询主题详情模型
                let data = await ThemeModel.getAllThemeDetail(req);
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
                    data: err
                }
            }
        }
        else {
            console.log("没进来");
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐全'
            }
        }

    }
}

module.exports = themeController;