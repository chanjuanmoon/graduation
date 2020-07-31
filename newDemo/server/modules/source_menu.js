/**
├── modules
    └── source_menu.js
    创建实例
*/

//引入db.js
const db = require("../config/db");
//引入Sequelize对象
const Sequelize = db.sequelize;
//引入上一步的文章数据表模型文件
const SourceMenu = Sequelize.import("../schema/source_menu");
//自动创建表
SourceMenu.sync({force:false});

class SourceMenuModel{
    // 创建用户模型
    static async createSourceMenu(data){
        return await SourceMenu.create({
            name:data.name,//名称
        })
    }

    //查询资源列表详细数据
    // @param id 资源列表id
    static async getSourceMenuDetail(id){
        return await SourceMenu.findOne({
            where :{
                id,
            },
        })
    }
}

module.exports = SourceMenuModel;