import { Suspense } from 'react';
import Link from 'next/link';
import { BrandMark } from '@/components/app-shell';
import { BusinessPage } from '@/components/public/business-page';

// With Cache Components, runtime params must be read inside a Suspense boundary.
export default function Page({ params }: PageProps<'/b/[slug]'>) {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Suspense>{params.then(({ slug }) => <BusinessPage slug={slug} />)}</Suspense>
      </main>
      <footer className="flex justify-center border-t border-border py-4 text-xs text-muted-foreground">
        <Link href="/" className="flex items-center gap-2 hover:text-foreground">
          Powered by <BrandMark />
        </Link>
      </footer>
    </>
  );
}
