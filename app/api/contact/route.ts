import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let name = '';
    let email = '';
    let subject = '';
    let message = '';

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      name = (body.name || '').trim();
      email = (body.email || '').trim();
      subject = (body.subject || '').trim();
      message = (body.message || '').trim();
    } else {
      const formData = await request.formData();
      name = (formData.get('name') as string || '').trim();
      email = (formData.get('email') as string || '').trim();
      subject = (formData.get('subject') as string || '').trim();
      message = (formData.get('message') as string || '').trim();
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { status: 'error', message: 'Please fill in all required fields (Name, Email, Message).' },
        { status: 400 }
      );
    }

    // Log to server console for local visibility
    console.log('[Contact Message Received]', { name, email, subject, message, date: new Date().toISOString() });

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    // If key is not configured, inform nicely without breaking
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
      console.warn('[Web3Forms Notice] WEB3FORMS_ACCESS_KEY not configured in .env.local yet. Message logged locally.');
      return NextResponse.json({
        status: 'success',
        message: "Thank you! I've received your note and will get back to you soon. (Note: add your WEB3FORMS_ACCESS_KEY to .env.local to route directly to your Gmail inbox)."
      });
    }

    // Forward to Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        replyto: email,
        subject: subject ? `[Portfolio] ${subject}` : `New Portfolio Inquiry from ${name}`,
        message,
        from_name: `${name} (Portfolio Inquiry)`
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({
        status: 'success',
        message: "Thank you! Your message has been sent directly to my inbox. I'll get back to you soon!"
      });
    } else {
      console.error('[Web3Forms Error]', data);
      return NextResponse.json(
        { status: 'error', message: data.message || 'Failed to dispatch email. Please try again or reach out directly.' },
        { status: 502 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
