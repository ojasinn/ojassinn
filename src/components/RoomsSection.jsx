import Reveal from './Reveal'
import { rooms } from '../data/rooms'
import RoomCard from './RoomCard'

export default function RoomsSection() {
  return (
    <section
      id="rooms"
      aria-labelledby="rooms-heading"
      className="bg-surface py-12 md:py-14 lg:py-16"
    >
      <div className="container">

        <div className="grid items-end gap-4 lg:grid-cols-12 lg:gap-8">

          <div className="lg:col-span-7">
            <Reveal as="p" className="eyebrow">
              Rooms &amp; stays
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="rooms-heading"
                className="
                  mt-3 max-w-3xl
                  font-display text-[2.3rem]
                  leading-[1]
                  tracking-[-0.02em]
                  text-ink
                  sm:text-[2.7rem]
                  lg:text-[3rem]
                "
              >
                Find your room.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:col-span-5">
            <p className="max-w-md font-sans text-[0.8rem] leading-[1.5] text-muted lg:ml-auto">
              Four room types, each designed around straightforward comfort
              and the essentials you need for a convenient stay.
            </p>
          </Reveal>

        </div>

        <div
          className="
            mx-auto mt-7 grid max-w-5xl items-stretch gap-4
            md:mt-8
            md:grid-cols-2
            lg:gap-5
          "
        >
          {rooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
