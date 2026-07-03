import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider, useCart } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext' // <-- TAMBAHAN
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import NewArrivals from './components/sections/NewArrivals'
import CharacterShowcase from './components/sections/CharacterShowcase'
import Recommendations from './components/sections/Recommendations'
import Membership from './components/sections/Membership'
import Community from './components/sections/Community'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage' // <-- TAMBAHAN

gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const lenisRef = useRef(null)
  const { isCartPageOpen } = useCart()
  const { isLoginOpen, user } = useAuth() // <-- TAMBAHAN

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 1.5 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => lenis.destroy()
  }, [])

  // 1. LOGIN PAGE (Prioritas Utama, muncul di atas segalanya sebagai overlay)
  if (isLoginOpen) {
    return (
      <>
        <Header />
        <main className="overflow-x-hidden">
           <Hero /> {/* Biar background kelihatan, atau bisa diganti jadi <div className="h-screen bg-[#f0f4f0]"></div> */}
        </main>
        <LoginPage /> {/* Ini muncul sebagai pop-up full screen */}
      </>
    )
  }

  // 2. CART PAGE
  if (isCartPageOpen) {
    return (
      <>
        <Header />
        <CartPage />
        <Footer />
      </>
    )
  }

  // 3. DEFAULT HOME
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

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider> {/* <-- WRAP DENGAN AUTH */}
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}