/**
├── schema
    └── source.js
    学习资源数据表模型定义
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('source', {
        // 资源ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 资源名称
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name',
        },
        // 资源上传者
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'author'
        },
        // 资源(腾讯云对象存储)url
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'url'
        },
        //所属资源列表名称
        menu_name:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'menu_name',
        },
        //资源状态
        state:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'state',
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
