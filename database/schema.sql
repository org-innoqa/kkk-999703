CREATE TABLE IF NOT EXISTS cars (
  id bigint generated always as identity primary key,
  model text not null,
  daily_price numeric not null,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id bigint generated always as identity primary key,
  car_id bigint references cars(id) on delete cascade,
  customer_name text not null,
  start_date date not null,
  end_date date not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Seed data
INSERT INTO cars (model, daily_price) VALUES 
('Renault Clio', 850),
('Volkswagen Golf', 1200),
('BMW 3 Serisi', 2500)
ON CONFLICT DO NOTHING;