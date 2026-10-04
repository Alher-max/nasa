# KarbonTani Architecture

## NASA Earth Science Integration

The live active-fire observation flow uses the NASA FIRMS Area API from the
server-side Next.js handler at `frontend/app/api/firms/route.ts`. It requests
the NOAA-20 VIIRS near-real-time product (`VIIRS_NOAA20_NRT`), with the 375 m
VIIRS sensor resolution, and converts FIRMS CSV records to a typed JSON
response. The `NASA_FIRMS_MAP_KEY` is read only on the server from
`frontend/.env.local`; it is excluded from Git.

The scan covers the Pleret agricultural cluster and surrounding Bantul area
with the FIRMS west,south,east,north extent:

| Boundary | Coordinate |
| --- | ---: |
| Minimum longitude (west) | 110.32 |
| Minimum latitude (south) | -7.95 |
| Maximum longitude (east) | 110.46 |
| Maximum latitude (north) | -7.82 |

Successful scans include hotspot latitude and longitude, brightness, acquisition
date and UTC time, confidence, and fire radiative power (FRP). The map displays
each detection at its reported coordinates. An empty successful observation is
marked compliant for this scan interval; it is not a parcel-level guarantee.
When FIRMS is unreachable or returns malformed data, the handler returns a
structured `fallback` response, and the UI explicitly avoids labeling it as a
verified zero-burn scan.

The route and upstream `fetch` both use a five-minute revalidation period to
reduce repeated upstream requests while retaining timely observations. NASA
FIRMS currently documents a limit of **5,000 transactions per 10-minute
interval per MAP_KEY**; larger transactions may count as multiple requests.
Avoid increasing the refresh frequency without checking the current FIRMS
documentation and the MAP_KEY account's quota. See the
[NASA FIRMS Area API documentation](https://firms.modaps.eosdis.nasa.gov/api/area/).
