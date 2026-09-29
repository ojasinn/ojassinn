import AmenitiesSection from './components/AmenitiesSection'
import BenefitsStrip from './components/BenefitsStrip'
import BookingModal from './components/BookingModal'
import FaqBot from './components/FaqBot'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import GallerySection from './components/GallerySection'
import Hero from './components/Hero'
import IntroSection from './components/IntroSection'
import LocationSection from './components/LocationSection'
import MobileBookingBar from './components/MobileBookingBar'
import Navbar from './components/Navbar'
import ReviewsSection from './components/ReviewsSection'
import RoomModal from './components/RoomModal'
import RoomsSection from './components/RoomsSection'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100]
                   focus:rounded-xs focus:bg-surface focus:px-5 focus:py-3 focus:text-sm focus:text-ink
                   focus:surface-float"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <BenefitsStrip />
        <IntroSection />
        <RoomsSection />
        <AmenitiesSection />
        <GallerySection />
        <LocationSection />
        <ReviewsSection />
        <FinalCTA />
      </main>

      <Footer />

      <MobileBookingBar />
      <BookingModal />
      <RoomModal />
      <FaqBot />
    </>
  )
}
