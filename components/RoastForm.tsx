'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { roastProfile } from '@/app/actions/roastProfile'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function RoastForm() {
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [jobTitle, setJobTitle] = useState('')
  const [roast, setRoast] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) {
      setError('Please upload an image first.')
      return
    }
    if (!jobTitle) {
      setError('Please enter your job title.')
      return
    }

    setLoading(true)
    setError('')
    setRoast('')

    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('jobTitle', jobTitle)

      const result = await roastProfile(formData)
      setRoast(result)
    } catch (err) {
      setError('Failed to generate roast. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex flex-col lg:flex-row lg:space-x-8 ${roast ? 'lg:justify-between' : 'justify-center'}`}>
      <div className={`w-full ${roast ? 'lg:w-1/2' : 'lg:w-2/3 xl:w-1/2'} mb-8 lg:mb-0`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Click to upload image</span>
                </div>
              )}
            </label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <Input
            type="text"
            placeholder="Enter your job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading || !image || !jobTitle} className="w-full">
            {loading ? 'Roasting...' : 'Roast Me!'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      {roast && (
        <div className="w-full lg:w-1/2">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-2">Your Roast:</h2>
              <p>{roast}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
