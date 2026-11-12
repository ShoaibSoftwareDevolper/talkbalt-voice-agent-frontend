'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/** Renders its children everywhere on the website except the /articles pages. */
export function HideOnArticles({ children }: { children: ReactNode }) {
  return usePathname().startsWith('/articles') ? null : children;
}
