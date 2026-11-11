import { Suspense } from 'react';
import { CallDetailView } from '@/components/history/call-detail';

// With Cache Components, runtime params must be read inside a Suspense boundary.
export default function Page({ params }: PageProps<'/app/calls/[id]'>) {
  return <Suspense>{params.then(({ id }) => <CallDetailView id={id} />)}</Suspense>;
}
