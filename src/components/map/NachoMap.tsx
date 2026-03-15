'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { RestaurantWithScore } from '@/types';
import { getScoreColor, getScoreBg } from '@/lib/utils';
import { MAP_CENTER } from '@/lib/constants';
import NachoScoreBadge from '@/components/restaurant/NachoScoreBadge';

interface Props {
  restaurants: RestaurantWithScore[];
}

// Fallback SVG map when Mapbox token is not available
function FallbackMap({ restaurants }: Props) {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);

  const minLat = 51.3, maxLat = 53.6, minLng = 3.5, maxLng = 7.2;
  const toX = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * 100;
  const toY = (lat: number) => (1 - (lat - minLat) / (maxLat - minLat)) * 100;

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#f5f0e8' }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((i) => (
          <g key={i}>
            <line x1={`${i}%`} y1="0" x2={`${i}%`} y2="100%" stroke="#c4b99a" strokeWidth=".5" />
            <line x1="0" y1={`${i}%`} x2="100%" y2={`${i}%`} stroke="#c4b99a" strokeWidth=".5" />
          </g>
        ))}
      </svg>
      {restaurants.map((r) => {
        const x = toX(r.longitude);
        const y = toY(r.latitude);
        const h = hovered === r.id;
        const c = getScoreColor(r.nachoScore);

        return (
          <button
            key={r.id}
            className="absolute z-10"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)' }}
            onClick={() => router.push(`/restaurant/${r.slug}`)}
            onMouseEnter={() => setHovered(r.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {h && (
              <div
                className="absolute rounded-full animate-ping"
                style={{ background: `${c}20`, width: 40, height: 40, left: -13, top: -13 }}
              />
            )}
            <div
              className="rounded-full transition-all duration-200 shadow-md"
              style={{
                width: h ? 18 : 13,
                height: h ? 18 : 13,
                background: c,
                border: '2.5px solid white',
                boxShadow: `0 2px 8px ${c}40`,
              }}
            />
            {h && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap z-20 rounded-xl overflow-hidden shadow-xl"
                style={{ background: 'white', border: '1px solid #e8e2d8', minWidth: 210 }}
              >
                <div className="relative w-full h-20">
                  <Image src={r.imageUrl} alt="" fill className="object-cover" sizes="210px" />
                </div>
                <div className="p-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-800 text-xs">{r.name}</div>
                      <div className="text-stone-400 text-[10px]">
                        {r.city} · {r.reviewCount} reviews
                      </div>
                    </div>
                    <NachoScoreBadge score={r.nachoScore} size="sm" />
                  </div>
                </div>
              </div>
            )}
          </button>
        );
      })}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] text-stone-400 bg-white/80 backdrop-blur rounded-lg px-2.5 py-1.5">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#16a34a' }} />
          80+
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#65a30d' }} />
          60-79
        </div>
      </div>
    </div>
  );
}

// Mapbox map component
function MapboxMap({ restaurants }: Props) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    import('mapbox-gl').then((mapboxgl) => {
      const mb = mapboxgl.default;
      mb.accessToken = token;

      const map = new mb.Map({
        container: mapRef.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [MAP_CENTER.lng, MAP_CENTER.lat],
        zoom: MAP_CENTER.zoom,
      });

      mapInstanceRef.current = map;

      map.on('load', () => {
        setMapLoaded(true);

        restaurants.forEach((r) => {
          const color = getScoreColor(r.nachoScore);

          const el = document.createElement('div');
          el.style.width = '13px';
          el.style.height = '13px';
          el.style.borderRadius = '50%';
          el.style.background = color;
          el.style.border = '2.5px solid white';
          el.style.boxShadow = `0 2px 8px ${color}40`;
          el.style.cursor = 'pointer';
          el.style.transition = 'all 0.2s';

          el.addEventListener('mouseenter', () => {
            el.style.width = '18px';
            el.style.height = '18px';
          });
          el.addEventListener('mouseleave', () => {
            el.style.width = '13px';
            el.style.height = '13px';
          });
          el.addEventListener('click', () => {
            router.push(`/restaurant/${r.slug}`);
          });

          new mb.Marker({ element: el })
            .setLngLat([r.longitude, r.latitude])
            .setPopup(
              new mb.Popup({ offset: 25 }).setHTML(
                `<div style="font-family: DM Sans, sans-serif; min-width:180px">
                  <img src="${r.imageUrl}" style="width:100%;height:80px;object-fit:cover;border-radius:8px 8px 0 0"/>
                  <div style="padding:10px">
                    <div style="font-weight:600;font-size:13px;color:#1c1917">${r.name}</div>
                    <div style="font-size:11px;color:#78716c">${r.city} · ${r.reviewCount} reviews</div>
                    <div style="font-size:18px;font-weight:bold;color:${color};margin-top:4px">${r.nachoScore.toFixed(0)}/100</div>
                  </div>
                </div>`,
              ),
            )
            .addTo(map);
        });
      });

      return () => {
        map.remove();
      };
    });
  }, [restaurants, router]);

  return (
    <div ref={mapRef} className="w-full h-full">
      {!mapLoaded && (
        <div className="w-full h-full flex items-center justify-center" style={{ background: '#f5f0e8' }}>
          <span className="text-stone-400 text-sm">Kaart laden...</span>
        </div>
      )}
    </div>
  );
}

export default function NachoMap({ restaurants }: Props) {
  const hasToken = Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

  if (!hasToken) {
    return <FallbackMap restaurants={restaurants} />;
  }

  return <MapboxMap restaurants={restaurants} />;
}
