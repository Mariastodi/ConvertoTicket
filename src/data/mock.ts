import type {
  Category,
  EventItem,
  Experience,
  ParkDateSlot,
  ParkTicketType,
} from '../types'

export const categories: Category[] = [
  'Tecnologia',
  'Música',
  'Educação',
  'Gastronomia',
  'Esportes',
  'Entretenimento',
  'Experiências',
]

export const events: EventItem[] = [
  {
    id: 'ia-na-pratica',
    slug: 'ia-na-pratica',
    title: 'IA na Prática',
    subtitle: 'Inteligência artificial para todos',
    description:
      'Uma conversa prática sobre inteligência artificial, produtividade e novas tecnologias, pensada para quem quer aplicar IA no dia a dia sem complicação técnica. Você vai sair com exemplos reais e ferramentas para testar ainda hoje.',
    category: 'Tecnologia',
    format: 'online',
    date: '16 de outubro',
    time: '19h',
    location: 'Transmissão online',
    city: 'Online',
    coverGradient: ['#15130f', '#3a2c00'],
    organizer: 'Comunidade Vibe Code',
    faq: [
      {
        question: 'Como recebo o acesso à transmissão?',
        answer: 'O link de acesso é enviado por e-mail um dia antes do evento.',
      },
      {
        question: 'O evento fica gravado?',
        answer: 'Sim, todos os inscritos recebem a gravação em até 48h.',
      },
    ],
    tickets: [
      { id: 't-ia-digital', name: 'Ingresso Digital', price: 10, available: 400 },
    ],
  },
  {
    id: 'festival-converto',
    slug: 'festival-converto',
    title: 'Festival Converto',
    subtitle: 'Um dia inteiro de música ao vivo',
    description:
      'O Festival Converto reúne artistas locais e nacionais em um line-up de um dia só, com praça de alimentação, área kids e três palcos simultâneos no coração de Fortaleza.',
    category: 'Música',
    format: 'presencial',
    date: '25 de outubro',
    time: '14h',
    location: 'Arena Beira-Mar',
    city: 'Fortaleza, CE',
    coverGradient: ['#15130f', '#a9780a'],
    organizer: 'Converto Eventos',
    faq: [
      { question: 'Tem meia-entrada?', answer: 'Sim, mediante comprovação na entrada.' },
      { question: 'Posso levar câmera fotográfica?', answer: 'Câmeras amadoras são permitidas, sem tripé.' },
    ],
    tickets: [
      { id: 't-festival-pista', name: 'Pista', price: 25, available: 2000 },
      { id: 't-festival-vip', name: 'Área VIP', price: 89, available: 300 },
    ],
  },
  {
    id: 'workshop-vibe-code',
    slug: 'workshop-vibe-code',
    title: 'Workshop Vibe Code',
    subtitle: 'Programando produtos com IA',
    description:
      'Um workshop mão na massa para times de produto e desenvolvedores que querem construir protótipos mais rápido usando IA generativa como parceira de código.',
    category: 'Tecnologia',
    format: 'presencial',
    date: '02 de novembro',
    time: '9h',
    location: 'Cariri Valley Hub',
    city: 'Fortaleza, CE',
    coverGradient: ['#15130f', '#56514a'],
    organizer: 'Vibe Code Academy',
    faq: [
      { question: 'Preciso levar notebook?', answer: 'Sim, o workshop é 100% prático.' },
    ],
    tickets: [
      { id: 't-workshop-full', name: 'Ingresso Completo', price: 15, available: 120 },
    ],
  },
  {
    id: 'sabores-do-ceara',
    slug: 'sabores-do-ceara',
    title: 'Sabores do Ceará',
    subtitle: 'Feira gastronômica autoral',
    description:
      'Chefs cearenses apresentam menus autorais inspirados na culinária regional, com direito a harmonização e aulas rápidas de cozinha ao vivo.',
    category: 'Gastronomia',
    format: 'presencial',
    date: '09 de novembro',
    time: '11h',
    location: 'Centro de Eventos do Ceará',
    city: 'Fortaleza, CE',
    coverGradient: ['#15130f', '#7a4d1f'],
    organizer: 'Rota Gastronômica CE',
    faq: [
      { question: 'O ingresso inclui degustação?', answer: 'Inclui uma cortesia de boas-vindas; demais pratos são à parte.' },
    ],
    tickets: [
      { id: 't-sabores-entrada', name: 'Entrada', price: 20, available: 600 },
    ],
  },
  {
    id: 'corrida-converto-5k',
    slug: 'corrida-converto-5k',
    title: 'Corrida Converto 5K',
    subtitle: 'Corrida à beira-mar',
    description:
      'Uma corrida de 5km com largada ao amanhecer, kit atleta completo e medalha exclusiva para todos os participantes que cruzarem a linha de chegada.',
    category: 'Esportes',
    format: 'presencial',
    date: '22 de novembro',
    time: '5h30',
    location: 'Praia do Futuro',
    city: 'Fortaleza, CE',
    coverGradient: ['#15130f', '#1f7a4d'],
    organizer: 'Converto Run Club',
    faq: [
      { question: 'Onde retiro o kit?', answer: 'Na véspera, das 10h às 20h, no local do evento.' },
    ],
    tickets: [
      { id: 't-corrida-kit', name: 'Inscrição + Kit', price: 35, available: 800 },
    ],
  },
]

