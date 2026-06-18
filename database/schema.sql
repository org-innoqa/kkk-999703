-- Araçlar tablosu
CREATE TABLE IF NOT EXISTS cars (
  id bigint generated always as identity primary key,
  model text not null,
  daily_price numeric not null,
  image_url text default 'https://images.unsplash.com/photo-1542362567-b07e54658714?auto=format&fit=crop&w=800&q=80',
  created_at timestamptz default now()
);

-- Müşteriler tablosu
CREATE TABLE IF NOT EXISTS customers (
  id bigint generated always as identity primary key,
  email text unique not null,
  password text not null,
  full_name text not null,
  created_at timestamptz default now()
);

-- Rezervasyonlar tablosu
CREATE TABLE IF NOT EXISTS bookings (
  id bigint generated always as identity primary key,
  car_id bigint references cars(id) on delete cascade,
  customer_id bigint references customers(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  total_price numeric not null,
  status text default 'pending', -- pending, confirmed, cancelled
  created_at timestamptz default now()
);

-- Örnek veriler
INSERT INTO cars (model, daily_price) VALUES 
('Renault Clio', 850),
('Volkswagen Golf', 1200),
('BMW 3 Serisi', 2500)
ON CONFLICT DO NOTHING;