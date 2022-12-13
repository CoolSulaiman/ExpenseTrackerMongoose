const jwt= require('jsonwebtoken')
const User= require('../Models/user')

exports.authentication= (req,res,next)=>{


const token=req.header('Authorisation')
console.log(token,"  ------------+++++++++++++")
const user = (jwt.verify(token , 'itstoken' ))
console.log(user,"  aaaaaaaaaaaaaaaaa")
    User.findById(user.userId).then(foundUser=>{
        console.log(foundUser,"  ========================")

        req.user = foundUser ;
        next();
    })

}





