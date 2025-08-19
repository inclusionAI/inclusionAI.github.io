const navHeight = 60;

/* Transition effect for navbar */
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const body = document.body;

    // Open mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking outside
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            mobileMenuOverlay.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Navbar scroll effect - transparency effect like inclusionAihome
    const navContainer = document.querySelector('.nav-container');
    const logoText = document.querySelector('.logo-text');
    const logoSubtitle = document.querySelector('.logo-subtitle');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Background transparency effect - gradually becomes white after 50px scroll
        if (scrollTop > 50) {
            const alpha = Math.min(0.95, (scrollTop - 50) / 100);
            navContainer.style.background = `rgba(255, 255, 255, ${alpha})`;
            navContainer.style.boxShadow = `0 2px 10px rgba(0, 0, 0, ${alpha * 0.1})`;
        } else {
            navContainer.style.background = 'transparent';
            navContainer.style.boxShadow = 'none';
        }

        // Transparency effect for logo text on scroll
        if (logoText && logoSubtitle) {
            const opacity = Math.max(0.3, 1 - (scrollTop / 300));
            logoText.style.opacity = opacity;
            logoSubtitle.style.opacity = opacity;
        }
    });

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.nav-container').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/* example gallery */
document.addEventListener('DOMContentLoaded', function () {
    const examples = document.querySelectorAll(".example-container");
    examples.forEach((example) => {
        const elements = example.querySelectorAll(".example-content");
        if (elements.length === 1) {
            const next = elements[0].querySelector(".next-button");
            if (next) {
                next.style.display = "none";
            }
            return
        }
        for (let i = 0; i < elements.length; i++) {
            const ele = elements[i];
            const nexti = i + 1 === elements.length ? 0 : i + 1;
            const next_ele = elements[nexti];
            const title = ele.querySelector(".title").firstElementChild;
            const title_text = `${title.textContent} (${i + 1}/${elements.length})`
            title.textContent = title_text;
            const button = ele.querySelector(".next-button");
            button.addEventListener("click", (e) => {
                e.preventDefault();
                ele.style.display = "none";
                next_ele.style.display = "block"
            })
        }
    })
});