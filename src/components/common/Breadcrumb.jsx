import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-2 text-xs uppercase tracking-wider">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="text-muted-foreground hover:text-obsidian transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-obsidian font-medium' : 'text-muted-foreground'}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-platinum">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}