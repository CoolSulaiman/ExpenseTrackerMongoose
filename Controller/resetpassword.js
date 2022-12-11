const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const User = require('../Models/User');
const Forgotpassword = require('../Models/forgotpassword');

 exports.forgotpassword = async (req, res) => {

    try {
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        const rc=user.dataValues.id
        if(user){
            const id = uuid.v4();
            Forgotpassword.create({ id , active: true, userId:rc })
                .catch(err => {
                    throw new Error(err)
                })

            sgMail.setApiKey(process.env.SENGRID_API_KEY)

            const msg = {
                to: email, // Change to your recipient
                from: 'mashupofmeals@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:8000/password/resetpassword/${id}">Reset password</a>`,
            }

            sgMail
            .send(msg)
            .then((response) => {
                return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

            })
            .catch((error) => {
                throw new Error(error);
            })

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}

 exports.resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

exports.updatepassword=(req,res,next)=>{

            const { newpassword } = req.query;
            const { resetpasswordid } = req.params;
            Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest=>{
 
    User.findOne({where:{id:resetpasswordrequest.userId}})
    .then(user=>{
        if(user){
            // Encryption of password
            const saltRounds=10;

            bcrypt.hash(newpassword , saltRounds , async(err,hash) =>{
                if(err){
                     console.log(err);
                     throw new Error(err);
                   }
                 
                console.log(user)
                console.log(hash)
             
                user.update({ Password: hash }).then(() => {
                      res.status(201).json({message: 'Successfuly update the new password'})
                 })

            })

        }else{
                    return res.status(404).json({errp:'No user Exists' , success: false})
        }
    })

})
.catch(err=>{
    console.log(err)
})


}


