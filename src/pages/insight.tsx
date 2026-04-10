import React, { useState, useCallback } from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { usePluginData } from "@docusaurus/useGlobalData";
import styles from "./research.module.css";

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

export default function Insight(): ReactNode {
  const { landscapePosts } = usePluginData("recent-blog-posts") as {
    landscapePosts: BlogPost[];
  };

  return (
    <Layout title="Insights" description="AI Landscape Insights by InclusionAI">
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Insights</h1>
        <p className={styles.heroText}>
          Data-driven community insights to what matters in the AI open-source
          development space produced by InclusionAI.
        </p>
      </div>

      {/* Landscapes */}
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>Landscapes</h2>

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
