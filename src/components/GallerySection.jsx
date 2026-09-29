import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from 'lucide-react'
import Reveal from './Reveal'

/*
 * OJAS INN GALLERY
 *
 * The paths below intentionally match the existing public/images/gallery
 * folder structure exactly.
 *
 * Categories:
 * All
 * Room
 * Reception
 * Lobby-corridor
 * Main
 * Balcony
 */

const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'room', label: 'Room' },
  { id: 'reception', label: 'Reception' },
  { id: 'lobby-corridor', label: 'Lobby-corridor' },
  { id: 'main', label: 'Main' },
  { id: 'balcony', label: 'Balcony' },
]

/*
 * Every media file currently present in public/images/gallery.
 *
 * Room media is kept grouped by roomType so the Room tab can show
 * each room separately.
 */

const gallery = [
  /* =========================================================
     ROOM — DELUXE AC
     ========================================================= */
  {
    id: 'deluxe-ac-1',
    category: 'room',
    roomType: 'deluxe-ac',
    type: 'image',
    src: '/images/optimized/gallery/room/Deluxe AC/1.webp',
    alt: 'Deluxe AC Room — bedroom interior',
  },
  {
    id: 'deluxe-ac-2',
    category: 'room',
    roomType: 'deluxe-ac',
    type: 'image',
    src: '/images/optimized/gallery/room/Deluxe AC/2.webp',
    alt: 'Deluxe AC Room — guest room view',
  },
  {
    id: 'deluxe-ac-4',
    category: 'room',
    roomType: 'deluxe-ac',
    type: 'video',
    src: '/images/optimized/gallery/room/Deluxe AC/4.mp4',
    alt: 'Deluxe AC Room — video view',
  },
  {
    id: 'deluxe-ac-5',
    category: 'room',
    roomType: 'deluxe-ac',
    type: 'video',
    src: '/images/optimized/gallery/room/Deluxe AC/5.mp4',
    alt: 'Deluxe AC Room — video view',
  },

  /* =========================================================
     ROOM — DELUXE NON AC
     ========================================================= */
  {
    id: 'deluxe-non-ac-1',
    category: 'room',
    roomType: 'deluxe-non-ac',
    type: 'image',
    src: '/images/optimized/gallery/room/Deluxe Non AC/1.webp',
    alt: 'Deluxe Non AC Room — bedroom interior',
  },
  {
    id: 'deluxe-non-ac-2',
    category: 'room',
    roomType: 'deluxe-non-ac',
    type: 'image',
    src: '/images/optimized/gallery/room/Deluxe Non AC/2.webp',
    alt: 'Deluxe Non AC Room — guest room view',
  },
  {
    id: 'deluxe-non-ac-3',
    category: 'room',
    roomType: 'deluxe-non-ac',
    type: 'image',
    src: '/images/optimized/gallery/room/Deluxe Non AC/3.webp',
    alt: 'Deluxe Non AC Room — room interior',
  },
  {
    id: 'deluxe-non-ac-4',
    category: 'room',
    roomType: 'deluxe-non-ac',
    type: 'image',
    src: '/images/optimized/gallery/room/Deluxe Non AC/4.webp',
    alt: 'Deluxe Non AC Room — room interior',
  },

  /* =========================================================
     ROOM — EXECUTIVE
     ========================================================= */
  {
    id: 'executive-1',
    category: 'room',
    roomType: 'executive',
    type: 'image',
    src: '/images/optimized/gallery/room/Executive/IMG20260812164110.webp',
    alt: 'Executive Room — room interior',
  },
  {
    id: 'executive-2',
    category: 'room',
    roomType: 'executive',
    type: 'image',
    src: '/images/optimized/gallery/room/Executive/IMG20260812165425.webp',
    alt: 'Executive Room — furnished guest space',
  },
  {
    id: 'executive-3',
    category: 'room',
    roomType: 'executive',
    type: 'image',
    src: '/images/optimized/gallery/room/Executive/IMG20260812165507.webp',
    alt: 'Executive Room — sitting area',
  },
  {
    id: 'executive-4',
    category: 'room',
    roomType: 'executive',
    type: 'image',
    src: '/images/optimized/gallery/room/Executive/IMG20260812165536.webp',
    alt: 'Executive Room — room interior',
  },

  /* =========================================================
     ROOM — FAMILY
     ========================================================= */
  {
    id: 'family-1',
    category: 'room',
    roomType: 'family',
    type: 'image',
    src: '/images/optimized/gallery/room/Family/1.webp',
    alt: 'Family Room — bedroom interior',
  },
  {
    id: 'family-2',
    category: 'room',
    roomType: 'family',
    type: 'image',
    src: '/images/optimized/gallery/room/Family/2.webp',
    alt: 'Family Room — guest room view',
  },
  {
    id: 'family-3',
    category: 'room',
    roomType: 'family',
    type: 'image',
    src: '/images/optimized/gallery/room/Family/3.webp',
    alt: 'Family Room — room interior',
  },
  {
    id: 'family-4',
    category: 'room',
    roomType: 'family',
    type: 'image',
    src: '/images/optimized/gallery/room/Family/4.webp',
    alt: 'Family Room — room interior',
  },

  /* =========================================================
     RECEPTION — 7
     ========================================================= */
  {
    id: 'reception-1',
    category: 'reception',
    type: 'image',
    src: '/images/optimized/gallery/Reception/reception-1.webp',
    alt: 'Ojas Inn reception',
  },
  {
    id: 'reception-2',
    category: 'reception',
    type: 'image',
    src: '/images/optimized/gallery/Reception/reception-2.webp',
    alt: 'Ojas Inn reception area',
  },
  {
    id: 'reception-3',
    category: 'reception',
    type: 'image',
    src: '/images/optimized/gallery/Reception/reception-3.webp',
    alt: 'Ojas Inn reception interior',
  },
  {
    id: 'reception-4',
    category: 'reception',
    type: 'image',
    src: '/images/optimized/gallery/Reception/reception-4.webp',
    alt: 'Ojas Inn reception interior',
  },
  {
    id: 'reception-5',
    category: 'reception',
    type: 'image',
    src: '/images/optimized/gallery/Reception/reception-5.webp',
    alt: 'Ojas Inn reception area',
  },
  {
    id: 'reception-6',
    category: 'reception',
    type: 'image',
    src: '/images/optimized/gallery/Reception/reception-6.webp',
    alt: 'Ojas Inn reception area',
  },
  {
    id: 'reception-7',
    category: 'reception',
    type: 'image',
    src: '/images/optimized/gallery/Reception/reception-7.webp',
    alt: 'Ojas Inn reception area',
  },

  /* =========================================================
     LOBBY / CORRIDOR — 10
     ========================================================= */
  {
    id: 'lobby-1',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/gallery/Lobby-corridor/1.webp',
    alt: 'Ojas Inn lobby corridor',
  },
  {
    id: 'lobby-2',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/optimized/gallery/Lobby-corridor/2.webp',
    alt: 'Ojas Inn lobby corridor',
  },
  {
    id: 'lobby-3',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/gallery/Lobby-corridor/3.webp',
    alt: 'Ojas Inn corridor',
  },
  {
    id: 'lobby-4',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/gallery/Lobby-corridor/4.webp',
    alt: 'Ojas Inn corridor',
  },
  {
    id: 'lobby-5',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/optimized/gallery/Lobby-corridor/5.webp',
    alt: 'Ojas Inn corridor',
  },
  {
    id: 'lobby-6',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/optimized/gallery/Lobby-corridor/6.webp',
    alt: 'Ojas Inn corridor',
  },
  {
    id: 'lobby-7',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/optimized/gallery/Lobby-corridor/7.webp',
    alt: 'Ojas Inn corridor',
  },
  {
    id: 'lobby-8',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/optimized/gallery/Lobby-corridor/8.webp',
    alt: 'Ojas Inn corridor',
  },
  {
    id: 'lobby-9',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/optimized/gallery/Lobby-corridor/9.webp',
    alt: 'Ojas Inn corridor',
  },
  {
    id: 'lobby-10',
    category: 'lobby-corridor',
    type: 'image',
    src: '/images/optimized/gallery/Lobby-corridor/10.webp',
    alt: 'Ojas Inn corridor',
  },


  /* =========================================================
     MAIN — 3
     ========================================================= */
  {
    id: 'main-1',
    category: 'main',
    type: 'image',
    src: '/images/optimized/gallery/Main/main-1.webp',
    alt: 'Ojas Inn property',
  },
  {
    id: 'main-2',
    category: 'main',
    type: 'image',
    src: '/images/optimized/gallery/Main/main-2.webp',
    alt: 'Ojas Inn property view',
  },
  {
    id: 'main-3',
    category: 'main',
    type: 'image',
    src: '/images/optimized/gallery/Main/main-3.webp',
    alt: 'Ojas Inn exterior',
  },

  /* =========================================================
     BALCONY — 6
     ========================================================= */
  {
    id: 'balcony-1',
    category: 'balcony',
    type: 'image',
    src: '/images/optimized/gallery/Balcony/1.webp',
    alt: 'Private balcony with outdoor views',
  },
  {
    id: 'balcony-2',
    category: 'balcony',
    type: 'image',
    src: '/images/optimized/gallery/Balcony/2.webp',
    alt: 'Private balcony overlooking greenery',
  },
  {
    id: 'balcony-3',
    category: 'balcony',
    type: 'image',
    src: '/images/optimized/gallery/Balcony/3.webp',
    alt: 'Balcony seating area with outdoor views',
  },
  {
    id: 'balcony-4',
    category: 'balcony',
    type: 'image',
    src: '/images/optimized/gallery/Balcony/4.webp',
    alt: 'Private balcony at Ojas Inn',
  },
  {
    id: 'balcony-5',
    category: 'balcony',
    type: 'image',
    src: '/images/optimized/gallery/Balcony/5.webp',
    alt: 'Balcony with greenery view',
  },
  {
    id: 'balcony-6',
    category: 'balcony',
    type: 'image',
    src: '/images/gallery/Balcony/6.webp',
    alt: 'Private balcony outdoor view',
  },
]

