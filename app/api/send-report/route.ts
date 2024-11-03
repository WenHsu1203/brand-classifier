import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { generateEmailTemplate } from './emailTemplate';
// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD  // Use app-specific password for Gmail
  }
});

// Add Google Sheets auth configuration
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const htmlContent = generateEmailTemplate(data);
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: '開啟你的自創品牌之路！立即查看專屬於你的IG分析結果',
      html: htmlContent,
    });

    // Log email sending to Google Sheets
    const timestamp = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: 'emails!A:C',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[data.username, data.email, timestamp]],
        },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 

