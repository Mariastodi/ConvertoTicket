import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[480px] flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-[64px] font-semibold text-yellow">404</p>
      <h1 className="mt-2 font-display text-[22px] font-semibold text-ink">Essa página não existe</h1>
      <p className="mt-2 text-[14.5px] text-ink-soft">
        O link pode estar quebrado ou a página pode ter sido movida.
      </p>
      <Link to="/" className="mt-7">
        <Button>Voltar para a home</Button>
      </Link>
    </div>
  )
}
