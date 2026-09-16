import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import ExperiencesPage from './pages/ExperiencesPage'
import ExperienceDetailPage from './pages/ExperienceDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import TicketPage from './pages/TicketPage'
import OrganizerLandingPage from './pages/OrganizerLandingPage'
import HowItWorksPage from './pages/HowItWorksPage'
import AuthPage from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'
import DashboardPage from './pages/organizador/DashboardPage'
import CreateEventPage from './pages/organizador/CreateEventPage'
import DashboardPlaceholderPage from './pages/organizador/DashboardPlaceholderPage'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/eventos" element={<EventsPage />} />
            <Route path="/eventos/:slug" element={<EventDetailPage />} />
            <Route path="/experiencias" element={<ExperiencesPage />} />
            <Route path="/experiencias/:slug" element={<ExperienceDetailPage />} />
            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/ingresso/:orderId" element={<TicketPage />} />
            <Route path="/para-organizadores" element={<OrganizerLandingPage />} />
            <Route path="/como-funciona" element={<HowItWorksPage />} />
            <Route path="/entrar" element={<AuthPage />} />
            <Route path="/criar-conta" element={<AuthPage />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/organizador" element={<DashboardPage />} />
            <Route path="/organizador/criar-evento" element={<CreateEventPage />} />
            <Route path="/organizador/meus-eventos" element={<DashboardPlaceholderPage title="Meus eventos" />} />
            <Route path="/organizador/participantes" element={<DashboardPlaceholderPage title="Participantes" />} />
            <Route path="/organizador/vendas" element={<DashboardPlaceholderPage title="Vendas" />} />
            <Route path="/organizador/relatorios" element={<DashboardPlaceholderPage title="Relatórios" />} />
            <Route path="/organizador/configuracoes" element={<DashboardPlaceholderPage title="Configurações" />} />
          </Route>

          <Route path="*" element={<MainLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
