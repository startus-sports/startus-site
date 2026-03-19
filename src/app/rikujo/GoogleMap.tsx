'use client'

import { useEffect, useRef, useCallback } from 'react'

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

const API_KEY = 'AIzaSyB9IUV1O9pONBqR0sAgqX3g6tOqCMz2yPY'
const MAP_CENTER = { lat: 36.565, lng: 136.645 }
const DEFAULT_ZOOM = 12
const ACTIVE_ZOOM = 15

// Create a custom marker SVG as data URL
function createMarkerIcon(color: string, count: number, isActive: boolean): string {
  const size = isActive ? 48 : 40
  const strokeColor = isActive ? '#FF6B00' : '#ffffff'
  const strokeWidth = isActive ? 3 : 2
  const fontSize = isActive ? 16 : 14
  const shadow = isActive ? 'filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4));' : 'filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));'

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 12}" viewBox="0 0 ${size} ${size + 12}" style="${shadow}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - strokeWidth}" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
      <polygon points="${size / 2 - 6},${size - 4} ${size / 2},${size + 10} ${size / 2 + 6},${size - 4}" fill="${color}"/>
      <text x="${size / 2}" y="${size / 2 + fontSize / 3}" text-anchor="middle" fill="white" font-weight="bold" font-size="${fontSize}" font-family="sans-serif">${count}</text>
    </svg>
  `
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
}

// Load Google Maps script once
let loadPromise: Promise<void> | null = null
function loadGoogleMaps(): Promise<void> {
  if (loadPromise) return loadPromise
  if (typeof window !== 'undefined' && window.google?.maps) return Promise.resolve()

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&language=ja&region=JP`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Maps failed to load'))
    document.head.appendChild(script)
  })
  return loadPromise
}

export default function GoogleMap({ venues, activeVenue, onSelect, classCounts }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<Record<string, google.maps.marker.AdvancedMarkerElement | google.maps.Marker>>({})
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const initializedRef = useRef(false)

  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  const initMap = useCallback(async () => {
    if (!mapRef.current || initializedRef.current) return
    initializedRef.current = true

    await loadGoogleMaps()

    const map = new google.maps.Map(mapRef.current, {
      center: MAP_CENTER,
      zoom: DEFAULT_ZOOM,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      gestureHandling: 'cooperative',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    })

    const infoWindow = new google.maps.InfoWindow()
    infoWindowRef.current = infoWindow

    venues.forEach(v => {
      const count = classCounts[v.id] || 0

      const marker = new google.maps.Marker({
        position: { lat: v.lat, lng: v.lng },
        map,
        icon: {
          url: createMarkerIcon(v.color, count, false),
          scaledSize: new google.maps.Size(40, 52),
          anchor: new google.maps.Point(20, 52),
        },
        title: v.shortName,
        optimized: false,
      })

      marker.addListener('click', () => {
        onSelectRef.current(v.id)
      })

      markersRef.current[v.id] = marker
    })

    mapInstanceRef.current = map
  }, [venues, classCounts])

  // Initialize
  useEffect(() => {
    initMap()
  }, [initMap])

  // Update on activeVenue change
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Update all marker icons
    venues.forEach(v => {
      const marker = markersRef.current[v.id]
      if (!marker || !(marker instanceof google.maps.Marker)) return
      const count = classCounts[v.id] || 0
      const isActive = activeVenue === v.id
      const size = isActive ? 48 : 40
      const anchorY = size + 12

      marker.setIcon({
        url: createMarkerIcon(v.color, count, isActive),
        scaledSize: new google.maps.Size(size, anchorY),
        anchor: new google.maps.Point(size / 2, anchorY),
      })
      marker.setZIndex(isActive ? 999 : 1)
    })

    // Pan to active venue or reset
    if (activeVenue) {
      const v = venues.find(v => v.id === activeVenue)
      if (v && infoWindowRef.current) {
        map.panTo({ lat: v.lat, lng: v.lng })
        map.setZoom(ACTIVE_ZOOM)

        const count = classCounts[v.id] || 0
        infoWindowRef.current.setContent(
          `<div style="text-align:center;font-size:13px;line-height:1.6;padding:4px 2px;min-width:140px">
            <strong style="font-size:15px;color:${v.color}">${v.shortName}</strong><br/>
            <span style="color:#333;font-size:12px">${v.name}</span><br/>
            <span style="color:#999;font-size:11px">${v.address}</span><br/>
            <span style="color:${v.color};font-weight:bold;font-size:13px">${count}教室開催</span>
          </div>`
        )

        const marker = markersRef.current[v.id]
        if (marker) {
          infoWindowRef.current.open(map, marker as google.maps.Marker)
        }
      }
    } else {
      infoWindowRef.current?.close()
      map.panTo(MAP_CENTER)
      map.setZoom(DEFAULT_ZOOM)
    }
  }, [activeVenue, venues, classCounts])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '320px', zIndex: 0 }}
    />
  )
}
