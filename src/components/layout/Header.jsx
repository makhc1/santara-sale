import { useState, useEffect } from 'react'
// HAPUS: import { Link } from 'react-router-dom'
import { Search, User, Heart, ShoppingBag, Menu, Globe } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useCart } from '../../context/CartContext' // Pastikan ini ada
import MobileMenu from './MobileMenu'

export default function Header() {
  const { toggleLang, lang, t } = useLanguage()
  const { totalItems, openCartPage } = useCart() // <-- TAMBAHKAN openCartPage
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'}`}>
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-6 w-1/3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden text-foreground"><Menu size={22} /></button>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
              <a href="#new-arrivals" className="hover:text-foreground transition-colors">{t.nav.new}</a>
              <a href="#characters" className="hover:text-foreground transition-colors">{t.nav.characters}</a>
              <a href="#recommendations" className="hover:text-foreground transition-colors">{t.nav.collections}</a>
            </nav>
          </div>

          <a href="#" className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-extrabold tracking-tighter text-foreground">SANTARA</a>

          <div className="flex items-center justify-end gap-3 sm:gap-4 w-1/3">
            <button onClick={toggleLang} className="hidden sm:flex items-center gap-1.5 text-xs font-bold border border-border px-3 py-1.5 rounded-full hover:bg-foreground hover:text-white hover:border-foreground transition-colors">
              <Globe size={14} /> {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <button className="hidden sm:block text-foreground hover:text-accent transition-colors"><Search size={20} /></button>
            <button className="text-foreground hover:text-accent transition-colors"><User size={20} /></button>
            
            {/* UBAH LINK JADI BUTTON */}
            <button onClick={openCartPage} className="relative text-foreground hover:text-accent transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  )
}