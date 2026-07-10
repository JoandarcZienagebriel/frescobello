import { Toaster } from "./components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from './lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from './lib/AuthContext';
import UserNotRegisteredError from './components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';


// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const OurMethod = lazy(() => import('./pages/OurMethod'));
const Contact = lazy(() => import('./pages/Contact'));
const Checkout = lazy(() => import('./pages/Checkout'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <LoadingSpinner size="lg" />
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
        <Route path="/shop" element={<Suspense fallback={<PageLoader />}><Shop /></Suspense>} />
        <Route path="/product/:slug" element={<Suspense fallback={<PageLoader />}><ProductDetail /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
        <Route path="/our-method" element={<Suspense fallback={<PageLoader />}><OurMethod /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
        <Route path="/checkout" element={<Suspense fallback={<PageLoader />}><Checkout /></Suspense>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App