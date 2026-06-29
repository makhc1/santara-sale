import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export function useMagneticButton(strength = 0.3) {
  const ref = useRef(null)
  
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [strength])
  
  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }, [])
  
  return { ref, handleMouseMove, handleMouseLeave }
}