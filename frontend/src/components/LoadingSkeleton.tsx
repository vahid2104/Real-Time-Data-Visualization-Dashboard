interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'chart' | 'text' | 'circle';
}

export function LoadingSkeleton({ className = '', variant = 'text' }: LoadingSkeletonProps) {
  const baseClasses = 'bg-gray-200 animate-pulse';
  
  const variantClasses = {
    card: 'h-32 w-full rounded-xl',
    chart: 'h-80 w-full rounded-lg',
    text: 'h-4 w-full rounded',
    circle: 'h-12 w-12 rounded-full',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}></div>
  );
}

interface LoadingCardProps {
  children?: React.ReactNode;
}

export function LoadingCard({ children }: LoadingCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {children || (
        <div className="space-y-3">
          <LoadingSkeleton className="w-24" />
          <LoadingSkeleton className="w-32 h-8" />
          <LoadingSkeleton className="w-20" />
        </div>
      )}
    </div>
  );
}
