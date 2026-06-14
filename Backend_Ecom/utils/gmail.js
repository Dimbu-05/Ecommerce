const nodemailer = require('nodemailer')
require('dotenv').config()
let mail=async(email,username,role)=>{
    //step1 create transport
    let transporter = await nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASS
        }
    })

    let message = {
        from : 'saidimbu1423@gmail.com',
        to : email,
        subject:"Account is created",
        html:`Hi, ${username} your account has been created successfully and your role is ${role} `
    }

    await transporter.sendMail(message);
    console.log('Email sent✅');
}
module.exports = mail;