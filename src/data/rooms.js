/**
 * Room data, exactly as verified on the property listing.
 *
 * Pricing:
 * - `originalPrice` = regular/original nightly rate
 * - `price` = customer-facing discounted nightly rate
 * - `discountPercent` = displayed promotional discount
 *
 * Extra-person policy:
 * - Rates include the room's standard occupancy.
 * - An additional ₹800 applies only when the guest count exceeds
 *   the room's standard occupancy.
 */

export const rooms = [
  {
    id: 'deluxe',
    name: 'Deluxe AC',
    size: '120 sq. ft.',
    maxGuests: 2,
    occupancy: 'Up to 2 guests',
    bed: 'Double bed',
    view: 'No view',
    summary:
      'A compact, bright room with everything sorted — a comfortable double bed, air conditioning and fast Wi-Fi.',
    features: [
      'Double bed',
      'Air conditioning',
      'Free Wi-Fi',
      'LCD TV with DTH channels',
      'Wardrobe',
      'Attached bathroom',
    ],
    image: '/images/optimized/rooms/Deluxe AC/1.webp',
    images: [
      '/images/optimized/rooms/Deluxe AC/1.webp',
      '/images/optimized/rooms/Deluxe AC/2.webp',
    ],
    media: [
      { type: 'image', src: '/images/optimized/rooms/Deluxe AC/1.webp' },
      { type: 'image', src: '/images/optimized/rooms/Deluxe AC/2.webp' },
      {
        type: 'video',
        src: '/images/optimized/gallery/room/Deluxe AC/4.mp4',
      },
      {
        type: 'video',
        src: '/images/optimized/gallery/room/Deluxe AC/5.mp4',
      },
    ],
    alt: 'Deluxe AC Room at Ojas Inn with a double bed, wardrobe and window',

    originalPrice: 1800,
    price: 1620,
    discountPercent: 10,
    extraPersonNote: 'Standard occupancy: 2 guests · Extra person: ₹800',
  },

  {
    id: 'deluxe-non-ac',
    name: 'Deluxe Non AC',
    size: '120 sq. ft.',
    maxGuests: 2,
    occupancy: 'Up to 2 guests',
    bed: 'Double bed',
    view: 'No view',
    summary:
      'A compact, comfortable room with a double bed and the essentials for a convenient stay.',
    features: [
      'Double bed',
      'Free Wi-Fi',
      'LCD TV with DTH channels',
      'Attached bathroom',
    ],
    image: '/images/optimized/rooms/Deluxe Non AC/1.webp',
    images: [
      '/images/optimized/rooms/Deluxe Non AC/1.webp',
      '/images/optimized/rooms/Deluxe Non AC/2.webp',
      '/images/optimized/rooms/Deluxe Non AC/3.webp',
      '/images/optimized/rooms/Deluxe Non AC/4.webp',
    ],
    media: [
      {
        type: 'image',
        src: '/images/optimized/rooms/Deluxe Non AC/1.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Deluxe Non AC/2.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Deluxe Non AC/3.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Deluxe Non AC/4.webp',
      },
    ],
    alt: 'Deluxe Non AC Room at Ojas Inn with a double bed',

    originalPrice: 1500,
    price: 1350,
    discountPercent: 10,
    extraPersonNote: 'Standard occupancy: 2 guests · Extra person: ₹800',
  },

  {
    id: 'executive',
    name: 'Executive',
    size: '160 sq. ft.',
    maxGuests: 2,
    occupancy: 'Up to 2 guests',
    view: 'No view',
    summary:
      'More floor space with a separate sitting area for a comfortable stay.',
    features: [
      'Sitting area',
      'Air conditioning',
      'Free Wi-Fi',
      'LCD TV with DTH channels',
      'Attached bathroom',
    ],
    image: '/images/optimized/rooms/Executive/IMG20260812164110.webp',
    images: [
      '/images/optimized/rooms/Executive/IMG20260812164110.webp',
      '/images/optimized/rooms/Executive/IMG20260812165425.webp',
      '/images/optimized/rooms/Executive/IMG20260812165507.webp',
      '/images/optimized/rooms/Executive/IMG20260812165536.webp',
    ],
    media: [
      {
        type: 'image',
        src: '/images/optimized/rooms/Executive/IMG20260812164110.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Executive/IMG20260812165425.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Executive/IMG20260812165507.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Executive/IMG20260812165536.webp',
      },
      {
        type: 'video',
        src: '/images/optimized/gallery/room/Executive/VID20260812165337.mp4',
      },
    ],
    alt: 'Executive Room at Ojas Inn with a sitting area and desk',

    originalPrice: 2000,
    price: 1800,
    discountPercent: 10,
    extraPersonNote: 'Standard occupancy: 2 guests · Extra person: ₹800',
  },

  {
    id: 'family',
    name: 'Family',
    size: '200 sq. ft.',
    maxGuests: 3,
    occupancy: 'Up to 3 guests',
    bed: 'Double bed',
    view: 'No view',
    summary:
      'The largest room on the property, with space for three and room to spread out.',
    features: [
      'Double bed',
      'Sleeps three',
      'Air conditioning',
      'Free Wi-Fi',
      'LCD TV with DTH channels',
      'Attached bathroom',
    ],
    image: '/images/optimized/rooms/Family/1.webp',
    images: [
      '/images/optimized/rooms/Family/1.webp',
      '/images/optimized/rooms/Family/2.webp',
      '/images/optimized/rooms/Family/3.webp',
      '/images/optimized/rooms/Family/4.webp',
    ],
    media: [
      {
        type: 'image',
        src: '/images/optimized/rooms/Family/1.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Family/2.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Family/3.webp',
      },
      {
        type: 'image',
        src: '/images/optimized/rooms/Family/4.webp',
      },
    ],
    alt: 'Family Room at Ojas Inn with a double bed and extra space',

    originalPrice: 2400,
    price: 2160,
    discountPercent: 10,
    extraPersonNote: 'Up to 3 guests included · Extra person: ₹800',
  },
]

export const roomNames = rooms.map((room) => room.name)

export default rooms
