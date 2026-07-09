import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {
  LANDSCAPE_LAYERS,
  DEFAULT_LOGO,
  type LandscapeLayer,
  type LandscapeProject,
} from "@site/src/data/landscape";
import styles from "./landscape.module.css";

/**
 * Logo slot. Always renders an image; falls back to the default logo when a
 * project has no dedicated artwork.
 */
function ProjectLogo({ project }: { project: LandscapeProject }) {
  const src = useBaseUrl(project.logo || DEFAULT_LOGO);
  return (
    <div className={styles.logoBox}>
      <img className={styles.logoImg} src={src} alt={project.name} />
    </div>
  );
}

function ProjectCard({ project }: { project: LandscapeProject }) {
  const content = (
    <>
      <ProjectLogo project={project} />
      <div className={styles.projectBody}>
        <span className={styles.projectName}>{project.name}</span>
        {project.description && (
          <span className={styles.projectDesc}>{project.description}</span>
        )}
      </div>
    </>
  );

  if (project.link) {
    const isExternal = project.link.startsWith("http");
    return (
      <Link
        to={project.link}
        className={styles.project}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </Link>
    );
  }
  return <div className={styles.project}>{content}</div>;
}

function Layer({ layer }: { layer: LandscapeLayer }) {
  return (
    <section className={styles.layer}>
      <div className={styles.layerHeader}>
        <span className={styles.layerBadge}>{layer.title}</span>
        {layer.summary && (
          <p className={styles.layerSummary}>{layer.summary}</p>
        )}
      </div>
      <div className={styles.groups}>
        {layer.groups.map((group) => (
          <div key={group.label} className={styles.group}>
            <span className={styles.groupLabel}>{group.label}</span>
            <div className={styles.projects}>
              {group.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Landscape(): ReactNode {
  return (
    <Layout
      title="Landscape"
      description="The full inclusionAI technology landscape — from consumer AI services to agent infrastructure, model infrastructure, and open models."
    >
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Landscape</h1>
        <p className={styles.heroText}>
          inclusionAI: Bringing AI Advances to Everyday Life. A full-stack, open
          ecosystem spanning consumer AI services, agent infrastructure, model
          infrastructure, and open models — building a solid foundation for AGI.
        </p>
      </div>

      <div className={styles.stack}>
        {LANDSCAPE_LAYERS.map((layer) => (
          <Layer key={layer.title} layer={layer} />
        ))}
      </div>
    </Layout>
  );
}
