/**
 * Portfolio JavaScript
 * Handles: Theme toggle, mobile navigation, scroll reveal, active nav links
 */

(function () {
    'use strict';

    // ===================================
    // DOM ELEMENTS
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // ===================================
    // THEME MANAGEMENT
    // ===================================
    const THEME_KEY = 'sk-portfolio-theme';

    function getPreferredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;

        return window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
    }

    // Initialize theme
    setTheme(getPreferredTheme());

    themeToggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    });

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem(THEME_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===================================
    // MOBILE NAVIGATION
    // ===================================
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    let lastScrollY = 0;
    let ticking = false;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            navbar.style.borderBottomColor = 'var(--border)';
        } else {
            navbar.style.borderBottomColor = 'var(--border-light)';
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(handleNavbarScroll);
            ticking = true;
        }
    });

    // ===================================
    // ACTIVE NAV LINK ON SCROLL
    // ===================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.color = 'var(--accent)';
                    } else {
                        link.style.color = '';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function () {
        requestAnimationFrame(updateActiveNavLink);
    });

    // ===================================
    // SCROLL REVEAL
    // ===================================
    function initScrollReveal() {
        // Add reveal class to elements
        const revealSelectors = [
            '.section-header',
            '.about-text',
            '.principle',
            '.project-card',
            '.skill-group',
            '.contact-text',
            '.contact-link-card',
            '.hero-text',
            '.hero-visual'
        ];

        revealSelectors.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (el, index) {
                el.classList.add('reveal');
                // Stagger delay for grouped elements
                el.style.transitionDelay = (index * 0.08) + 's';
            });
        });

        // Create intersection observer
        var observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after reveal for performance
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    }

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);

            if (targetElement) {
                var offsetTop = targetElement.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // CODE BLOCK TYPING EFFECT (subtle)
    // ===================================
    function initCodeBlockCursor() {
        var codeBlock = document.querySelector('.code-content');
        if (!codeBlock) return;

        // Add a blinking cursor at the end
        var cursor = document.createElement('span');
        cursor.style.cssText = 'display:inline-block;width:8px;height:17px;background:var(--accent);margin-left:2px;animation:blink 1.2s infinite;vertical-align:middle;border-radius:1px;';
        codeBlock.querySelector('code').appendChild(cursor);

        // Add blink animation
        var style = document.createElement('style');
        style.textContent = '@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}';
        document.head.appendChild(style);
    }

    // ===================================
    // INITIALIZATION
    // ===================================
    document.addEventListener('DOMContentLoaded', function () {
        initScrollReveal();
        initCodeBlockCursor();

        // Remove preload class after page load to enable transitions
        setTimeout(function () {
            document.body.classList.remove('preload');
        }, 100);
    });

    // Handle page visibility for performance
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            // Pause any running intervals/animations when tab is hidden
        }
    });

})();
