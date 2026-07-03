import { recommendations } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function Recommendations() {
  const { t } = useLanguage()

  return (
    <section id="recommendations" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-2">{t.recommendations.subtitle}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">{t.recommendations.title}</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {recommendations.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}