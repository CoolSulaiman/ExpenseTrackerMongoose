const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const expenseSchema = new Schema({
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = mongoose.model('Expense' , expenseSchema)

// const Sequelize=require('sequelize')
// const sequelize = require('../Util/database')

// const Expense=sequelize.define('expense',{

//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
    
//     Amount:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },

//     Description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },

//     Category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports=Expense;