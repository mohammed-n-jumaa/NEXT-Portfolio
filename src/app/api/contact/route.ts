import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // تأكد أن أسماء الحقول هنا مطابقة للأسماء في template تبعك بـ EmailJS
    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: name,        // اسم المرسل
        from_email: email,      // ايميل المرسل
        subject: subject,       // الموضوع
        message: message        // الرسالة
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('EmailJS API error response:', text);
      throw new Error('EmailJS failed to send email');
    }

    console.log('EmailJS API response:', text);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error in /api/contact:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
