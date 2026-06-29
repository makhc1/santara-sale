import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = "inline-flex items-center justify-center font-semibold tracking-wide uppercase text-sm transition-colors duration-300"
  const variants = {
    primary: "bg-foreground text-white hover:bg-accent px-8 py-4 rounded-full",
    outline: "border border-border text-foreground hover:bg-foreground hover:text-white px-8 py-4 rounded-full",
    small: "bg-foreground text-white hover:bg-accent px-5 py-2.5 rounded-lg text-xs"
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.98 }} 
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}