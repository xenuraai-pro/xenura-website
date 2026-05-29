import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToHash } from "@/components/ScrollToHash";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import BlogPostPage from "@/pages/BlogPostPage";
import IndustriesPage from "@/pages/IndustriesPage";
import CareerPage from "@/pages/CareerPage";
import ServiceCategoryPage from "@/pages/ServiceCategoryPage";
import PortfolioPage from "@/pages/PortfolioPage";
import HowWeWorkPage from "@/pages/HowWeWorkPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFoundPage from "@/pages/NotFound";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminPromoPage from "@/pages/AdminPromoPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/services/:slug" element={<ServiceCategoryPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/how-we-work" element={<HowWeWorkPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route
            path="/blog/ai-first-development-strategy-2025"
            element={<BlogPostPage slug="/blog/ai-first-development-strategy-2025" />}
          />
          <Route
            path="/blog/cloud-microservices-operational-overhead"
            element={<BlogPostPage slug="/blog/cloud-microservices-operational-overhead" />}
          />
          <Route
            path="/blog/zero-trust-security-guide"
            element={<BlogPostPage slug="/blog/zero-trust-security-guide" />}
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/promo" element={<AdminPromoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(20, 27, 45, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            color: '#e2e8f0',
          },
        }}
      />
    </>
  );
}

export default App;
