import React, { useState } from 'react';
import { Car, ShieldCheck, LogIn, LogOut, LayoutDashboard } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@hizlirent.com' && password === 'admin123') {
      setIsAdmin(true);
      setView('admin');
    } else {
      alert('Hatalı giriş bilgileri!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-secondary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => setView('home')}>HızlıRent</h1>
          <div className="space-x-6 flex items-center">
            <button onClick={() => setView('home')} className="hover:text-primary">Ana Sayfa</button>
            {isAdmin ? (
              <>
                <button onClick={() => setView('admin')} className="hover:text-primary">Yönetim Paneli</button>
                <button onClick={() => { setIsAdmin(false); setView('home'); }} className="bg-red-600 px-4 py-2 rounded-full flex items-center gap-2"><LogOut size={18}/> Çıkış</button>
              </>
            ) : (
              <button onClick={() => setView('login')} className="bg-primary px-4 py-2 rounded-full flex items-center gap-2"><LogIn size={18}/> Yönetici Girişi</button>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        {view === 'home' && (
          <section>
            <h2 className="text-4xl font-extrabold mb-8 text-center">Hayalindeki Aracı Kirala</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                  <img src="https://images.unsplash.com/photo-1542362567-b07e54658714?auto=format&fit=crop&w=800&q=80" alt="Araç" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">Araç Modeli {i}</h3>
                    <p className="text-primary font-bold text-2xl my-2">{450 * i} TL / Gün</p>
                    <button className="w-full bg-secondary text-white py-3 rounded-lg mt-4">Hemen Kirala</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {view === 'login' && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Yönetici Girişi</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="E-posta" className="w-full p-3 border rounded-lg" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Şifre" className="w-full p-3 border rounded-lg" onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold">Giriş Yap</button>
            </form>
            <p className="mt-4 text-sm text-gray-500 text-center">Admin: admin@hizlirent.com / admin123</p>
          </div>
        )}

        {view === 'admin' && isAdmin && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><LayoutDashboard className="text-primary"/> Yönetim Paneli</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-xl bg-gray-50">
                <h3 className="font-bold text-lg mb-2">Aktif Rezervasyonlar</h3>
                <p>Henüz veri bulunmuyor.</p>
              </div>
              <div className="p-6 border rounded-xl bg-gray-50">
                <h3 className="font-bold text-lg mb-2">Araç Envanteri</h3>
                <p>Araç ekle/düzenle işlemleri burada olacak.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}