import type { FirmHotspot, FirmsScanResult } from "@/lib/firms";

export const revalidate = 300;

const SATELLITE = "NOAA-20 VIIRS (375m NRT)";
const BOUNDING_BOX = {
  minLon: 110.32,
  minLat: -7.95,
  maxLon: 110.46,
  maxLat: -7.82,
} as const;
const AREA = `${BOUNDING_BOX.minLon},${BOUNDING_BOX.minLat},${BOUNDING_BOX.maxLon},${BOUNDING_BOX.maxLat}`;

function fallbackResponse(scannedAt: string): FirmsScanResult {
  return {
    status: "fallback",
    satellite: SATELLITE,
    hotspotsCount: 0,
    hotspots: [],
    isCompliant: true,
    scannedAt,
    boundingBox: BOUNDING_BOX,
  };
}

function parseCsvRow(row: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];
    if (character === '"') {
      if (quoted && row[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += character;
    }
  }

  cells.push(cell);
  return cells;
}

function parseHotspots(csv: string): FirmHotspot[] {
  const content = csv.replace(/^\uFEFF/, "").trim();
  if (!content) throw new Error("NASA FIRMS returned an empty CSV response.");

  const [headerRow, ...rows] = content.split(/\r?\n/);
  const headers = parseCsvRow(headerRow).map((header) => header.trim().toLowerCase());
  const column = (name: string) => headers.indexOf(name);
  const latitudeIndex = column("latitude");
  const longitudeIndex = column("longitude");
  const brightnessIndex = ["bright_ti4", "brightness", "bright_t31"]
    .map(column)
    .find((index) => index >= 0) ?? -1;
  const dateIndex = column("acq_date");
  const timeIndex = column("acq_time");
  const frpIndex = column("frp");
  const confidenceIndex = column("confidence");

  if ([latitudeIndex, longitudeIndex, brightnessIndex, dateIndex, timeIndex, frpIndex, confidenceIndex].some((index) => index < 0)) {
    throw new Error("NASA FIRMS returned an unexpected CSV format.");
  }

  return rows.flatMap((row): FirmHotspot[] => {
    if (!row.trim()) return [];

    const values = parseCsvRow(row);
    const parseNumber = (value: string | undefined) => {
      if (!value?.trim()) return Number.NaN;
      return Number(value);
    };
    const latitude = parseNumber(values[latitudeIndex]);
    const longitude = parseNumber(values[longitudeIndex]);
    const brightness = parseNumber(values[brightnessIndex]);
    const frp = parseNumber(values[frpIndex]);
    const acqDate = values[dateIndex]?.trim();
    const rawAcqTime = values[timeIndex]?.trim();
    const confidence = values[confidenceIndex]?.trim();

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      !Number.isFinite(brightness) ||
      !Number.isFinite(frp) ||
      !acqDate ||
      !rawAcqTime ||
      values.length < headers.length
    ) {
      throw new Error("NASA FIRMS returned a malformed hotspot record.");
    }

    return [{
      latitude,
      longitude,
      brightness,
      acqDate,
      acqTime: rawAcqTime.padStart(4, "0"),
      confidence: confidence || "unknown",
      frp,
    }];
  });
}

export async function GET() {
  const scannedAt = new Date().toISOString();
  const mapKey = process.env.NASA_FIRMS_MAP_KEY;

  if (!mapKey) {
    console.error("NASA FIRMS scan unavailable: NASA_FIRMS_MAP_KEY is not configured.");
    return Response.json(fallbackResponse(scannedAt));
  }

  const endpoint = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${encodeURIComponent(mapKey)}/VIIRS_NOAA20_NRT/${AREA}/1`;

  try {
    const response = await fetch(endpoint, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      throw new Error(`NASA FIRMS returned HTTP ${response.status}.`);
    }

    const hotspots = parseHotspots(await response.text());
    const result: FirmsScanResult = {
      status: "success",
      satellite: SATELLITE,
      hotspotsCount: hotspots.length,
      hotspots,
      isCompliant: hotspots.length === 0,
      scannedAt,
      boundingBox: BOUNDING_BOX,
    };
    return Response.json(result);
  } catch (error) {
    const errorType = error instanceof Error ? error.name : "Unknown error";
    console.error(`NASA FIRMS scan failed (${errorType}); returning a fallback response.`);
    return Response.json(fallbackResponse(scannedAt));
  }
}
