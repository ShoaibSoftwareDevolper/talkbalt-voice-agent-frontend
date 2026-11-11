import { cn } from '@/lib/utils';

/** Small equalizer loader for data fetches. Pure CSS (no JS), so it costs nothing to show. */
export function WaveLoader({ label = 'Loading', className }: { label?: string; className?: string }) {
  return (
    <div role="status" className={cn('flex items-center gap-3 py-6 text-sm text-muted-foreground', className)}>
      <span aria-hidden className="flex h-5 items-center gap-[3px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="wave-loader-bar h-full w-[3px] rounded-full bg-brand"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
      </span>
      {label}
    </div>
  );
}
