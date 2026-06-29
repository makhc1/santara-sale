import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Wifi, Cpu, ShieldAlert, Siren } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: <Wifi size={28} />,
    title: "Seamless IoT Connectivity",
    desc: "Utilizing multi-band satellite links and cellular failover, Hachigo maintains a robust connection in both busy urban centers and remote countryside locations."
  },
  {
    icon: <Cpu size={28} />,
    title: "Intelligent Edge Computing",
    desc: "Critical alerts are processed locally on the toy's hardware, reducing latency and ensuring emergency protocols are triggered instantly, without cloud delays."
  },
  {
    icon: <ShieldAlert size={28} />,
    title: "Dual-Layer Security System",
    desc: "A discrete physical SOS button empowers children to immediately signal for help, while an integrated 120dB alarm provides instant acoustic deterrence on-site when needed."
  },
  {
    icon: <Siren size={28} />,
    title: "Advanced Guardian Tech",
    desc: "Hachigo is more than just a toy—it's an advanced guardian powered by industrial-grade IoT technology and edge computing, built specifically for the needs of modern parents."
  }
]

export default function CharacterShowcase() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.tech-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-[#f0f4f0] overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-3">Technology</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-5">
            The Science Behind<br />Safety
          </h2>
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
            Hachigo is more than just a toy—it's an advanced guardian powered by industrial-grade IoT technology and edge computing, built specifically for the needs of modern parents.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="tech-card bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow duration-500 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Accent Line */}
              <div className="w-8 h-0.5 bg-accent mb-5" />

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}