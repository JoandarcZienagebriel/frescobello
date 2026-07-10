import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useSearchStore } from '../../store/useSearchStore';
import { NAV_ITEMS } from '../../constants/site';
import { CATEGORIES as PASTA_CATEGORIES } from '../../constants/categories';
import logo from '../../assets/img/frescoBello-logo.png'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopSubmenuOpen, setShopSubmenuOpen] = useState(false);
  const location = useLocation();

  const itemCount = useCartStore((s) => s.items.reduce((c, i) => c + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);
  const openSearch = useSearchStore((s) => s.openSearch);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopSubmenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const navBgClass = scrolled || !isHome
    ? 'bg-alabaster/95 backdrop-blur-sm border-b border-platinum'
    : 'bg-transparent';

  const logoClass = scrolled
    ? 'font-bold'
    : isHome
    ? 'font-normal'
    : 'font-bold';

  const linkColor = scrolled || !isHome ? 'text-obsidian' : 'text-alabaster';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgClass}`}>
        <nav className="flex items-center justify-between px-4 md:px-8 lg:px-12 h-18 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="transition-all duration-300 md:mt-10"
            aria-label="FrescoBello Home"
          >
            <img
              src={logo}
              alt="FrescoBello"
              className="h-[6.5rem]  md:h-[8rem] w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => item.hasSubmenu && setShopSubmenuOpen(true)}
                onMouseLeave={() => item.hasSubmenu && setShopSubmenuOpen(false)}
              >
                <Link
                  to={item.path}
                  className={`text-xs uppercase tracking-wider font-medium transition-colors hover:text-gold ${linkColor}`}
                >
                  {item.label}
                  {item.hasSubmenu && <ChevronDown size={12} className="inline ml-1" />}
                </Link>
                {item.hasSubmenu && (
                  <AnimatePresence>
                    {shopSubmenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-alabaster border border-platinum shadow-lg"
                      >
                        {PASTA_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/shop?category=${cat.slug}`}
                            className="block px-4 py-3 text-xs uppercase tracking-wider text-obsidian hover:bg-platinum transition-colors"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={openSearch}
              className={`p-2 transition-colors hover:text-gold ${linkColor}`}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={openCart}
              className={`relative p-2 transition-colors hover:text-gold ${linkColor}`}
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-gold text-obsidian text-[10px] font-bold w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-2 transition-colors hover:text-gold ${linkColor}`}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-alabaster md:hidden"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-platinum">
              <img
                src="https://media.base44.com/images/public/6a4a0a966b597db054804af5/225bc0afe_frescoBello-logo.png"
                alt="FrescoBello"
                className="h-[10em] w-auto"
              />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col px-4 py-6">
              {NAV_ITEMS.map((item, index) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className="block py-4 text-lg font-heading border-b border-platinum"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasSubmenu && (
                    <div className="pl-4 pb-2">
                      {PASTA_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.slug}`}
                          className="block py-2 text-sm text-muted-foreground"
                          onClick={() => setMobileOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}