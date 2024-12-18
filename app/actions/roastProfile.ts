'use server'

import { OpenAI } from 'openai'

const openai = new OpenAI({
  baseURL: 'https://api.studio.nebius.ai/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
})


export async function roastProfile(formData: FormData): Promise<string> {
  try {
    const image = formData.get('image') as File
    const jobTitle = formData.get('jobTitle') as string

    if (!image) {
      throw new Error('No image provided')
    }

    if (!jobTitle) {
      throw new Error('No job title provided')
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    const response = await openai.chat.completions.create({
      model: 'Qwen/Qwen2-VL-72B-Instruct',
      temperature: 0.8,
      messages: [
        {
          role: 'system',
          content: "You are a witty AI that roasts people based on their profile pictures. Be creative and funny. Often start with: 'You have go...', 'Oh the famous...', 'So you are...'. Example of roast: 'You know, the one where you're trying to look like a CEO but you're really just a data analyst who spends most of your day staring at spreadsheets. That black turtleneck is a dead giveaway, trying to channel your inner Steve Jobs but ending up looking like you're about to star in a low-budget tech thriller. And that neutral background? Classic move to make it look like you're in a fancy office, but we all know it's probably just your living room with the couch out of frame. Keep dreaming, data wizard!'",
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `I am a ${jobTitle}. Based on my profile picture, roast me, particularly by mocking the way people like to present themselves on LinkedIn in a grandiose manner to feed their egos.`
            },
            { type: 'image_url', image_url: { url: `data:image/png;base64,${base64Image}` } },
          ],
        },
      ],
    })

    return response.choices[0].message.content || 'Failed to generate roast.'
  } catch (error) {
    console.error('Error generating roast:', error)
    throw new Error('Failed to generate roast')
  }
}
