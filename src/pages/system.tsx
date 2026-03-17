import React, { useState, useMemo } from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import {
  SYSTEM_ITEMS,
  type SystemCategory,
  type SystemItem,
} from "@site/src/data/systems";
import styles from "./showcase.module.css";

const CATEGORIES: SystemCategory[] = [
  "Reinforcement Learning",
  "Agentic Environment",
  "Expert Benchmarks",
];

function categoryClass(cat: SystemCategory): string {
  if (cat === "Reinforcement Learning") return styles.catRL;
  if (cat === "Agentic Environment") return styles.catAgentic;
  return styles.catBenchmarks;
}

function SystemCard({ item }: { item: SystemItem }) {
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

export default function System(): ReactNode {
  const [active, setActive] = useState<SystemCategory | "All">("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? SYSTEM_ITEMS
        : SYSTEM_ITEMS.filter((s) => s.category === active),
    [active],
  );

  return (
    <Layout
      title="System"
      description="InclusionAI reinforcement learning, agentic environments, and benchmarks"
    >
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>System</h1>
        <p className={styles.heroText}>
          Reinforcement learning infrastructure, agentic runtimes, and expert
          benchmarks for making intelligence usable.
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
          <SystemCard key={item.blogSlug} item={item} />
        ))}
      </div>
    </Layout>
  );
}
