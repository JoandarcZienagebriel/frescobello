export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`${sizes[size]} border-2 border-platinum border-t-gold animate-spin`}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}