import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RoastForm from '@/components/RoastForm'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">QwenRoast</h1>
        <p className="text-center mb-8">
          Upload your LinkedIn profile picture, enter your job title, and get roasted by AI!
        </p>
        <RoastForm />
      </main>
      <Footer />
    </div>
  )
}
