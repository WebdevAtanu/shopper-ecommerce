import nodemailer from 'nodemailer';

async function mailSender() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'keegan.ryan72@ethereal.email',
      pass: '5maBTvPewM43kSt7PE'
    }
  });

  const mailOptions = {
    from: 'dayton.bashirian97@ethereal.email',
    to: '',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

mailSender();
