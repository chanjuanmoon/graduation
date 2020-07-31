/**
├── modules
    └── user.js
    创建实例
*/

//引入db.js
const db = require("../config/db");
//引入Sequelize对象
const Sequelize = db.sequelize;
//引入上一步的文章数据表模型文件
const User = Sequelize.import("../schema/user");
//自动创建表
User.sync({force:false});

class UserModel{
    // 创建用户模型
    static async createUser(data){
        return await User.create({
            username:data.username,//用户名称
            password:data.password,//用户密码
            role:data.role,//用户角色
        })
    }

    //查询用户详细数据
    // @param id 用户id
    static async getUserDetail(id){
        return await User.findOne({
            where :{
                id,
            },
        })
    }

    static async getUser(data){
        return await User.findAll({
            where:{
                // username:data.username,
                // password:data.password,
                role:data.role
            }
        })
    }
}

module.exports = UserModel;