import { NextResponse } from 'next/server';
import { returnMindyAccount, InstagramAnalysis } from './anaylyze_ig_account';

export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export async function POST(request: Request) {
  try {
    // Get account from query or body
    const url = new URL(request.url);
    const queryAccount = url.searchParams.get('account');
    const body = await request.json().catch(() => ({}));
    const bodyAccount = body.account;

    const account = queryAccount || bodyAccount;

    if (!account) {
      return NextResponse.json({ error: 'Account parameter is required' }, { status: 400 });
    }

    // Use returnMindyAccount for @@ or InstagramAnalysis for other accounts
    let results;
    if (account === '@@') {
      results = returnMindyAccount();
    } else {
      results = await InstagramAnalysis(account);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ error: 'Please use POST method' }, { status: 405 });
}
