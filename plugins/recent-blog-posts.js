// Custom plugin: reads blog frontmatter at build time and exposes
// the 5 most recent posts via usePluginData('recent-blog-posts').
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

module.exports = function recentBlogPostsPlugin(context) {
  return {
    name: "recent-blog-posts",

    async loadContent() {
      const blogDir = path.join(context.siteDir, "blog");

      const entries = fs
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
                },
              ];
            }
          }
          return [];
        });

      entries.sort((a, b) => b.date - a.date);
      return entries.slice(0, 5);
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData({ recentPosts: content });
    },
  };
};
