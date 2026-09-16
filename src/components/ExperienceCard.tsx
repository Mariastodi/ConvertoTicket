import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Experience } from '../types'

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      to={`/experiencias/${experience.slug}`}
      className="group relative flex h-72 flex-col justify-end overflow-hidden border border-line p-6 ticket-notch"
      style={{
        background: `linear-gradient(160deg, ${experience.coverGradient[0]}, ${experience.coverGradient[1]})`,
      }}
    >
      <ArrowUpRight className="absolute right-5 top-5 h-6 w-6 text-paper/80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      <p className="flex items-center gap-1.5 text-[13px] font-medium text-paper/70">
        <MapPin className="h-3.5 w-3.5" />
        {experience.city}
      </p>
      <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-paper">
        {experience.title}
      </h3>
      <p className="mt-2 max-w-[85%] text-[14px] leading-relaxed text-paper/75">{experience.tagline}</p>
    </Link>
  )
}
