import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ initial = 1, onChange, price = 0 }) {
  const [quantity, setQuantity] = useState(initial);

  const update = (newQty) => {
    const qty = Math.max(1, newQty);
    setQuantity(qty);
    onChange?.(qty);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-obsidian">
        <button
          onClick={() => update(quantity - 1)}
          className="px-3 py-3 hover:bg-obsidian hover:text-alabaster transition-colors min-h-[48px]"
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
        >
          <Minus size={14} />
        </button>
        <motion.span
          key={quantity}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center"
          aria-live="polite"
        >
          {quantity}
        </motion.span>
        <button
          onClick={() => update(quantity + 1)}
          className="px-3 py-3 hover:bg-obsidian hover:text-alabaster transition-colors min-h-[48px]"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>
      {price > 0 && (
        <span className="text-lg font-heading font-medium">
          {(price * quantity).toLocaleString('en-US')} Birr
        </span>
      )}
    </div>
  );
}