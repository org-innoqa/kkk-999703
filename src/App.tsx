import React, { useEffect, useState } from 'react';
import { db } from './lib/db';
import { Car, Calendar, User, LogOut } from 'lucide-react';

interface CarData {
  id: number;
  model: string;
  daily_price: number;
  image_url: string;
}

export default function App() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await db.select<CarData>('cars');
        setCars(data);
      } catch (error) {
        console.error('Araçlar yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">RentACar</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <User size={18} /> Giriş Yap
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8">Müsait Araçlar</h2>
        {loading ? (
          <p>Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <img src={car.image_url} alt={car.model} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{car.model}</h3>
                  <p className="text-gray-600 mt-2">Günlük: {car.daily_price} TL</p>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Kirala
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}