import { Marquee } from "@/components/ui/marquee"

const romanticLines = [
  {
    id: 1,
    text: "I wish I could turn back time, to the good old days when we were friends.",
    movie: "The Notebook",
  },
  {
    id: 2,
    text: "There's nothing I couldn't do if I had you by my side.",
    movie: "The Proposal",
  },
  {
    id: 3,
    text: "I have for the first time found what I can truly love—I have found you.",
    movie: "Jane Eyre",
  },
  {
    id: 4,
    text: "All I have to do is divine your thoughts.",
    movie: "Pride & Prejudice",
  },
  {
    id: 5,
    text: "Whatever our souls are made of, his and mine are the same.",
    movie: "Wuthering Heights",
  },
  {
    id: 6,
    text: "You pierce my soul. I feel as though you have littered me open with a careless hand.",
    movie: "Pride & Prejudice",
  },
  {
    id: 7,
    text: "I would rather share one lifetime with you than face all the ages of this world alone.",
    movie: "Lord of the Rings",
  },
  {
    id: 8,
    text: "In my life, I've loved them all, but I've only chosen one.",
    movie: "The Bridges of Madison County",
  },
]

const RomanticLineCard = ({
  text,
  movie,
}: {
  text: string
  movie: string
}) => {
  return (
    <figure className="relative inline-flex min-w-[300px] max-w-sm flex-col items-center justify-center gap-3 rounded-lg border border-rose-300/20 bg-gradient-to-br from-rose-900/20 to-fuchsia-900/20 p-6 backdrop-blur-sm hover:border-rose-300/40 transition-colors">
      <svg
        className="h-5 w-5 text-rose-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5-1.25 0-4 3-4 5v10c0 1-2 4 6 7 2.002 1.667 8 1.667 10 1.667" />
      </svg>
      <blockquote className="text-center text-sm font-medium text-rose-100">
        "{text}"
      </blockquote>
      <p className="text-xs text-rose-300/80">— {movie}</p>
    </figure>
  )
}

export function RomanticMarquee() {
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-rose-950/30 via-transparent to-fuchsia-950/30 py-8 backdrop-blur-xs">
      <Marquee pauseOnHover className="[--duration:60s]">
        {romanticLines.map((line) => (
          <RomanticLineCard key={line.id} {...line} />
        ))}
      </Marquee>

      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-rose-950 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-rose-950 via-transparent to-transparent" />
    </div>
  )
}
