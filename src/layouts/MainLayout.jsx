import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import SearchOverlay from '../components/search/SearchOverlay';
import ScrollToTop from '../components/ScrollToTop';

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}