export const experiences: Experience[] = [
  {
    id: 'aquaman',
    slug: 'aquaman',
    title: 'Aquaman Parque Aquático',
    tagline: 'Um dia inteiro de diversão, piscinas e atrações para toda a família',
    city: 'Aquiraz, CE',
    coverGradient: ['#0a3a4a', '#1a8fb0'],
  },
  {
    id: 'portal-imersivo',
    slug: 'portal-imersivo',
    title: 'Portal Imersivo Nordeste',
    tagline: 'Uma experiência sensorial com arte digital em escala real',
    city: 'Fortaleza, CE',
    coverGradient: ['#1a1030', '#5b2a8a'],
  },
]

export const parkDates: ParkDateSlot[] = [
  { date: '2026-10-12', day: 12, month: 'OUT', season: 'baixa', price: 49.9 },
  { date: '2026-10-13', day: 13, month: 'OUT', season: 'baixa', price: 49.9 },
  { date: '2026-10-14', day: 14, month: 'OUT', season: 'media', price: 59.9 },
  { date: '2026-10-15', day: 15, month: 'OUT', season: 'alta', price: 69.9 },
  { date: '2026-10-16', day: 16, month: 'OUT', season: 'media', price: 59.9 },
  { date: '2026-10-17', day: 17, month: 'OUT', season: 'alta', price: 69.9 },
  { date: '2026-10-18', day: 18, month: 'OUT', season: 'alta', price: 69.9 },
  { date: '2026-10-19', day: 19, month: 'OUT', season: 'baixa', price: 49.9 },
]

export const parkTickets: ParkTicketType[] = [
  {
    id: 'individual',
    name: 'Ingresso Individual',
    description: '1 pessoa · acesso a todas as áreas comuns',
    price: 59.9,
  },
  {
    id: 'combo-familia',
    name: 'Combo Família',
    description: '2 adultos + 1 criança',
    price: 149.9,
    tag: 'Mais popular',
  },
  {
    id: 'combo-diversao',
    name: 'Combo Diversão',
    description: '2 ingressos + brinde exclusivo',
    price: 119.9,
  },
  {
    id: 'passaporte-premium',
    name: 'Passaporte Premium',
    description: 'Entrada + área exclusiva + benefício especial',
    price: 179.9,
    tag: 'Experiência completa',
  },
]

export const organizerOverview = {
  ticketsSold: 1284,
  revenue: 58420,
  activeEvents: 8,
  participants: 1284,
}

export const weeklySales = [
  { label: 'Sáb', value: 62 },
  { label: 'Dom', value: 48 },
  { label: 'Seg', value: 34 },
  { label: 'Ter', value: 51 },
  { label: 'Qua', value: 67 },
  { label: 'Qui', value: 74 },
  { label: 'Sex', value: 96 },
]
