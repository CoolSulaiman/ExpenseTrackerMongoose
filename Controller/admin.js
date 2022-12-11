const express=require('express')
const User = require('../Models/user')
const bcrypt=require('bcrypt')

const jwt = require('jsonwebtoken');

exports.postSignup=async(req,res,next)=>{
        try{
                const name=req.body.Name;
                const email=req.body.Email;
                const password=req.body.Password;

                if(!name || !email || !password){
                    return res.status(400).json({message:'add all fields'})
                }

                const user = await User.findAll({where:{email}});
                if(user.length>0){
                    return res.status(409).json({message:'user already exist'})
                }
        
                const saltRounds=10;
                bcrypt.hash(password , saltRounds , async(err,hash) =>{
                    const data= await User.create({
                        Name:name,
                        Email:email,
                        Password:hash,
                        ispremiumuser:false,
                        
                    })
                })
  
        
                return res.status(201).json({message:'successfully created new user'})        }


        catch(err){
        res.status(500).json({error:err})
        }
        

    }


    exports.postLogin=async  (req,res,next)=>{

        try{
        const email=req.body.email;
        const password=req.body.password;

        if( !email || !password){
            return res.status(400).json({message:'add all fields'})
        }

        
        const user = await User.findAll({where:{email}})
        if(user.length === 0){
            return res.status(404).json({message:'user not found'})
        }



        const foundUser = user[0];
        bcrypt.compare(password, foundUser.Password, (err, matchPassUser)=>{
            console.log("typed--" ,password, "databse", foundUser.Password, "compaared---", matchPassUser)
            if(!matchPassUser){
             return res.status(401).json({message:'User not authorized'})
            }
            
            return res.status(200).json({message:'login sucess' , token:generateAccessToken(foundUser.id) ,
            isPremium:foundUser.ispremiumuser
        
        })
         });

        
        // if(foundUser.Password !== password){
        //     return res.status(401).json({message:'invalid password'})
        // }
        //  res.status(200).json(foundUser)
        function generateAccessToken(id){
            return jwt.sign({ userId:id  },'itstoken');
        }
    
    }
    catch(err){
        res.status(500).json({error:err})
        }
    
}


