const Sequelize=require('sequelize')
const sequelize = require('../Util/database')

const Expense=sequelize.define('expense',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    
    Amount:{
        type:Sequelize.STRING,
        allowNull:false
    },

    Description:{
        type:Sequelize.STRING,
        allowNull:false
    },

    Category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=Expense;