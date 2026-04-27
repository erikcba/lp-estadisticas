"use client";

import { useMemo, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const PAGE_SIZE = 8;

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

function formatRelativePostedAt(iso) {
  try {
    const date = new Date(iso);
    const diffMs = date.getTime() - Date.now();
    const absMs = Math.abs(diffMs);
    const rtf = new Intl.RelativeTimeFormat("es-AR", { numeric: "auto" });

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (absMs < hour) {
      return rtf.format(Math.round(diffMs / minute), "minute");
    }
    if (absMs < day) {
      return rtf.format(Math.round(diffMs / hour), "hour");
    }
    return rtf.format(Math.round(diffMs / day), "day");
  } catch {
    return "";
  }
}

export default function ForoBoard({ posts = [] }) {
  const [page, setPage] = useState(1);
  const [votes, setVotes] = useState(() =>
    posts.reduce((acc, post) => {
      if (!post?.id) return acc;
      acc[post.id] = {
        up: Number.isFinite(post.upvotes) ? post.upvotes : 0,
        down: Number.isFinite(post.downvotes) ? post.downvotes : 0,
      };
      return acc;
    }, {}),
  );
  const [userVotes, setUserVotes] = useState({});

  const visible = useMemo(
    () =>
      [...posts]
        .filter((p) => p && !p.hidden)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [posts],
  );

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedPosts = visible.slice(start, start + PAGE_SIZE);

  const votePost = (postId, nextVote) => {
    const currentVote = userVotes[postId] ?? null;
    const resolvedVote = currentVote === nextVote ? null : nextVote;

    setVotes((prev) => {
      const currentCounts = prev[postId] ?? { up: 0, down: 0 };
      let up = currentCounts.up;
      let down = currentCounts.down;

      if (currentVote === "up") up = Math.max(0, up - 1);
      if (currentVote === "down") down = Math.max(0, down - 1);

      if (resolvedVote === "up") up += 1;
      if (resolvedVote === "down") down += 1;

      return {
        ...prev,
        [postId]: { up, down },
      };
    });

    setUserVotes((prev) => ({
      ...prev,
      [postId]: resolvedVote,
    }));
  };

  if (visible.length === 0) {
    return (
      <p className="rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-6 text-sm text-on-surface-variant">
        No hay publicaciones para mostrar.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex list-none flex-col gap-3 p-0">
      {paginatedPosts.map((post) => (
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
                title={formatPostedAt(post.createdAt)}
              >
                {formatRelativePostedAt(post.createdAt)}
              </time>
            </header>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-surface sm:text-base">
              {post.body}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                aria-label="Me gusta"
                className="inline-flex items-center gap-1 rounded-md border border-outline-variant/40 px-2.5 py-1.5 text-xs text-on-surface-variant transition-colors hover:bg-surface-container-high sm:text-sm"
                onClick={() => votePost(post.id, "up")}
              >
                <ThumbsUp
                  size={16}
                  className={
                    userVotes[post.id] === "up" ? "fill-current text-green-400" : ""
                  }
                />
                <span>{votes[post.id]?.up ?? 0}</span>
              </button>
              <button
                type="button"
                aria-label="No me gusta"
                className="inline-flex items-center gap-1 rounded-md border border-outline-variant/40 px-2.5 py-1.5 text-xs text-on-surface-variant transition-colors hover:bg-surface-container-high sm:text-sm"
                onClick={() => votePost(post.id, "down")}
              >
                <ThumbsDown
                  size={16}
                  className={
                    userVotes[post.id] === "down"
                      ? "fill-current text-red-400"
                      : ""
                  }
                />
                <span>{votes[post.id]?.down ?? 0}</span>
              </button>
            </div>
          </article>
        </li>
      ))}
      </ul>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-outline-variant/40 bg-surface-container px-3 py-2 sm:px-4">
        <p className="text-xs text-on-surface-variant sm:text-sm">
          Pagina {safePage} de {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={safePage === 1}
            className="rounded-md border border-outline-variant/40 px-3 py-1.5 text-xs text-on-surface-variant transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safePage === totalPages}
            className="rounded-md border border-outline-variant/40 px-3 py-1.5 text-xs text-on-surface-variant transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
