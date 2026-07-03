import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import Badge from './Badge'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'

function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num)
}

export default function ProductCard({ product, index = 0 }) {
  const [isLiked, setIsLiked] = useState(false)
  
  // INISIALISASI HOOKS
  const { addToCart } = useCart()
  const { t } = useLanguage()
  const { user, openLogin } = useAuth()
  
  const isOut = product.badge === 'outofstock'

  // FUNGSI TAMBAH KE KERANJANG (DENGAN CEK LOGIN)
  const handleAddToCart = (e) => {
    e.stopPropagation()
    
    // CEK: Kalau belum login, buka halaman login
    if (!user) {
      openLogin()
      return
    }
    
    // Kalau sudah login, tambahkan ke cart
    addToCart(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-background rounded-2xl overflow-hidden border border-border hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-card">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isOut ? 'grayscale' : ''}`}
          loading="lazy" 
        />
        
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge type={product.badge}>
              {product.badge === 'new' ? 'NEW' : product.badge === 'limited' ? 'LIMITED' : product.badge === 'bestseller' ? 'BEST SELLER' : 'SOLD OUT'}
            </Badge>
          </div>
        )}

        <button 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked) }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={16} className={isLiked ? "fill-accent text-accent" : "text-muted"} />
        </button>

        {!isOut && (
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            
            {/* TOMBOL ADD TO CART YANG SUDAH DIPERBAIKI */}
            <button 
              onClick={handleAddToCart} 
              className="flex-1 bg-foreground text-white text-xs font-semibold tracking-wide uppercase py-2.5 rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingBag size={14} /> {t.productCard.addToCart}
            </button>

            <button className="w-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors">
              <Eye size={16} className="text-foreground" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 mt-auto">
        <p className="text-[11px] tracking-[0.15em] uppercase text-muted mb-1">{product.series}</p>
        <h3 className="text-sm font-semibold text-foreground mb-2 truncate group-hover:text-accent transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{formatRupiah(product.price)}</span>
          {product.originalPrice && <span className="text-xs text-muted line-through">{formatRupiah(product.originalPrice)}</span>}
        </div>
      </div>
    </motion.div>
  )
}