const roomGroups = [
  {
    id: 'deluxe-ac',
    label: 'Deluxe AC',
  },
  {
    id: 'deluxe-non-ac',
    label: 'Deluxe Non AC',
  },
  {
    id: 'executive',
    label: 'Executive',
  },
  {
    id: 'family',
    label: 'Family',
  },
]

function GalleryMedia({
  item,
  index,
  onSelect,
  lightbox = false,
}) {
  const mediaClass = lightbox
    ? 'max-h-[78vh] max-w-[88vw] rounded-sm object-contain shadow-2xl'
    : 'h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.035]'

  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        muted
        playsInline
        autoPlay={!lightbox}
        loop={!lightbox}
        preload={lightbox ? 'metadata' : 'auto'}
        controls={lightbox}
        onClick={lightbox ? undefined : onSelect}
        className={mediaClass}
        aria-label={item.alt}
      />
    )
  }

  return (
    <img
      src={item.src}
      alt={item.alt}
      loading={index < 8 ? 'eager' : 'lazy'}
      decoding="async"
      onClick={lightbox ? undefined : onSelect}
      className={mediaClass}
    />
  )
}

function GalleryCard({ item, index, onSelect, roomLabel }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.025, 0.18),
      }}
      className="group relative aspect-[4/3] overflow-hidden rounded-[3px] bg-[#ECE8E0] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A47A32] focus-visible:ring-offset-2"
    >
      <GalleryMedia
        item={item}
        index={index}
        onSelect={onSelect}
      />

      <span className="pointer-events-none absolute inset-0 border border-black/[0.06]" />

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10171D]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="min-w-0 text-left">
          <span className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-white/65">
            {roomLabel || (
              item.type === 'video'
                ? 'Video'
                : item.category === 'lobby-corridor'
                  ? 'Lobby-corridor'
                  : item.category
            )}
          </span>

          <span className="block line-clamp-2 text-[10px] font-medium leading-4 text-white sm:text-[11px]">
            {item.alt}
          </span>
        </span>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
          <Expand
            size={12}
            strokeWidth={1.6}
            className="text-white"
          />
        </span>
      </span>
    </motion.button>
  )
}

