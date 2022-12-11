const express=require('express')
const User = require('../Models/UserExpense')
const sequelize=require('sequelize')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const downloadurl=require('../Models/downloadUrl')

const User1=require('../Models/User')
const Expense=require('../Models/UserExpense')

const AWS=require('aws-sdk')

exports.getUser =  (req,res,next)=>{

// User
// .findAll({where :{userId : req.user.id}})
// .then((response)=>{

//     res.status(200).json({response})
// })
// .catch((err)=>{
//     res.status(500).json({err})
// })

let limit_items = +(req.body.itemsPerPage) || 2 ;

let page = req.params.page || 1;

  let totalItems;
  Expense.count({where:{userId:req.user.id}})
    .then((totalProducts) => {
      totalItems = totalProducts;
      return Expense.findAll({
        where:{userId:req.user.id},
        offset: (page - 1) * limit_items,
        limit: limit_items
      });
    })
    .then((products) => {
        console.log("))))))))))))",products)
      res.status(200).json({
        products,
        success: true,
        data: {
          currentPage: page,
          hasNextPage: 
          totalItems > page * limit_items,
          hasPreviousPage: page > 1,
          nextPage: +page + 1,
          previousPage: +page - 1,
          lastPage: Math.ceil(totalItems / limit_items),
        },

    })
});
}

exports.getAllusersforPremimum= (req,res,next)=>{

           User1.findAll({attributes: ['id', 'Name', 'Email']})
           .then(users=>{
            
            res.status(200).json({users})
           })

           .catch((err)=>{
            res.status(500).json({err})
        })
          
}

exports.postExpensespreminm=(req,res,next)=>{

const vc=req.body.OBJ

User.findAll({where:{userId:vc } })
.then((response)=>{

    res.status(200).json({response})
})
.catch((err)=>{
    res.status(500).json({err})
})
};



exports.postAdduser=async (req,res,next)=>{

try{
        const amt=req.body.Amount;
        const des=req.body.Description;
        const category=req.body.Category

const data= await User.create({
    Amount:amt,
    Description:des,
    Category:category,
    userId:req.user.id

})

res.status(201).json({NewUser:data})
}
catch(err){
res.status(500).json({error:err})
}
}

exports.deleteUser=async(req,res,next)=>{

    try{
        const id=req.params.id;

        const data=await User
        .destroy({where:{id:id , userId:req.user.id} })

        res.status(200).json({message:"Successful"})
    }

    catch(err){
        res.status(500).json({error:err})
    }
}

function uploadtoS3(data , filename){

    const  BUCKET_NAME = process.env.BUCKET_NAME
    const IAM_USER_KEY = process.env.IAM_USER_ACCESS_KEY 
    const IAM_SECRET_KEY  = process.env.IAM_USER_SECRET


    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_SECRET_KEY
    })

    //create bucket with parameter to upload
    //our bucket is already created in S3, so no need to create again

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read' // to give public access to file
    }

    return new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err ,s3response)=>{
            if(err){
                console.log('something went wrong')
            }else{
                console.log(s3response)
                resolve(s3response.Location)  
            }
        })
    })

}




exports.downloadExpense= async (req,res,next)=>{

 User.findAll({where:{userId:req.user.id}})
  .then(async response=>{
    const expenseStringify=JSON.stringify(response)

    const filename="Expense.txt";

    
    const fileurl= await uploadtoS3(expenseStringify,filename);

    downloadurl.create({
        fileName:filename,
        fileUrl:fileurl,
        userId:req.user.id
    })


    res.status(200).json({fileurl ,filename, sucess:true})
  })
  .catch(err=>{
    console.log(err)
  })


}


exports.downloadAllUrl = async(req,res,next) => {

    downloadurl.findAll({where:{userId:req.user.id}})
    .then(urls=>{
        if(!urls){
            res.status(404).json({ message:'no urls found with this user' , success: false});
        }
        res.status(200).json({ urls , success: true })

    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({ err})

    })

}

// exports.editUser= async (req,res,next)=>{
//         // const id=req.params.id;
//         // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
//         //  console.log(req.body)
//         // const UpdatedAmount=req.body.Amount;
//         // const UpdatedDescription=req.body.Description;
//         // const UpdatedCategory=req.body.Category;
        
//         // const data= User.findByPk(id)
//         // .then(user=>{
//         //     user.Amount=UpdatedAmount;
//         //     user.Description=UpdatedDescription;
//         //     user.Category=UpdatedCategory;
//         //     user.save()
//         //     res.status(201).json({UpdatedUser:data})
//         // })
//         // .catch(err=>{
//         //     res.status(500).json({error:err})
//         // })
//         try{
//             const id=req.params.id;
    
//             const data=await User
//             .destroy({where:{id:id}})
    
//             res.status(200).json({message:"Successful"})
//         }
    
//         catch(err){
//             res.status(500).json({error:err})
//         }
    
  
// }
