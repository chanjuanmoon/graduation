/**
├── modules
    └── theme_reply.js
    创建实例
*/

//引入db.js
const db = require("../config/db");
//引入Sequelize对象
const Sequelize = db.sequelize;
//引入上一步的文章数据表模型文件
const ThemeReply = Sequelize.import("../schema/theme_reply");
//自动创建表
ThemeReply.sync({force:false});

class ThemeReplyModel{
    // 创建主题回复模型
    static async createThemeReply(data){
        return await ThemeReply.create({
            content:data.content,//回复内容
            user_id:data.user_id,//用户id
            theme_id:data.theme_id//主题id
        })
    }

    //查询主题回复详细数据
    // @param id 主题ID
    static async getThemeReplyDetail(id){
        return await ThemeReply.findOne({
            where :{
                id,
            },
        })
    }
  
    //找到所有主题回复
    static async getThemeReplyDetail(){
        return await ThemeReply.findAll({

        })
    }
}

module.exports = ThemeReplyModel;