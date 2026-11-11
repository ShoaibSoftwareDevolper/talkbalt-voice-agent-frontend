/** A plain sample website, standing in for the business's own site in the widget preview. */
export function WidgetPreviewSite() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <span className="h-6 w-28 rounded-md bg-slate-200" aria-hidden />
        <nav className="hidden gap-6 sm:flex" aria-hidden>
          <span className="h-3 w-14 rounded bg-slate-200" />
          <span className="h-3 w-14 rounded bg-slate-200" />
          <span className="h-3 w-14 rounded bg-slate-200" />
        </nav>
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-14">
        <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Preview: your website</p>
        <div className="space-y-3" aria-hidden>
          <span className="block h-8 w-3/4 rounded-lg bg-slate-200" />
          <span className="block h-8 w-1/2 rounded-lg bg-slate-200" />
        </div>
        <div className="space-y-2" aria-hidden>
          <span className="block h-3 w-full rounded bg-slate-100" />
          <span className="block h-3 w-11/12 rounded bg-slate-100" />
          <span className="block h-3 w-4/5 rounded bg-slate-100" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3" aria-hidden>
          <span className="block h-28 rounded-xl bg-slate-100" />
          <span className="block h-28 rounded-xl bg-slate-100" />
          <span className="block h-28 rounded-xl bg-slate-100" />
        </div>
        <p className="text-sm text-slate-500">This is how the call button appears on your site. Press it to try a real call.</p>
      </main>
    </div>
  );
}
