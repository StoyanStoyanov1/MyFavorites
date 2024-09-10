import emailjs from 'emailjs-com';
import { EMAILJS_USER_ID, EMAILJS_SERVICE_ID} from '../../configs/emailjs-config';

const sendEmail = (username, userId, email) => {
   
    const EMAILJS_TEMPLATE_ID = 'template_pvlde6k';

    const templateParams = {
        to_email: email,
        to_name: username,
        link: `https://myfavorites.onrender.com/confim/${userId}`,
      };
  
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
        .then((response) => {
          console.log('Email sent successfully:', response);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
}

export default sendEmail;