export default function GallerySection() {
  /*
   * Room is intentionally the default category.
   */
  const [activeCategory, setActiveCategory] = useState('room')
  const [selectedIndex, setSelectedIndex] = useState(null)

  const filteredGallery = useMemo(() => {
    if (activeCategory === 'all') {
      return gallery
    }

    return gallery.filter(
      (item) => item.category === activeCategory,
    )
  }, [activeCategory])

  const selectedImage =
    selectedIndex !== null
      ? filteredGallery[selectedIndex]
      : null

  const closeLightbox = () => {
    setSelectedIndex(null)
  }

  const previousImage = () => {
    setSelectedIndex((current) => {
      if (
        current === null ||
        filteredGallery.length === 0
      ) {
        return current
      }

      return current === 0
        ? filteredGallery.length - 1
        : current - 1
    })
  }

  const nextImage = () => {
    setSelectedIndex((current) => {
      if (
        current === null ||
        filteredGallery.length === 0
      ) {
        return current
      }

      return current === filteredGallery.length - 1
        ? 0
        : current + 1
    })
  }

  const renderStandardGallery = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4"
      >
        {filteredGallery.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            onSelect={() => setSelectedIndex(index)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )

  const renderRoomGallery = () => (
    <div className="space-y-10 sm:space-y-12">
      {roomGroups.map((group) => {
        const items = gallery.filter(
          (item) => item.roomType === group.id,
        )

        return (
          <div key={group.id}>
            <div className="mb-4 flex items-center gap-3">
              <h3 className="font-serif text-[1.45rem] tracking-[-0.02em] text-[#202A33] sm:text-[1.65rem]">
                {group.label}
              </h3>

              <span className="h-px flex-1 bg-[#E5DED2]" />

              <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A47A32]">
                {items.length} media
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
              {items.map((item, index) => {
                const globalIndex =
                  filteredGallery.findIndex(
                    (galleryItem) =>
                      galleryItem.id === item.id,
                  )

                return (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={index}
                    roomLabel={group.label}
                    onSelect={() =>
                      setSelectedIndex(globalIndex)
                    }
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <>
      <section
        id="gallery"
        className="relative overflow-hidden bg-[#FBFAF7] py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A47A32]">
                Gallery
              </span>

              <h2 className="mt-2 font-serif text-[2rem] leading-[1.08] tracking-[-0.025em] text-[#1F2933] sm:text-[2.45rem] lg:text-[2.8rem]">
                A closer look at{' '}
                <span className="text-[#8D672C]">
                  Ojas Inn.
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-[13px] leading-6 text-[#6E767D] sm:text-sm">
                Explore the rooms, interiors and spaces that
                make your stay comfortable and convenient.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-6 flex max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-1.5 rounded-full border border-[#E4DDD1] bg-white p-1 shadow-[0_4px_18px_rgba(31,41,51,0.04)]">
                {galleryCategories.map((category) => {
                  const active =
                    activeCategory === category.id

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category.id)
                        setSelectedIndex(null)
                      }}
                      className={`shrink-0 rounded-full px-3.5 py-2 text-[10px] font-semibold transition-all duration-250 sm:px-4 sm:text-[11px] ${
                        active
                          ? 'bg-[#202A33] text-white'
                          : 'text-[#737A80] hover:bg-[#F4F0E9] hover:text-[#202A33]'
                      }`}
                    >
                      {category.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <div className="mt-7 sm:mt-8">
            {activeCategory === 'room'
              ? renderRoomGallery()
              : renderStandardGallery()}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#11171C]/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-7 sm:top-7"
            >
              <X
                size={18}
                strokeWidth={1.5}
              />
            </button>

            {filteredGallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(event) => {
                    event.stopPropagation()
                    previousImage()
                  }}
                  className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-7"
                >
                  <ChevronLeft
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>

                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(event) => {
                    event.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-7"
                >
                  <ChevronRight
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
              </>
            )}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              transition={{
                duration: 0.22,
              }}
              className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <GalleryMedia
                item={selectedImage}
                index={selectedIndex}
                lightbox
              />

              <div className="mt-3 text-center">
                <p className="text-xs text-white/80">
                  {selectedImage.alt}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/35">
                  {selectedIndex + 1} /{' '}
                  {filteredGallery.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
