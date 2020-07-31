/**
├── schema
    └── theme_reply.js
    用户数据表模型定义
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('theme_reply', {
        // theme_reply ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        //theme_reply content
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content',
        },
        // theme_reply user_id
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        // theme_reply theme_id
        theme_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'theme_id'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })
}
