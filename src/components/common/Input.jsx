import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-wider text-obsidian mb-2 font-medium"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full border border-obsidian bg-transparent px-4 py-3 text-sm text-obsidian placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;