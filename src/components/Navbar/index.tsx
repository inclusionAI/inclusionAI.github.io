import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";
import { NAV_LINKS, ICON_LINKS } from "./consant";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const location = useLocation();
  const logoSrc = useBaseUrl("img/logo_head.png");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
      setOpacity(scrollY > 50 ? Math.min(scrollY / 100, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav
      className={`navbar ${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      style={{
        background: isScrolled
          ? `rgba(255, 255, 255, ${Math.min(opacity * 0.85, 0.85)})`
          : "transparent",
        backdropFilter: isScrolled ? "blur(14px) saturate(160%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(14px) saturate(160%)" : "none",
        boxShadow: opacity > 0.5 ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className={styles.navbarContent}>
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className={styles.logo}>
          <img src={logoSrc} alt="inclusionAI Logo" />
        </Link>

        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.navLink} ${isActive(link.to) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.iconLinksWrapper}>
          {ICON_LINKS.map((icon) => (
            <a
              key={icon.href}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <img
                src={icon.img}
                alt={icon.alt}
                className={
                  icon.className === "inclusion" ? styles.inclusion : undefined
                }
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
