import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Trash2 } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../services/pricing'
import QuantityStepper from '../components/QuantityStepper'
import PriceBreakdown from '../components/PriceBreakdown'
import Button from '../components/Button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, fee, total } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-14 lg:px-8">
      <h1 className="font-display text-[32px] font-semibold text-ink">Carrinho</h1>

      {items.length === 0 ? (
        <div className="mt-14 border border-dashed border-line-strong py-20 text-center">
          <p className="font-display text-[19px] font-semibold text-ink">Seu carrinho está vazio</p>
          <p className="mt-2 text-[14.5px] text-ink-soft">
            Encontre um evento ou experiência para começar sua compra.
          </p>
          <Link to="/eventos" className="mt-6 inline-block">
            <Button>Explorar eventos</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 border border-line bg-paper p-5 ticket-notch-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-[16px] font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-[13.5px] text-ink-soft">{item.variant} · {item.date}</p>
                  <p className="text-[13px] text-ink-faint">{item.location}</p>
                </div>
                <div className="flex items-center gap-6">
                  <QuantityStepper value={item.quantity} onChange={(value) => updateQuantity(item.id, value)} min={1} />
                  <span className="w-24 text-right font-display text-[15px] font-semibold text-ink">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-ink-faint hover:text-[#c0392b]"
                    aria-label="Remover item"
                  >
                    <Trash2 className="h-[18px] w-[18px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="border border-line bg-paper p-6 ticket-notch-sm">
              <h2 className="font-display text-[17px] font-semibold text-ink">Resumo da compra</h2>
              <div className="mt-5">
                <PriceBreakdown subtotal={subtotal} fee={fee} total={total} />
              </div>
              <p className="mt-4 flex items-center gap-2 text-[13px] text-ink-soft">
                <ShieldCheck className="h-4 w-4 text-signal" />
                Taxa transparente. Sem surpresas no final.
              </p>
              <Link to="/checkout" className="mt-6 block">
                <Button fullWidth size="lg">Finalizar compra</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
