/**
├── modules
    └── source.js
    创建实例
*/

//引入db.js
const db = require("../config/db");
//引入Sequelize对象
const Sequelize = db.sequelize;
//引入
const Op = db.Op;
//引入上一步的文章数据表模型文件
const Source = Sequelize.import("../schema/source");

//自动创建表
Source.sync({ force: false });

class SourceModel {
    // 创建资源模型
    static async createSource(data) {
        return await Source.create({
            name: data.name,//资源名称
            author: data.author,//资源上传者
            url: data.url,//资源url
            menu_name: data.menu_name,//资源所属资源列表名称,
            state: data.state,//资源状态
        })
    }

    //查询资源详细数据
    // @param id 资源id
    static async getsourceDetail(id) {
        return await Source.findAll({
            where: {
                id,
            },
        })
    }

    //查询全部资源
    static async getSourceAll(data) {
        return await Source.findAll({
            where:{
                menu_name:data.menu_name
            }
        })
    }

    //模糊查询
    static async getSourceVague(data) {
        console.log(Op);
        return await Source.findAll({
            where: {
                // name:data.name
                name: {
                    [Op.like]: '%'+data.name+'%'
                }
            }
        })
    }
}

module.exports = SourceModel;