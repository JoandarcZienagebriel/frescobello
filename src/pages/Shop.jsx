import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { PRODUCTS } from '../constants/products';
import { PASTA_TYPES } from '../constants/categories';
import ProductCard from '../components/product/ProductCard';
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';

const SORT_OPTIONS = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-az', label: 'Name: A to Z' },
  { value: 'name-za', label: 'Name: Z to A' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('price-low');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (categoryParam) {
      const capitalized = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (PASTA_TYPES.includes(capitalized)) {
        setSelectedTypes([capitalized]);
      }
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((p) =>
        [p.name, p.ingredient, p.pastaType, p.category]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q))
      );
    }

    // Pasta Type filter
    if (selectedTypes.length > 0) {
      result = result.filter((p) =>
        selectedTypes.some((type) => p.pastaType === type.toLowerCase())
      );
    }

    // Sorting
    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [search, selectedTypes, sort]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    if (categoryParam) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };

  const clearAll = () => {
    setSelectedTypes([]);
    setSearch('');
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-5xl font-medium">Shop</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-2 py-3 text-xs uppercase tracking-wider border border-obsidian md:hidden min-h-[48px]"
                aria-label="Toggle filters"
                aria-expanded={showFilters}
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-3 text-xs uppercase tracking-wider border border-obsidian bg-transparent focus:outline-none focus:border-gold min-h-[48px]"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ingredient, type, or category..."
              className="w-full pl-12 pr-4 py-3 text-sm border border-obsidian bg-transparent focus:outline-none focus:border-gold min-h-[48px]"
              aria-label="Search products"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-obsidian"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block w-full md:w-56 shrink-0`}
          >
            <div className="md:sticky md:top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-wider font-medium">Pasta Type</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="md:hidden p-1"
                  aria-label="Close filters"
                >
                  <X size={16} />
                </button>
              </div>
              <ul className="space-y-3">
                {PASTA_TYPES.map((type) => (
                  <li key={type}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 accent-gold border-obsidian"
                      />
                      <span className="text-sm capitalize group-hover:text-gold transition-colors">
                        {type}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              {(selectedTypes.length > 0 || search) && (
                <button
                  onClick={clearAll}
                  className="mt-4 text-xs uppercase tracking-wider text-muted-foreground hover:text-obsidian transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  No products match your search or filters.
                </p>
                <Button onClick={clearAll} variant="outline" size="sm">
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}