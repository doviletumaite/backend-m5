import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export const sendEmail = async recipientAdress => {
    const message = {
        to: recipientAdress, // add in postman body
        from: "dovile.tumaite@yahoo.it", 
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      }
    await sgMail.send(message)
}