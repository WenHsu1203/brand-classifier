import { google } from 'googleapis';
import { NextResponse } from 'next/server';


// Google Sheets Authentication
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
        const { username, timestamp } = await request.json();

        // Append the data to the sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEETS_ID,
            range: 'summary!A:B', 
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[username, timestamp]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to log share click:', error);
        return NextResponse.json({ error: 'Failed to log share click' }, { status: 500 });
    }
} 