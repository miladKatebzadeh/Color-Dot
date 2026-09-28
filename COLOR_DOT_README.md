# Color Dot - Reaction Game

A beautiful, minimal reaction game built with Python Flask, SQLite3, HTML, CSS, and vanilla JavaScript.

## Project Structure

```
project/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── database.db           # SQLite database (auto-created)
├── templates/
│   └── index.html        # Main game page
└── static/
    ├── style.css         # Styling with glassmorphism
    └── script.js         # Game logic (vanilla JavaScript)
```

## Setup Instructions

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Flask Server

```bash
python app.py
```

The game will be available at: **http://localhost:5000**

### 3. Play the Game

- Click "Start Game" to begin
- You have 30 seconds to click as many colored dots as possible
- Each dot appears at a random position with a beautiful color
- Your score increases with each successful click
- The best score is automatically saved in the SQLite database

## Features

### Beautiful Design
- **Milk-inspired color theme**: Soft, warm, and elegant background
- **Glassmorphism UI**: Semi-transparent cards with subtle blur effects
- **Minimal aesthetic**: Clean white game canvas with no visual clutter
- **Pinterest-inspired colors**: Muted, tasteful colors for the dots

### Game Mechanics
- 30-second timer
- Score tracking
- Personal best score storage
- Smooth animations and interactions
- Responsive design (works on mobile and desktop)

### Technology Stack
- **Backend**: Python with Flask
- **Database**: SQLite3 (simple, lightweight)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **No dependencies**: No React, TypeScript, or complex frameworks

## Game Rules

1. Click "Start Game" to begin
2. Colorful dots appear one at a time in random positions
3. Click each dot as quickly as possible
4. Your score increases by 1 for each successful click
5. A new dot appears immediately after each click
6. Game ends after 30 seconds
7. If you beat your best score, it's automatically saved

## API Endpoints

### GET /api/score
Retrieve the current best score from the database.

**Response:**
```json
{
  "best_score": 45
}
```

### POST /api/score
Save a new best score to the database.

**Request:**
```json
{
  "score": 45
}
```

**Response:**
```json
{
  "success": true,
  "best_score": 45
}
```

## Customization

### Adjust Game Duration
Edit `app.py` and the initial `timeRemaining` value in `script.js`:
- Modify the default timer in the HTML or JavaScript

### Change Dot Colors
Edit the `DOT_COLORS` array in `static/script.js` to add or change colors.

### Modify Background Colors
Edit the CSS variables in `static/style.css` (`:root` section) to customize the color scheme.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The game runs entirely on the frontend (vanilla JavaScript) for speed
- The backend only handles score persistence
- The SQLite database is lightweight and requires no setup
- All animations are smooth and GPU-accelerated
- The design is fully responsive

Enjoy the game! 🎮✨
