export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-platinum ${className}`}
      aria-hidden="true"
    />
  );
}