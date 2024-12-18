import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col items-center gap-2">
        <p>&copy; 2023 QwenRoast. All rights reserved.</p>
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
    </footer>
  )
}
