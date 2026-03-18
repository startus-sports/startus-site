'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Venue = {
  id: string
  name: string
  shortName: string
  color: string
  lat: number
  lng: number
  area: string
  address: string
}

type Props = {
  venues: readonly Venue[]
  activeVenue: string | null
  onSelect: (id: string | null) => void
  classCounts: Record<string, number>
}

function createVenueIcon(color: string, count: number, isActive: boolean) {
  const size = isActive ? 44 : 36
  const border = isActive ? '3px solid #FF6B00' : '2px solid #fff'
  return L.divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};border:${border};
      display:flex;align-items:center;justify-content:center;
      color:#fff;font-weight:bold;font-size:${isActive ? 16 : 14}px;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      transition:all 0.2s;
      cursor:pointer;
    ">${count}</div>`,
  })
}

export default function LeafletMap({ venues, activeVenue, onSelect, classCounts }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Record<string, L.Marker>>({})

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [36.565, 136.645],
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map)

    // Add markers for all venues
    venues.forEach(v => {
      const count = classCounts[v.id] || 0
      const marker = L.marker([v.lat, v.lng], {
        icon: createVenueIcon(v.color, count, false),
      })
        .addTo(map)
        .bindPopup(
          `<div style="text-align:center;font-size:13px;line-height:1.5">
            <strong style="font-size:14px">${v.shortName}</strong><br/>
            <span style="color:#666">${v.name}</span><br/>
            <span style="color:#999;font-size:11px">${v.address}</span><br/>
            <span style="color:${v.color};font-weight:bold">${count}教室</span>
          </div>`,
          { closeButton: false, offset: [0, -4] }
        )

      marker.on('click', () => {
        onSelect(v.id)
      })

      markersRef.current[v.id] = marker
    })

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
      markersRef.current = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update markers and view when activeVenue changes
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    venues.forEach(v => {
      const marker = markersRef.current[v.id]
      if (!marker) return
      const count = classCounts[v.id] || 0
      const isActive = activeVenue === v.id
      marker.setIcon(createVenueIcon(v.color, count, isActive))
    })

    if (activeVenue) {
      const v = venues.find(v => v.id === activeVenue)
      if (v) {
        map.flyTo([v.lat, v.lng], 15, { duration: 0.8 })
        markersRef.current[v.id]?.openPopup()
      }
    } else {
      map.flyTo([36.565, 136.645], 12, { duration: 0.8 })
    }
  }, [activeVenue, venues, classCounts])

  return (
    <div
      ref={mapRef}
      className="w-full h-56 md:h-72"
      style={{ zIndex: 0 }}
    />
  )
}
