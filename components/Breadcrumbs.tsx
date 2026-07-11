import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/**
 * Visible breadcrumb trail. Pair it with breadcrumbNode() from lib/schema.ts
 * so the markup and the JSON-LD always agree.
 *
 * Pass the trail WITHOUT "Home" — it's prepended for you. The last crumb is
 * rendered as plain text (you're already there).
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map(({ name, path }, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={path}>
              {isLast ? (
                <span aria-current="page">{name}</span>
              ) : (
                <>
                  <Link href={path}>{name}</Link>
                  <span className="breadcrumbs-sep" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
