'use server'

import { OpenAI } from 'openai'

const openai = new OpenAI({
  baseURL: 'https://api.studio.nebius.ai/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
})

export async function roastProfile(formData: FormData): Promise<string> {
  try {
    const image = formData.get('image') as File;
    const jobTitle = formData.get('jobTitle') as string;

    if (!image) {
      throw new Error('No image provided');
    }

    if (!jobTitle) {
      throw new Error('No job title provided');
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Stage 1: Use Qwen model to check if image is a profile picture
    const descriptionResponse = await openai.chat.completions.create({
      model: 'Qwen/Qwen2-VL-72B-Instruct',
      temperature: 0.8,
      messages: [
        {
          role: 'system',
          content: 'You are an image analysis AI. Describe the image provided to determine if it is a human profile picture.'
        },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:image/png;base64,${base64Image}` } }
          ]
        }
      ]
    });

    const description = descriptionResponse.choices[0].message.content;

    // Stage 2: Use Meta-Llama model to roast the profile picture if it is human
    const roastResponse = await openai.chat.completions.create({
      model: 'meta-llama/Meta-Llama-3.1-405B-Instruct',
      temperature: 0.8,
      messages: [
        {
          role: 'system',
          content: 'You are a witty AI that roasts people based on their profile pictures. Be creative and funny. Often start with: "You have go...", "Oh the famous...", "So you are...". Example of roast: "You know, the one where you\'re trying to look like a CEO but you\'re really just a data analyst who spends most of your day staring at spreadsheets..."'
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: `I am a ${jobTitle}. Based on description of my profile picture, roast me, particularly by mocking the way people like to present themselves on LinkedIn in a grandiose manner to feed their egos. description: ${description}. If the image is not a classic profile picture with human face, say you cannot roast.` },

          ]
        }
      ]
    });

    return roastResponse.choices[0].message.content || 'Failed to generate roast.';
  } catch (error) {
    console.error('Error generating roast:', error);
    throw new Error('Failed to generate roast');
  }
}
