import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { SITE_CONFIG } from '../constants/site';
import { formatPrice } from '../utils/format';
import { orderService } from '../services';
import Breadcrumb from '../components/common/Breadcrumb';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, removeItem, incrementQuantity, decrementQuantity, clearCart } = useCartStore();
  const subtotal = useCartStore((s) => s.getSubtotal());
  const tax = useCartStore((s) => s.getTax());
  const shipping = useCartStore((s) => s.getShipping());
  const total = useCartStore((s) => s.getTotal());

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  setSubmitting(true);

  try {

    const order = await orderService.create({

      customer: form,

      items,

      totals: {
        subtotal,
        tax,
        shipping,
        total
      }

    });


    clearCart();


    navigate("/order-success", {
      state:{
        orderNumber: order.order_number
      }
    });


  } catch(error){

    console.error(error);

    alert(
      "There was a problem placing your order. Please try again."
    );

  } finally {

    setSubmitting(false);

  }
};

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingBag size={48} className="text-platinum mb-4" />
        <h1 className="font-heading text-2xl mb-4">Your Cart is Empty</h1>
        <Button to="/shop" variant="outline">Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Checkout' },
          ]}
        />

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xs uppercase tracking-wider font-medium border-b border-platinum pb-3">
              Delivery Information
            </h2>
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <div>
              <label htmlFor="address" className="block text-xs uppercase tracking-wider text-obsidian mb-2 font-medium">
                Delivery Address
              </label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={4}
                className="w-full border border-obsidian bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>
            <Button type="submit" size="lg" disabled={submitting} className="w-full">
              {submitting ? 'Placing Order...' : `Place Order - ${formatPrice(total)}`}
            </Button>
          </form>

          {/* Order Summary */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-medium border-b border-platinum pb-3">
              Order Summary
            </h2>
            {items.map((item) => (
              <div key={`${item.productId}-${item.selectedShape}`} className="flex gap-3 border-b border-platinum pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-platinum" loading="lazy" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                    {item.selectedShape && <p className="text-xs text-muted-foreground">{item.selectedShape}</p>}
                  <p className="text-sm">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decrementQuantity(item.productId, item.selectedShape)} className="p-1 border border-obsidian" aria-label="Decrease quantity">
                      <Minus size={10} />
                    </button>
                    <span className="text-sm min-w-[2rem] text-center">{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.productId, item.selectedShape)} className="p-1 border border-obsidian" aria-label="Increase quantity">
                      <Plus size={10} />
                    </button>
                    <button onClick={() => removeItem(item.productId, item.selectedShape)} className="ml-auto p-1 text-muted-foreground hover:text-destructive" aria-label="Remove item">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax ({SITE_CONFIG.taxRate * 100}%)</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between text-base font-medium pt-2 border-t border-platinum"><span>Total</span><motion.span key={total} initial={{ scale: 1.1 }} animate={{ scale: 1 }}>{formatPrice(total)}</motion.span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}