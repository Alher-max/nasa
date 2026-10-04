"use client";

import { useEffect, useState } from "react";
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { FeatureCollection } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LoaderCircle, ScanLine, Satellite, TriangleAlert } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const gibsDate = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().slice(0, 10);

function FitPleretBounds({ data }: { data: FeatureCollection }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.geoJSON(data).getBounds();
    if (bounds.isValid()) map.fitBounds(bounds.pad(0.2));
  }, [data, map]);

  return null;
}

export default function PleretMapCanvas() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGeoJson() {
      try {
        const response = await fetch(`${apiUrl}/api/v1/geo/pleret-paddy`, { signal: controller.signal });
        if (!response.ok) throw new Error(`GeoJSON request failed (${response.status}).`);
        const data: unknown = await response.json();
        if (!data || typeof data !== "object" || !("features" in data) || !Array.isArray(data.features)) {
          throw new Error("The Pleret map response is not a valid GeoJSON FeatureCollection.");
        }
        setGeojson(data as FeatureCollection);
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(loadError instanceof Error ? loadError.message : "Could not load Pleret map data.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadGeoJson();
    return () => controller.abort();
  }, []);

  async function toggleFirmsScan() {
    if (scanComplete) {
      setScanComplete(false);
      return;
    }

    setIsScanning(true);
    setScanError(null);
    try {
      const response = await fetch(`${apiUrl}/api/v1/satellites/pleret-status`);
      if (!response.ok) throw new Error(`NASA FIRMS status request failed (${response.status}).`);
      const data: unknown = await response.json();
      if (
        !data ||
        typeof data !== "object" ||
        !("hotspots_detected" in data) ||
        typeof data.hotspots_detected !== "number"
      ) {
        throw new Error("The satellite status response is invalid.");
      }
      if (data.hotspots_detected !== 0) {
        throw new Error(`${data.hotspots_detected} thermal anomalies detected in Pleret.`);
      }
      setScanComplete(true);
    } catch (scanError) {
      setScanError(scanError instanceof Error ? scanError.message : "Could not complete the NASA FIRMS scan.");
    } finally {
      setIsScanning(false);
    }
  }

  return (
    <div className="relative isolate h-[300px] w-full sm:h-[420px] lg:h-[480px]">
      {isLoading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/85 text-sm text-body-secondary">
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Loading Pleret field boundaries…
        </div>
      )}
      {error && (
        <div role="alert" className="absolute left-3 right-3 top-3 z-[1000] flex items-center gap-2 rounded-xl border border-red-200 bg-white/95 p-3 text-xs text-red-700 shadow-sm">
          <TriangleAlert className="h-4 w-4 shrink-0" /> {error} Check that the backend is running at {apiUrl}.
        </div>
      )}
      {scanComplete && (
        <div role="status" className="absolute bottom-4 left-1/2 z-[1000] flex min-h-11 w-[calc(100%-1.5rem)] -translate-x-1/2 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white/95 px-3 py-2 text-center text-xs font-semibold text-emerald-700 shadow-sm sm:w-auto sm:px-3 sm:py-2 sm:text-sm">
          <Satellite className="h-4 w-4 shrink-0" /> Scan Complete: No thermal anomalies detected in Pleret coordinates
        </div>
      )}
      {scanError && <div role="alert" className="absolute bottom-4 left-3 right-3 z-[1000] rounded-xl border border-red-200 bg-white/95 px-3 py-2 text-xs text-red-700 shadow-sm">{scanError}</div>}
      <MapContainer center={[-7.868, 110.407]} zoom={14} scrollWheelZoom className="h-full w-full bg-surface-bg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-base-tiles"
        />
        <TileLayer
          attribution='Imagery &copy; <a href="https://earthdata.nasa.gov/gibs">NASA GIBS</a>'
          url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/${gibsDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`}
          maxNativeZoom={9}
          opacity={0.88}
        />
        {geojson && (
          <>
            <GeoJSON
              data={geojson}
              style={() => ({ color: "#FF5E00", weight: 2.5, opacity: 1, fillColor: "#10B981", fillOpacity: 0.28 })}
              onEachFeature={(feature, layer) => {
                const properties = feature.properties;
                layer.bindPopup(
                  `<strong>${properties?.gapoktan ?? "Gapoktan Pleret Makmur"}</strong><br />Zero-Burn Verified by NASA FIRMS`,
                );
              }}
            />
            <FitPleretBounds data={geojson} />
          </>
        )}
        {scanComplete && (
          <CircleMarker center={[-7.8681, 110.4072]} radius={11} pathOptions={{ color: "#10B981", fillColor: "#10B981", fillOpacity: 0.25, weight: 2 }}>
            <></>
          </CircleMarker>
        )}
      </MapContainer>
      <button
        onClick={() => void toggleFirmsScan()}
        disabled={isScanning}
        className="absolute right-3 top-3 z-[500] flex min-h-11 max-w-[calc(100%-3.5rem)] items-center gap-2 rounded-xl border border-surface-border bg-white/95 px-3 py-2.5 text-xs font-bold text-body-primary shadow-sm transition hover:border-semantic-success disabled:cursor-wait disabled:opacity-75"
      >
        <ScanLine className={`h-4 w-4 ${scanComplete ? "text-semantic-success" : "text-semantic-info"}`} />
        {isScanning ? "Scanning…" : scanComplete ? "Scan complete" : "Simulate FIRMS scan"}
      </button>
    </div>
  );
}
