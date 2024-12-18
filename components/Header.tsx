import { Flame } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-gray-50 text-black py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Flame className="w-8 h-8 mr-2" />
          <span className="text-2xl font-bold">QwenRoast</span>
        </div>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm"
          href="https://nebius.com/studio/inference?utm_medium=cpc&utm_source=voteLLM&utm_campaign=Network_en_all_lgen_inference_cloud&utm_term=voteLLM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/nebius-logo.png"
            alt="Nebius logo"
            width={16}
            height={16}
          />
          Built with Nebius AI Studio →
        </a>
      </div>
    </header>
  )
}
