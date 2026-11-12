import { WaveLoader } from '@/components/motion/wave-loader';

/** Shown while a dashboard page loads: the same logo loader used everywhere. */
export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <WaveLoader label="Loading" />
    </div>
  );
}
