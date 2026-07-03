import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // <-- TAMBAH: signOut

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false); // <-- TAMBAH: State Profile

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // FUNGSI LOGIN
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  // FUNGSI PROFILE (BARU)
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  // FUNGSI LOGOUT (BARU)
  const logout = async () => {
    try {
      await signOut(auth); // Memutus koneksi ke Firebase
      closeProfile();      // Menutup halaman profile setelah logout
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      openLogin, 
      closeLogin, 
      isLoginOpen, 
      openProfile,   // <-- TAMBAH
      closeProfile,  // <-- TAMBAH
      isProfileOpen, // <-- TAMBAH
      logout         // <-- TAMBAH
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};