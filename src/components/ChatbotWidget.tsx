import { useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import LogoMark from './LogoMark'

interface Message {
  from: 'bot' | 'user'
  text: string
}

const suggestions = [
  'Como comprar um ingresso?',
  'Como funciona a taxa?',
  'Quero encontrar um evento',
  'Tive um problema com meu ingresso',
  'Sou organizador',
]

const responses: Record<string, string> = {
  'Como comprar um ingresso?':
    'Escolha um evento ou experiência, selecione o tipo de ingresso e a quantidade, e finalize no checkout com Pix ou cartão. Simples assim.',
  'Como funciona a taxa?':
    'A taxa Converto é sempre mostrada antes da compra, sem letras miúdas: valor do ingresso + taxa transparente = total. Você sabe exatamente quanto está pagando.',
  'Quero encontrar um evento':
    'Você pode navegar pela página de Eventos e filtrar por data, localização, categoria e preço. Também temos experiências como parques e atrações.',
  'Tive um problema com meu ingresso':
    'Sinto muito por isso. Nesta demonstração ainda não temos suporte real, mas na versão completa você abriria um chamado direto por aqui.',
  'Sou organizador':
    'Que bom! Acesse "Para organizadores" para conhecer o painel, criar seu primeiro evento e acompanhar vendas em tempo real.',
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Olá! 👋 Posso ajudar você a encontrar um evento ou tirar dúvidas sobre sua compra.' },
  ])
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)

  function send(text: string) {
    if (!text.trim()) return
    setShowSuggestions(false)
    setMessages((current) => [...current, { from: 'user', text }])
    setInput('')

    const reply =
      responses[text] ??
      'Ainda estou aprendendo a responder isso nesta demonstração, mas na versão completa o Converto Assist vai te ajudar com essa dúvida.'

    window.setTimeout(() => {
      setMessages((current) => [...current, { from: 'bot', text: reply }])
    }, 500)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[480px] w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_16px_48px_rgba(21,19,15,0.18)]">
          <div className="flex items-center justify-between bg-ink px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow">
                <LogoMark className="h-5 w-5 text-ink" />
              </span>
              <div>
                <p className="font-display text-[14px] font-semibold text-paper">Converto Assist</p>
                <p className="text-[11.5px] text-paper/60">Online agora</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-paper/70 hover:text-paper" aria-label="Fechar chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                  message.from === 'bot'
                    ? 'bg-paper-dim text-ink'
                    : 'ml-auto bg-ink text-paper'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {showSuggestions && (
            <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => send(suggestion)}
                  className="rounded-full border border-line-strong px-3 py-1.5 text-[12px] text-ink-soft hover:border-ink hover:text-ink"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t border-line p-3"
            onSubmit={(event) => {
              event.preventDefault()
              send(input)
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Digite sua dúvida..."
              className="h-10 flex-1 rounded-full border border-line-strong bg-paper px-4 text-[13.5px] outline-none focus-visible:border-ink"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-ink"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-[0_10px_30px_rgba(21,19,15,0.28)] transition-transform hover:scale-105"
        aria-label="Abrir Converto Assist"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  )
}
