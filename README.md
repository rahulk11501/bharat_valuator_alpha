
# BharatValuator

A value investing stock valuation app built with Rails 8 and React.

---

## Setup

### Prerequisites

- Ruby 3.x
- Rails 8.x
- PostgreSQL
- Node.js (for building React frontend)

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. Install Ruby gems:

   ```bash
   bundle install
   ```

3. Setup the database:

   ```bash
   rails db:create db:migrate
   ```

4. Install Node dependencies:

   ```bash
   npm install
   ```

5. Setup environment variables:

   - Create `.env` file or set environment variable `ALPHA_VANTAGE_API_KEY` with your Alpha Vantage API key.

6. Build frontend assets:

   ```bash
   npm run build
   ```

---

## Running the app

Start the Rails server:

```bash
rails server
```

Open your browser at `http://localhost:3000`

---

## Features

- SPA frontend with React and React Router
- Chart.js powered stock charts with selectable time ranges (1M, 3M, 6M, 1Y, 5Y)
- Real-time stock data fetched from Alpha Vantage API (monthly adjusted time series)
- Fallback to static random data when API fails or no data is available
- Backend API under `/api/stocks`

---

## File Structure

```
app/javascript/
├── application.js       # Entry point for React SPA
├── components/
│   ├── App.jsx          # Main React component with routing
│   ├── Home.jsx         # Home page showing popular stocks
│   └── Stock.jsx        # Stock detail page with chart
```

---

## Routes

```ruby
root "react#index"
get '*path', to: "react#index", constraints: ->(req) { !req.xhr? && req.format.html? }

namespace :api do
  resources :stocks, only: [:index, :show]
end
```

---

## Notes

- The ReactController#index serves the SPA root with `<div id="root"></div>`
- The stock chart is rendered within the React SPA via React components
- No debug logging currently enabled
- Uses esbuild for bundling React and JSX

---