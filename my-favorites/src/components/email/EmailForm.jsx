import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { EMAILJS_USER_ID, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../../configs/emailjs-config';
import translateHeader from '../../utils/translator/translateHeader';
import { useLanguage } from '../../context/LanguageContext';
import translateEmail from '../../utils/translator/translateEmail/translateEmail';

const EmailForm = () => {
  const [language] = useLanguage();

  const [fromEmail, setFromEmail] = useState(''); // Имейл на потребителя
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_email: fromEmail,
      subject,
      message: text,
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
  };

  return (<div id='content-body'>
        <h1 className='content-header'>{translateHeader.contactUs[language]}</h1>

    <form onSubmit={handleSubmit} className="email-form">
    <p className='contactUs'>{translateEmail.contactUs[language]}</p>
    <p className='contactProvide'>{translateEmail.contactProvide[language]}</p>

      <label>
        Your Email:
        <input
          type="email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </label>
      <button type="submit">Send Email</button>
    </form>
  </div>
  );
};

export default EmailForm;
