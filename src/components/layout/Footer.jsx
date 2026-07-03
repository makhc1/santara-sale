import { Send, MapPin, Mail, Phone } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>)
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>)
const YoutubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>)

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-2xl overflow-hidden h-[220px] md:h-[260px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.844798795301!2d106.79138297589189!3d-6.28412316151265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ae706b0769%3A0x505fe488419d09ea!2sSMK%20Negeri%2020%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1782754544211!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="SANTARA Location" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"><MapPin size={20} className="text-accent" /></div>
              <div>
                <p className="text-base font-semibold">{t.footer.locationTitle}</p>
                <p className="text-sm text-white/50">Jl. Melati No.24 13, RT.13/RW.10, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{t.footer.joinTitle}</h3>
              <p className="text-white/60 text-sm mb-5">{t.footer.joinDesc}</p>
              <div className="flex w-full max-w-md">
                <input type="email" placeholder={t.footer.emailPlaceholder} className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-l-lg text-sm outline-none focus:border-accent transition-colors placeholder:text-white/40" />
                <button className="bg-accent hover:bg-red-600 px-6 rounded-r-lg transition-colors"><Send size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mb-12" />

        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="lg:w-1/3 shrink-0">
              <h3 className="text-2xl font-bold mb-6">{t.footer.contactTitle}</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0"><Mail size={18} className="text-accent" /></div>
                  <div><p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{t.footer.emailLabel}</p><p className="text-sm text-white/80">hello@santara.tech</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0"><Phone size={18} className="text-accent" /></div>
                  <div><p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{t.footer.phoneLabel}</p><p className="text-sm text-white/80">+62 811 1234 5678</p></div>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5"><label className="text-xs text-white/40 uppercase tracking-wider">{t.footer.form.firstName}</label><input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm outline-none focus:border-accent transition-colors placeholder:text-white/30" placeholder="John" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs text-white/40 uppercase tracking-wider">{t.footer.form.lastName}</label><input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm outline-none focus:border-accent transition-colors placeholder:text-white/30" placeholder="Doe" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs text-white/40 uppercase tracking-wider">{t.footer.form.email} <span className="text-accent">*</span></label><input type="email" required className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm outline-none focus:border-accent transition-colors placeholder:text-white/30" placeholder="john@example.com" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs text-white/40 uppercase tracking-wider">{t.footer.form.phone}</label><input type="tel" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm outline-none focus:border-accent transition-colors placeholder:text-white/30" placeholder="+62..." /></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs text-white/40 uppercase tracking-wider">{t.footer.form.userType}</label><select className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm outline-none focus:border-accent transition-colors text-white/60 appearance-none cursor-pointer"><option value="" className="bg-[#111]">{t.footer.form.selectOption}</option><option value="individual" className="bg-[#111]">{t.footer.form.individual}</option><option value="business" className="bg-[#111]">{t.footer.form.business}</option><option value="collector" className="bg-[#111]">{t.footer.form.collector}</option></select></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs text-white/40 uppercase tracking-wider">{t.footer.form.subject}</label><input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm outline-none focus:border-accent transition-colors placeholder:text-white/30" placeholder={t.footer.form.subjectPlaceholder} /></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs text-white/40 uppercase tracking-wider">{t.footer.form.message} <span className="text-accent">*</span></label><textarea required rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm outline-none focus:border-accent transition-colors placeholder:text-white/30 resize-none" placeholder={t.footer.form.messagePlaceholder} /></div>
              <div className="sm:col-span-2 flex justify-end pt-2"><button type="submit" className="bg-accent hover:bg-red-600 text-white text-sm font-semibold tracking-wider uppercase px-8 py-3.5 rounded-lg transition-colors duration-300">{t.footer.form.submit}</button></div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div><h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">{t.footer.shop.title}</h4><ul className="space-y-2 text-sm text-white/60"><li><a href="#" className="hover:text-white transition-colors">{t.footer.shop.new}</a></li><li><a href="#" className="hover:text-white transition-colors">{t.footer.shop.best}</a></li><li><a href="#" className="hover:text-white transition-colors">{t.footer.shop.limited}</a></li><li><a href="#" className="hover:text-white transition-colors">{t.footer.shop.sale}</a></li></ul></div>
          <div><h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">{t.footer.help.title}</h4><ul className="space-y-2 text-sm text-white/60"><li><a href="#" className="hover:text-white transition-colors">{t.footer.help.faq}</a></li><li><a href="#" className="hover:text-white transition-colors">{t.footer.help.shipping}</a></li><li><a href="#" className="hover:text-white transition-colors">{t.footer.help.returns}</a></li><li><a href="#" className="hover:text-white transition-colors">{t.footer.help.contact}</a></li></ul></div>
          <div><h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">{t.footer.company.title}</h4><ul className="space-y-2 text-sm text-white/60"><li><a href="#" className="hover:text-white transition-colors">{t.footer.company.about}</a></li><li><a href="#" className="hover:text-white transition-colors">{t.footer.company.careers}</a></li><li><a href="#" className="hover:text-white transition-colors">{t.footer.company.privacy}</a></li></ul></div>
          <div><h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">{t.footer.follow.title}</h4><div className="flex gap-4 text-white/60"><a href="#" className="hover:text-accent transition-colors"><InstagramIcon /></a><a href="#" className="hover:text-accent transition-colors"><TwitterIcon /></a><a href="#" className="hover:text-accent transition-colors"><YoutubeIcon /></a></div></div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40">{t.footer.copyright}</div>
      </div>
    </footer>
  )
}