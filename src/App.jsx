import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import NewArrivals from './components/sections/NewArrivals'
import CharacterShowcase from './components/sections/CharacterShowcase'
import Recommendations from './components/sections/Recommendations'
import Membership from './components/sections/Membership'
import Community from './components/sections/Community'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.4,               // Durasi scroll (makin besar makin lambat/mooth)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Formula easeOutExpo (super smooth)
      orientation: 'vertical',     // Arah scroll
      gestureOrientation: 'vertical',
      smoothWheel: true,           // Smooth saat pake scroll mouse
      touchMultiplier: 1.5,        // Kecepatan saat di-swipe di HP/tablet
    })

    lenisRef.current = lenis

    // Hubungkan Lenis sama GSAP ScrollTrigger biar animasi pas
    lenis.on('scroll', ScrollTrigger.update)

    // Gunakan ticker GSAP buat update Lenis setiap frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    // Matikan lag smoothing GSAP biar Lenis yang ngatur
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <NewArrivals />
        <CharacterShowcase />
        <Recommendations />
        <Membership />
        <Community />
      </main>
      <Footer />
    </>
  )
}