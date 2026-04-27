function formatPostedAt(iso) {
  try {
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export default function ForoBoard({ posts = [] }) {
  const visible = [...posts]
    .filter((p) => p && !p.hidden)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  if (visible.length === 0) {
    return (
      <p className="rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-6 text-sm text-on-surface-variant">
        No hay publicaciones para mostrar.
      </p>
    );
  }

  return (
    <ul className="flex list-none flex-col gap-3 p-0">
      {visible.map((post) => (
        <li key={post.id}>
          <article className="rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-4 sm:px-5 sm:py-5">
            <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2 gap-y-1">
              <div className="min-w-0">
                <p className="font-headline text-sm font-semibold text-secondary sm:text-base">
                  {post.authorDisplayName}
                </p>
                <p className="text-xs text-tertiary sm:text-sm">{post.club}</p>
              </div>
              <time
                className="shrink-0 text-xs text-on-surface-variant sm:text-sm"
                dateTime={post.createdAt}
              >
                {formatPostedAt(post.createdAt)}
              </time>
            </header>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-surface sm:text-base">
              {post.body}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
