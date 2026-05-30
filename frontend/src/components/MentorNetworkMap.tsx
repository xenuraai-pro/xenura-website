import { useEffect, useMemo, useState } from 'react';
import { geoEqualEarth, geoPath, type GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology } from 'topojson-specification';
import { MENTOR_LOCATIONS, type MentorLocation } from '@/content/mentorNetwork';

const WORLD_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export type MapLocationPoint = MentorLocation & { x: number; y: number };

type Props = {
  compact?: boolean;
  activeCountry?: string | null;
  onLocationSelect?: (country: string) => void;
};

function projectPoint(projection: GeoProjection, lng: number, lat: number) {
  const coords = projection([lng, lat]);
  if (!coords) return null;
  return { x: coords[0], y: coords[1] };
}

export function MentorNetworkMap({ compact = false, activeCountry, onLocationSelect }: Props) {
  const mapWidth = compact ? 640 : 980;
  const mapHeight = compact ? 360 : 480;

  const [worldPaths, setWorldPaths] = useState<string[]>([]);
  const [points, setPoints] = useState<MapLocationPoint[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const highlighted = activeCountry || hoveredCountry;

  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      try {
        const response = await fetch(WORLD_ATLAS_URL);
        if (!response.ok) throw new Error('Failed to load world map data');

        const topology = (await response.json()) as Topology;
        const countries = feature(
          topology,
          topology.objects.countries as Parameters<typeof feature>[1]
        ) as FeatureCollection<Geometry>;

        const projection = geoEqualEarth().fitExtent(
          [
            [8, 8],
            [mapWidth - 8, mapHeight - 8],
          ],
          countries
        );

        const pathGenerator = geoPath(projection);
        const paths = countries.features
          .map((country) => pathGenerator(country))
          .filter((path): path is string => Boolean(path));

        const projected = MENTOR_LOCATIONS.map((location) => {
          const coords = projectPoint(projection, location.lng, location.lat);
          if (!coords) return null;
          return { ...location, ...coords };
        }).filter((point): point is MapLocationPoint => point !== null);

        if (!cancelled) {
          setWorldPaths(paths);
          setPoints(projected);
          setLoadError(false);
        }
      } catch {
        if (!cancelled) setLoadError(true);
      }
    }

    loadMap();
    return () => {
      cancelled = true;
    };
  }, [mapWidth, mapHeight]);

  const tooltipLocation = useMemo(
    () => points.find((point) => point.country === highlighted) ?? null,
    [highlighted, points]
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#07111f] shadow-[0_20px_60px_-24px_rgba(11,45,99,0.5)]">
      <svg
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="w-full h-auto block"
        role="img"
        aria-label="Global mentor network world map"
      >
        <defs>
          <linearGradient id="mentorOcean" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#07111f" />
            <stop offset="1" stopColor="#0c1a30" />
          </linearGradient>
          <radialGradient id="mentorGlow" cx="50%" cy="50%" r="50%">
            <stop stopColor="#7f4adf" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ff6b35" stopOpacity="0.85" />
          </radialGradient>
          <filter id="mentorMarkerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>

        <rect width={mapWidth} height={mapHeight} fill="url(#mentorOcean)" />

        {loadError ? (
          <text x={mapWidth / 2} y={mapHeight / 2} textAnchor="middle" fill="#94a3b8" fontSize="14">
            Unable to load map. Please refresh the page.
          </text>
        ) : worldPaths.length === 0 ? (
          <>
            <text x={mapWidth / 2} y={mapHeight / 2 - 8} textAnchor="middle" fill="#64748b" fontSize="14">
              Loading world map...
            </text>
            <circle cx={mapWidth / 2} cy={mapHeight / 2 + 16} r="6" fill="none" stroke="#7f4adf" strokeWidth="2">
              <animate attributeName="stroke-dasharray" values="0 40;20 20;0 40" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-dashoffset" values="0;-40" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </>
        ) : (
          <>
            <g fill="#1e3354" stroke="#3d5a80" strokeWidth={0.45}>
              {worldPaths.map((path, index) => (
                <path key={index} d={path} />
              ))}
            </g>

            {points.map((point) => {
              const isActive = highlighted === point.country;
              return (
                <g
                  key={point.country}
                  transform={`translate(${point.x}, ${point.y})`}
                  onMouseEnter={() => setHoveredCountry(point.country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => onLocationSelect?.(point.country)}
                  className="cursor-pointer"
                  filter="url(#mentorMarkerShadow)"
                  role="button"
                  tabIndex={0}
                  aria-label={`${point.country}, ${point.city}`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onLocationSelect?.(point.country);
                    }
                  }}
                >
                  <circle r={isActive ? 16 : 10} fill="#7f4adf" opacity={isActive ? 0.25 : 0.12} />
                  <circle
                    r={isActive ? 6.5 : 4.5}
                    fill="url(#mentorGlow)"
                    stroke="#ffffff"
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                </g>
              );
            })}
          </>
        )}
      </svg>

      {tooltipLocation && (
        <div className="absolute left-3 right-3 bottom-3 sm:left-4 sm:right-auto sm:max-w-[220px] rounded-xl border border-white/15 bg-slate-950/92 backdrop-blur-md px-3.5 py-3 pointer-events-none shadow-lg">
          <p className="text-sm font-bold text-white leading-tight">{tooltipLocation.country}</p>
          <p className="text-xs text-slate-300 mt-0.5">{tooltipLocation.city}</p>
          <p className="text-[10px] uppercase tracking-wide text-[#7f4adf] mt-1.5">{tooltipLocation.region}</p>
        </div>
      )}
    </div>
  );
}
