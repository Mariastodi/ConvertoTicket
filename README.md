# Converto

Uma plataforma de ingressos simples, moderna e com taxas mais justas — protótipo V1 navegável para demonstração a parceiros e investidores.

Este repositório contém dois projetos:

```
converto/
├── src/            → Frontend (React + Vite + TypeScript) — a demonstração funcional
├── backend/         → Esqueleto do backend (Laravel/PHP) — arquitetura pronta para implementação
└── README.md
```

Na V1, o frontend funciona sozinho com dados mockados (nenhuma instalação de PHP ou MySQL é necessária para rodar a demonstração). O backend é entregue como esqueleto arquitetural, pronto para receber um `laravel new` real quando o time decidir avançar para produção. As páginas da demonstração ainda consomem alguns mocks diretamente para manter a navegação instantânea; a camada `src/services/api.ts` já concentra os contratos para a futura integração REST.

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
| Backend    | PHP + Laravel (esqueleto) |
| Banco      | MySQL |
| Comunicação | API REST (`/api/...`) |

---

## 3. Rodando o frontend (a demonstração)

Pré-requisito: Node.js 20+.

```bash
cd converto
npm install
npm run dev
```

Acesse `http://localhost:5173`. Isso já é suficiente para navegar por toda a demonstração — os dados vêm de `src/data/mock.ts` e são servidos através de `src/services/api.ts`, que simula as chamadas de rede.

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

## 4. Rodando o backend (Laravel)

O backend é entregue como **esqueleto arquitetural**: models, controllers, migrations e rotas já escritos, prontos para serem colados dentro de uma instalação real do Laravel (o ambiente desta demonstração não tem acesso ao Packagist para instalar o framework).

```bash
composer create-project laravel/laravel converto-api
cd converto-api

# copie o conteúdo de backend/ deste repositório para dentro do projeto Laravel,
# sobrescrevendo app/, database/migrations/ e routes/api.php

cp -r ../converto/backend/app/* app/
cp -r ../converto/backend/database/migrations/* database/migrations/
cp ../converto/backend/routes/api.php routes/api.php
cp ../converto/backend/.env.example .env

composer require laravel/sanctum
php artisan install:api

php artisan key:generate
```

### Configurando o banco (MySQL)

1. Crie um banco chamado `converto`.
2. Preencha `DB_*` no `.env` com suas credenciais.
3. Rode as migrations:

```bash
php artisan migrate
```

Isso cria as tabelas: `users`, `categories`, `venues`, `events`, `experiences`, `experience_date_slots`, `ticket_types` (polimórfica — atende eventos e experiências), `orders`, `order_items`.

### Subindo a API

```bash
php artisan serve
```

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

O frontend pode ser publicado agora como **Static Site**. O arquivo `render.yaml` deste repositório já define o build e a pasta publicada:

```text
Build Command: npm ci && npm run build
Publish Directory: dist
```

No painel do Render: `New` → `Static Site` → conecte o repositório → confirme esses valores → adicione `VITE_USE_MOCK=true` para a demonstração. Para usar a API, defina `VITE_USE_MOCK=false` e `VITE_API_BASE_URL` apontando para o backend.

O diretório `backend/` ainda não é um projeto Laravel executável sozinho: ele contém os arquivos de domínio para serem copiados para uma instalação Laravel. Para publicar a API no Render, primeiro é necessário criar essa instalação com `composer create-project`, adicionar `composer.json`, `artisan`, `bootstrap/` e `config/`, configurar MySQL/PostgreSQL e então subir um Web Service PHP separado.

---

## 9. Design

- **Identidade**: preto e amarelo sobre fundo branco, extraídos da logo da Converto.
- **Tipografia**: Space Grotesk (títulos) + Manrope (texto).
- **Elemento de marca**: cantos chanfrados (`ticket-notch` / `ticket-notch-sm` em `src/index.css`), inspirados no formato de canhoto de ingresso e no próprio desenho geométrico da logo — usados em cards, botões e no ingresso digital para dar identidade própria ao produto.
- Todos os tokens de cor e tipografia estão centralizados em `src/index.css` (`@theme`), então mudanças de marca são feitas em um único lugar.

---

## 10. Roadmap

**Converto 1.0** (esta entrega): venda de ingressos, eventos, experiências, checkout simulado, taxas transparentes, dashboard básico.

**Converto 2.0**: login e autenticação real, pagamento real, QR Code validável, check-in de participantes, relatórios avançados, integração com WhatsApp, notificações, programa de fidelidade.

**Converto 3.0**: marketplace de experiências, integrações externas, API pública, inteligência artificial, personalização para grandes clientes.

---

## 10. Aviso

Este é um protótipo de demonstração. Nomes de eventos, valores, taxas e métricas do dashboard são fictícios e não representam dados reais da Converto.
