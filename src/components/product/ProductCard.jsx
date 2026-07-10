import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils/format';

export default function ProductCard({ product, index = 0 }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const selectedShape = product.shapes ? product.shapes[0] : product.pastaType;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, selectedShape);
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex flex-col m-auto w-[15rem] pb-12 md:w-[20rem]"
    >
      <Link to={`/product/${product.slug}`} className="block" aria-label={`View ${product.name}`}>
        <div className="aspect-square overflow-hidden bg-platinum relative">
          {product.bestSeller && (
            <span className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gold text-obsidian text-[10px] uppercase tracking-wider font-bold px-2 py-1">
              <Star size={10} fill="currentColor" />
              Best Seller
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="pt-3 flex flex-col gap-1">
        <Link to={`/product/${product.slug}`} className="hover:text-gold transition-colors">
          <h3 className="text-md font-heading font-medium whitespace-nowrap leading-tight">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
          <span className="capitalize">{product.pastaType}</span>
          <span className="text-platinum">|</span>
          <span className="capitalize">{product.ingredient?.replace(/-/g, ' ')}</span>
        </div>
        <p className="text-xs text-muted-foreground">{product.packSize}</p>
        <div className="flex flex-col items-center justify-between pt-4">
          <span className="text-md text-center font-medium">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 px-[6rem] py-2 text-xs uppercase tracking-wider md:px-[8.5rem] border border-obsidian lg:btn-fill lg:hover:text-alabaster transition-colors min-h-[40px] "
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={12} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}