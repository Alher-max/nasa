# KarbonTani

KarbonTani is a climate-smart rice farming pilot dashboard for Pleret, Bantul. The monorepo contains a FastAPI geospatial/carbon API and a Next.js App Router frontend.

## Requirements

- Python 3.10+
- Node.js 20+
- npm

## Run both applications

From the repository root, install frontend dependencies and start the API and web app together:

```powershell
npm install
npm run dev
```

The dashboard runs at `http://localhost:3000`; FastAPI runs at `http://localhost:8000`. The interactive API docs are at `http://localhost:8000/docs`.

The services can also be started separately:

```powershell
npm run dev:backend
npm run dev:frontend
```

Install Python dependencies with `python -m pip install -r backend/requirements.txt` before starting the API.

To use a different API origin in the browser, set `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000`).

## API

- `GET /api/v1/health` — service health
- `POST /api/v1/calculator` — area-scaled straw, avoided emissions, and annual economic benefits
- `GET /api/v1/satellites/pleret-status` — simulated NASA FIRMS pilot status
- `GET /api/v1/geo/pleret-paddy` — sample Pleret agricultural parcel FeatureCollection

FIRMS and satellite-overpass statuses shown in this demo are simulations, not live satellite queries. Parcel geometry is illustrative, not cadastral data.

The requested carbon payout estimate of Rp 1,008,000/ha/year is used as the pilot calculator rate. Note that the other supplied assumptions (5 tCO2e/year × USD 15/t × 70% farmer share × Rp 16,000/USD) calculate to Rp 840,000/ha/year; confirm the intended payout/share before using these estimates for financial decisions.
