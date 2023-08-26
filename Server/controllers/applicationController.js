const Application = require("../models/application");
const Job = require("../models/job");
const { transporter } = require("../nodeMailerConfig");
var nodemailer = require("nodemailer");
const {
  generateAcceptanceEmail,
  generateRejectionEmail,
} = require("../emailTemplates");

const manageApplication = async (req, res) => {
  const { id, status } = req.body;
  const applicationOutcome = await Application.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true }
  );
  const job = await Job.findOne({ _id: applicationOutcome.jobID });

  var mailOptions = {
    to: applicationOutcome.email,
    subject: "Application status",
    text:
      applicationOutcome.status === "accepted"
        ? generateAcceptanceEmail(
            applicationOutcome.fullName,
            job.companyDesc,
            job.title
          )
        : generateRejectionEmail(
            applicationOutcome.fullName,
            job.companyDesc,
            job.title
          ),
  };

  if (applicationOutcome) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      applicationOutcome,
      message: "application status updated successfully!",
    });
  } else res.status(400).send("somthing went wrong");
};

module.exports = { manageApplication };
