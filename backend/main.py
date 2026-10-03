import json
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(
    title="KarbonTani API",
    description="Pilot geospatial and carbon-benefit API for Pleret, Bantul.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEOJSON_PATH = Path(__file__).parent / "data" / "pleret_paddy.geojson"


class CalculatorRequest(BaseModel):
    area_value: float = Field(gt=0, description="Farm area expressed in the selected unit.")
    unit: Literal["kapling", "hektar", "m2"]


@app.get("/api/v1/health")
def health():
    return {"status": "ok", "service": "KarbonTani API"}


@app.post("/api/v1/calculator")
def calculate_benefits(request: CalculatorRequest):
    unit_to_hectares = {"kapling": 0.1, "hektar": 1.0, "m2": 0.0001}
    area_ha = request.area_value * unit_to_hectares[request.unit]

    straw_tons_per_season = area_ha * 4.5
    avoided_emissions_per_season = area_ha * 2.5
    avoided_emissions_per_year = avoided_emissions_per_season * 2
    fertilizer_savings_per_year = area_ha * 1_000_000
    grain_yield_increase_per_year = area_ha * 4_550_000
    # Use the pilot's specified annual payout estimate per hectare.
    carbon_payout_per_year = area_ha * 1_008_000
    total_economic_benefit_per_year = (
        carbon_payout_per_year
        + fertilizer_savings_per_year
        + grain_yield_increase_per_year
    )

    return {
        "area": {"value": request.area_value, "unit": request.unit, "hectares": area_ha},
        "straw": {"tons_per_season": straw_tons_per_season},
        "avoided_emissions": {
            "tco2e_per_season": avoided_emissions_per_season,
            "tco2e_per_year": avoided_emissions_per_year,
        },
        "annual_benefits_idr": {
            "carbon_payout": carbon_payout_per_year,
            "fertilizer_savings": fertilizer_savings_per_year,
            "grain_yield_increase": grain_yield_increase_per_year,
            "total_economic_benefit": total_economic_benefit_per_year,
        },
        "assumptions": {
            "seasons_per_year": 2,
            "carbon_price_usd_per_tco2e": 15,
            "farmer_carbon_share": 0.7,
            "usd_idr": 16_000,
            "carbon_payout_idr_per_ha_year": 1_008_000,
        },
    }


@app.get("/api/v1/satellites/pleret-status")
def pleret_satellite_status():
    return {
        "location": {"kapanewon": "Pleret", "kabupaten": "Bantul"},
        "source": "NASA FIRMS (simulated pilot response)",
        "hotspots_detected": 0,
        "status": "Zero-Burn Compliant",
        "verified": True,
        "message": "No thermal anomalies detected in the Pleret bounding box.",
        "bounding_box": {
            "south": -7.872,
            "west": 110.398,
            "north": -7.864,
            "east": 110.415,
        },
    }


@app.get("/api/v1/geo/pleret-paddy")
def get_pleret_paddy():
    try:
        with GEOJSON_PATH.open(encoding="utf-8") as geojson_file:
            return json.load(geojson_file)
    except (OSError, json.JSONDecodeError) as error:
        raise HTTPException(status_code=500, detail="Pleret GeoJSON data is unavailable.") from error
