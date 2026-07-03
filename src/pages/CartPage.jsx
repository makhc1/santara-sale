import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Helper format Rupiah
const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

export default function CartPage() {
  const { cartItems, updateQty, removeItem, totalPrice, closeCartPage } = useCart();

  // Agar saat halaman cart dibuka, scroll langsung naik ke atas
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-32 min-h-screen bg-[#f0f4f0]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Keranjang Belanja</h1>
            <p className="text-muted mt-2">{cartItems.length} item di keranjangmu</p>
          </div>
          <button 
            onClick={closeCartPage} 
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft size={18} />
            Lanjut Belanja
          </button>
        </div>

        {cartItems.length === 0 ? (
          /* State Kosong */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-muted" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Keranjang Kosong</h2>
            <p className="text-muted mb-8 max-w-md">Sepertinya kamu belum menambahkan karakter favoritmu ke keranjang.</p>
            <button 
              onClick={closeCartPage}
              className="bg-foreground text-background px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Jelajahi Koleksi
            </button>
          </motion.div>
        ) : (
          /* Ada Isi */
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* List Produk (Kiri) */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-border flex gap-4 md:gap-6"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl bg-muted flex-shrink-0" />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[11px] tracking-[0.15em] uppercase text-muted mb-1">{item.series}</p>
                        <h3 className="font-bold text-foreground text-base md:text-lg">{item.name}</h3>
                        <p className="text-accent font-bold mt-1">{formatRupiah(item.price)}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted hover:text-red-500 transition-colors p-1">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item.id, 'minus')} className="p-2 hover:bg-muted transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="px-4 text-sm font-semibold w-10 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 'plus')} className="p-2 hover:bg-muted transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-foreground">
                        {formatRupiah(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary (Kanan / Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border lg:sticky lg:top-28">
                <h3 className="text-lg font-bold text-foreground mb-6">Ringkasan Pesanan</h3>
                
                <div className="space-y-4 text-sm border-b border-border pb-6 mb-6">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal ({cartItems.length} item)</span>
                    <span className="text-foreground font-medium">{formatRupiah(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Ongkos Kirim</span>
                    <span className="text-accent font-medium">Dihitung nanti</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold text-foreground mb-8">
                  <span>Total</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>

                <button className="w-full bg-foreground text-background py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity">
                  Checkout Sekarang
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}