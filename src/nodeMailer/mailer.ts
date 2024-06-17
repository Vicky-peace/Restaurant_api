import nodemailer from 'nodemailer';    

export const sendEmail = async (email: string, subject: string, message: string): Promise<string> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `${subject}`, 
            text: message,
            html: `<h3>${message}</h3>`,
        };

        const mailRes: nodemailer.SentMessageInfo = await transporter.sendMail(mailOptions);
        let mailResponse = '';
        if (mailRes.accepted.length > 0) {
            mailResponse = 'Email sent successfully';
        } else if (mailRes.rejected.length > 0) {
            mailResponse = 'Email rejected, please try again';
        } else {
            mailResponse = 'Email not sent';
        }
        return mailResponse;    
    } catch (error: any) {
        return JSON.stringify(error.message); 
    }
};


export interface EmailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}

export interface EmailResponse {
    accepted: string[];
    rejected: string[];
    response: string;
    messageId: string;
}   

export interface MailResponse {
    accepted: string[];
    rejected: string[];
}

export const sendRegistrationEmail = async (userMail: string, eventName: string): Promise<string> => {
    try{
        const subject: string = 'Registration Successful';
        const message: string = `Thank you for registering for ${eventName}`;   

        const emailResponse: string = await sendEmail(userMail, subject, message);
        return emailResponse;
    }catch (error: any) {
        throw new Error(error.message);
    }
}