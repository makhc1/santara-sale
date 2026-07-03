import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './context/LanguageContext' // <-- YANG INI YANG BELUM ADA
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
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 1.5 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => lenis.destroy()
  }, [])

  return (
    <LanguageProvider> {/* <-- YANG INI JUGA YANG BELUM ADA */}
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
    </LanguageProvider>
  )
}