import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/40 z-[60]" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ x: '-100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '-100%' }} 
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[70] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold font-[family-name:var(--font-family-display)]">Menu</h2>
              <button onClick={onClose}><X size={24} /></button>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <a href="#" className="hover:text-accent transition-colors" onClick={onClose}>New Arrivals</a>
              <a href="#" className="hover:text-accent transition-colors" onClick={onClose}>Characters</a>
              <a href="#" className="hover:text-accent transition-colors" onClick={onClose}>Collections</a>
              <a href="#" className="hover:text-accent transition-colors" onClick={onClose}>Membership</a>
              <a href="#" className="hover:text-accent transition-colors" onClick={onClose}>Community</a>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}