document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navMenu = document.querySelector('[data-nav-menu]');
    const yearNode = document.querySelector('[data-year]');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }

    if (navToggle && navMenu) {
        const closeMenu = () => {
            navMenu.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 960px)').matches) {
                    closeMenu();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('[data-nav-link]').forEach((link) => {
        const target = link.getAttribute('href') || '';
        if (target === currentPath || (currentPath === '' && target === 'index.html')) {
            link.classList.add('is-active');
        }
    });

    const revealTargets = document.querySelectorAll('.reveal-on-scroll, .social-card');
    if ('IntersectionObserver' in window && revealTargets.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealTargets.forEach((element) => observer.observe(element));
    } else {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
    }
});