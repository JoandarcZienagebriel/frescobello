import { Link } from 'react-router-dom';

export default function Pagination({ currentPage, totalPages, basePath }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 py-8">
      {currentPage > 1 && (
        <Link
          to={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-3 text-xs uppercase tracking-wider border border-obsidian hover:bg-obsidian hover:text-alabaster transition-colors"
          aria-label="Previous page"
        >
          Prev
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          to={`${basePath}?page=${page}`}
          className={`px-4 py-3 text-xs uppercase tracking-wider border transition-colors ${
            page === currentPage
              ? 'bg-obsidian text-alabaster border-obsidian'
              : 'border-obsidian hover:bg-obsidian hover:text-alabaster'
          }`}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          to={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-3 text-xs uppercase tracking-wider border border-obsidian hover:bg-obsidian hover:text-alabaster transition-colors"
          aria-label="Next page"
        >
          Next
        </Link>
      )}
    </nav>
  );
}