import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, followers, timestamp } = body;

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEETS_ID,
            range: 'Sheet1!A:C', // Adjust range as needed
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[username, followers, timestamp]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Sheets API Error:', error);
        return NextResponse.json({ error: 'Failed to log to sheets' }, { status: 500 });
    }
} 