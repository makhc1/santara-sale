import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const characters = [
  { id: 1, name: "Raga", desc: "The brave leader who stands tall when others falter.", img: "https://static.wixstatic.com/media/c67d9c_215cccafe30c4bf9887ccb3741c3c547~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ChatGPT%20Image%20Mar%2023%2C%202026%2C%2003_19_17%20AM.png" },
  { id: 2, name: "Lawi", desc: "The clever inventor who turns imagination into reality.", img: "https://static.wixstatic.com/media/c67d9c_7ab57782729f49d1a7a9f1fcc5246e1c~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/45926841-69db-4535-bcf4-0c81add9c19a.png" },
  { id: 3, name: "Puti", desc: "The gentle shield who protects with grace.", img: "https://static.wixstatic.com/media/c67d9c_474111e7a1ac48f99584eefb91caccfc~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/25687281-2168-45e4-aa8e-5f49c9239eb6.png" },
  { id: 4, name: "Lira", desc: "The swift messenger who carries secrets across the wind.", img: "https://static.wixstatic.com/media/c67d9c_2f37cc40c205495e82bb993e16b7b967~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b423d8b3-43b2-4544-9949-12ef88c13844.png" },
  { id: 5, name: "Sammy", desc: "The memory keeper who holds stories of a thousand lifetimes.", img: "https://static.wixstatic.com/media/c67d9c_112a47b5e4254cf0981c768608aad970~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b5e13107-7c49-4cc7-b45a-78f9240384b0.png" },
  { id: 6, name: "Nira", desc: "The vigilant scout who sees what others miss.", img: "https://static.wixstatic.com/media/c67d9c_d587368a9a664e2996756a6de9a22c45~mv2.png/v1/fill/w_309,h_309,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d0f2c23a-3906-4172-a0f0-a1c404966a7b.png" },
]

export default function CharacterShowcase() {
  const containerRef = useRef(null)
  const [active, setActive] = useState(1)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.char-float').forEach((el) => {
        gsap.to(el, { y: -12, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: Math.random() * 0.5 })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const activeChar = characters.find(c => c.id === active)

  return (
    <section ref={containerRef} className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-2">The Universe</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">Meet The Characters</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full lg:w-1/2 flex justify-center flex-shrink-0">
            <div className="char-float relative w-64 h-72 md:w-72 md:h-80 rounded-3xl overflow-hidden shadow-2xl border border-border bg-background">
              <img src={activeChar.img} alt={activeChar.name} className="w-full h-full object-contain p-6" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 text-white z-10">
                <h3 className="text-2xl font-bold">{activeChar.name}</h3>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-3">
            {characters.map((char) => (
              <motion.div key={char.id} onClick={() => setActive(char.id)} whileHover={{ x: 8 }}
                className={`p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${active === char.id ? 'bg-background shadow-lg border-foreground/10' : 'bg-transparent border-transparent hover:bg-background/50'}`}
              >
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{char.name}</h3>
                <div className={`overflow-hidden transition-all duration-300 ${active === char.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-muted pt-1">{char.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}