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
The live NASA FIRMS route reads `NASA_FIRMS_MAP_KEY` from `frontend/.env.local`; this server-only key is ignored by Git and is never exposed to browser code.

## API

- `GET /api/v1/health` — service health
- `POST /api/v1/calculator` — area-scaled straw, avoided emissions, and annual economic benefits
- `GET /api/v1/satellites/pleret-status` — simulated NASA FIRMS pilot status
- `GET /api/v1/geo/pleret-paddy` — sample Pleret agricultural parcel FeatureCollection
- `GET /api/firms` — cached (5-minute) server-side NASA FIRMS NOAA-20 VIIRS observation for the Pleret bounding box

The dashboard's live FIRMS scan is served through the Next.js API route; the FastAPI satellite status endpoint remains a simulation. FIRMS observations cover an area and are not proof of conditions on an individual parcel. Parcel geometry is illustrative, not cadastral data.

The requested carbon payout estimate of Rp 1,008,000/ha/year is used as the pilot calculator rate. Note that the other supplied assumptions (5 tCO2e/year × USD 15/t × 70% farmer share × Rp 16,000/USD) calculate to Rp 840,000/ha/year; confirm the intended payout/share before using these estimates for financial decisions.
