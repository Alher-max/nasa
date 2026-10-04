export type FirmHotspot = {
  latitude: number;
  longitude: number;
  brightness: number;
  acqDate: string;
  acqTime: string;
  confidence: string;
  frp: number;
};

export type FirmsScanResult = {
  status: "success" | "fallback";
  satellite: string;
  hotspotsCount: number;
  hotspots: FirmHotspot[];
  isCompliant: boolean;
  scannedAt: string;
  boundingBox: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
};

export function isFirmsScanResult(value: unknown): value is FirmsScanResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<FirmsScanResult>;
  return (
    (result.status === "success" || result.status === "fallback") &&
    typeof result.satellite === "string" &&
    typeof result.hotspotsCount === "number" &&
    Array.isArray(result.hotspots) &&
    typeof result.isCompliant === "boolean" &&
    typeof result.scannedAt === "string" &&
    !!result.boundingBox &&
    typeof result.boundingBox.minLon === "number" &&
    typeof result.boundingBox.minLat === "number" &&
    typeof result.boundingBox.maxLon === "number" &&
    typeof result.boundingBox.maxLat === "number" &&
    result.hotspots.every((hotspot) =>
      typeof hotspot.latitude === "number" &&
      typeof hotspot.longitude === "number" &&
      typeof hotspot.brightness === "number" &&
      typeof hotspot.acqDate === "string" &&
      typeof hotspot.acqTime === "string" &&
      typeof hotspot.confidence === "string" &&
      typeof hotspot.frp === "number"
    )
  );
}
