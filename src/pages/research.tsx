import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { usePluginData } from "@docusaurus/useGlobalData";
import {
  RESEARCH_PAPERS,
  RELEASE_ARTICLES,
  parsePaperDate,
  formatPaperDate,
  type PaperType,
} from "@site/src/data/research";
import styles from "./research.module.css";

const PAGE_SIZE = 10;

type BlogPost = { title: string; permalink: string; formattedDate: string };

const LANDSCAPE_IMAGES = [
  {
    src: "https://raw.githubusercontent.com/antgroup/llm-oss-landscape/refs/heads/main/reports/260401_agentic_landscape/2604_agentic_landscape.jpg",
    alt: "Agentic AI Echosystem Landscape",
  },
  {
    src: "https://raw.githubusercontent.com/antgroup/llm-oss-landscape/main/reports/250913_llm_landscape/figures/llm_development_landscape.png",
    alt: "LLM Development Landscape",
  },
];

function LandscapeSlider() {
  const [current, setCurrent] = useState(0);
  const total = LANDSCAPE_IMAGES.length;

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  return (
    <div className={styles.slider}>
      <button
        className={styles.sliderArrow}
        onClick={prev}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M704 885.3c8.5 0 17.1-4.3 23.5-10.7 12.8-12.8 10.7-34.1-2.1-44.8L369.1 512l356.3-317.9c12.8-10.7 14.9-32 2.1-44.8-10.7-12.8-32-14.9-44.8-2.1l-384 341.3c-6.4 6.4-10.7 14.9-10.7 23.5s4.3 17.1 10.7 23.5l384 341.3c6.4 6.4 12.8 8.5 21.3 8.5z" />
        </svg>
      </button>

      <div className={styles.sliderTrackWrap}>
        <div
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {LANDSCAPE_IMAGES.map((img, i) => (
            <div key={i} className={styles.sliderSlide}>
              <img src={img.src} alt={img.alt} className={styles.sliderImg} />
            </div>
          ))}
        </div>
      </div>

      <button
        className={styles.sliderArrow}
        onClick={next}
        aria-label="Next image"
      >
        <svg viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M320 885.3c-8.5 0-17.1-4.3-23.5-10.7-12.8-12.8-10.7-34.1 2.1-44.8L654.9 512 298.6 194.1c-12.8-10.7-14.9-32-2.1-44.8 10.7-12.8 32-14.9 44.8-2.1l384 341.3c6.4 6.4 10.7 14.9 10.7 23.5s-4.3 17.1-10.7 23.5l-384 341.3c-6.4 6.4-12.8 8.5-21.3 8.5z" />
        </svg>
      </button>

      <div className={styles.sliderDots}>
        {LANDSCAPE_IMAGES.map((_, i) => (
          <button
            key={i}
            className={clsx(
              styles.sliderDot,
              i === current && styles.sliderDotActive,
            )}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const cls =
    type === "Model"
      ? styles.typeModel
      : type === "System"
        ? styles.typeSystem
        : styles.typeResearch;
  return <span className={clsx(styles.paperType, cls)}>{type}</span>;
}

function ArticleTypeBadge({ type }: { type: string }) {
  const cls =
    type === "Model"
      ? styles.typeModel
      : type === "System"
        ? styles.typeSystem
        : styles.typeResearch;
  return <span className={clsx(styles.articleTypeBadge, cls)}>{type}</span>;
}

export default function Research(): ReactNode {
  const [page, setPage] = useState(1);
  const { landscapePosts, releasePosts } = usePluginData(
    "recent-blog-posts",
  ) as {
    landscapePosts: BlogPost[];
    releasePosts: BlogPost[];
  };

  // Sort papers newest-first once
  const sorted = useMemo(
    () =>
      [...RESEARCH_PAPERS].sort(
        (a, b) => parsePaperDate(b.time) - parsePaperDate(a.time),
      ),
    [],
  );

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to page 1 if somehow out of bounds
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  return (
    <Layout
      title="Research"
      description="InclusionAI research papers and releases"
    >
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Research</h1>
        <p className={styles.heroText}>
          "The future is here — just unevenly distributed." (William Gibson)
        </p>

        <h2 className={styles.heroTitle}>Papers</h2>
        <p className={styles.heroText}>
          Research is our foundation. We transform cutting-edge research into
          accessible tools, applicable methodologies or usable systems.
        </p>

        {/* Papers list */}
        <div className={styles.papersList}>
          {paginated.map((paper) => (
            <a
              key={paper.link}
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.paperRow}
            >
              <span className={styles.paperTitle}>{paper.title}</span>
              <span className={styles.paperMeta}>
                <TypeBadge type={paper.type} />
                <span className={styles.paperDate}>
                  {formatPaperDate(paper.time)}
                </span>
              </span>
            </a>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageArrow}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <svg viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M704 885.3c8.5 0 17.1-4.3 23.5-10.7 12.8-12.8 10.7-34.1-2.1-44.8L369.1 512l356.3-317.9c12.8-10.7 14.9-32 2.1-44.8-10.7-12.8-32-14.9-44.8-2.1l-384 341.3c-6.4 6.4-10.7 14.9-10.7 23.5s4.3 17.1 10.7 23.5l384 341.3c6.4 6.4 12.8 8.5 21.3 8.5z" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={clsx(
                    styles.pageNum,
                    n === page && styles.pageNumActive,
                  )}
                  onClick={() => setPage(n)}
                  aria-current={n === page ? "page" : undefined}
                >
                  {n}
                </button>
              ))}

              <button
                className={styles.pageArrow}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <svg viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M320 885.3c-8.5 0-17.1-4.3-23.5-10.7-12.8-12.8-10.7-34.1 2.1-44.8L654.9 512 298.6 194.1c-12.8-10.7-14.9-32-2.1-44.8 10.7-12.8 32-14.9 44.8-2.1l384 341.3c6.4 6.4 10.7 14.9 10.7 23.5s-4.3 17.1-10.7 23.5l-384 341.3c-6.4 6.4-12.8 8.5-21.3 8.5z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Releases */}
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>Releases</h2>
        <p className={styles.heroText}>
          Latest releases from InclusionAI, including models, systems, and
          research tools.
        </p>
        <div className={styles.papersList}>
          {releasePosts.map((post) => (
            <Link
              key={post.permalink}
              to={post.permalink}
              className={styles.paperRow}
            >
              <span className={styles.paperTitle}>{post.title}</span>
              <span className={styles.paperMeta}>
                <span className={styles.paperDate}>{post.formattedDate}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Landscapes */}
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>Landscapes</h2>
        <p className={styles.heroText}>
          AI Infrastructure Landscapes and Insights Produced by InclusionAI,{" "}
          <br /> a comprehensive collection of AI infra projects, categorized
          and analyzed to illuminate the evolving AI ecosystem.
        </p>

        {/* Landscape slider */}
        <LandscapeSlider />

        <div className={styles.papersList} id="landscape-news-list">
          {landscapePosts.map((post) => (
            <Link
              key={post.permalink}
              to={post.permalink}
              className={styles.paperRow}
            >
              <span className={styles.paperTitle}>{post.title}</span>
              <span className={styles.paperMeta}>
                <span className={styles.paperDate}>{post.formattedDate}</span>
              </span>
            </Link>
          ))}
        </div>

        <p className={styles.heroText}>
          For more details, please visit the original &nbsp;
          <a
            href="https://github.com/antgroup/llm-oss-landscape"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
        </p>
      </div>
    </Layout>
  );
}
