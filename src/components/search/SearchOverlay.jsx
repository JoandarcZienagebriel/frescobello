import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';
import { useSearchStore } from '../../store/useSearchStore';
import { PRODUCTS } from '../../constants/products';
import { CATEGORIES } from '../../constants/categories';
import { RECIPES } from '../../constants/recipes';
const STATIC_PAGES = [
  { title: 'Home', path: '/', type: 'Page' },
  { title: 'Shop', path: '/shop', type: 'Page' },
  { title: 'Our Method', path: '/our-method', type: 'Page' },
  { title: 'About Us', path: '/about', type: 'Page' },
  { title: 'Contact', path: '/contact', type: 'Page' },
];

export default function SearchOverlay() {
  const { isOpen, query, closeSearch, setQuery } = useSearchStore();
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(timer);
  }, [query]);

  const searchData = useMemo(() => {
    const products = PRODUCTS.map((p) => ({ title: p.name, path: `/product/${p.slug}`, type: 'Product', image: p.image }));
    const categories = CATEGORIES.map((c) => ({ title: c.name, path: `/shop?category=${c.slug}`, type: 'Category', image: c.image }));
    const recipes = RECIPES.map((r) => ({ title: r.name, path: r.redirectTo, type: 'Recipe', image: r.image }));
    return [...products, ...categories, ...recipes, ...STATIC_PAGES];
  }, []);

  const fuse = useMemo(
    () => new Fuse(searchData, { keys: ['title'], threshold: 0.4, includeScore: true }),
    [searchData]
  );

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return fuse.search(debouncedQuery).slice(0, 8).map((r) => r.item);
  }, [debouncedQuery, fuse]);

  useEffect(() => {
    setActiveIndex(0);
  }, [debouncedQuery]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault();
      navigate(results[activeIndex].path);
      closeSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-gold font-medium">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[95]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
            onClick={closeSearch}
            aria-hidden="true"
          />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-alabaster max-w-2xl mx-auto mt-4 md:mt-20"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="flex items-center border-b border-obsidian px-4">
              <Search size={20} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products, categories, recipes, pages..."
                className="flex-1 px-4 py-4 text-base bg-transparent focus:outline-none placeholder:text-muted-foreground"
                aria-label="Search"
              />
              <button
                onClick={closeSearch}
                className="p-2 hover:bg-platinum transition-colors"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {debouncedQuery && results.length === 0 && (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    No results found for "{debouncedQuery}"
                  </p>
                </div>
              )}
              {!debouncedQuery && (
                <div className="px-4 py-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Try searching for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Tagliatelle', 'Lasagna', 'Ravioli', 'Carbonara', 'Pappardelle'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1.5 text-xs border border-platinum hover:border-obsidian hover:bg-obsidian hover:text-alabaster transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {results.length > 0 && (
                <ul role="listbox" aria-label="Search results">
                  {results.map((result, index) => (
                    <li key={`${result.title}-${index}`}>
                      <Link
                        to={result.path}
                        onClick={closeSearch}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          index === activeIndex ? 'bg-platinum' : 'hover:bg-platinum/50'
                        }`}
                        role="option"
                        aria-selected={index === activeIndex}
                      >
                        {result.image && (
                          <img
                            src={result.image}
                            alt=""
                            className="w-10 h-10 object-cover bg-platinum shrink-0"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">
                            {highlightMatch(result.title, debouncedQuery)}
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
                          {result.type}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}