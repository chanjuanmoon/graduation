/**
├── modules
    └── theme.js
    创建实例
*/

//引入db.js
const db = require("../config/db");
//引入Sequelize对象
const Sequelize = db.sequelize;
//引入
const Op = db.Op;
//引入上一步的文章数据表模型文件
const Theme = Sequelize.import("../schema/theme");

//自动创建表
Theme.sync({ force: false });

class ThemeModel {
    // 创建主题模型
    static async createTheme(data) {
        return await Theme.create({
            title: data.title,//主题标题
            user_id: data.user_id,//主题上传者
            content: data.content,//主题内容
            theme_menu_id: data.theme_menu_id,//主题所属主题列表id
        })
    }

    //查询主题详细数据
    // @param id 主题id
    static async getThemeDetail(id) {
        return await Theme.findAll({
            where: {
                id,
            },
        })
    }

    //查询所有主题详细数据
    static async getAllThemeDetail(data){
        return await Theme.findAll({
            
        })
    }
}

module.exports = ThemeModel;