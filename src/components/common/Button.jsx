import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-obsidian text-alabaster border-obsidian btn-fill',
  outline: 'bg-transparent text-obsidian border-obsidian btn-fill',
  light: 'bg-alabaster text-obsidian border-alabaster btn-fill-light',
  gold: 'bg-gold text-obsidian border-gold',
  ghost: 'bg-transparent text-obsidian border-transparent hover:bg-platinum',
};

const sizes = {
  sm: 'px-4 py-2 text-xs tracking-wider uppercase min-h-[40px]',
  md: 'px-6 py-3 text-sm tracking-wider uppercase min-h-[48px]',
  lg: 'px-8 py-4 text-sm tracking-wider uppercase min-h-[56px]',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      to,
      href,
      className = '',
      disabled,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses = `inline-flex items-center justify-center font-body font-medium border transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

    if (to) {
      return (
        <Link ref={ref} to={to} className={baseClasses} onClick={onClick} {...props}>
          {children}
        </Link>
      );
    }

    if (href) {
      return (
        <a ref={ref} href={href} className={baseClasses} onClick={onClick} {...props}>
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={baseClasses}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;