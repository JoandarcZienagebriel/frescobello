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
  
  className="flex flex-col m-auto w-[16rem] text-alabaster border border-[#292929] mb-6 overflow-hidden md:w-[20rem] mb-8 xl:w-[22rem] "
>
    
      <Link to={`/product/${product.slug}`} className="block" aria-label={`View ${product.name}`}>
        <div className="overflow-hidden bg-platinum relative">
          {product.bestSeller && (
            <span className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gold text-obsidian text-[10px] uppercase tracking-wider font-bold px-2 py-1">
              <Star size={10} fill="currentColor" />
              Best Seller
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[20rem] object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-2 flex flex-col gap-1 bg-[#292929] md:p-4">
        <Link to={`/product/${product.slug}`} className="hover:text-gold transition-colors">
          <h3 className="text-md font-heading font-medium leading-tight">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
          <span className="capitalize">{product.pastaType}</span>
          <span className="text-platinum">|</span>
          <span className="capitalize">{product.packSize}</span>
        </div>
    
        <div className="flex flex-col items-center justify-between mt-8">
          <span className="text-md text-center font-medium">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 px-[4rem] py-2 border border-gold bg-obsidian text-xs text-alabaster uppercase tracking-wider md:px-[6rem] lg:hover:bg-[#292929] transition-colors min-h-[40px] "
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