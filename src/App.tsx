import React, { useState } from 'react';
import { Car, Calendar, User, LogIn, ShieldCheck } from 'lucide-react';

const cars = [
  { id: 1, name: 'Spor Sedan', price: 850, img: 'https://images.unsplash.com/photo-1542362567-b07e54658714?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Lüks SUV', price: 1200, img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Ekonomik Hatchback', price: 450, img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80' }
];

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-secondary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">HızlıRent</h1>
          <div className="space-x-6 flex items-center">
            <button onClick={() => setView('home')} className="hover:text-primary">Ana Sayfa</button>
            <button onClick={() => setView('admin')} className="hover:text-primary">Yönetim Paneli</button>
            <button className="bg-primary px-4 py-2 rounded-full flex items-center gap-2"><LogIn size={18}/> Giriş Yap</button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        {view === 'home' ? (
          <section>
            <h2 className="text-4xl font-extrabold mb-8 text-center">Hayalindeki Aracı Kirala</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {cars.map(car => (
                <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                  <img src={car.img} alt={car.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-primary font-bold text-2xl my-2">{car.price} TL / Gün</p>
                    <button className="w-full bg-secondary text-white py-3 rounded-lg mt-4">Hemen Kirala</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="text-primary"/> Yönetim Paneli</h2>
            <p>Rezervasyonları ve araç envanterini buradan yönetebilirsiniz.</p>
            {/* Admin CRUD logic would go here */}
          </div>
        )}
      </main>
    </div>
  );
}