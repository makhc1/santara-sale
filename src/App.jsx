import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider, useCart } from './context/CartContext' // <-- TAMBAHAN INI
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import NewArrivals from './components/sections/NewArrivals'
import CharacterShowcase from './components/sections/CharacterShowcase'
import Recommendations from './components/sections/Recommendations'
import Membership from './components/sections/Membership'
import Community from './components/sections/Community'
import CartPage from './pages/CartPage' // <-- TAMBAHAN INI

gsap.registerPlugin(ScrollTrigger)

// PINDAHKAN ISI APP KE DALAM FUNGSI INI
// Agar bisa membaca state "apakah cart sedang dibuka atau tidak"
function AppContent() {
  const lenisRef = useRef(null)
  const { isCartPageOpen } = useCart() // <-- TAMBAHAN INI

  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 1.4, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true, 
      touchMultiplier: 1.5 
    })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => lenis.destroy()
  }, [])

  // LOGIC GANTI HALAMAN (TANPA ROUTER)
  if (isCartPageOpen) {
    return (
      <>
        <Header />
        <CartPage />
        <Footer />
      </>
    )
  }

  // HALAMAN HOME (DEFAULT)
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

// FUNGSI APP UTAMA (JANGAN DIUBAH STRUKTUR PROVIDERNYA)
export default function App() {
  return (
    <LanguageProvider>
      <CartProvider> {/* <-- WRAP DENGAN CART PROVIDER */}
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  )
}