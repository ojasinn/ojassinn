import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Send,
  Sparkles,
  Users,
  Wifi,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { hotelConfig } from '../config/hotelConfig'
import { openWhatsApp } from '../utils/whatsapp'

const EASE = [0.22, 1, 0.36, 1]

const ROOMS = [
  {
    id: 'deluxe-non-ac',
    name: 'Deluxe – Non AC',
    mrName: 'डिलक्स – नॉन एसी',
    rate: 1400,
    standardOccupancy: 2,
    maxOccupancy: 2,
  },
  {
    id: 'deluxe-ac',
    name: 'Deluxe – AC',
    mrName: 'डिलक्स – एसी',
    rate: 1600,
    standardOccupancy: 2,
    maxOccupancy: 2,
  },
  {
    id: 'executive',
    name: 'Executive',
    mrName: 'एक्झिक्युटिव्ह',
    rate: 2000,
    standardOccupancy: 2,
    maxOccupancy: 2,
  },
  {
    id: 'family',
    name: 'Family',
    mrName: 'फॅमिली',
    rate: 2400,
    standardOccupancy: 2,
    maxOccupancy: 3,
  },
]

const EXTRA_PERSON_RATE = 800

const LANGUAGES = {
  en: {
    languageName: 'English',

    welcome: 'Welcome to Ojas Inn.',
    welcomeText:
      'Please tell us what you would like to know. We will be happy to help you with rooms, rates, facilities, location, stay information or your booking enquiry.',

    availability: 'Check Room Availability',
    rates: 'Room Rates',
    rooms: 'Rooms & Occupancy',
    facilities: 'Facilities',
    location: 'Location & Nearby',
    stay: 'Check-in & Stay Information',
    contact: 'Contact Ojas',
    book: 'Book a Room',
    other: 'Other Enquiry',

    back: 'Back',
    close: 'Close',
    minimize: 'लहान करा',
    next: 'Continue',
    confirm: 'Send Enquiry to Ojas',
    later: "I'll enquire later",
    whatsapp: 'Continue on WhatsApp',
    directWhatsApp: 'Contact us on WhatsApp',

    goodMorning: 'Good morning.',
    goodAfternoon: 'Good afternoon.',
    goodEvening: 'Good evening.',

    checkIn: 'What is your check-in date?',
    checkOut: 'What is your check-out date?',
    guests: 'How many guests will be staying?',
    room: 'Which room would you like?',
    occupancy: 'How many people will be staying in the room?',

    occupancyNote:
      'Our listed room rates are based on 2-person occupancy. The Family Room allows up to 3-person sharing.',

    extra: 'Will there be an extra person beyond the standard occupancy?',
    yes: 'Yes',
    no: 'No',
    extraNote: 'Extra person charge: ₹800 per person per night.',

    name: "Please enter the guest's full name.",
    mobile: 'Please provide your mobile number.',

    special: 'Do you have any special requirements or requests?',
    noRequest: 'No special request',
    early: 'Early check-in',
    late: 'Late check-out',
    otherRequest: 'Other',

    summary: 'Please review your enquiry',
    availabilityText:
      'Room availability is confirmed by Ojas Inn. Your enquiry will be sent to WhatsApp so the hotel can confirm the stay with you.',

    otherText:
      'Please tell us what you need and we will help you directly on WhatsApp.',

    ratesTitle: 'Current Room Rates',
    rateNote:
      'Rates are for 2-person occupancy. Family Room allows up to 3-person sharing. Extra person: ₹800/night.',

    roomsTitle: 'Our Rooms',
    roomsText:
      'Choose the room that suits your stay. All listed rates are per room per night.',

    facilitiesTitle: 'Facilities at Ojas',
    facilitiesText:
      'We provide the following facilities for a comfortable stay.',

    locationTitle: 'Find Ojas Inn',
    locationText:
      'Ojas Inn is on Talegaon MIDC Road, in front of D.Y. Patil University.',

    stayTitle: 'Stay Information',
    stayText:
      'Here are the standard check-in and check-out timings for your stay.',

    contactTitle: 'Contact Ojas Inn',
    contactText:
      'For direct assistance, availability confirmation or anything not covered here, please contact us on WhatsApp.',

    address: 'Address',
    phone: 'Phone',
    checkInTime: 'Check-in',
    checkOutTime: 'Check-out',
    nearby: 'Nearby',

    selected: 'Selected',
    nights: 'night',
    nightsPlural: 'nights',
    total: 'Estimated room total',

    paymentNote:
      'This is an enquiry, not a confirmed booking. Ojas Inn will confirm availability and provide the next booking/payment details on WhatsApp.',

    required: 'Please complete this field.',
    invalidMobile: 'Please enter a valid mobile number.',
    dateError: 'Check-out must be after check-in.',

    language: 'Language',

    facilityList: [
      'Free Wi-Fi',
      'LCD TV',
      '24×7 Security',
      'Free Toiletries',
      'Daily Housekeeping',
      '24-Hour Front Desk',
      'Mineral Water Bottle',
      'Tile / Marble Floor',
      'Wardrobe / Closet',
      'Clean Towels',
      'Clean Linen',
      'Toilet Paper',
      'Wake-Up Service',
      'DTH Channels',
      'AC',
      'Power Backup',
      'Free Parking',
    ],

    nearbyItems: [
      {
        name: 'D.Y. Patil University',
        detail: 'In front of the property',
      },
      {
        name: 'Talegaon MIDC',
        detail: 'The surrounding industrial area',
      },
      {
        name: 'Talegaon Dabhade',
        detail: 'Town centre and local area',
      },
      {
        name: 'Mumbai–Pune Expressway',
        detail: 'Accessible via the Talegaon side',
      },
    ],
  },

  mr: {
    languageName: 'मराठी',

    welcome: 'Ojas Inn मध्ये आपले स्वागत आहे.',
    welcomeText:
      'आपल्याला रूम, दर, सुविधा, लोकेशन, राहण्याची माहिती किंवा बुकिंगबद्दल काहीही जाणून घ्यायचे असल्यास आम्ही मदत करू.',

    availability: 'रूम उपलब्धता तपासा',
    rates: 'रूमचे दर',
    rooms: 'रूम आणि राहण्याची क्षमता',
    facilities: 'सुविधा',
    location: 'लोकेशन आणि जवळची ठिकाणे',
    stay: 'चेक-इन आणि राहण्याची माहिती',
    contact: 'Ojas शी संपर्क',
    book: 'रूम बुक करा',
    other: 'इतर चौकशी',

    back: 'मागे',
    close: 'बंद करा',
    minimize: 'लहान करा',
    next: 'पुढे',
    confirm: 'WhatsApp वर चौकशी पाठवा',
    later: 'नंतर चौकशी करेन',
    whatsapp: 'WhatsApp वर सुरू ठेवा',
    directWhatsApp: 'WhatsApp वर संपर्क करा',

    goodMorning: 'शुभ सकाळ.',
    goodAfternoon: 'शुभ दुपार.',
    goodEvening: 'शुभ संध्याकाळ.',

    checkIn: 'आपली चेक-इन तारीख कोणती?',
    checkOut: 'आपली चेक-आउट तारीख कोणती?',
    guests: 'एकूण किती पाहुणे राहणार आहेत?',
    room: 'आपल्याला कोणती रूम हवी आहे?',
    occupancy: 'रूममध्ये किती व्यक्ती राहणार आहेत?',

    occupancyNote:
      'रूमचे दिलेले दर २ व्यक्तींच्या राहण्यावर आधारित आहेत. फॅमिली रूममध्ये जास्तीत जास्त ३ व्यक्ती राहू शकतात.',

    extra: 'ठरावीक क्षमतेपेक्षा अतिरिक्त व्यक्ती आहे का?',
    yes: 'होय',
    no: 'नाही',
    extraNote: 'अतिरिक्त व्यक्तीचा दर: ₹८०० प्रति व्यक्ती प्रति रात्र.',

    name: 'कृपया पाहुण्याचे पूर्ण नाव द्या.',
    mobile: 'कृपया आपला मोबाईल नंबर द्या.',

    special: 'आपली काही विशेष विनंती आहे का?',
    noRequest: 'विशेष विनंती नाही',
    early: 'लवकर चेक-इन',
    late: 'उशिरा चेक-आउट',
    otherRequest: 'इतर',

    summary: 'आपली चौकशी तपासा',
    availabilityText:
      'रूमची उपलब्धता Ojas Inn कडून confirm केली जाईल. आपली माहिती WhatsApp वर पाठवली जाईल.',

    otherText:
      'आपली चौकशी सांगा. आम्ही WhatsApp वर थेट मदत करू.',

    ratesTitle: 'सध्याचे रूम दर',
    rateNote:
      'दर २ व्यक्तींच्या राहण्यावर आधारित आहेत. फॅमिली रूममध्ये ३ व्यक्ती राहू शकतात. अतिरिक्त व्यक्ती: ₹८००/रात्र.',

    roomsTitle: 'आमच्या रूम्स',
    roomsText:
      'आपल्या राहण्यासाठी योग्य रूम निवडा. दिलेले दर प्रति रूम प्रति रात्र आहेत.',

    facilitiesTitle: 'Ojas मधील सुविधा',
    facilitiesText:
      'आरामदायी राहण्यासाठी खालील सुविधा उपलब्ध आहेत.',

    locationTitle: 'Ojas Inn शोधा',
    locationText:
      'Ojas Inn हे Talegaon MIDC Road वर, D.Y. Patil University च्या समोर आहे.',

    stayTitle: 'राहण्याची माहिती',
    stayText:
      'आपल्या राहण्यासाठी चेक-इन आणि चेक-आउटच्या नेहमीच्या वेळा खाली दिल्या आहेत.',

    contactTitle: 'Ojas Inn शी संपर्क',
    contactText:
      'थेट मदत, उपलब्धता किंवा इतर कोणत्याही चौकशीसाठी WhatsApp वर संपर्क करा.',

    address: 'पत्ता',
    phone: 'फोन',
    checkInTime: 'चेक-इन',
    checkOutTime: 'चेक-आउट',
    nearby: 'जवळची ठिकाणे',

    selected: 'निवडले',
    nights: 'रात्र',
    nightsPlural: 'रात्री',
    total: 'अंदाजे रूम एकूण',

    paymentNote:
      'ही चौकशी आहे, निश्चित बुकिंग नाही. Ojas Inn WhatsApp वर उपलब्धता आणि पुढील बुकिंग/पेमेंटची माहिती confirm करेल.',

    required: 'कृपया हे क्षेत्र पूर्ण करा.',
    invalidMobile: 'कृपया योग्य मोबाईल नंबर द्या.',
    dateError: 'चेक-आउटची तारीख चेक-इननंतरची असणे आवश्यक आहे.',

    language: 'भाषा',

    facilityList: [
      'मोफत Wi-Fi',
      'LCD TV',
      '२४ तास सुरक्षा',
      'मोफत प्रसाधन सामग्री',
      'दररोज स्वच्छता सेवा',
      '२४ तास स्वागत कक्ष',
      'मिनरल वॉटर बाटली',
      'टाइल / संगमरवरी फरशी',
      'कपाट',
      'स्वच्छ टॉवेल',
      'स्वच्छ बेडशीट',
      'टॉयलेट पेपर',
      'उठवण्याची सेवा',
      'DTH चॅनेल्स',
      'AC',
      'वीज बॅकअप',
      'मोफत पार्किंग',
    ],

    nearbyItems: [
      {
        name: 'D.Y. Patil University',
        detail: 'हॉटेलच्या समोर',
      },
      {
        name: 'Talegaon MIDC',
        detail: 'आजूबाजूचा औद्योगिक परिसर',
      },
      {
        name: 'Talegaon Dabhade',
        detail: 'शहर आणि स्थानिक परिसर',
      },
      {
        name: 'Mumbai–Pune Expressway',
        detail: 'तळेगावच्या बाजूने जाण्यास सोयीचे',
      },
    ],
  },
}

