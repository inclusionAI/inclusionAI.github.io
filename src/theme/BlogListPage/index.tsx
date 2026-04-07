import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import type { Props } from "@theme/BlogListPage";
import styles from "./index.module.css";

export default function BlogListPage({ metadata, items }: Props): ReactNode {
  const { page, totalPages, previousPage, nextPage } = metadata;

  // Build an array of page links: /blog, /blog/page/2, ...
  function pageHref(n: number) {
    return n === 1 ? "/blog" : `/blog/page/${n}`;
  }

  return (
    <Layout title="Blog" description="InclusionAI blog posts">
      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Blog</h1>
        <p className={styles.heroText}>
          Our blog shares the latest news, insights and stories about our work
          in building an inclusive AI ecosystem. <br />
          We cover research breakthroughs, product updates, community highlights
          and more.
        </p>
      </div>

      {/* Posts list */}
      <div className={styles.postsList}>
        {items.map(({ content: BlogPostContent }) => {
          const { title, date, permalink } = BlogPostContent.metadata;
          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          return (
            <Link key={permalink} to={permalink} className={styles.postRow}>
              <span className={styles.postTitle}>{title}</span>
              <span className={styles.postDate}>
                <time dateTime={date}>{formattedDate}</time>
              </span>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Link
            className={clsx(
              styles.pageArrow,
              !previousPage && styles.pageArrowDisabled,
            )}
            to={previousPage ?? "#"}
            aria-label="Previous page"
            aria-disabled={!previousPage}
            onClick={(e) => !previousPage && e.preventDefault()}
          >
            <svg viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M704 885.3c8.5 0 17.1-4.3 23.5-10.7 12.8-12.8 10.7-34.1-2.1-44.8L369.1 512l356.3-317.9c12.8-10.7 14.9-32 2.1-44.8-10.7-12.8-32-14.9-44.8-2.1l-384 341.3c-6.4 6.4-10.7 14.9-10.7 23.5s4.3 17.1 10.7 23.5l384 341.3c6.4 6.4 12.8 8.5 21.3 8.5z" />
            </svg>
          </Link>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              to={pageHref(n)}
              className={clsx(
                styles.pageNum,
                n === page && styles.pageNumActive,
              )}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </Link>
          ))}

          <Link
            className={clsx(
              styles.pageArrow,
              !nextPage && styles.pageArrowDisabled,
            )}
            to={nextPage ?? "#"}
            aria-label="Next page"
            aria-disabled={!nextPage}
            onClick={(e) => !nextPage && e.preventDefault()}
          >
            <svg viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M320 885.3c-8.5 0-17.1-4.3-23.5-10.7-12.8-12.8-10.7-34.1 2.1-44.8L654.9 512 298.6 194.1c-12.8-10.7-14.9-32-2.1-44.8 10.7-12.8 32-14.9 44.8-2.1l384 341.3c6.4 6.4 10.7 14.9 10.7 23.5s-4.3 17.1-10.7 23.5l-384 341.3c-6.4 6.4-12.8 8.5-21.3 8.5z" />
            </svg>
          </Link>
        </div>
      )}
    </Layout>
  );
}
