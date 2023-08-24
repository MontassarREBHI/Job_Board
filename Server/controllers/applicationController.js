const Application = require("../models/application");
const transporter=require('../nodeMailerConfig')




const manageApplication=async(req,res)=>{
  
    const {id,status}=req.body
    const applicationOutcome= await Application.findOneAndUpdate({_id:id},{status},{new:true})
    var mailOptions = {
        from: 'oussemabenbouali.bouyahia@gmail.com',
        to: 'montassarrebhi1@gmail.com',
        subject: 'Application status',
        text: applicationOutcome.status
      };
      
      
    
    if(applicationOutcome) {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
        res.status(200).json({applicationOutcome,message:'application status updated successfully!'})
   
}
    else res.status(400).send('somthing went wrong')
  
     
  
  }

  module.exports={manageApplication}