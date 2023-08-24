const generateAcceptanceEmail = (applicantName, companyName) => `
Dear ${applicantName},

Congratulations! We are pleased to inform you that your application has been accepted for the position. Welcome to our team!

Please let us know your availability for the next steps in the onboarding process.

Best regards,
${companyName}
`;

const generateRejectionEmail = (applicantName, companyName) => `
Dear ${applicantName},

Thank you for your interest in the position. After careful consideration, we regret to inform you that your application has not been selected for further consideration.

We appreciate your time and effort in applying to our company. We wish you the best in your job search.

Sincerely,
${companyName}
`;

module.exports = { generateAcceptanceEmail, generateRejectionEmail };
