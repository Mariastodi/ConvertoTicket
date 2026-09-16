# ConvertoTicket

Uma plataforma de ingressos simples, moderna e com taxas mais justas protótipo V1 navegável para demonstração a parceiros e investidores.

Este repositório contém dois projetos:

```
converto/
├── src/            → Frontend (React + Vite + TypeScript) — a demonstração funcional
├── backend/         → API Laravel completa com autenticação, domínio e migrations
└── README.md
```

Na V1, o frontend funciona sozinho com dados mockados. O backend agora é uma instalação Laravel executável, com Composer, Sanctum, models, migrations, regras de domínio e API REST. As páginas da demonstração ainda consomem alguns mocks diretamente para manter a navegação instantânea; a camada `src/services/api.ts` já concentra os contratos para a integração REST.

---

## 1. Visão geral do produto

- **Comprador**: encontra eventos e experiências, escolhe ingresso, vê a taxa antes de pagar, compra e recebe um ingresso digital com QR code.
- **Organizador**: cria eventos, define ingressos e preços, acompanha vendas em um painel.
- **Diferencial**: a taxa Converto é sempre mostrada de forma explícita — nunca escondida no total.

Fluxos implementados nesta V1:

```
Home → Eventos → Evento → Escolher ingresso → Carrinho → Checkout → Ingresso digital
Home → Experiências → Aquaman → Escolher data → Escolher ingresso → Carrinho → Checkout → Ingresso
Home → Para organizadores → Painel → Criar evento
```

Todos os valores, eventos, nomes e números são **fictícios**, criados apenas para fins de demonstração.

---

## 2. Stack técnica

| Camada     | Tecnologia |
|------------|------------|
| Frontend   | React 19 + Vite + TypeScript + React Router + Tailwind CSS v4 |
| Ícones     | lucide-react |
| Backend    | PHP 8.3+ + Laravel 13 + Sanctum |
| Banco      | MySQL |
| Comunicação | API REST (`/api/...`) |

---

## 3. Rodando o frontend 

Pré-requisito: Node.js 20+.

```bash
cd converto
npm install
npm run dev
```

Acesse `http://localhost:5173`. Isso já é suficiente para navegar por toda a demonstração os dados vêm de `src/data/mock.ts` e são servidos através de `src/services/api.ts`, que simula as chamadas de rede.

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

Para preparar a troca para a API real, crie um `.env` na raiz do frontend:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK=true
```

Use `VITE_USE_MOCK=false` somente depois que o Laravel estiver instalado, com banco populado e endpoints disponíveis.

### Estrutura do frontend

```
src/
├── assets/         → logo e recursos visuais
├── components/      → componentes reutilizáveis (Button, EventCard, DigitalTicket...)
├── context/          → CartContext (estado global do carrinho)
├── data/             → mock.ts — todos os dados fictícios (eventos, experiências, parque)
├── hooks/            → useCart
├── layouts/          → MainLayout (site) e DashboardLayout (painel do organizador)
├── pages/            → uma pasta/arquivo por rota
├── routes/           → (reservado para futura configuração de rotas)
├── services/         → api.ts (camada REST) e pricing.ts (cálculo da taxa)
└── types/            → tipos TypeScript do domínio
```

### Onde estão os dados mockados

Tudo em **`src/data/mock.ts`**: eventos, experiências, datas e ingressos do parque Aquaman, categorias, e os números do dashboard do organizador.

### Como adicionar um novo evento

Edite `src/data/mock.ts` e adicione um objeto ao array `events`, seguindo o tipo `EventItem` definido em `src/types/index.ts`:

```ts
{
  id: 'meu-evento',
  slug: 'meu-evento',
  title: 'Meu Evento',
  subtitle: 'Um subtítulo',
  description: 'Descrição completa.',
  category: 'Tecnologia',
  format: 'presencial',
  date: '10 de dezembro',
  time: '19h',
  location: 'Local do evento',
  city: 'Fortaleza - CE',
  coverGradient: ['#15130f', '#3a2c00'],
  organizer: 'Nome do organizador',
  faq: [{ question: 'Pergunta?', answer: 'Resposta.' }],
  tickets: [{ id: 't-1', name: 'Ingresso Único', price: 20, available: 100 }],
}
```

O evento aparece automaticamente na Home, em `/eventos` e em `/eventos/meu-evento`.

### Como a taxa é calculada

Em `src/services/pricing.ts`:

```ts
export const FEE_PER_TICKET = 0.5

export function calculateFee(quantity: number) {
  return quantity * FEE_PER_TICKET
}
```

R$ 0,50 por ingresso. Assim, 1 ingresso custa R$ 0,50 de taxa e 3 ingressos custam R$ 1,50, independentemente do preço de cada ingresso. Ajuste essa função para mudar a regra em todo o site de uma vez.

---

## 4. Rodando o backend

O backend é uma aplicação Laravel completa dentro de `backend/`.

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Configurando o banco (MySQL)

1. Crie um banco chamado `converto`.
2. Preencha `DB_*` no `.env` com suas credenciais.
3. Rode as migrations:

```bash
php artisan migrate
```

Isso cria as tabelas: `users`, `categories`, `venues`, `events`, `experiences`, `experience_date_slots`, `ticket_types` (polimórfica — atende eventos e experiências), `orders`, `order_items`.

A API sobe em `http://localhost:8000`.

