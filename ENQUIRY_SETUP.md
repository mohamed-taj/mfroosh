# Enquiry Form Email Configuration Guide

The MFROOSH landing page now includes a fully functional enquiry form that captures customer information. This guide will help you configure email sending to receive enquiry notifications.

## How the Enquiry Form Works

1. **Form Submission**: Customers fill out the enquiry form with their details (name, email, phone, company, product interest, and message)
2. **Validation**: The form validates all required fields on the client side
3. **API Request**: Form data is sent to `/api/send-enquiry` endpoint
4. **Email Sending**: The server processes the enquiry and sends an email notification
5. **Feedback**: User receives success/error message

## Current Status

✅ **Form is fully functional** - enquiries are logged to the server console
⚠️ **Email sending is not yet configured** - you need to set up an email service

## Email Service Options

### Option 1: EmailJS (Recommended - Easiest Setup)

**Pros**: Free tier available, no backend email server needed, beginner-friendly
**Cons**: Limited to 200 emails/month on free tier

#### Setup Steps:

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Connect an email service (Gmail, Outlook, or use EmailJS SMTP)
3. Create an email template in the EmailJS dashboard
4. Note your credentials:
   - Service ID
   - Template ID
   - Public API Key

5. Add environment variables to your `.env` file:
   ```
   EMAIL_SERVICE_URL=https://api.emailjs.com/api/v1.0/email/send
   EMAIL_SERVICE_KEY=your_emailjs_public_key
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   COMPANY_EMAIL=info@mfrooshtrade.com
   ```

6. Update the `server/routes/enquiry.ts` file to use EmailJS API:
   ```typescript
   // Replace the email sending section with:
   if (emailServiceUrl && emailServiceKey) {
     const emailjsResponse = await fetch(emailServiceUrl, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         service_id: process.env.EMAILJS_SERVICE_ID,
         template_id: process.env.EMAILJS_TEMPLATE_ID,
         user_id: emailServiceKey,
         template_params: {
           to_email: process.env.COMPANY_EMAIL,
           from_name: name,
           from_email: email,
           phone: phone,
           company: company,
           product: product,
           message: message,
         },
       }),
     });
   }
   ```

### Option 2: SendGrid (Professional)

**Pros**: Reliable, scalable, free tier with 100 emails/day
**Cons**: Requires backend API call, needs node-fetch or similar

#### Setup Steps:

1. Sign up at [SendGrid.com](https://sendgrid.com/)
2. Create an API key in Settings → API Keys
3. Add environment variables:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   COMPANY_EMAIL=info@mfrooshtrade.com
   ```

4. Install SendGrid npm package:
   ```bash
   pnpm add @sendgrid/mail
   ```

5. Update `server/routes/enquiry.ts`:
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   // In the email sending section:
   if (process.env.SENDGRID_API_KEY) {
     await sgMail.send({
       to: process.env.COMPANY_EMAIL,
       from: 'noreply@mfrooshtrade.com',
       subject: `New Enquiry from ${name} - ${product}`,
       html: `
         <h2>New Product Enquiry</h2>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone}</p>
         ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
         <p><strong>Product Interest:</strong> ${product}</p>
         <p><strong>Message:</strong></p>
         <p>${message.replace(/\n/g, '<br>')}</p>
       `,
     });
   }
   ```

### Option 3: Resend (Modern Alternative)

**Pros**: Modern API, good developer experience, free tier available
**Cons**: Requires Resend account

#### Setup Steps:

1. Sign up at [Resend.com](https://resend.com/)
2. Create an API key
3. Add environment variable:
   ```
   RESEND_API_KEY=your_resend_api_key
   COMPANY_EMAIL=info@mfrooshtrade.com
   ```

4. Install Resend:
   ```bash
   pnpm add resend
   ```

5. Update `server/routes/enquiry.ts`:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // In the email sending section:
   if (process.env.RESEND_API_KEY) {
     await resend.emails.send({
       from: 'noreply@mfrooshtrade.com',
       to: process.env.COMPANY_EMAIL,
       subject: `New Enquiry from ${name} - ${product}`,
       html: `
         <h2>New Product Enquiry</h2>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone}</p>
         ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
         <p><strong>Product Interest:</strong> ${product}</p>
         <p><strong>Message:</strong></p>
         <p>${message.replace(/\n/g, '<br>')}</p>
       `,
     });
   }
   ```

### Option 4: Gmail SMTP (Budget Option)

**Pros**: Uses your existing Gmail account, free
**Cons**: Less reliable for production, needs app passwords

#### Setup Steps:

1. Enable 2-factor authentication on your Gmail account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create an app password for "Mail" and "Windows Computer"
4. Copy the 16-character password
5. Add environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_16_char_app_password
   COMPANY_EMAIL=your_email@gmail.com
   ```

6. Install nodemailer:
   ```bash
   pnpm add nodemailer
   ```

7. Update `server/routes/enquiry.ts`:
   ```typescript
   import nodemailer from 'nodemailer';
   
   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT || '587'),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD,
     },
   });
   
   // In the email sending section:
   if (process.env.SMTP_USER) {
     await transporter.sendMail({
       from: process.env.SMTP_USER,
       to: process.env.COMPANY_EMAIL,
       subject: `New Enquiry from ${name} - ${product}`,
       html: `
         <h2>New Product Enquiry</h2>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone}</p>
         ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
         <p><strong>Product Interest:</strong> ${product}</p>
         <p><strong>Message:</strong></p>
         <p>${message.replace(/\n/g, '<br>')}</p>
       `,
     });
   }
   ```

## Testing Your Setup

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Fill out the enquiry form on the website
3. Check:
   - Browser console for success/error messages
   - Server console for logs
   - Your email inbox (and spam folder)

## Troubleshooting

### Form submits but no email received
- Check environment variables are set correctly
- Verify API credentials are valid
- Check server logs for error messages
- Verify the `to` email address is correct

### "Email service error" message
- Check that EMAIL_SERVICE_URL is set if using custom service
- Verify API keys have the correct permissions
- For SendGrid/Resend, ensure the package is installed

### CORS or network errors
- Ensure email service endpoint is accessible
- Check that your API key is valid
- Verify firewall/network settings

## Production Deployment

When deploying to production:

1. Use your hosting provider's environment variable configuration
2. Set `COMPANY_EMAIL` to your actual business email
3. Use a professional email service (SendGrid, Resend, or EmailJS)
4. Test the form before going live
5. Consider setting up email reply-to address for customer responses

## File References

- **Form Component**: `client/components/EnquiryForm.tsx`
- **API Route**: `server/routes/enquiry.ts`
- **Server Setup**: `server/index.ts`
- **Shared Types**: `shared/api.ts`

## Support

For issues or questions:
- Check the email service documentation
- Review server console logs
- Verify environment variables are set
- Contact support for your email service
