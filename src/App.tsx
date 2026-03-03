import { Heart, Sparkles } from "lucide-react"
import { ShaderAnimation } from "@/components/ui/shader-lines"
import { FlorerAnimation } from "@/components/ui/flower-animation"
import { RomanticMarquee } from "@/components/romantic-marquee"

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-950 via-fuchsia-950 to-slate-950 text-white">
      <div className="absolute inset-0 opacity-40">
        <ShaderAnimation />
      </div>

      <div className="absolute inset-0 bg-black/35" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-12 px-6 py-12 md:px-10">
        <div className="max-w-3xl space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-200/10 px-4 py-2 text-sm text-rose-100 backdrop-blur">
            <Heart className="h-4 w-4 fill-current" />
            Valentine Special
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-rose-50 md:text-6xl">
            Romantic Shader Nights
          </h1>
          <p className="max-w-2xl text-base text-rose-100/90 md:text-lg">
            A dreamy love-note landing page with flowing neon lines, warm tones, and a soft romantic glow.
          </p>
        </div>

        {/* Flower Animation Center */}
        <div className="flex justify-center py-2 sm:py-4">
          <FlorerAnimation />
        </div>

        {/* Romantic Movie Lines Marquee */}
        <div className="w-full">
          <RomanticMarquee />
        </div>

        <div className="flex items-center gap-3 text-rose-100/90 justify-center">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm md:text-base">Made with love, light, and shader lines.</span>
        </div>
      </section>
    </main>
  )
}

export default App
