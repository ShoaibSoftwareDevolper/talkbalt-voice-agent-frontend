import { Suspense } from 'react';
import { WidgetPreviewSite } from '@/components/public/widget-preview-site';

const SETTINGS = ['label', 'color', 'position', 'logo'] as const;

/**
 * A sample website with the real widget on it, for the dashboard's live preview and its "open in
 * browser" button. The widget tag is written into the page exactly like on a real website; settings
 * in the query string go on it as data attributes, so changes show before they are saved.
 * With Cache Components, runtime params are read inside a Suspense boundary.
 */
export default function Page({ params, searchParams }: PageProps<'/widget-preview/[slug]'>) {
  return (
    <>
      <WidgetPreviewSite />
      <Suspense>
        {Promise.all([params, searchParams]).then(([{ slug }, query]) => {
          const data: Record<string, string> = { 'data-business': slug };
          for (const key of SETTINGS) {
            const value = query[key];
            if (typeof value === 'string' && value) data[`data-${key}`] = value;
          }
          return <script src="/widget.js" async {...data} />;
        })}
      </Suspense>
    </>
  );
}
