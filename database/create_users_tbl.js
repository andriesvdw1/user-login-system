const express = require('express');
const sqlite3 = require('sqlite3').verbose();
// connect to the existing database 
const db = new sqlite3.Database('../database/users.db');

const app = express();

// Make a new users table called tblUsers in the users database
db.run(`
    CREATE TABLE IF NOT EXISTS tblUsers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL)`);

// Close the database connection
db.close();