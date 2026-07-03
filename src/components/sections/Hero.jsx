import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { useLanguage } from '../../context/LanguageContext'

const HERO_IMG = "https://i.ibb.co.com/Zj5TBtx/PRICE-4.png"

export default function Hero() {
  const { t } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-[#111] overflow-hidden">
      <img src={HERO_IMG} alt="" className="hidden" onLoad={() => setIsLoaded(true)} />
      <div className={`absolute inset-0 transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <img src={HERO_IMG} alt="SANTARA Universe" className="w-full h-full object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <p className="text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-4 font-medium">{t.hero.subtitle}</p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.85] mb-6 max-w-4xl">{t.hero.title1}<br />{t.hero.title2}</h1>
          <p className="text-white/70 text-base md:text-lg max-w-md mb-10 leading-relaxed">{t.hero.desc}</p>
          <div className="flex items-center gap-4">
            <a href="#new-arrivals"><Button>{t.hero.btn1}</Button></a>
            <a href="#characters"><Button variant="outline" className="!border-white/20 !text-white hover:!bg-white hover:!text-foreground">{t.hero.btn2}</Button></a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/40 tracking-widest uppercase">{t.hero.scroll}</span>
          <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
            <motion.div animate={{ y: [0, 32], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-1/2 bg-white" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}