PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS books ( id INTEGER PRIMARY KEY AUTOINCREMENT, inventory_number TEXT UNIQUE, title TEXT NOT NULL, authors TEXT, isbn TEXT, year INTEGER, status TEXT DEFAULT 'available', location_code TEXT, date_added TEXT);
CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, member_number TEXT UNIQUE, document_number TEXT, first_name TEXT, last_name TEXT, type TEXT, email TEXT, phone TEXT, status TEXT DEFAULT 'active', date_joined TEXT);
CREATE TABLE IF NOT EXISTS loans ( id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, book_id INTEGER, loan_date TEXT, due_date TEXT, return_date TEXT, status TEXT, notes TEXT, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(book_id) REFERENCES books(id));
CREATE TABLE IF NOT EXISTS acceptance ( id INTEGER PRIMARY KEY AUTOINCREMENT, installation_id TEXT, email TEXT, institution TEXT, accepted INTEGER, ts TEXT);
CREATE TABLE IF NOT EXISTS meta ( key TEXT PRIMARY KEY, value TEXT );
