import { Suspense } from 'react';
import { BusinessPage } from '@/components/public/business-page';

/** The page inside the website widget's popup (public/widget.js). */
export default function Page({ params }: PageProps<'/embed/[slug]'>) {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense>{params.then(({ slug }) => <BusinessPage slug={slug} embedded />)}</Suspense>
    </main>
  );
}
