import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import styles from "./index.module.css";

type RecentPost = {
  title: string;
  permalink: string;
  formattedDate: string;
};

export default function Home(): ReactNode {
  const { recentPosts } = usePluginData("recent-blog-posts") as {
    recentPosts: RecentPost[];
  };

  return (
    <Layout
      title="INCLUSION AI"
      description="InclusionAI (IAI) envisions AGI as humanity's shared milestone, not a privileged asset"
    >
      <div className={styles.homePage}>
        {/* Top shadow bar */}
        <img
          className={styles.shadow}
          src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*EBM0QoOQEiEAAAAAXjAAAAgAekZ_AQ/original"
          alt=""
        />

        {/* Hero layered images */}
        <div className={styles.topImgContainer}>
          <img
            className={styles.imgStar}
            src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*5ROHSJS1VEcAAAAAQDAAAAgAekZ_AQ/original"
            alt=""
          />
          <img
            className={styles.imgText}
            src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*9dbATZ83N2QAAAAAQOAAAAgAekZ_AQ/original"
            alt=""
          />
          <img
            className={styles.imgWind}
            src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*shMdT6adBrIAAAAAQJAAAAgAekZ_AQ/original"
            alt=""
          />
          <img
            className={styles.imgHand}
            src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*9aF9QZ1DyCAAAAAAgFAAAAgAekZ_AQ/original"
            alt=""
          />
        </div>

        {/* Flower + main tagline */}
        <div className={styles.flowerSection}>
          <img
            className={styles.flower}
            src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*m4f6T64FkHYAAAAAgEAAAAgAekZ_AQ/original"
            alt=""
          />
          <div style={{ marginTop: 32 }}>
            <div className={styles.flowerMainText}>
              InclusionAI (IAI) envisions AGI as humanity's shared
            </div>
            <div className={styles.flowerMainText}>
              milestone, not a privileged asset
            </div>
          </div>
          <div className={styles.subtext} style={{ marginTop: 16 }}>
            Backed by Ant Group, we're forging a global open platform to
            accelerate collaborative
          </div>
          <div className={styles.subtext}>
            breakthroughs in intelligent civilization
          </div>
        </div>

        {/* Mission section */}
        <div className={styles.missionSection}>
          <div className={styles.sectionTitle}>Mission</div>
          <div className={styles.subtext} style={{ marginBottom: 40 }}>
            Provide a Sustainable and Responsible Intelligence Option for the
            Learners and Builders
          </div>
          <div className={styles.missionList}>
            <div className={styles.missionItem}>
              <div className={styles.missionImgContainer}>
                <img
                  className={styles.missionImg}
                  src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*MEtLSKQ5fokAAAAAQbAAAAgAekZ_AQ/original"
                  style={{ width: "18.5vw" }}
                  alt=""
                />
              </div>
              <div className={styles.missionItemTitle}>Open by Default</div>
              <div className={styles.missionItemText}>
                Open models and systems, build with global talents, get inspired
                together
              </div>
            </div>
            <div className={styles.missionItem}>
              <div className={styles.missionImgContainer}>
                <img
                  className={styles.missionImg}
                  src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*VXl4S7cwJFgAAAAAQVAAAAgAekZ_AQ/original"
                  style={{ width: "13.7vw" }}
                  alt=""
                />
              </div>
              <div className={styles.missionItemTitle}>Ecosystem Oriented</div>
              <div className={styles.missionItemText}>
                Work with academia and industrial partners, jointly explore AGI
                unknowns
              </div>
            </div>
            <div className={styles.missionItem}>
              <div className={styles.missionImgContainer}>
                <img
                  className={styles.missionImg}
                  src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*fagKQ7WIf8wAAAAAQVAAAAgAekZ_AQ/original"
                  style={{ width: "9.1vw" }}
                  alt=""
                />
              </div>
              <div className={styles.missionItemTitle}>Start Small</div>
              <div className={styles.missionItemText}>
                Take baby steps to test novel architectures, be pragmatic, every
                flop counts!
              </div>
            </div>
          </div>
        </div>

        {/* About the Team */}
        <div className={styles.teamSection}>
          <div className={styles.sectionTitle} style={{ marginTop: 0 }}>
            About the Team
          </div>
          <img
            className={styles.teamImg}
            src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*8tsvQ6NQZfEAAAAAUjAAAAgAekZ_AQ/original"
            alt="InclusionAI Team"
          />
          <div className={styles.teamText}>
            InclusionAI (IAI) is founded by Ant Group with an earnest yet small
            wish to bring small and usable intelligence to the world. With
            researchers formerly at OpenAI, Google and FAIR (Meta AI) and a
            strong engineering team, we take bold moves and understand it would
            take dedicated effort from researchers, engineers and product
            builders to work together in an inspirational and supportive team.
          </div>
          <Link className={styles.teamButton} to="/about">
            Our Research
            <img
              src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*vvp6R65SgM8AAAAAF6AAAAgAekZ_AQ/original"
              alt="→"
              style={{ width: 18, height: 18 }}
            />
          </Link>
        </div>

        {/* Blog */}
        <div className={styles.releasesSection}>
          <div className={styles.sectionTitle}>Blog</div>
          {recentPosts.map((post) => (
            <div key={post.permalink} className={styles.releaseItem}>
              <Link className={styles.releaseTitle} to={post.permalink}>
                {post.title}
              </Link>
              <span className={styles.releaseDate}>{post.formattedDate}</span>
            </div>
          ))}
        </div>

        {/* Bottom icons + image */}
        <div className={styles.bottomSection}>
          <div className={styles.iconList}>
            <img
              className={styles.socialIcon}
              src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*YNPuRKYiC6AAAAAAQEAAAAgAekZ_AQ/original"
              alt="HuggingFace"
              onClick={() => window.open("https://huggingface.co/inclusionAI")}
            />
            <img
              className={styles.socialIcon}
              src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*KLhaTqSxjWMAAAAAQBAAAAgAekZ_AQ/original"
              alt="GitHub"
              onClick={() => window.open("https://github.com/inclusionAI")}
            />
            <img
              className={styles.socialIcon}
              src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*CMEURKizEMsAAAAAM-AAAAgAekZ_AQ/original"
              alt="ModelScope"
              onClick={() =>
                window.open("https://modelscope.cn/organization/inclusionAI")
              }
            />
          </div>
          <img
            className={styles.bottomImg}
            src="https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*YL0VR4Xi6f4AAAAARhAAAAgAekZ_AQ/original"
            alt=""
          />
        </div>
      </div>
    </Layout>
  );
}
