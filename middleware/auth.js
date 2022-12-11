const jwt= require('jsonwebtoken')
const User= require('../Models/User')

exports.authentication= (req,res,next)=>{


const token=req.header('Authorisation')
console.log(token,"  ------------+++++++++++++")
const user = (jwt.verify(token , 'itstoken' ))
console.log(user,"  aaaaaaaaaaaaaaaaa")
    User.findByPk(user.userId).then(foundUser=>{
        console.log(foundUser,"  ========================")

        req.user = foundUser ;
        next();
    })

}





