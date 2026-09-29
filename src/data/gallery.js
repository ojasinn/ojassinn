const item = (id, category, src, alt, roomType = null) => ({
  id,
  category,
  src,
  thumb: src,
  alt,
  roomType,
})

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'room', label: 'Room' },
  { id: 'reception', label: 'Reception' },
  { id: 'lobby-corridor', label: 'Lobby-corridor' },
  { id: 'balcony', name: 'Balcony' },
  { id: 'main', label: 'Main' },
]

export const gallery = [
  // =========================================================
  // MAIN
  // Kept Main #1, #3 and FabHotels Main
  // =========================================================
  item(
    'main-01',
    'main',
    '/images/gallery/exterior-01.webp',
    'Ojas Inn exterior viewed from the approach road'
  ),
  item(
    'main-03',
    'main',
    '/images/gallery/exterior-03.webp',
    'Ojas Inn exterior view'
  ),
  item(
    'main-05',
    'main',
    '/images/gallery/fab/Main/Main-photos-fabhotel-ojas-inn-rtovupsl-pune-Hotels_1789376106517.jpg',
    'Ojas Inn main exterior view'
  ),

  // =========================================================
  // DELUXE ROOM
  // =========================================================
  item(
    'deluxe-01',
    'room',
    '/images/rooms/deluxe-01.webp',
    'Deluxe Room — guest room interior',
    'deluxe'
  ),
  item(
    'deluxe-02',
    'room',
    '/images/rooms/deluxe-02.webp',
    'Deluxe Room — bedroom view',
    'deluxe'
  ),
  item(
    'deluxe-03',
    'room',
    '/images/rooms/deluxe-03.webp',
    'Deluxe Room — furnished guest space',
    'deluxe'
  ),
  item(
    'deluxe-04',
    'room',
    '/images/rooms/deluxe-04.webp',
    'Deluxe Room — room interior',
    'deluxe'
  ),

  // =========================================================
  // EXECUTIVE ROOM
  // =========================================================
  item(
    'executive-01',
    'room',
    '/images/rooms/executive-01.webp',
    'Executive Room — guest room interior',
    'executive'
  ),
  item(
    'executive-02',
    'room',
    '/images/rooms/executive-02.webp',
    'Executive Room — bedroom view',
    'executive'
  ),
  item(
    'executive-03',
    'room',
    '/images/rooms/executive-03.webp',
    'Executive Room — furnished guest space',
    'executive'
  ),
  item(
    'executive-04',
    'room',
    '/images/rooms/executive-04.webp',
    'Executive Room — room interior',
    'executive'
  ),

  // =========================================================
  // FAMILY ROOM
  // =========================================================
  item(
    'family-01',
    'room',
    '/images/rooms/family-01.webp',
    'Family Room — guest room interior',
    'family'
  ),
  item(
    'family-02',
    'room',
    '/images/rooms/family-02.webp',
    'Family Room — bedroom view',
    'family'
  ),
  item(
    'family-03',
    'room',
    '/images/rooms/family-03.webp',
    'Family Room — furnished guest space',
    'family'
  ),
  item(
    'family-04',
    'room',
    '/images/rooms/family-04.webp',
    'Family Room — room interior',
    'family'
  ),

  // =========================================================
  // RECEPTION
  // Removed previous Reception #2 and #3
  // =========================================================
  item(
    'reception-01',
    'reception',
    '/images/gallery/reception.jpeg',
    'Reception desk and Ojas Inn welcome area'
  ),
  item(
    'reception-04',
    'reception',
    '/images/gallery/fab/Reception/Reception-photos-fabhotel-ojas-inn-rtovupsl-pune-Hotels_1789376099729.png',
    'Ojas Inn reception area'
  ),

  // =========================================================
  // LOBBY / CORRIDOR
  // Removed previous Lobby #1
  // =========================================================
  item(
    'lobby-02',
    'lobby-corridor',
    '/images/gallery/interior-05.webp',
    'Guest-floor staircase and corridor'
  ),
  item(
    'lobby-03',
    'lobby-corridor',
    '/images/gallery/fab/Lobby-corridor/Lobby-corridor-photos-fabhotel-ojas-inn-rtovupsl-pune-Hotels_1789376101352.png',
    'Ojas Inn lobby and corridor'
  ),
  item(
    'lobby-04',
    'lobby-corridor',
    '/images/gallery/fab/Lobby-corridor/Lobby-corridor-photos-fabhotel-ojas-inn-rtovupsl-pune-Hotels_1789376103080.jpg',
    'Ojas Inn guest-floor corridor'
  ),
  item(
    'lobby-05',
    'lobby-corridor',
    '/images/gallery/fab/Lobby-corridor/Lobby-corridor-photos-fabhotel-ojas-inn-rtovupsl-pune-Hotels_1789376106177.jpg',
    'Ojas Inn interior corridor'
  ),

]
