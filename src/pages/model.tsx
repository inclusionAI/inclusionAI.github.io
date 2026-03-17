import React, { useState, useMemo } from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import {
  MODEL_ITEMS,
  type ModelCategory,
  type ModelItem,
} from "@site/src/data/models";
import styles from "./showcase.module.css";

const CATEGORIES: ModelCategory[] = ["Foundation", "Reasoning", "Multi-Modal"];

function categoryClass(cat: ModelCategory): string {
  if (cat === "Foundation") return styles.catFoundation;
  if (cat === "Reasoning") return styles.catReasoning;
  return styles.catMultiModal;
}

function ModelCard({ item }: { item: ModelItem }) {
  return (
    <Link to={`/blog/${item.blogSlug}`} className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{item.title}</span>
        <span
          className={clsx(styles.categoryBadge, categoryClass(item.category))}
        >
          {item.category}
        </span>
      </div>
      {item.description && (
        <p className={styles.cardDescription}>{item.description}</p>
      )}
      <div className={styles.cardFooter}>{item.date}</div>
    </Link>
  );
}

export default function Model(): ReactNode {
  const [active, setActive] = useState<ModelCategory | "All">("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? MODEL_ITEMS
        : MODEL_ITEMS.filter((m) => m.category === active),
    [active],
  );

  return (
    <Layout
      title="Model"
      description="InclusionAI foundational, reasoning, and multimodal models"
    >
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Model</h1>
        <p className={styles.heroText}>
          From foundation language models to unified multimodal perception and
          generation — open-source and built for everyone.
        </p>
      </div>

      <div className={styles.filters}>
        {(["All", ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            className={clsx(
              styles.filterBtn,
              active === cat && styles.filterBtnActive,
            )}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((item) => (
          <ModelCard key={item.blogSlug} item={item} />
        ))}
      </div>
    </Layout>
  );
}
