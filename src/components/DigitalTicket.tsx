import LogoMark from './LogoMark'
import FauxQrCode from './FauxQrCode'
import { formatCurrency } from '../services/pricing'

export default function DigitalTicket({
  title,
  date,
  location,
  variant,
  buyerName,
  price,
  orderId,
}: {
  title: string
  date: string
  location: string
  variant: string
  buyerName: string
  price: number
  orderId: string
}) {
  return (
    <div className="mx-auto max-w-[420px] overflow-hidden bg-ink text-paper shadow-[0_20px_60px_rgba(21,19,15,0.25)]">
      <div className="flex items-center gap-2.5 border-b border-paper/10 px-6 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow">
          <LogoMark className="h-5 w-5 text-ink" />
        </span>
        <span className="font-display text-[15px] font-semibold">Converto</span>
      </div>

      <div className="px-6 py-6">
        <p className="text-[12.5px] uppercase tracking-wide text-paper/50">Ingresso digital</p>
        <h3 className="mt-1.5 font-display text-[22px] font-semibold leading-tight">{title}</h3>

        <dl className="mt-6 grid grid-cols-2 gap-y-4 text-[13.5px]">
          <div>
            <dt className="text-paper/50">Data</dt>
            <dd className="mt-0.5 font-medium">{date}</dd>
          </div>
          <div>
            <dt className="text-paper/50">Local</dt>
            <dd className="mt-0.5 font-medium">{location}</dd>
          </div>
          <div>
            <dt className="text-paper/50">Ingresso</dt>
            <dd className="mt-0.5 font-medium">{variant}</dd>
          </div>
          <div>
            <dt className="text-paper/50">Valor pago</dt>
            <dd className="mt-0.5 font-medium">{formatCurrency(price)}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-paper/50">Nome</dt>
            <dd className="mt-0.5 font-medium">{buyerName}</dd>
          </div>
        </dl>
      </div>

      <div className="perforation h-4" />

      <div className="flex flex-col items-center gap-3 bg-[#1c1913] px-6 py-7">
        <FauxQrCode seed={orderId.length + orderId.charCodeAt(0)} />
        <p className="text-[12px] tracking-wide text-paper/50">{orderId}</p>
      </div>
    </div>
  )
}
