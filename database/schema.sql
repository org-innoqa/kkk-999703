CREATE TABLE IF NOT EXISTS users (
  id bigint generated always as identity primary key,
  email text unique not null,
  password_hash text not null,
  role text default 'customer',
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS cars (
  id bigint generated always as identity primary key,
  model text not null,
  daily_price decimal not null,
  is_available boolean default true,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id bigint generated always as identity primary key,
  user_id bigint references users(id),
  car_id bigint references cars(id),
  start_date date not null,
  end_date date not null,
  status text default 'pending',
  created_at timestamptz default now()
);

INSERT INTO cars (model, daily_price) VALUES ('Spor Sedan', 850), ('Lüks SUV', 1200), ('Ekonomik Hatchback', 450) ON CONFLICT DO NOTHING;