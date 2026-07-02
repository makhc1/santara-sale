import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'

const posts = [
  { id: 1, img: "https://i.ibb.co.com/Z1hfk5Cc/img1.jpg", likes: 234, comments: 12, span: "md:col-span-2 md:row-span-2" },
  { id: 2, img: "https://i.ibb.co.com/PvZGbMpY/img2.jpg", likes: 120, comments: 5, span: "" },
  { id: 3, img: "https://i.ibb.co.com/bR1nTtSC/img3.jpg", likes: 98, comments: 8, span: "" },
  { id: 4, img: "https://i.ibb.co.com/zTgK1Zv0/img4.jpg", likes: 312, comments: 24, span: "" },
  { id: 5, img: "https://i.ibb.co.com/6JF2LJ32/img5.jpg", likes: 156, comments: 9, span: "" },
]

export default function Community() {
  const [activeIndex, setActiveIndex] = useState(null)

  const isOpen = activeIndex !== null
  const current = isOpen ? posts[activeIndex] : null

  const prev = useCallback(() => {
    setActiveIndex(i => (i - 1 + posts.length) % posts.length)
  }, [])

  const next = useCallback(() => {
    setActiveIndex(i => (i + 1) % posts.length)
  }, [])

  const close = useCallback(() => setActiveIndex(null), [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, prev, next, close])

  return (
    <>
      {/* Section digabung jadi 1, ref yang error dihapus */}
      <section id="community" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-2">#Santara</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">Community Gallery</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 0.98 }}
                onClick={() => setActiveIndex(index)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${post.span}`}
              >
                <img
                  src={post.img}
                  alt="Community post"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-4 text-white text-sm font-medium">
                  <span className="flex items-center gap-1.5"><Heart size={16} fill="white" /> {post.likes}</span>
                  <span className="flex items-center gap-1.5"><MessageCircle size={16} /> {post.comments}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 z-10 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[85vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.img}
                alt="Community post"
                className="max-h-[80vh] max-w-full object-contain rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 rounded-b-xl flex gap-5 text-white text-sm font-medium">
                <span className="flex items-center gap-1.5"><Heart size={16} fill="white" /> {current.likes}</span>
                <span className="flex items-center gap-1.5"><MessageCircle size={16} /> {current.comments}</span>
                <span className="ml-auto text-white/60 text-xs">{activeIndex + 1} / {posts.length}</span>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 z-10 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}