function getGreeting(language) {
  const hour = new Date().getHours()
  const t = LANGUAGES[language]

  if (hour >= 5 && hour < 12) return t.goodMorning
  if (hour >= 12 && hour < 17) return t.goodAfternoon
  return t.goodEvening
}

function formatDate(value, language = 'en') {
  if (!value) return ''

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(language === 'mr' ? 'mr-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0

  const start = new Date(`${checkIn}T00:00:00`)
  const end = new Date(`${checkOut}T00:00:00`)
  const difference = end.getTime() - start.getTime()

  return difference > 0 ? Math.round(difference / 86400000) : 0
}

function getToday() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000

  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

function addDays(value, days) {
  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) return ''

  date.setDate(date.getDate() + days)

  const offset = date.getTimezoneOffset() * 60000

  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

function buildWhatsAppMessage({ language, data }) {
  const room = ROOMS.find((item) => item.id === data.roomId)
  const nights = nightsBetween(data.checkIn, data.checkOut)

  const extraCharge =
    data.extraPerson === 'yes'
      ? EXTRA_PERSON_RATE * Number(data.extraCount || 1) * nights
      : 0

  const roomTotal = room ? room.rate * nights : 0
  const estimatedTotal = roomTotal + extraCharge

  const lines = [
    `Hello ${hotelConfig.hotelName},`,
    '',
    language === 'mr'
      ? 'मला रूम उपलब्धता आणि बुकिंगबद्दल चौकशी करायची आहे.'
      : 'I would like to enquire about room availability and booking.',
    '',
    `Language: ${language === 'mr' ? 'Marathi' : 'English'}`,
    `Check-in: ${formatDate(data.checkIn, 'en')}`,
    `Check-out: ${formatDate(data.checkOut, 'en')}`,
    `Number of guests: ${data.guests}`,
    `Room: ${room?.name ?? ''}`,
    `Occupancy: ${data.occupancy}`,
    `Extra person: ${
      data.extraPerson === 'yes'
        ? `Yes (${data.extraCount})`
        : 'No'
    }`,
    `Guest name: ${data.name}`,
    `Mobile: ${data.mobile}`,
    `Special requirement: ${data.special}`,
    '',
    `Room rate: ₹${room?.rate.toLocaleString('en-IN') ?? '0'} / night`,
    `Number of nights: ${nights}`,
    `Estimated room total: ₹${roomTotal.toLocaleString('en-IN')}`,
  ]

  if (data.extraPerson === 'yes') {
    lines.push(
      `Extra person charge: ₹${extraCharge.toLocaleString('en-IN')}`,
      `Estimated total: ₹${estimatedTotal.toLocaleString('en-IN')}`,
    )
  } else {
    lines.push(`Estimated total: ₹${estimatedTotal.toLocaleString('en-IN')}`)
  }

  lines.push(
    '',
    language === 'mr'
      ? 'कृपया उपलब्धता तपासून पुढील बुकिंगची माहिती द्यावी.'
      : 'Please check availability and share the next booking details.',
  )

  return lines.join('\n')
}

function ChatBubble({ type, children }) {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[92%] rounded-2xl px-3 py-2 text-xs leading-4 ${
          type === 'user'
            ? 'rounded-br-md bg-[#102337] text-white'
            : 'rounded-bl-md border border-line bg-white text-[#263746]'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function ChoiceButton({ children, onClick, selected = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
        selected
          ? 'border-gold bg-gold/[0.07]'
          : 'border-line bg-white hover:border-gold/60 hover:bg-gold/[0.035]'
      }`}
    >
      <span className="text-sm font-medium text-ink">{children}</span>

      <ChevronRight
        className="h-4 w-4 shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={1.6}
      />
    </button>
  )
}

function RatesCard({ t, language }) {
  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
        {t.ratesTitle}
      </p>

      <div className="mt-2 space-y-1.5">
        {ROOMS.map((room) => (
          <div
            key={room.id}
            className="flex items-center justify-between gap-4 border-b border-line/70 py-2 last:border-b-0"
          >
            <span className="text-xs font-medium text-ink">
              {language === 'mr' ? room.mrName : room.name}
            </span>

            <span className="shrink-0 text-xs font-semibold text-ink">
              ₹{room.rate.toLocaleString('en-IN')}/night
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between gap-4 pt-2">
          <span className="text-xs font-medium text-muted">
            {language === 'mr' ? 'अतिरिक्त व्यक्ती' : 'Extra person'}
          </span>

          <span className="text-xs font-semibold text-ink">
            {language === 'mr'
              ? `₹${EXTRA_PERSON_RATE.toLocaleString('en-IN')} / रात्र`
              : `₹${EXTRA_PERSON_RATE.toLocaleString('en-IN')} / night`}
          </span>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-4 text-muted">
        {t.rateNote}
      </p>
    </div>
  )
}

function RoomsCard({ t, language }) {
  return (
    <div className="space-y-2">
      {ROOMS.map((room) => (
        <div
          key={room.id}
          className="rounded-xl border border-line bg-white p-3"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">
                {room.name}
              </p>

              <p className="mt-1 text-xs leading-4 text-muted">
                {room.maxOccupancy === 3
                  ? languageText(t, 'Up to 3 guests', 'जास्तीत जास्त ३ व्यक्ती')
                  : languageText(t, 'Up to 2 guests', 'जास्तीत जास्त २ व्यक्ती')}
              </p>
            </div>

            <p className="shrink-0 text-sm font-bold text-gold">
              ₹{room.rate.toLocaleString('en-IN')}
            </p>
          </div>

          <p className="mt-2 text-[11px] text-muted">
            {language === 'mr' ? 'प्रति रूम / रात्र' : 'per room / night'}
          </p>
        </div>
      ))}
    </div>
  )
}

function languageText(t, english, marathi) {
  return t.languageName === 'मराठी' ? marathi : english
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <div className="flex items-start gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/[0.08] text-gold">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
        </span>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-ink">{title}</p>
          <div className="mt-0.5 text-[11px] leading-4 text-muted">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function ErrorText({ children }) {
  return (
    <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs leading-4 text-red-700">
      {children}
    </p>
  )
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/60 py-2 last:border-b-0">
      <span className="text-[11px] leading-4 text-muted">{label}</span>
      <span
        className={`text-right text-[11px] leading-4 ${
          strong ? 'font-bold text-gold' : 'font-medium text-ink'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function StepLayout({ question, children }) {
  return (
    <div>
      <ChatBubble type="bot">
        <p className="font-medium text-ink">{question}</p>
      </ChatBubble>

      <div className="mt-2">{children}</div>
    </div>
  )
}

function ContinueButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-primary mt-3 w-full"
    >
      {label}
      <ChevronRight className="h-4 w-4" strokeWidth={1.7} />
    </button>
  )
}

export default function FaqBot() {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState('en')
  const [step, setStep] = useState('welcome')

  const [data, setData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomId: '',
    occupancy: '2',
    extraPerson: '',
    extraCount: 1,
    name: '',
    mobile: '',
    special: '',
  })

  const [error, setError] = useState('')
  const [showRates, setShowRates] = useState(false)

  const scrollRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const t = LANGUAGES[language]

  const today = useMemo(() => getToday(), [])

  const room = ROOMS.find((item) => item.id === data.roomId)
  const nights = nightsBetween(data.checkIn, data.checkOut)

  const roomTotal = room ? room.rate * nights : 0

  const extraCharge =
    data.extraPerson === 'yes'
      ? EXTRA_PERSON_RATE * Number(data.extraCount || 1) * nights
      : 0

  const estimatedTotal = roomTotal + extraCharge

  useEffect(() => {
    if (!open || !scrollRef.current) return

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [step, error, showRates, open, reduceMotion])

  const reset = () => {
    setStep('welcome')
    setError('')
    setShowRates(false)

    setData({
      checkIn: '',
      checkOut: '',
      guests: '2',
      roomId: '',
      occupancy: '2',
      extraPerson: '',
      extraCount: 1,
      name: '',
      mobile: '',
      special: '',
    })
  }

  const close = () => {
    setOpen(false)
    reset()
  }

  const chooseMainOption = (option) => {
    setError('')
    setShowRates(false)

    if (option === 'rates') {
      setStep('rates')
      return
    }

    if (option === 'rooms') {
      setStep('rooms')
      return
    }

    if (option === 'facilities') {
      setStep('facilities')
      return
    }

    if (option === 'location') {
      setStep('location')
      return
    }

    if (option === 'stay') {
      setStep('stay')
      return
    }

    if (option === 'contact') {
      setStep('contact')
      return
    }

    if (option === 'other') {
      setStep('other')
      return
    }

    setStep('checkIn')
  }

  const goBack = () => {
    setError('')

    const previous = {
      rates: 'welcome',
      rooms: 'welcome',
      facilities: 'welcome',
      location: 'welcome',
      stay: 'welcome',
      contact: 'welcome',
      other: 'welcome',

      checkIn: 'welcome',
      checkOut: 'checkIn',
      guests: 'checkOut',
      room: 'guests',
      occupancy: 'room',
      extra: 'occupancy',
      name: 'extra',
      mobile: 'name',
      special: 'mobile',
      summary: 'special',
    }

    setStep(previous[step] ?? 'welcome')
  }

  const nextFromDate = () => {
    if (!data.checkIn) {
      setError(t.required)
      return
    }

    setError('')
    setStep('checkOut')
  }

  const nextFromCheckOut = () => {
    if (!data.checkOut || data.checkOut <= data.checkIn) {
      setError(t.dateError)
      return
    }

    setError('')
    setStep('guests')
  }

  const nextFromGuests = () => {
    if (!data.guests) {
      setError(t.required)
      return
    }

    setError('')
    setStep('room')
  }

  const nextFromOccupancy = () => {
    const count = Number(data.occupancy)

    if (!count || count < 1) {
      setError(t.required)
      return
    }

    if (room && count > room.maxOccupancy) {
      setError(
        language === 'mr'
          ? `या रूममध्ये जास्तीत जास्त ${room.maxOccupancy} व्यक्ती राहू शकतात.`
          : `This room allows a maximum of ${room.maxOccupancy} guests.`,
      )
      return
    }

    setError('')

    if (count > room.standardOccupancy) {
      setData((current) => ({
        ...current,
        extraPerson: 'yes',
        extraCount: count - room.standardOccupancy,
      }))

      setStep('extra')
      return
    }

    setData((current) => ({
      ...current,
      extraPerson: 'no',
      extraCount: 0,
    }))

    setStep('extra')
  }

  const nextFromExtra = () => {
    if (!data.extraPerson) {
      setError(t.required)
      return
    }

    if (
      data.extraPerson === 'yes' &&
      Number(data.extraCount) < 1
    ) {
      setError(t.required)
      return
    }

    setError('')
    setStep('name')
  }

  const nextFromName = () => {
    if (!data.name.trim()) {
      setError(t.required)
      return
    }

    setError('')
    setStep('mobile')
  }

  const nextFromMobile = () => {
    const digits = data.mobile.replace(/\D/g, '')

    if (digits.length < 10) {
      setError(t.invalidMobile)
      return
    }

    setError('')
    setStep('special')
  }

  const nextFromSpecial = () => {
    if (!data.special) {
      setError(t.required)
      return
    }

    setError('')
    setStep('summary')
  }

  const sendWhatsApp = () => {
    openWhatsApp(
      buildWhatsAppMessage({
        language,
        data,
      }),
    )
  }

  const changeLanguage = (value) => {
    setLanguage(value)
    setError('')
  }

  const renderWelcome = () => (
    <>
      <ChatBubble type="bot">
        <p className="font-medium">
          {getGreeting(language)}
        </p>

        <p className="mt-1">
          {t.welcome}
        </p>

        <p className="mt-1 text-muted">
          {t.welcomeText}
        </p>
      </ChatBubble>

      <div className="grid grid-cols-2 gap-1.5">
        <ChoiceButton onClick={() => chooseMainOption('availability')}>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold" />
            {t.availability}
          </span>
        </ChoiceButton>

        <ChoiceButton onClick={() => chooseMainOption('rates')}>
          {t.rates}
        </ChoiceButton>

        <ChoiceButton onClick={() => chooseMainOption('rooms')}>
          {t.rooms}
        </ChoiceButton>

        <ChoiceButton onClick={() => chooseMainOption('facilities')}>
          <span className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-gold" />
            {t.facilities}
          </span>
        </ChoiceButton>

        <ChoiceButton onClick={() => chooseMainOption('location')}>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            {t.location}
          </span>
        </ChoiceButton>

        <ChoiceButton onClick={() => chooseMainOption('stay')}>
          <span className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-gold" />
            {t.stay}
          </span>
        </ChoiceButton>

        <ChoiceButton onClick={() => chooseMainOption('contact')}>
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold" />
            {t.contact}
          </span>
        </ChoiceButton>

        <ChoiceButton onClick={() => chooseMainOption('book')}>
          {t.book}
        </ChoiceButton>

        <ChoiceButton onClick={() => chooseMainOption('other')}>
          {t.other}
        </ChoiceButton>
      </div>
    </>
  )

  const renderStep = () => {
    if (step === 'welcome') {
      return renderWelcome()
    }

    if (step === 'rates') {
      return (
        <StepLayout question={t.ratesTitle}>
          <RatesCard t={t} language={language} />

          <button
            type="button"
            onClick={() => setStep('checkIn')}
            className="btn btn-primary mt-3 w-full"
          >
            {t.availability}
            <ChevronRight className="h-4 w-4" />
          </button>
        </StepLayout>
      )
    }

    if (step === 'rooms') {
      return (
        <StepLayout question={t.roomsTitle}>
          <ChatBubble type="bot">
            {t.roomsText}
          </ChatBubble>

          <div className="mt-2 space-y-1.5">
            {ROOMS.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-line bg-white p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {language === 'mr' ? item.mrName : item.name}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {item.maxOccupancy === 3
                        ? languageText(
                            t,
                            'Up to 3 guests',
                            'जास्तीत जास्त ३ व्यक्ती',
                          )
                        : languageText(
                            t,
                            'Up to 2 guests',
                            'जास्तीत जास्त २ व्यक्ती',
                          )}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-gold">
                    ₹{item.rate.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 rounded-lg bg-gold/[0.06] px-3 py-2 text-xs leading-5 text-muted">
            {t.occupancyNote}
          </p>

          <button
            type="button"
            onClick={() => setStep('checkIn')}
            className="btn btn-primary mt-3 w-full"
          >
            {t.book}
            <ChevronRight className="h-4 w-4" />
          </button>
        </StepLayout>
      )
    }

    if (step === 'facilities') {
      return (
        <StepLayout question={t.facilitiesTitle}>
          <ChatBubble type="bot">
            {t.facilitiesText}
          </ChatBubble>

          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {(language === 'mr' ? t.facilityList : t.facilityList).map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2"
              >
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-gold"
                  strokeWidth={2}
                />

                <span className="text-xs font-medium text-ink">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </StepLayout>
      )
    }

    if (step === 'location') {
      return (
        <StepLayout question={t.locationTitle}>
          <div className="ojas-bot-location flex flex-col gap-4">
            <ChatBubble type="bot">
              {t.locationText}
            </ChatBubble>

            <InfoCard icon={MapPin} title={t.address}>
              <p>{hotelConfig.address.line1}</p>
              <p>{hotelConfig.address.line2}</p>
              <p>
                {hotelConfig.address.line3},{' '}
                {hotelConfig.address.city}
              </p>
              <p>
                {hotelConfig.address.state} –{' '}
                {hotelConfig.address.postalCode}
              </p>
            </InfoCard>

            <div className="ojas-bot-location-nearby grid grid-cols-2 gap-3">
              {t.nearbyItems.map((item) => (
                <div
                  key={language === 'mr' ? item.mrName : item.name}
                  className="min-w-0 rounded-xl border border-line bg-white px-3 py-3"
                >
                  <p className="break-words text-xs font-semibold leading-4 text-ink">
                    {language === 'mr' ? item.mrName : item.name}
                  </p>

                  <p className="mt-1 break-words text-[11px] leading-4 text-muted">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={hotelConfig.maps.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary w-full"
            >
              <MapPin className="h-4 w-4" />
              {language === 'mr'
                ? 'Google Maps वर दिशा'
                : 'Get Directions'}
            </a>
          </div>
        </StepLayout>
      )
    }

    if (step === 'stay') {
      return (
        <StepLayout question={t.stayTitle}>
          <ChatBubble type="bot">
            <p className="leading-5">
              {t.stayText}
            </p>
          </ChatBubble>

          <div
            className="mt-3 grid gap-2.5"
            style={{
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            }}
          >
            <div className="min-w-0">
              <div className="min-h-[78px] rounded-xl border border-line bg-white px-3 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#102337]/[0.06] text-gold">
                    <Clock3
                      className="h-4 w-4"
                      strokeWidth={1.55}
                    />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-4 text-ink">
                      {t.checkInTime}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-muted">
                      {hotelConfig.policies.checkIn}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="min-h-[78px] rounded-xl border border-line bg-white px-3 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#102337]/[0.06] text-gold">
                    <Clock3
                      className="h-4 w-4"
                      strokeWidth={1.55}
                    />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-4 text-ink">
                      {t.checkOutTime}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-muted">
                      {hotelConfig.policies.checkOut}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="min-h-[78px] rounded-xl border border-line bg-white px-3 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#102337]/[0.06] text-gold">
                    <Wifi
                      className="h-4 w-4"
                      strokeWidth={1.55}
                    />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-4 text-ink">
                      Wi-Fi
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-muted">
                      {language === 'mr'
                        ? 'मोफत Wi-Fi उपलब्ध आहे.'
                        : 'Free Wi-Fi is available.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="min-h-[78px] rounded-xl border border-line bg-white px-3 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#102337]/[0.06] text-gold">
                    <Users
                      className="h-4 w-4"
                      strokeWidth={1.55}
                    />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-4 text-ink">
                      {language === 'mr' ? 'स्वागत कक्ष' : 'Front Desk'}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-muted">
                      {language === 'mr'
                        ? '२४ तास स्वागत कक्ष उपलब्ध आहे.'
                        : '24-hour front desk is available.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="min-h-[78px] rounded-xl border border-line bg-white px-3 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#102337]/[0.06] text-gold">
                    <Check
                      className="h-4 w-4"
                      strokeWidth={1.55}
                    />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-4 text-ink">
                      {language === 'mr' ? 'पार्किंग' : 'Parking'}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-muted">
                      {language === 'mr'
                        ? 'मोफत पार्किंग उपलब्ध आहे.'
                        : 'Free parking is available.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StepLayout>
      )
    }

    if (step === 'contact') {
      return (
        <StepLayout question={t.contactTitle}>
          <ChatBubble type="bot">
            {t.contactText}
          </ChatBubble>

          <div className="space-y-2">
            <InfoCard icon={Phone} title={t.phone}>
              <a
                href={`tel:${hotelConfig.phone.primaryDial}`}
                className="font-semibold text-ink underline decoration-gold/50 underline-offset-2"
              >
                {hotelConfig.phone.primary}
              </a>

              <span className="mx-1">·</span>

              <a
                href={`tel:${hotelConfig.phone.secondaryDial}`}
                className="font-semibold text-ink underline decoration-gold/50 underline-offset-2"
              >
                {hotelConfig.phone.secondary}
              </a>
            </InfoCard>

            <button
              type="button"
              onClick={() =>
                openWhatsApp(
                  language === 'mr'
                    ? `${hotelConfig.hotelName}, मला चौकशी करायची आहे.`
                    : `Hello ${hotelConfig.hotelName}, I have an enquiry.`,
                )
              }
              className="btn btn-primary w-full"
            >
              <MessageCircle className="h-4 w-4" />
              {t.directWhatsApp}
            </button>
          </div>
        </StepLayout>
      )
    }

    if (step === 'other') {
      return (
        <StepLayout question={t.otherText}>
          <button
            type="button"
            onClick={() =>
              openWhatsApp(
                language === 'mr'
                  ? `${hotelConfig.hotelName}, मला एक चौकशी करायची आहे.`
                  : `Hello ${hotelConfig.hotelName}, I have an enquiry.`,
              )
            }
            className="btn btn-primary w-full"
          >
            <MessageCircle className="h-4 w-4" />
            {t.directWhatsApp}
          </button>
        </StepLayout>
      )
    }

    if (step === 'checkIn') {
      return (
        <StepLayout question={t.checkIn}>
          <input
            type="date"
            value={data.checkIn}
            min={today}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                checkIn: event.target.value,
                checkOut:
                  current.checkOut &&
                  current.checkOut > event.target.value
                    ? current.checkOut
                    : addDays(event.target.value, 1),
              }))
            }
            className="field"
            autoFocus
          />

          <ContinueButton
            onClick={nextFromDate}
            label={t.next}
          />
        </StepLayout>
      )
    }

    if (step === 'checkOut') {
      return (
        <StepLayout question={t.checkOut}>
          <input
            type="date"
            value={data.checkOut}
            min={addDays(data.checkIn, 1)}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                checkOut: event.target.value,
              }))
            }
            className="field"
            autoFocus
          />

          <ContinueButton
            onClick={nextFromCheckOut}
            label={t.next}
          />
        </StepLayout>
      )
    }

    if (step === 'guests') {
      return (
        <StepLayout question={t.guests}>
          <div className="grid grid-cols-2 gap-2">
            {['1', '2', '3', '4'].map((count) => (
              <ChoiceButton
                key={count}
                selected={data.guests === count}
                onClick={() => {
                  setData((current) => ({
                    ...current,
                    guests: count,
                    occupancy:
                      Number(count) > 3 ? '3' : count,
                  }))

                  setError('')
                  setStep('room')
                }}
              >
                <span className="flex items-center gap-2">
                  <Users
                    className="h-4 w-4 text-gold"
                    strokeWidth={1.5}
                  />

                  {count}{' '}
                  {language === 'mr'
                    ? count === '1'
                      ? 'पाहुणा'
                      : 'पाहुणे'
                    : count === '1'
                      ? 'Guest'
                      : 'Guests'}
                </span>
              </ChoiceButton>
            ))}
          </div>
        </StepLayout>
      )
    }

    if (step === 'room') {
      return (
        <StepLayout question={t.room}>
          <div className="space-y-2">
            {ROOMS.map((item) => (
              <ChoiceButton
                key={item.id}
                selected={data.roomId === item.id}
                onClick={() => {
                  setData((current) => ({
                    ...current,
                    roomId: item.id,
                    occupancy:
                      Number(current.guests) > item.maxOccupancy
                        ? String(item.maxOccupancy)
                        : current.guests,
                  }))

                  setError('')
                  setStep('occupancy')
                }}
              >
                <span>
                  <span className="block">
                    {language === 'mr' ? item.mrName : item.name}
                  </span>

                  <span className="mt-0.5 block text-xs font-normal text-muted">
                    {language === 'mr'
                      ? `₹${item.rate.toLocaleString('en-IN')} / रात्र · जास्तीत जास्त ${item.maxOccupancy} व्यक्ती`
                      : `₹${item.rate.toLocaleString('en-IN')} / night · max ${item.maxOccupancy} guests`}
                  </span>
                </span>
              </ChoiceButton>
            ))}
          </div>
        </StepLayout>
      )
    }

    if (step === 'occupancy') {
      const max = room?.maxOccupancy ?? 2

      return (
        <StepLayout question={t.occupancy}>
          <p className="mb-2 rounded-lg bg-gold/[0.06] px-2.5 py-1.5 text-[11px] leading-4 text-muted">
            {t.occupancyNote}
          </p>

          <div className="grid grid-cols-2 gap-2">
            {Array.from(
              { length: max },
              (_, index) => index + 1,
            ).map((count) => (
              <ChoiceButton
                key={count}
                selected={
                  Number(data.occupancy) === count
                }
                onClick={() => {
                  setData((current) => ({
                    ...current,
                    occupancy: String(count),
                  }))

                  setError('')
                }}
              >
                {count}{' '}
                {language === 'mr'
                  ? 'व्यक्ती'
                  : count === 1
                    ? 'Person'
                    : 'People'}
              </ChoiceButton>
            ))}
          </div>

          <ContinueButton
            onClick={nextFromOccupancy}
            label={t.next}
          />

          {error && <ErrorText>{error}</ErrorText>}
        </StepLayout>
      )
    }

    if (step === 'extra') {
      return (
        <StepLayout question={t.extra}>
          <p className="mb-2 rounded-lg bg-gold/[0.06] px-2.5 py-1.5 text-[11px] leading-4 text-muted">
            {t.extraNote}
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            <ChoiceButton
              selected={data.extraPerson === 'yes'}
              onClick={() => {
                setData((current) => ({
                  ...current,
                  extraPerson: 'yes',
                  extraCount: Math.max(
                    1,
                    Number(current.occupancy) -
                      (room?.standardOccupancy ?? 2),
                  ),
                }))

                setError('')
              }}
            >
              {t.yes}
            </ChoiceButton>

            <ChoiceButton
              selected={data.extraPerson === 'no'}
              onClick={() => {
                setData((current) => ({
                  ...current,
                  extraPerson: 'no',
                  extraCount: 0,
                }))

                setError('')
              }}
            >
              {t.no}
            </ChoiceButton>
          </div>

          {data.extraPerson === 'yes' && (
            <div className="mt-3">
              <label className="field-label">
                {language === 'mr'
                  ? 'अतिरिक्त व्यक्ती किती?'
                  : 'How many extra people?'}
              </label>

              <select
                value={data.extraCount}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    extraCount: Number(
                      event.target.value,
                    ),
                  }))
                }
                className="field"
              >
                {[1, 2, 3].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
          )}

          <ContinueButton
            onClick={nextFromExtra}
            label={t.next}
          />

          {error && <ErrorText>{error}</ErrorText>}
        </StepLayout>
      )
    }

    if (step === 'name') {
      return (
        <StepLayout question={t.name}>
          <input
            type="text"
            value={data.name}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            className="field"
            placeholder={
              language === 'mr'
                ? 'पूर्ण नाव'
                : 'Full name'
            }
            autoFocus
          />

          <ContinueButton
            onClick={nextFromName}
            label={t.next}
          />

          {error && <ErrorText>{error}</ErrorText>}
        </StepLayout>
      )
    }

    if (step === 'mobile') {
      return (
        <StepLayout question={t.mobile}>
          <input
            type="tel"
            value={data.mobile}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                mobile: event.target.value,
              }))
            }
            className="field"
            inputMode="tel"
            placeholder="+91 98765 43210"
            autoFocus
          />

          <ContinueButton
            onClick={nextFromMobile}
            label={t.next}
          />

          {error && <ErrorText>{error}</ErrorText>}
        </StepLayout>
      )
    }

    if (step === 'special') {
      return (
        <StepLayout question={t.special}>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              t.noRequest,
              t.early,
              t.late,
              t.otherRequest,
            ].map((option) => (
              <ChoiceButton
                key={option}
                selected={data.special === option}
                onClick={() => {
                  setData((current) => ({
                    ...current,
                    special: option,
                  }))

                  setError('')
                }}
              >
                {option}
              </ChoiceButton>
            ))}
          </div>

          <ContinueButton
            onClick={nextFromSpecial}
            label={t.next}
          />

          {error && <ErrorText>{error}</ErrorText>}
        </StepLayout>
      )
    }

    if (step === 'summary') {
      return (
        <StepLayout question={t.summary}>
          <div className="rounded-xl border border-line bg-white p-3">
            <SummaryRow
              label={t.checkIn}
              value={formatDate(
                data.checkIn,
                language,
              )}
            />

            <SummaryRow
              label={t.checkOut}
              value={formatDate(
                data.checkOut,
                language,
              )}
            />

            <SummaryRow
              label={t.guests}
              value={data.guests}
            />

            <SummaryRow
              label={t.room}
              value={language === 'mr' ? room?.mrName ?? '' : room?.name ?? ''}
            />

            <SummaryRow
              label={t.occupancy}
              value={data.occupancy}
            />

            <SummaryRow
              label={t.extra}
              value={
                data.extraPerson === 'yes'
                  ? `${t.yes} (${data.extraCount})`
                  : t.no
              }
            />

            <SummaryRow
              label={t.name}
              value={data.name}
            />

            <SummaryRow
              label={t.mobile}
              value={data.mobile}
            />

            <SummaryRow
              label={t.special}
              value={data.special}
            />

            <div className="mt-3 border-t border-line pt-3">
              <SummaryRow
                label={t.total}
                value={`₹${estimatedTotal.toLocaleString(
                  'en-IN',
                )}`}
                strong
              />
            </div>
          </div>

          <p className="mt-2 text-[11px] leading-4 text-muted">
            {t.paymentNote}
          </p>

          <button
            type="button"
            onClick={sendWhatsApp}
            className="btn btn-primary mt-3 w-full"
          >
            <Send
              className="h-4 w-4"
              strokeWidth={1.7}
            />

            {t.confirm}
          </button>

          <button
            type="button"
            onClick={close}
            className="mt-1.5 w-full py-1.5 text-[11px] font-medium text-muted hover:text-gold"
          >
            {t.later}
          </button>
        </StepLayout>
      )
    }

    return null
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            aria-label="Open Ojas"
            onClick={() => setOpen(true)}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.8,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.8,
                    y: 12,
                  }
            }
            transition={{
              duration: 0.35,
              ease: EASE,
            }}
            className="
              fixed bottom-20 right-4 z-[70]
              grid h-14 w-14 place-items-center rounded-full
              border border-[#DDB86F]/70
              bg-[#102337] text-[#F0D38F]
              shadow-[0_14px_40px_rgba(16,35,55,0.28)]
              transition-all duration-300
              hover:-translate-y-1 hover:bg-[#18344D]
              lg:bottom-6 lg:right-6
            "
          >
            <MessageCircle
              className="h-6 w-6"
              strokeWidth={1.55}
            />

            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#102337] bg-[#DDB86F]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 24,
                    scale: 0.98,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    x: 24,
                    scale: 0.98,
                  }
            }
            transition={{
              duration: 0.38,
              ease: EASE,
            }}
            aria-label="Ojas"
            className="
              fixed bottom-20 right-3 z-[70]
              flex h-[min(760px,calc(100svh-6rem))] w-[calc(100vw-1.5rem)]
              flex-col overflow-hidden rounded-2xl
              border border-line bg-surface
              shadow-[0_28px_90px_rgba(16,35,55,0.22)]
              sm:right-5 sm:w-[400px]
              lg:bottom-5 lg:right-5
              lg:h-[calc(100svh-2rem)]
              lg:w-[30vw] lg:min-w-[380px] lg:max-w-[480px]
            "
          >
            <header className="shrink-0 border-b border-line bg-[#102337] px-5 py-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#DDB86F]/15 text-[#F0D38F]">
                    <Sparkles
                      className="h-4 w-4"
                      strokeWidth={1.6}
                    />
                  </span>

                  <div>
                    <p className="text-sm font-semibold">
                      Ojas
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/55">
                      {language === 'mr'
                        ? 'आपल्या सेवेसाठी'
                        : 'At your service'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="mr-1 flex rounded-full border border-white/10 bg-white/[0.06] p-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        changeLanguage('en')
                      }
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        language === 'en'
                          ? 'bg-[#DDB86F] text-[#102337]'
                          : 'text-white/65'
                      }`}
                    >
                      EN
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        changeLanguage('mr')
                      }
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        language === 'mr'
                          ? 'bg-[#DDB86F] text-[#102337]'
                          : 'text-white/65'
                      }`}
                    >
                      मराठी
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t.minimize}
                    className="grid h-9 w-9 place-items-center rounded-full text-white/65 hover:bg-white/10 hover:text-white"
                  >
                    <Minus
                      className="h-4 w-4"
                      strokeWidth={1.7}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={close}
                    aria-label={t.close}
                    className="grid h-9 w-9 place-items-center rounded-full text-white/65 hover:bg-white/10 hover:text-white"
                  >
                    <X
                      className="h-4 w-4"
                      strokeWidth={1.7}
                    />
                  </button>
                </div>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto bg-[#FBF9F5] px-3 py-3 sm:px-4 sm:py-4"
            >
              <div className="space-y-2">
                {step !== 'welcome' && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-gold"
                  >
                    <ArrowLeft
                      className="h-3.5 w-3.5"
                      strokeWidth={1.7}
                    />
                    {t.back}
                  </button>
                )}

                {renderStep()}

                {error &&
                  step !== 'occupancy' &&
                  step !== 'extra' && (
                    <ErrorText>{error}</ErrorText>
                  )}
              </div>
            </div>

            <footer className="shrink-0 border-t border-line bg-surface px-4 py-2">
              <p className="text-center text-[10px] leading-4 text-muted">
                {language === 'mr'
                  ? 'आपली चौकशी WhatsApp द्वारे Ojas Inn ला पाठवली जाईल.'
                  : 'Your enquiry will be sent to Ojas Inn through WhatsApp.'}
              </p>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
