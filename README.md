# Weather Radar Display

A web app that shows live weather radar data on an interactive map. It pulls the latest radar information from NOAA's MRMS system and overlays it on a map of North America.

## Features

- Live radar data from NOAA MRMS
- Interactive Leaflet map
- Auto-refresh every minute
- Clean, responsive design

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Leaflet
- **Backend**: Node.js, Express
- **Data**: NOAA MRMS radar data

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```
   Runs on http://localhost:5000

2. Start the frontend (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   Runs on http://localhost:5173

3. Open http://localhost:5173 in your browser

## How It Works

The backend fetches fresh radar images from NOAA every few minutes and stores them temporarily. The frontend displays these images as overlays on the map, updating automatically to show current weather patterns.

## API

- `GET /api/radar/latest` - Get the latest radar data

## Project Structure

```
weather-radar/
├── backend/          # Express server
├── frontend/         # React app
└── README.md
```
