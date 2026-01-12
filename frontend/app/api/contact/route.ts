import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const resendApiKey = process.env.RESEND_API_KEY; // Ensure this is set in Cloudflare Dashboard

export async function POST(request: Request) {
    if (!resendApiKey) {
        console.error('RESEND_API_KEY is missing');
        // Don't crash at build time, but fail at runtime if key is missing
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    const resend = new Resend(resendApiKey);

    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Send email using Resend
        const data = await resend.emails.send({
            from: 'Sanjivani Contact Form <onboarding@resend.dev>',
            to: ['ghodeleyash2004@gmail.com'],
            replyTo: email,
            subject: `[Contact Form] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #82ae19;">New Contact Form Submission</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    <div style="margin: 20px 0;">
                        <h3>Message:</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
                    <p style="color: #666; font-size: 12px;">
                        This email was sent from the Sanjivani 2.0 contact form.
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
