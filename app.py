from flask import Flask, render_template, jsonify, request
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)


DATABASE = 'database.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with the scores table."""
    if not os.path.exists(DATABASE):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                best_score INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('INSERT INTO scores (best_score) VALUES (0)')
        conn.commit()
        conn.close()

@app.route('/')
def index():
    """Serve the main game page."""
    return render_template('index.html')

@app.route('/api/score', methods=['GET'])
def get_best_score():
    """Retrieve the best score from the database."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT best_score FROM scores ORDER BY id DESC LIMIT 1')
        result = cursor.fetchone()
        conn.close()
        
        best_score = result['best_score'] if result else 0
        return jsonify({'best_score': best_score})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/score', methods=['POST'])
def save_best_score():
    """Save a new best score to the database."""
    try:
        data = request.get_json()
        score = data.get('score', 0)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get current best score
        cursor.execute('SELECT best_score FROM scores ORDER BY id DESC LIMIT 1')
        result = cursor.fetchone()
        current_best = result['best_score'] if result else 0
        
        # Only update if new score is better
        if score > current_best:
            cursor.execute('UPDATE scores SET best_score = ? WHERE id = (SELECT id FROM scores ORDER BY id DESC LIMIT 1)', (score,))
            conn.commit()
        
        conn.close()
        return jsonify({'success': True, 'best_score': max(score, current_best)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
