import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import styles from "./insight.module.css";

const INSIGHTS_URL = "https://insights.inclusion-ai.org/";

export default function Insight(): ReactNode {
  return (
    <Layout
      title="Insights"
      description="Explore InclusionAI's open-source AI landscape and ecosystem insights."
      noFooter
    >
      <main className={styles.widget}>
        <iframe
          className={styles.widgetFrame}
          src={INSIGHTS_URL}
          title="InclusionAI Insights"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </main>
    </Layout>
  );
}
