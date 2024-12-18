import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()

    // Extract og:image URL
    const match = html.match(/<meta property="og:image" content="(.*?)"/)
    const imageUrl = match ? match[1] : null

    if (!imageUrl) {
      return NextResponse.json({ error: 'OG image not found' }, { status: 404 })
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Error fetching OG image:', error)
    return NextResponse.json({ error: 'Failed to fetch OG image' }, { status: 500 })
  }
}

