import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CreditCard, QrCode } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../services/pricing'
import StepIndicator from '../components/StepIndicator'
import PriceBreakdown from '../components/PriceBreakdown'
import Button from '../components/Button'
import type { Order } from '../types'

const steps = ['Dados', 'Ingressos', 'Pagamento', 'Confirmação']

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, fee, total, clear, setLastOrder } = useCart()
  const [step, setStep] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [buyer, setBuyer] = useState({ name: '', email: '', document: '', phone: '' })
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix')
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  if (items.length === 0 && !orderPlaced) {
    return <Navigate to="/carrinho" replace />
  }

  const buyerValid = buyer.name && buyer.email && buyer.document && buyer.phone

  function goNext() {
    setStep((value) => Math.min(3, value + 1))
  }

  function finalize() {
    setProcessing(true)
    window.setTimeout(() => {
      const order: Order = {
        id: `CV-${Math.floor(100000 + Math.random() * 900000)}`,
        items,
        buyer,
        paymentMethod,
        subtotal,
        fee,
        total,
        createdAt: new Date().toISOString(),
      }
      setOrderPlaced(true)
      setLastOrder(order)
      clear()
      navigate(`/ingresso/${order.id}`, { replace: true })
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-14 lg:px-8">
      <h1 className="font-display text-[30px] font-semibold text-ink">Checkout</h1>

      <div className="mt-8">
        <StepIndicator steps={steps} current={step} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="border border-line bg-paper p-6 ticket-notch sm:p-8">
          {step === 0 && (
            <div>
              <h2 className="font-display text-[19px] font-semibold text-ink">Dados do comprador</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Nome completo" value={buyer.name} onChange={(value) => setBuyer({ ...buyer, name: value })} />
                <Field label="E-mail" type="email" value={buyer.email} onChange={(value) => setBuyer({ ...buyer, email: value })} />
                <Field label="CPF" value={buyer.document} onChange={(value) => setBuyer({ ...buyer, document: value })} />
                <Field label="Telefone" value={buyer.phone} onChange={(value) => setBuyer({ ...buyer, phone: value })} />
              </div>
              <Button className="mt-8" disabled={!buyerValid} onClick={goNext}>
                Continuar
              </Button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display text-[19px] font-semibold text-ink">Revisar ingressos</h2>
              <div className="mt-6 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-line pb-3">
                    <div>
                      <p className="font-medium text-ink">{item.title}</p>
                      <p className="text-[13px] text-ink-soft">{item.variant} × {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-ink">{formatCurrency(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8" onClick={goNext}>
                Continuar para pagamento
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-[19px] font-semibold text-ink">Pagamento</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex items-center gap-3 border p-4 ${paymentMethod === 'pix' ? 'border-ink bg-paper-dim' : 'border-line-strong'}`}
                >
                  <QrCode className="h-5 w-5" /> Pix
                </button>
                <button
                  onClick={() => setPaymentMethod('cartao')}
                  className={`flex items-center gap-3 border p-4 ${paymentMethod === 'cartao' ? 'border-ink bg-paper-dim' : 'border-line-strong'}`}
                >
                  <CreditCard className="h-5 w-5" /> Cartão
                </button>
              </div>
              <p className="mt-4 text-[13px] text-ink-faint">
                Pagamento simulado nesta versão de demonstração. Nenhuma cobrança real é feita.
              </p>
              <Button className="mt-8" onClick={finalize} disabled={processing}>
                {processing ? 'Processando...' : 'Finalizar compra'}
              </Button>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="border border-line bg-paper p-6 ticket-notch-sm">
            <h3 className="font-display text-[16px] font-semibold text-ink">Resumo</h3>
            <div className="mt-4">
              <PriceBreakdown subtotal={subtotal} fee={fee} total={total} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-11 w-full border border-line-strong bg-paper px-4 text-[14.5px] outline-none focus-visible:border-ink"
      />
    </label>
  )
}