### Endpoints disponíveis

```
GET    /api/events
GET    /api/events/{slug}
POST   /api/events                (autenticado)
PUT    /api/events/{event}        (autenticado)
DELETE /api/events/{event}        (autenticado)

GET    /api/experiences
GET    /api/experiences/{slug}
GET    /api/experiences/{slug}/dates
GET    /api/experiences/{slug}/tickets

GET    /api/orders/{code}
POST   /api/checkout

POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me              (autenticado)
POST   /api/auth/logout          (autenticado)
```

---

## 5. Conectando o frontend ao backend real

1. Crie um `.env` na raiz do frontend e ajuste a URL da API:

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK=false
```

Cada função de `eventsApi`, `experiencesApi`, `parkApi` e `ordersApi` já está escrita para chamar o endpoint real quando `VITE_USE_MOCK=false`. A migração completa ainda exige trocar os imports diretos de `src/data/mock.ts` nas páginas por essas funções, principalmente em Home, Eventos, Experiências e Dashboard.

---

### 6. Autenticação

O backend já inclui `AuthController` e os endpoints de registro, login, sessão atual e logout usando Laravel Sanctum. As telas do frontend ainda são visuais; o próximo passo é criar um `AuthContext`, guardar o token retornado pelo Sanctum e enviá-lo no header `Authorization: Bearer` das chamadas autenticadas.

## 7. Pagamento real (preparado para a Converto 2.0)

Hoje o checkout simula o pagamento (`CheckoutPage.tsx`, função `finalize`). Para integrar um gateway real (Pix/cartão):

- Backend: crie um `PaymentService` que chama a API do gateway escolhido a partir de `OrderController::checkout`, e só marque o pedido como `pago` após a confirmação do gateway (webhook).
- Frontend: troque a simulação por uma chamada real a `POST /api/checkout` e trate o retorno (ex.: exibir QR Code Pix real, ou redirecionar para 3D Secure no cartão).

## 8. Deploy no Render

O frontend continua sendo um **Static Site**, porque React/Vite gera arquivos estáticos. A API Laravel não é estática: o blueprint `render.yaml` também define um Web Service Docker para a API e um PostgreSQL gerenciado.

```text
Frontend: npm ci && npm run build → dist
API: Dockerfile em backend/ → Laravel + Apache
Banco: PostgreSQL gerenciado pelo Render
```

### Publicação pelo Blueprint

1. No Render, selecione `New` e depois `Blueprint`.
2. Conecte o repositório `Mariastodi/ConvertoTicket`.
3. Confirme a criação de `converto-frontend`, `converto-api` e `converto-db`.
4. Aguarde o banco e a API subirem.
5. Copie a URL real da API e atualize `VITE_API_BASE_URL` no serviço frontend para `https://sua-api.onrender.com/api`.
6. Altere `VITE_USE_MOCK` para `false` quando as telas estiverem consumindo a API real.
7. Atualize `FRONTEND_URL` e `SANCTUM_STATEFUL_DOMAINS` com a URL real do frontend.

No plano gratuito, os serviços podem dormir após um período sem acesso e o banco pode ter limites de armazenamento e retenção. Para uma demo, o Static Site é suficiente; para autenticação e pedidos reais, publique também a API e o banco.

## 9. Segurança

O backend aplica autenticação Sanctum, rate limit em login e cadastro, CORS restrito pela variável `FRONTEND_URL`, headers HTTP de proteção, autorização por proprietário do evento, pedidos visíveis apenas ao usuário autenticado, validação de payload, lock transacional de estoque e status `pendente` até uma confirmação real de pagamento. Há testes de regressão em `backend/tests/Feature/SecurityTest.php`.

Nenhum sistema é impossível de invadir. Em produção, mantenha `APP_DEBUG=false`, use HTTPS, configure segredos apenas no ambiente do provedor, aplique backups e monitore logs. O gateway de pagamento deve confirmar o pedido por webhook antes de mudar o status para `pago`.

---

## 10. Design

- **Identidade**: preto e amarelo sobre fundo branco, extraídos da logo da Converto.
- **Tipografia**: Space Grotesk (títulos) + Manrope (texto).
- **Elemento de marca**: cantos chanfrados (`ticket-notch` / `ticket-notch-sm` em `src/index.css`), inspirados no formato de canhoto de ingresso e no próprio desenho geométrico da logo — usados em cards, botões e no ingresso digital para dar identidade própria ao produto.
- Todos os tokens de cor e tipografia estão centralizados em `src/index.css` (`@theme`), então mudanças de marca são feitas em um único lugar.

---

## 11. Roadmap

**Converto 1.0**: venda de ingressos, eventos, experiências, checkout simulado, taxas transparentes, dashboard básico.

**Converto 2.0**: login e autenticação real, pagamento real, QR Code validável, check-in de participantes, relatórios avançados, integração com WhatsApp, notificações, programa de fidelidade.

**Converto 3.0**: marketplace de experiências, integrações externas, API pública, inteligência artificial, personalização para grandes clientes.

---

## 12. Aviso

Este é um protótipo de demonstração. Nomes de eventos, valores, taxas e métricas do dashboard são fictícios e não representam dados reais da Converto.
