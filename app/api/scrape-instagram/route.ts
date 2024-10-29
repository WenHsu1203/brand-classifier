import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

export async function POST(request: Request) {
  const { account } = await request.json()

  if (!account) {
    return NextResponse.json({ error: 'Account is required' }, { status: 400 })
  }

  try {
    const scriptPath = path.join(process.cwd(), 'python_scripts', 'analyze_ig_account.py')
    console.log(`Executing Python script: python3 ${scriptPath} ${account} false`)
    const { stdout, stderr } = await execAsync(`python3 ${scriptPath} ${account} false`)

    if (stderr) {
      console.error('Python script error:', stderr)
      return NextResponse.json({ error: 'An error occurred while scraping' }, { status: 500 })
    }

    console.log('Raw stdout:', stdout)

    let results;
    try {
      results = JSON.parse(stdout.trim());
      
      if (results.error) {
        console.error('Scraper error:', results.error);
        return NextResponse.json({ error: results.error }, { status: 400 })
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw stdout:', stdout)
      return NextResponse.json({ error: 'Invalid data received from scraper' }, { status: 500 })
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
