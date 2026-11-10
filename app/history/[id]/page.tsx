import { Suspense } from 'react';
import { CallDetailPage } from '@/components/history/call-detail-page';

// With Cache Components, runtime params must be read inside a Suspense boundary.
export default function Page({ params }: PageProps<'/history/[id]'>) {
  return (
    <Suspense>
      {params.then(({ id }) => (
        <CallDetailPage id={id} />
      ))}
    </Suspense>
  );
}
