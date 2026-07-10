import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChefHat } from 'lucide-react';
import { PRODUCTS } from '../constants/products';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../utils/format';
import Breadcrumb from '../components/common/Breadcrumb';
import QuantitySelector from '../components/cart/QuantitySelector';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedShape, setSelectedShape] = useState(null);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    setLoading(true);
    const found = PRODUCTS.find((p) => p.slug === slug);
    setProduct(found || null);
    if (found) {
      setSelectedShape(found.shapes ? found.shapes[0] : found.pastaType);
    }
    setLoading(false);
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="font-heading text-2xl mb-4">Product Not Found</h1>
        <Button to="/shop" variant="outline">Back to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedShape);
    openCart();
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-square overflow-hidden bg-platinum">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                fetchpriority="high"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs uppercase tracking-wider text-gold font-medium capitalize">
                {product.pastaType}
              </span>
              <span className="text-platinum">|</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground capitalize">
                {product.ingredient?.replace(/-/g, ' ')}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-medium mb-2">
              {product.name}
            </h1>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              {product.packSize}
            </p>
            <p className="text-2xl font-heading font-medium mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-sm leading-relaxed text-foreground/80 mb-6">
              {product.description}
            </p>

            {/* Shape / Filling Selection (for ravioli products with multiple options) */}
            {product.shapes && product.shapes.length > 1 && (
              <div className="mb-6">
                <h2 className="text-xs uppercase tracking-wider font-medium mb-3">
                  Available Fillings
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.shapes.map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors min-h-[40px] ${
                        selectedShape === shape
                          ? 'bg-obsidian text-alabaster border-obsidian'
                          : 'border-obsidian hover:bg-obsidian hover:text-alabaster'
                      }`}
                      aria-pressed={selectedShape === shape}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cooking Time */}
            {product.cookingTime && (
              <div className="flex items-center gap-2 mb-2 text-sm">
                <Clock size={16} className="text-gold" />
                <span className="text-muted-foreground">Cooking time:</span>
                <span>{product.cookingTime}</span>
              </div>
            )}

            {/* Suggested Dishes */}
            {product.suggestedDishes && product.suggestedDishes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <ChefHat size={16} className="text-gold" />
                  <span className="text-muted-foreground">Suggested dishes:</span>
                </div>
                <ul className="text-sm space-y-1 pl-6 list-disc">
                  {product.suggestedDishes.map((dish) => (
                    <li key={dish}>{dish}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mt-auto pt-2 border-t border-platinum lg:mt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <QuantitySelector
                  initial={1}
                  onChange={setQuantity}
                  price={product.price}
                />
                <Button onClick={handleAddToCart} size="sm" className="flex-1 sm:flex-none">
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}