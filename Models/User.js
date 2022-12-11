const Sequelize=require('sequelize')
const sequelize = require('../Util/database')

const User=sequelize.define('users',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    },

    Email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    },

    Password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ispremiumuser: Sequelize.BOOLEAN
})

module.exports=User