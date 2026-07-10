import AnimatedSection from '../../components/animations/AnimatedSection';
import ProductGrid from '../../components/product/ProductGrid';
import { PRODUCTS } from '../../constants/products';

export default function BestSellers() {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <AnimatedSection className="py-16 md:py-24 bg-secondary/30">
      <div className="px-4 md:px-8 lg:px-12 mb-8">
        <div>
          <h2 className="font-heading text-3xl text-center md:text-4xl font-medium">Best Sellers</h2>
          <p className="text-sm text-center font-bold text-muted-foreground mt-2 pb-10">Our most loved pasta varieties</p>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:flex items-center justify-center">
        <ProductGrid products={bestSellers}  />
      </div>
    </AnimatedSection>
  );
}