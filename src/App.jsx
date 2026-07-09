import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider, useCart } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import NewArrivals from './components/sections/NewArrivals'
import CharacterShowcase from './components/sections/CharacterShowcase'
import Recommendations from './components/sections/Recommendations'
import Membership from './components/sections/Membership'
import Community from './components/sections/Community'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'

gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const lenisRef = useRef(null)
  const { isCartPageOpen } = useCart()
  const { isLoginOpen, isProfileOpen } = useAuth()

  // setup lenis
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 1.5 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => lenis.destroy()
  }, [])

  
  useEffect(() => {
    // Cek jika sedang di Home (bukan di Cart, Login, atau Profile)
    if (!isCartPageOpen && !isLoginOpen && !isProfileOpen) {
      if (window.location.hash) {
        // Delay 150ms biar React selesai render DOM (mengatasi bug munculnya elemen)
        const timer = setTimeout(() => {
          const targetElement = document.querySelector(window.location.hash)
          if (targetElement) {
            // Pakai scrollIntoView bawaan karena Lenis kadang nyangkut di sesi baru
            targetElement.scrollIntoView({ behavior: "smooth" })
          }
        }, 150)
        
        return () => clearTimeout(timer)
      }
    }
  }, [isCartPageOpen, isLoginOpen, isProfileOpen])

  // 3. LOGIN PAGE (Prioritas 1)
  if (isLoginOpen) {
    return (
      <>
        <Header />
        <main className="overflow-x-hidden">
           <Hero /> 
        </main>
        <LoginPage /> 
      </>
    )
  }

  // 4. PROFILE PAGE (Prioritas 2)
  if (isProfileOpen) {
    return (
      <>
        <Header />
        <Profile />
        <Footer />
      </>
    )
  }

  // 5. CART PAGE (Prioritas 3)
  if (isCartPageOpen) {
    return (
      <>
        <Header />
        <CartPage />
        <Footer />
      </>
    )
  }

  // 6. DEFAULT HOME
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
      <AuthProvider> 
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}