import emailjs from 'emailjs-com';
import { EMAILJS_USER_ID, EMAILJS_SERVICE_ID} from '../../configs/emailjs-config';

const sendEmail = (username, userId, email) => {
   
    const EMAILJS_TEMPLATE_ID = 'template_pvlde6k';

    const templateParams = {
        to_email: email,
        to_name: username,
        link: `http://localhost:5173/confim/${userId}`,
      };
  
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
        .then((response) => {
          console.log('Email sent successfully:', response);
          alert('Email sent successfully!');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          alert('Failed to send email.');
        });
}

export default sendEmail;