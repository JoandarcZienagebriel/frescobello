import { motion } from 'framer-motion';
import ProductCard from '../../components/product/ProductCard';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x lg:gap-12">
      {products.map((product, index) => (
        <div key={product.id} className="snap-start">
          <ProductCard product={product} index={index} />
        </div>
      ))}
    </div>
  );
}