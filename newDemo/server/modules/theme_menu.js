/**
├── modules
    └── theme_menu.js
    创建实例
*/

//引入db.js
const db = require("../config/db");
//引入Sequelize对象
const Sequelize = db.sequelize;
//引入上一步的文章数据表模型文件
const ThemeMenu = Sequelize.import("../schema/theme_menu");
//自动创建表
ThemeMenu.sync({force:false});

class ThemeMenuModel{
    // 创建主题模型
    static async createThemeMenu(data){
        return await ThemeMenu.create({
            name:data.name,//名称
        })
    }

    //查询主题列表详细数据
    // @param id 主题列表id
    static async getThemeeMenuDetail(id){
        return await ThemeMenu.findOne({
            where :{
                id,
            },
        })
    }

    static async getThemeIdByName(data){
        return await ThemeMenu.findOne({
            where:{
                name:data.name
            }
        })
    }
}

module.exports = ThemeMenuModel;