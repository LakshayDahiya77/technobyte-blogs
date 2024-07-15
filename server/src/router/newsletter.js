import express from 'express';
const router=express.Router();
import transporter from '../config/nodemailer.js'; 
import User from '../model/user.js';
import { mailer } from "../controllers/newsletter.js";

router.get("/", async (req, res) => {
  res.send(await User.find({ newsletterIsSubscribed: true }));
});

router.get("/email", mailer);

router.post('/newsletter',async(req,res)=>{
    try {
        const {subject,body}=req.body;

        const SubscribedUsers=await User.find({newsletterIsSubscribed: true});
         if (!SubscribedUsers || SubscribedUsers.length==0){
            return res.status(404).json({message: 'No subscribed user found'});
        }
 
        const recipients= SubscribedUsers.map(user=>user.email);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ' ',
            bcc:recipients.join(' '),
            subject: subject,
            text: body,
        });

        res.status(200).json({message: 'Newsletter sent successfully!'});
    }
    catch(error){
        console.error('Error sending newsletter: ',error);
        res.status(500).json({message:'Failed to send newsletter.'});
    }
});

export default router;
