// Custom plugin: reads blog frontmatter at build time and exposes
// the 5 most recent posts via usePluginData('recent-blog-posts').
// Also exposes up to 5 posts tagged 'landscape' as landscapePosts.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

module.exports = function recentBlogPostsPlugin(context) {
  return {
    name: "recent-blog-posts",

    async loadContent() {
      const blogDir = path.join(context.siteDir, "blog");

      const allEntries = fs
        .readdirSync(blogDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .flatMap((d) => {
          const base = path.join(blogDir, d.name);
          const candidates = ["index.mdx", "index.md"];
          for (const name of candidates) {
            const filePath = path.join(base, name);
            if (fs.existsSync(filePath)) {
              const raw = fs.readFileSync(filePath, "utf-8");
              const { data: fm } = matter(raw);
              if (!fm.date || !fm.title || fm.draft === true) return [];
              const tags = Array.isArray(fm.tags) ? fm.tags : [];
              return [
                {
                  title: fm.title,
                  permalink: `/blog/${d.name}`,
                  date: new Date(fm.date).getTime(),
                  formattedDate: new Date(fm.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }),
                  tags,
                },
              ];
            }
          }
          return [];
        });

      allEntries.sort((a, b) => b.date - a.date);

      const recentPosts = allEntries
        .slice(0, 5)
        .map(({ tags, ...rest }) => rest);

      const landscapePosts = allEntries
        .filter((e) =>
          e.tags.some(
            (t) =>
              (typeof t === "string" ? t : (t.label ?? "")).toLowerCase() ===
              "landscape",
          ),
        )
        .slice(0, 5)
        .map(({ tags, ...rest }) => rest);

      const releasePosts = allEntries
        .filter((e) =>
          e.tags.some(
            (t) =>
              (typeof t === "string" ? t : (t.label ?? "")).toLowerCase() ===
              "release",
          ),
        )
        .slice(0, 5)
        .map(({ tags, ...rest }) => rest);

      return { recentPosts, landscapePosts, releasePosts };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
