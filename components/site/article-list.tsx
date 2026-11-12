import Link from 'next/link';

/** Article cards: title and description only (no images). */
export function ArticleList({ articles }: { articles: { slug: string; title: string; description: string }[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <li key={a.slug}>
          <Link href={`/articles/${a.slug}`} className="flex h-full flex-col gap-2 rounded-[1.5rem] bg-background p-6 hover:bg-muted">
            <h3 className="text-lg font-medium tracking-tight text-foreground">{a.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{a.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
