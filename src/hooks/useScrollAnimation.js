import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  
  useGSAP(() => {
    if (!ref.current) return
    
    const { 
      y = 50, 
      opacity = 0, 
      duration = 1, 
      stagger = 0.1,
      start = 'top 85%',
      children = null
    } = options
    
    const targets = children ? ref.current.querySelectorAll(children) : ref.current
    
    gsap.from(targets, {
      y,
      opacity,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })
  
  return ref
}