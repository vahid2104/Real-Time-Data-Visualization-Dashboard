import { ReactNode } from 'react';

interface DashboardGridProps {
  children: ReactNode;
  className?: string;
}

export function DashboardGrid({ children, className = '' }: DashboardGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 ${className}`}>
      {children}
    </div>
  );
}

interface GridItemProps {
  children: ReactNode;
  colSpan?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  className?: string;
}

export function GridItem({ children, colSpan = { lg: 12 }, className = '' }: GridItemProps) {
  const getColSpanClass = () => {
    const classes = [];
    if (colSpan.sm) classes.push(`sm:col-span-${colSpan.sm}`);
    if (colSpan.md) classes.push(`md:col-span-${colSpan.md}`);
    if (colSpan.lg) classes.push(`lg:col-span-${colSpan.lg}`);
    return classes.join(' ');
  };

  return (
    <div className={`${getColSpanClass()} ${className}`}>
      {children}
    </div>
  );
}
