
# Bharat Valuator

Bharat Valuator is a modern stock valuation app that leverages the Alpha Vantage API along with local mock data for efficient stock information retrieval and valuation. It features a Rails backend and a React + Tailwind CSS frontend.

---

## Current Features

### Backend

- **Data Management:**  
  - Static configuration and constants are stored in YAML files under `lib/data/app`  
  - Mock/dummy stock and historical data are stored in YAML files under `lib/data/dummy`  
  - All YAML data is loaded **once on app startup** into an in-memory `DataStore` module for quick access without repeated file reads

- **API Endpoints:**  
  - `GET /api/stocks`  
    Returns a predefined list of popular stocks from the dummy YAML file  
  - `GET /api/stocks/:symbol`  
    Returns monthly adjusted closing price history for the stock symbol (served from dummy data currently)  
  - `GET /api/stocks/search?query=keyword`  
    Searches symbols using Alpha Vantage live API (configurable via YAML)

- **Environment Agnostic Dummy Data:**  
  Dummy/mock data is generic and used consistently regardless of environment to facilitate open source collaboration and local development.

---

### Backend Architecture Highlights

- **YAML Data Loader:**  
  On startup, the `DataStore` module loads and caches all YAML files under `lib/data` directories to avoid IO overhead at runtime.

- **Controller Usage:**  
  Controllers read cached data for fast responses and use live API calls only when necessary.

- **Extensibility:**  
  Easily extend dummy data or add new config by editing respective YAML files without touching code.

---

### Frontend Overview

The frontend is a modern React + Tailwind CSS SPA that interfaces with the Rails backend to provide a sleek stock valuation experience.

- **Mobile-first Responsive UI:**  
  Designed for smooth usage across devices from phones to desktops.

- **Stock Listing & Search:**  
  Fetches and displays the list of stocks from the backend’s `/api/stocks` endpoint.  
  Search functionality queries the backend `/api/stocks/search` API.

- **Stock Details View:**  
  Shows monthly adjusted historical stock price data fetched from `/api/stocks/:symbol`.

- **Dark Mode Toggle:**  
  User can switch between light and dark themes globally.

- **Clean UI Components:**  
  Uses reusable React components with conditional styling based on theme.

---

## Tech Stack

- Backend: Ruby on Rails 8, PostgreSQL  
- Frontend: React 18, Tailwind CSS  
- External API: Alpha Vantage

---

## Getting Started

### Backend Setup

1. **Set environment variables:**  
   - `ALPHA_VANTAGE_API_KEY` — your API key for Alpha Vantage service

2. **Install dependencies:**  
   ```bash
   bundle install
   ```

3. **Run the Rails server:**  
   ```bash
   rails server
   ```

4. **Explore API endpoints:**  
   - List stocks: `GET /api/stocks`  
   - Stock history: `GET /api/stocks/:symbol`  
   - Search stocks: `GET /api/stocks/search?query=your_keyword`

---

### Frontend Setup

1. Navigate to the frontend folder:  
   ```bash
   cd frontend
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Start the development server:  
   ```bash
   npm start
   ```

4. Open your browser at `http://localhost:3000`

---

## Future Plans

- Add real-time stock valuation models and calculations  
- Implement user authentication and watchlists  
- Add frontend enhancements: advanced valuation tool UI, chart visualizations, push notifications  
- Background jobs for bulk stock evaluations  
- Caching and rate-limiting Alpha Vantage API calls  
- Improve UI animations and transitions for better UX  

---

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests. Please follow the coding standards and include tests where applicable.

---

## License

This project is licensed under the MIT License.

---

If you need help with setup, usage, or want to contribute, please reach out!