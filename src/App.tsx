import React, { useState, useEffect } from 'react';
import { Car, LogIn, LogOut, LayoutDashboard, Plus, Trash2 } from 'lucide-react';
import { db } from './lib/db';

export default function App() {
  const [view, setView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState<any[]>([]);
  const [newCar, setNewCar] = useState({ model: '', daily_price: '' });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const data = await db.select('cars', '?order=id.desc');
    setCars(data || []);
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.model || !newCar.daily_price) return;
    await db.insert('cars', { model: newCar.model, daily_price: parseFloat(newCar.daily_price) });
    setNewCar({ model: '', daily_price: '' });
    fetchCars();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-secondary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => setView('home')}>HızlıRent</h1>
          <div className="space-x-6 flex items-center">
            <button onClick={() => setView('home')} className="hover:text-primary">Ana Sayfa</button>
            {isAdmin ? (
              <button onClick={() => { setIsAdmin(false); setView('home'); }} className="bg-red-600 px-4 py-2 rounded-full flex items-center gap-2"><LogOut size={18}/> Çıkış</button>
            ) : (
              <button onClick={() => setIsAdmin(true)} className="bg-primary px-4 py-2 rounded-full flex items-center gap-2"><LogIn size={18}/> Yönetici Girişi</button>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        {view === 'home' ? (
          <section>
            <h2 className="text-4xl font-extrabold mb-8 text-center">Filomuz</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                  <img src="https://images.unsplash.com/photo-1542362567-b07e54658714?auto=format&fit=crop&w=800&q=80" alt="Araç" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{car.model}</h3>
                    <p className="text-primary font-bold text-2xl my-2">{car.daily_price} TL / Gün</p>
                    <button className="w-full bg-secondary text-white py-3 rounded-lg mt-4">Hemen Kirala</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><LayoutDashboard className="text-primary"/> Yönetim Paneli</h2>
            
            <div className="mb-10 p-6 border rounded-xl bg-gray-50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus/> Yeni Araç Ekle</h3>
              <form onSubmit={handleAddCar} className="flex gap-4">
                <input type="text" placeholder="Araç Modeli" className="flex-1 p-3 border rounded-lg" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} />
                <input type="number" placeholder="Günlük Fiyat" className="w-32 p-3 border rounded-lg" value={newCar.daily_price} onChange={e => setNewCar({...newCar, daily_price: e.target.value})} />
                <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-bold">Ekle</button>
              </form>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Mevcut Araçlar</h3>
              <div className="space-y-2">
                {cars.map(car => (
                  <div key={car.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <span>{car.model} - <strong>{car.daily_price} TL</strong></span>
                    <button onClick={async () => { await db.remove('cars', `?id=eq.${car.id}`); fetchCars(); }} className="text-red-500"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}