import { cn } from '@/lib/utils';

/**
 * The one loader used everywhere: the Talkbalt logo (a black circle with four voice bars) whose bars
 * rise and fall. Pure CSS (no JS), so it costs nothing to show. `label` is read by screen readers
 * and shown next to the logo unless `hideLabel` is set.
 */
export function WaveLoader({ label = 'Loading', className, hideLabel = false }: { label?: string; className?: string; hideLabel?: boolean }) {
  return (
    <div role="status" className={cn('flex items-center gap-3 py-6 text-sm text-muted-foreground', className)}>
      <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground">
        <span className="flex h-4 items-center gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="wave-loader-bar h-full w-[3px] rounded-full bg-background"
              style={{ animationDelay: `${i * 110}ms` }}
            />
          ))}
        </span>
      </span>
      <span className={cn(hideLabel && 'sr-only')}>{label}</span>
    </div>
  );
}
