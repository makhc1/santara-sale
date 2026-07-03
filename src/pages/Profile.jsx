import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ShoppingBag, Settings, UserCog, ChevronRight, Camera, AlertTriangle, X, User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const LogoutModal = ({ isOpen, onClose, onConfirm, lang }) => {
  if (!isOpen) return null;
  const isId = lang === "id";
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isId ? "Keluar dari Akun?" : "Log out of your account?"}
        </h3>
        <p className="text-sm text-gray-500 mb-8">
          {isId ? "Anda harus login kembali untuk mengakses keranjang." : "You will need to log back in to access your cart."}
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 font-semibold text-sm text-gray-900 hover:bg-gray-50 transition-colors">
            {isId ? "Batal" : "Cancel"}
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors">
            {isId ? "Ya, Keluar" : "Yes, Logout"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SettingsModal = ({ isOpen, onClose, user, onProfileUpdated, lang }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const userRef = doc(db, "users", user.uid, "profiles", lang);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || "");
            setPhone(data.phone || "");
            setAddress(data.address || "");
          } else {
            setName(user.displayName || "");
            setPhone("");
            setAddress("");
          }
        } catch (error) {
          console.error("Gagal mengambil data:", error);
          setName(user.displayName || "");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [isOpen, user, lang]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    try {
      const userRef = doc(db, "users", user.uid, "profiles", lang);
      await setDoc(userRef, {
        name: name,
        email: user.email,
        phone: phone,
        address: address,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      onProfileUpdated({ name, phone, address });
      onClose(); 
    } catch (error) {
      console.error("Error saving data:", error);
      alert(lang === "id" ? "Gagal menyimpan profil." : "Failed to save profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  const isId = lang === "id";

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{isId ? "Pengaturan Akun" : "Account Settings"}</h2>
            <p className="text-sm text-gray-500 mt-1">{isId ? "Update informasi profil Anda" : "Update your profile information"}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2 transition-colors" disabled={isLoading}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          {isLoading && !name ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Loader2 size={32} className="animate-spin mb-3" />
              <p className="text-sm">{isId ? "Memuat data profil..." : "Loading profile data..."}</p>
            </div>
          ) : (
            <>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><User size={16} /> {isId ? "Nama Lengkap" : "Full Name"}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-gray-900" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><Mail size={16} /> {isId ? "Alamat Email" : "Email Address"}</label>
                <input type="email" value={user?.email || ""} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" />
                <p className="text-xs text-gray-400 mt-1">{isId ? "Email tidak dapat diubah karena terhubung dengan akun Google." : "Email cannot be changed because it is linked to a Google account."}</p>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><Phone size={16} /> {isId ? "Nomor Telepon" : "Phone Number"}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-gray-900" placeholder="+62 812..." />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><MapPin size={16} /> {isId ? "Alamat Utama" : "Main Address"}</label>
                <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-gray-900 resize-none" placeholder={isId ? "Masukkan alamat lengkap" : "Enter full address"}></textarea>
              </div>
            </>
          )}
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" onClick={onClose} disabled={isLoading} className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors disabled:opacity-50">{isId ? "Batal" : "Cancel"}</button>
            <button type="submit" disabled={isLoading} className="px-6 py-3 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50">
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isLoading ? (isId ? "Menyimpan..." : "Saving...") : (isId ? "Simpan Perubahan" : "Save Changes")}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default function Profile() {
  const { user, closeProfile, logout } = useAuth();
  const { openCartPage } = useCart();
  const { lang } = useLanguage();
  
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isSettingsModal, setIsSettingsModal] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const isId = lang === "id";

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const userRef = doc(db, "users", user.uid, "profiles", lang);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            setProfileData({ name: user.displayName });
          }
        } catch (error) {
          console.error("Gagal memuat profil:", error);
          setProfileData({ name: user.displayName }); 
        }
      };
      fetchProfile();
    }
  }, [user, lang]);

  const handleProfileUpdated = (newData) => {
    setProfileData(prev => ({ ...prev, ...newData }));
  };

  const handleLogout = async () => {
    await logout();
    setIsLogoutModal(false);
  };

  const handleGoToOrders = () => {
    closeProfile();
    setTimeout(() => { openCartPage(); }, 50);
  };

  const displayName = profileData?.name || user?.displayName || "User";
  const safePhoto = user?.photoURL || "https://ui-avatars.com/api/?name=User&background=000&color=fff&size=256";

  return (
    <div className="pt-16 md:pt-20 pb-24 md:pb-12 min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 md:py-10 flex flex-col md:flex-row gap-8">
        
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col items-center text-center border border-gray-100 sticky md:top-28">
            
            <div className="w-full flex items-center justify-between mb-6 md:mb-0 md:absolute md:top-0 md:left-0 md:right-0 md:p-6 md:pt-8">
              <div className="flex items-center gap-3">
                <button onClick={closeProfile} className="text-gray-900 hover:bg-gray-100 rounded-full p-1 transition-colors">
                  <ChevronRight size={24} className="rotate-180" />
                </button>
                <h1 className="text-lg font-bold text-gray-900 md:hidden">{isId ? "Profil Saya" : "My Profile"}</h1>
              </div>
              <button className="text-gray-900 hover:bg-gray-100 rounded-full p-1 transition-colors">
                <Settings size={22} />
              </button>
            </div>

            <div className="relative mb-4 md:mt-8">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md border-4 border-white bg-gray-100">
                <img src={safePhoto} alt={displayName} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Error&background=ccc&color=333"; }} />
              </div>
              <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors border border-gray-100">
                <Camera size={16} className="text-gray-700" />
              </button>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
              {displayName}
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              {user?.email}
            </p>

            <div className="hidden md:block w-full space-y-1 text-left border-t border-gray-100 pt-6">
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-black font-bold relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-black rounded-r-full"></div>
                <Settings size={18} />
                <span className="text-sm">Account Profile</span>
              </a>
            </div>

            <div className="hidden md:block mt-6 w-full border-t border-gray-100 pt-6">
              <button onClick={() => setIsLogoutModal(true)} className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm">
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          </div>
        </aside>

        <section className="flex-grow space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Account Overview</h3>
              <button className="text-black font-bold text-xs hover:underline">Edit Detail</button>
            </div>
            
            <div className="divide-y divide-gray-100">
              <button onClick={handleGoToOrders} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-black">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[15px] text-gray-900">{isId ? "Pesanan Saya" : "My Orders"}</h4>
                    <p className="text-sm text-gray-500">{isId ? "Lihat dan lacak pembelian Anda" : "View and track your current purchases"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">3</span>
                  <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button onClick={() => setIsSettingsModal(true)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-black">
                    <UserCog size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[15px] text-gray-900">{isId ? "Pengaturan Akun" : "Account Settings"}</h4>
                    <p className="text-sm text-gray-500">{isId ? "Perbarui alamat dan info kontak Anda" : "Update your address and contact info"}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-400 text-sm">
            {isId ? "Bagian profil lainnya akan muncul di sini..." : "Other profile sections will appear here..."}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsLogoutModal(true)} className="w-full bg-red-50 text-red-600 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors active:scale-[0.98]">
              <LogOut size={20} />
              Log Out
            </button>
          </div>

        </section>
      </div>

      <AnimatePresence>
        <SettingsModal 
          isOpen={isSettingsModal} 
          onClose={() => setIsSettingsModal(false)} 
          user={user}
          onProfileUpdated={handleProfileUpdated}
          lang={lang}
        />
      </AnimatePresence>

      <AnimatePresence>
        <LogoutModal 
          isOpen={isLogoutModal} 
          onClose={() => setIsLogoutModal(false)} 
          onConfirm={handleLogout}
          lang={lang}
        />
      </AnimatePresence>
    </div>
  );
}