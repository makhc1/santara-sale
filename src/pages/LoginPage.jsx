import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const { closeLogin } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingBtn(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      closeLogin(); // Otomatis tutup halaman login jika sukses
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use' ? 'Email sudah terdaftar!' : 'Email atau password salah!');
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      closeLogin();
    } catch (err) {
      setError('Login Google dibatalkan atau gagal.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#f0f4f0] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-border"
      >
        {/* Header */}
        <div className="relative p-8 pb-0 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{isRegister ? 'Buat Akun' : 'Masuk'}</h2>
            <p className="text-sm text-muted mt-1">{isRegister ? 'Daftar untuk mulai belanja' : 'Selamat datang kembali di SANTARA'}</p>
          </div>
          <button onClick={closeLogin} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X size={20} className="text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl">{error}</p>}
          
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="email" 
              required 
              placeholder="Alamat Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="password" 
              required 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>

          <button 
            type="submit" 
            disabled={loadingBtn}
            className="w-full bg-foreground text-background py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loadingBtn ? 'Memproses...' : isRegister ? 'Daftar Sekarang' : 'Masuk'}
            <ArrowRight size={18} />
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-xs text-muted font-medium">ATAU</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-border py-3.5 rounded-xl font-semibold text-sm text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-3"
          >
            {/* Icon Google sederhana pakai SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Masuk dengan Google
          </button>

          <p className="text-center text-sm text-muted pt-2">
            {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'} 
            <button type="button" onClick={() => { setIsRegister(!isRegister); setError(''); }} className="text-accent font-bold ml-1 hover:underline">
              {isRegister ? 'Masuk' : 'Daftar'}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}