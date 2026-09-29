/**
 * Single source of truth for everything the hotel may want to change later.
 * Nothing below should be duplicated anywhere else in the app.
 *
 * Safe to edit by hand — no build step understands this file specially.
 */

const primaryPhone = '9146507139'
const secondaryPhone = '8600945003'

/** Digits only, with country code, for wa.me links. */
const whatsappNumber = '919146507139'

/** Used to build every Google Maps link, so one edit updates them all. */
const mapsQuery =
  'Hotel Ojas Inn, Gat No. 111, Talegaon MIDC Road, Ambi, Talegaon Dabhade, Pune, Maharashtra 410507'

export const hotelConfig = {
  hotelName: 'Ojas Inn',
  tagline: 'Relax & Recharge',
  shortDescription:
    'A comfortable, well-kept stay on Talegaon MIDC Road — near the D.Y. Patil campus and the Talegaon industrial belt.',

  address: {
    line1: 'Ground Floor, Gat No. 111, Hotel Ojas Inn',
    line2: 'Talegaon MIDC Road, Near D.Y. Patil College Campus',
    line3: 'Ambi, Talegaon Dabhade',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '410507',
    country: 'India',
    /** Verified from the property listing. Confirm before printing on collateral. */
    coordinates: { lat: 18.75324, lng: 73.666549 },
  },

  phone: {
    primary: primaryPhone,
    secondary: secondaryPhone,
    /** tel: links need the country code. */
    primaryDial: `+91${primaryPhone}`,
    secondaryDial: `+91${secondaryPhone}`,
  },

  whatsapp: {
    number: whatsappNumber,
    displayNumber: primaryPhone,
  },

  instagram: 'https://www.instagram.com/hotel_ojas_inn2270/',
  instagramHandle: '@hotel_ojas_inn2270',

  /**
   * No email address has been confirmed by the property yet.
   * Add one here and every email link on the site turns on automatically.
   */
  email: '',

  maps: {
    query: mapsQuery,
    /** Opens the property in Google Maps — no API key required. */
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
    /** Key-free OpenStreetMap embed, centred on the property. */
    embedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=73.6565%2C18.7482%2C73.6766%2C18.7582&layer=mapnik&marker=18.75324%2C73.666549',
    /**
     * Point this at the property's Google Business review page when it is live.
     * Falls back to the Maps listing, which also shows reviews.
     */
    reviewsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  },

  /** Shown in the quiet "Stay information" band. Verified from the listing. */
  policies: {
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    rules: [
      'Bookings are non-refundable.',
      'A no-show is charged the entire booking amount.',
      'One child up to the age of 8 stays free of charge.',
    ],
  },

  /**
   * Current promotional room pricing.
   *
   * The room-specific prices are maintained in rooms.js.
   * This section controls whether the pricing UI is displayed.
   */
  pricing: {
    showPrices: true,
    currency: '₹',
    discountPercent: 10,
    extraPersonCharge: 800,
    note: '10% special offer on room rates.',
    extraPersonNote: '₹800 applies only when occupancy exceeds the standard room occupancy.',
  },

  nearby: [
    {
      name: 'D.Y. Patil University campus',
      detail: 'On Talegaon MIDC Road, close to the property',
    },
    {
      name: 'Talegaon MIDC',
      detail: 'The surrounding industrial belt',
    },
    {
      name: 'Talegaon Dabhade',
      detail: 'Town centre, markets and railway station',
    },
    {
      name: 'Mumbai–Pune Expressway',
      detail: 'Talegaon exit for onward travel',
    },
  ],
}

export default hotelConfig
