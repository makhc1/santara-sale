import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard.jsx'
import { newArrivals } from '../../data/products.js'

export default function NewArrivals() {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section id="new-arrivals" className="py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12 mb-8 md:mb-12">
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-2">Just Dropped</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">New Arrivals</h2>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:border-foreground hover:text-white transition-all duration-300 group" aria-label="Previous">
              <ChevronLeft className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:border-foreground hover:text-white transition-all duration-300 group" aria-label="Next">
              <ChevronRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 sm:px-6 lg:px-12 pb-4
                     [-webkit-overflow-scrolling:touch]
                     [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {newArrivals.map((product, i) => (
            <div key={product.id} className="snap-start shrink-0 w-[72vw] sm:w-[45vw] md:w-[32vw] lg:w-[24vw] xl:w-[22vw]">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden mt-4 flex items-center justify-center gap-2 text-muted">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
        <span className="text-[11px] tracking-wider uppercase font-medium">Geser untuk melihat lebih banyak</span>
      </div>
    </section>
  )
}