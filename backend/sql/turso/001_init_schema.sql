PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  lastname TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'ADMIN',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS availability_settings (
  day_of_week INTEGER PRIMARY KEY,
  enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
  hours_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_appointments_date
  ON appointments (date);

CREATE INDEX IF NOT EXISTS idx_appointments_date_time
  ON appointments (date, time);

CREATE INDEX IF NOT EXISTS idx_appointments_client_id
  ON appointments (client_id);

INSERT OR IGNORE INTO availability_settings (day_of_week, enabled, hours_json)
VALUES
  (0, 0, '[]'),
  (1, 1, '["10:00","11:00","12:00","15:00","16:00","17:00","18:00","19:00","20:00"]'),
  (2, 1, '["10:00","11:00","12:00","15:00","16:00","17:00","18:00","19:00","20:00"]'),
  (3, 1, '["10:00","11:00","12:00","15:00","16:00","17:00","18:00","19:00","20:00"]'),
  (4, 1, '["10:00","11:00","12:00","15:00","16:00","17:00","18:00","19:00","20:00"]'),
  (5, 1, '["10:00","11:00","12:00","15:00","16:00","17:00","18:00","19:00","20:00"]'),
  (6, 1, '["10:00","11:00","12:00","15:00","16:00","17:00","18:00","19:00","20:00"]');
