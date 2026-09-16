import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Download, PartyPopper } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import DigitalTicket from '../components/DigitalTicket'
import Button from '../components/Button'

export default function TicketPage() {
  const { orderId } = useParams()
  const { lastOrder } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!lastOrder || lastOrder.id !== orderId) {
    return <Navigate to="/eventos" replace />
  }

  return (
    <div className="mx-auto max-w-[900px] px-5 py-16 lg:px-8">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal-soft text-signal">
          <PartyPopper className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-[30px] font-semibold text-ink">Compra confirmada! 🎉</h1>
        <p className="mt-2 text-[15px] text-ink-soft">
          Enviamos os detalhes para {lastOrder.buyer.email || 'o seu e-mail'}.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {lastOrder.items.map((item, index) => (
          <div key={item.id}>
            <DigitalTicket
              title={item.title}
              date={item.date}
              location={item.location}
              variant={item.variant}
              buyerName={lastOrder.buyer.name || 'Convidado Converto'}
              price={item.unitPrice * item.quantity}
              orderId={`${lastOrder.id}-${index + 1}`}
            />
            <div className="mx-auto mt-4 flex max-w-[420px] gap-3">
              <Button variant="outline" fullWidth>Visualizar ingresso</Button>
              <Button variant="dark" fullWidth icon={<Download className="h-4 w-4" />}>
                Baixar
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/eventos" className="text-[14.5px] font-semibold text-ink-soft hover:text-ink">
          Voltar para eventos
        </Link>
      </div>
    </div>
  )
}
