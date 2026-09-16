import { useEffect } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import { experiences } from '../data/mock'

export default function ExperiencesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8">
      <div className="max-w-[560px]">
        <h1 className="font-display text-[32px] font-semibold text-ink sm:text-[38px]">Experiências</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Além de eventos, a Converto também vende ingressos por data para parques,
          museus e atrações, com a mesma transparência de sempre.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  )
}
