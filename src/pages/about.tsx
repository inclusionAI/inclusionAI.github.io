import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import styles from "./about.module.css";

export default function About(): ReactNode {
  return (
    <Layout
      title="About"
      description="InclusionAI (IAI) envisions AGI as humanity's shared milestone, not a privileged asset"
    >
      {/* Vision */}
      <section className={styles.visionSection}>
        <div className={styles.visionContent}>
          <h1 className={styles.visionTitle}>Vision</h1>
          <p className={styles.visionText}>
            InclusionAI (IAI) envisions AGI as humanity's shared milestone, not
            a privileged asset. Backed by Ant Research, we're forging a global
            open platform to accelerate collaborative breakthroughs in
            intelligent civilization.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.missionSection}>
        <h2 className={styles.sectionTitle}>Mission</h2>
        <div className={styles.missionGrid}>
          <div className={styles.missionCard}>
            <h3 className={styles.cardTitle}>Open-Source Commitment</h3>
            <p className={styles.cardText}>
              Share code, models, and data (within legal/ethical guidelines) to
              accelerate global AGI progress
            </p>
          </div>
          <div className={styles.missionCard}>
            <h3 className={styles.cardTitle}>Collaborative Ecosystems</h3>
            <p className={styles.cardText}>
              Partner with academia, industry, and other AGI teams
            </p>
          </div>
          <div className={styles.missionCard}>
            <h3 className={styles.cardTitle}>Bold Experimentation</h3>
            <p className={styles.cardText}>
              Test novel architectures, post-training methods, and scaling
              tricks
            </p>
          </div>
        </div>
      </section>

      {/* About Team */}
      <section className={styles.teamSection}>
        <div className={styles.teamContent}>
          <h2 className={styles.sectionTitle}>About Team</h2>
          <p className={styles.teamText}>
            InclusionAI (IAI), founded by Ant Group with researchers from
            OpenAI, Google, and FAIR (Meta AI), envisions open-source AI built
            by and for everyone — believing AGI remains in its infancy and that
            collaborative innovation is the fastest way forward. We bring this
            vision to life through projects like Areal (flexible RL framework)
            and Aworld (scalable multi-agent platform).
          </p>
        </div>
      </section>
    </Layout>
  );
}
