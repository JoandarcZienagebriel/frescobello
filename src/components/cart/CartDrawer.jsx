import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { SITE_CONFIG } from '../../constants/site';
import { formatPrice } from '../../utils/format';
import Button from '../../components/common/Button';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, incrementQuantity, decrementQuantity, clearCart } =
    useCartStore();

  const subtotal = useCartStore((s) => s.getSubtotal());
  const tax = useCartStore((s) => s.getTax());
  const shipping = useCartStore((s) => s.getShipping());
  const total = useCartStore((s) => s.getTotal());

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-obsidian/60"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-alabaster flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-platinum">
              <h2 className="font-heading text-lg">Cart ({items.length})</h2>
              <button onClick={closeCart} className="p-2 hover:bg-platinum transition-colors" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">Your cart is empty.</p>
                <Button to="/shop" onClick={closeCart} variant="outline" size="sm">
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedShape}`}
                      className="flex gap-3 border-b border-platinum pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover bg-platinum"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">{item.name}</h3>
                        {item.selectedShape && (
                          <p className="text-xs text-muted-foreground">{item.selectedShape}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{item.packSize}</p>
                        <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-obsidian">
                            <button
                              onClick={() => decrementQuantity(item.productId, item.selectedShape)}
                              className="px-2 py-1 hover:bg-obsidian hover:text-alabaster transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 py-1 text-sm min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => incrementQuantity(item.productId, item.selectedShape)}
                              className="px-2 py-1 hover:bg-obsidian hover:text-alabaster transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.selectedShape)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={clearCart}
                    className="text-xs uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Summary */}
                <div className="border-t border-obsidian px-4 py-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <motion.span key={subtotal} initial={{ scale: 1.1 }} animate={{ scale: 1 }}>
                      {formatPrice(subtotal)}
                    </motion.span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax ({SITE_CONFIG.taxRate * 100}%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t border-platinum">
                    <span>Total</span>
                    <motion.span key={total} initial={{ scale: 1.1 }} animate={{ scale: 1 }}>
                      {formatPrice(total)}
                    </motion.span>
                  </div>
                  <Button to="/checkout" onClick={closeCart} className="w-full mt-3">
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}