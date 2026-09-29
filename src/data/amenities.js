import {
  AlarmClock,
  BatteryCharging,
  BedDouble,
  Brush,
  Car,
  ConciergeBell,
  GlassWater,
  LayoutGrid,
  Scroll,
  SatelliteDish,
  ShieldCheck,
  Shirt,
  Snowflake,
  Layers,
  Sparkles,
  Tv,
  Wifi,
} from 'lucide-react'

/**
 * Every amenity confirmed on the property listing — nothing added.
 * `image` drives the preview panel in the amenities section; when a row has
 * no image of its own it falls back to `defaultAmenityImage`.
 */

export const defaultAmenityImage = '/images/gallery/room-01.webp'

export const amenities = [
  {
    id: 'wifi',
    name: 'Free Wi-Fi',
    icon: Wifi,
    note: 'Throughout the property, included with every room.',
    featured: true,
  },
  {
    id: 'ac',
    name: 'Air Conditioning',
    icon: Snowflake,
    note: 'Every room is air conditioned.',
    featured: true,
  },
  {
    id: 'parking',
    name: 'Free Parking',
    icon: Car,
    note: 'Open parking on site, at no extra charge.',
    featured: true,
  },
  {
    id: 'front-desk',
    name: '24-Hour Front Desk',
    icon: ConciergeBell,
    note: 'Someone is at reception whenever you arrive.',
    featured: true,
  },
  {
    id: 'power-backup',
    name: 'Power Backup',
    icon: BatteryCharging,
    note: 'Backup power keeps the essentials running.',
    featured: true,
  },
  {
    id: 'housekeeping',
    name: 'Daily Housekeeping',
    icon: Brush,
    note: 'Rooms serviced every day of your stay.',
    featured: true,
  },
  {
    id: 'security',
    name: '24×7 Security',
    icon: ShieldCheck,
    note: 'Monitored round the clock.',
  },
  { id: 'tv', name: 'LCD TV', icon: Tv },
  { id: 'dth', name: 'DTH Channels', icon: SatelliteDish },
  { id: 'toiletries', name: 'Free Toiletries', icon: Sparkles },
  { id: 'towels', name: 'Clean Towels', icon: Layers },
  { id: 'linen', name: 'Clean Linen', icon: BedDouble },
  { id: 'toilet-paper', name: 'Toilet Paper', icon: Scroll },
  { id: 'water', name: 'Mineral Water Bottle', icon: GlassWater },
  { id: 'wardrobe', name: 'Wardrobe / Closet', icon: Shirt },
  { id: 'floor', name: 'Tile / Marble Floor', icon: LayoutGrid },
  { id: 'wake-up', name: 'Wake-Up Service', icon: AlarmClock },
]

/** The six rows that carry a short note, used for the larger cards. */
export const featuredAmenities = amenities.filter((amenity) => amenity.featured)

export default amenities
