import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { LandingPage } from "./pages/LandingPage"
import { DashboardPage } from "./pages/DashboardPage"
import { SignUpPage } from "./pages/SignUpPage"
import { SignInPage } from "./pages/SignInPage"
import { PricingPage } from "./pages/PricingPage"
import { ColdEmailPage } from "./pages/ColdEmailPage"
import { FollowUpPage } from "./pages/FollowUpPage"
import { ContentAgentPage } from "./pages/ContentAgentPage"
import { SupportAgentPage } from "./pages/SupportAgentPage"
import { InvoiceAgentPage } from "./pages/InvoiceAgentPage"
import { OnboardingAgentPage } from "./pages/OnboardingAgentPage"
import { ConsultantAgentPage } from "./pages/ConsultantAgentPage"
import { AgentsPage } from "./pages/AgentsPage"
import { SalesAgentPage } from "./pages/SalesAgentPage"
import { ResearchAgentPage } from "./pages/ResearchAgentPage"
import { AboutPage } from "./pages/AboutPage"
import { ProductPage } from "./pages/ProductPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/agents/cold-email" element={<ProtectedRoute><ColdEmailPage /></ProtectedRoute>} />
          <Route path="/agents/follow-up" element={<ProtectedRoute><FollowUpPage /></ProtectedRoute>} />
          <Route path="/agents/content-agent" element={<ProtectedRoute><ContentAgentPage /></ProtectedRoute>} />
          <Route path="/agents/support-agent" element={<ProtectedRoute><SupportAgentPage /></ProtectedRoute>} />
          <Route path="/agents/invoice-agent" element={<ProtectedRoute><InvoiceAgentPage /></ProtectedRoute>} />
          <Route path="/agents/onboarding-agent" element={<ProtectedRoute><OnboardingAgentPage /></ProtectedRoute>} />
          <Route path="/agents/consultant-agent" element={<ProtectedRoute><ConsultantAgentPage /></ProtectedRoute>} />
          <Route path="/agents/sales-agent" element={<ProtectedRoute><SalesAgentPage /></ProtectedRoute>} />
          <Route path="/agents/research-agent" element={<ProtectedRoute><ResearchAgentPage /></ProtectedRoute>} />

          {/* Redirects */}
          <Route path="/login" element={<Navigate to="/signin" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
