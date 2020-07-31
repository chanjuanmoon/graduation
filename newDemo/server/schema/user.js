/**
├── schema
    └── user.js
    用户数据表模型定义
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        // user ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        //user name
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'username',
        },
        // user password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        // user 角色
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'role'
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })
}
