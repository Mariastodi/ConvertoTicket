import { useEffect } from 'react'
import { CalendarPlus, CreditCard, Search, Ticket } from 'lucide-react'

const buyerSteps = [
  { icon: Search, title: 'Encontre', text: 'Busque eventos e experiências por data, local ou categoria.' },
  { icon: Ticket, title: 'Escolha', text: 'Selecione o tipo de ingresso e a quantidade que precisa.' },
  { icon: CreditCard, title: 'Compre', text: 'Pague com Pix ou cartão e veja a taxa antes de confirmar.' },
]

const organizerSteps = [
  { icon: CalendarPlus, title: 'Crie', text: 'Cadastre seu evento, ingressos e datas em poucos minutos.' },
  { icon: Search, title: 'Divulgue', text: 'Compartilhe a página do evento e acompanhe o alcance.' },
  { icon: CreditCard, title: 'Receba', text: 'Acompanhe vendas e receita em um painel simples.' },
]

export default function HowItWorksPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-16 lg:px-8">
      <h1 className="font-display text-[32px] font-semibold text-ink sm:text-[38px]">Como funciona</h1>
      <p className="mt-2 max-w-[560px] text-[15px] text-ink-soft">
        A Converto simplifica os dois lados da experiência: quem compra e quem organiza.
      </p>

      <div className="mt-12">
        <h2 className="font-display text-[19px] font-semibold text-ink">Para quem compra</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {buyerSteps.map((step) => (
            <StepBlock key={step.title} {...step} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-[19px] font-semibold text-ink">Para quem organiza</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {organizerSteps.map((step) => (
            <StepBlock key={step.title} {...step} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StepBlock({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Search
  title: string
  text: string
}) {
  return (
    <div className="border border-line bg-paper p-5 ticket-notch-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-dim text-ink-soft">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <p className="mt-4 font-display text-[16px] font-semibold text-ink">{title}</p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{text}</p>
    </div>
  )
}
