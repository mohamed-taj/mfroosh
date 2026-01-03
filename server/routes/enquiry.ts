import { RequestHandler } from "express";
import { EnquiryResponse } from "@shared/api";

/**
 * Email Configuration Guide:
 *
 * To enable email sending for enquiries, you have several options:
 *
 * Option 1: EmailJS (Easiest - Free tier available)
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email template and note your Service ID, Template ID, and Public Key
 * 3. Set environment variables:
 *    - EMAIL_SERVICE_URL=https://api.emailjs.com/api/v1.0/email/send
 *    - EMAIL_SERVICE_KEY=your_public_key
 *    - EMAILJS_SERVICE_ID=your_service_id
 *    - EMAILJS_TEMPLATE_ID=your_template_id
 *
 * Option 2: SendGrid (Professional)
 * 1. Sign up at https://sendgrid.com/
 * 2. Get your API key
 * 3. Set environment variables:
 *    - SENDGRID_API_KEY=your_sendgrid_api_key
 *    - COMPANY_EMAIL=info@mfrooshtrade.com
 *
 * Option 3: Gmail SMTP (Simple)
 * 1. Enable 2-factor authentication on your Gmail account
 * 2. Create an app password at https://myaccount.google.com/apppasswords
 * 3. Set environment variables:
 *    - SMTP_HOST=smtp.gmail.com
 *    - SMTP_PORT=587
 *    - SMTP_USER=your_email@gmail.com
 *    - SMTP_PASSWORD=your_app_password
 *    - COMPANY_EMAIL=your_email@gmail.com
 *
 * Currently, the form logs enquiries to console and expects a generic EMAIL_SERVICE_URL.
 * Implement your preferred email service in this handler.
 */

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  message: string;
}

export const handleEnquiry: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, company, product, message }: EnquiryData = req.body;

    // Validate required fields
    if (!name || !email || !phone || !product || !message) {
      const response: EnquiryResponse = {
        success: false,
        message: "Missing required fields",
      };
      return res.status(400).json(response);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const response: EnquiryResponse = {
        success: false,
        message: "Invalid email address",
      };
      return res.status(400).json(response);
    }

    // Send email using fetch to a mail service (like EmailJS, SendGrid, or custom)
    // For now, we'll log the enquiry and send a confirmation
    console.log("Enquiry received:", {
      name,
      email,
      phone,
      company,
      product,
      message,
      timestamp: new Date().toISOString(),
    });

    // Prefer Resend when configured (modern, reliable)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.COMPANY_EMAIL || "noreply@mfrooshtrade.com",
          to: process.env.COMPANY_EMAIL || "info@mfrooshtrade.com",
          subject: `New Enquiry from ${name} - ${product}`,
          html: `
            <h2>New Product Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            <p><strong>Product Interest:</strong> ${product}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (resendError) {
        console.error("Resend email error:", resendError);
      }
    } else {
      // Fallback to generic email service URL + key (custom providers / EmailJS)
      const emailServiceUrl = process.env.EMAIL_SERVICE_URL;
      const emailServiceKey = process.env.EMAIL_SERVICE_KEY;

      if (emailServiceUrl && emailServiceKey) {
        try {
          await fetch(emailServiceUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${emailServiceKey}`,
            },
            body: JSON.stringify({
              to: process.env.COMPANY_EMAIL || "info@mfrooshtrade.com",
              subject: `New Enquiry from ${name} - ${product}`,
              html: `
                <h2>New Product Enquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                <p><strong>Product Interest:</strong> ${product}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
              `,
            }),
          });
        } catch (emailError) {
          console.error("Email service error:", emailError);
          // Continue even if email service fails - we've logged the enquiry
        }
      }
    }

    // Send success response
    const response: EnquiryResponse = {
      success: true,
      message: "Enquiry submitted successfully. We'll contact you soon.",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Enquiry handler error:", error);
    const response: EnquiryResponse = {
      success: false,
      message: "Failed to process enquiry. Please try again.",
    };
    res.status(500).json(response);
  }
};
