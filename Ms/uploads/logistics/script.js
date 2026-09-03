// Intersection Observer for scroll animations
function __initSite() {
    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .section');
    
    // Add default animation class to all sections that don't have one
    document.querySelectorAll('.section').forEach(section => {
        if (!section.classList.contains('fade-up') && !section.classList.contains('fade-in')) {
            section.classList.add('fade-up');
        }
    });

    // Observe all newly tagged and existing elements
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Horizontal Accordion Logic
    const accItems = document.querySelectorAll('.acc-item');
    accItems.forEach(item => {
        item.addEventListener('click', () => {
            accItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Why MS Logistic — card hover image swap
    const whyCards = document.querySelectorAll('.why-card');
    const whyPanelImg = document.getElementById('why-panel-img');
    const whyStatBadge = document.querySelector('.why-stat-badge');

    const statData = [
        { num: '150', sup: '+', label: 'Countries Served' },
        { num: '15',  sup: '+', label: 'Years Experience' },
        { num: '1',   sup: '',  label: 'Partner, All Services' },
        { num: '24',  sup: '/7',label: 'Shipment Visibility' },
        { num: '100', sup: '%', label: 'Quality Commitment' },
        { num: '24',  sup: '/7',label: 'Support Available' },
    ];

    whyCards.forEach((card, i) => {
        card.addEventListener('click', () => {
            // Update active card
            whyCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Fade image out, swap src, fade back in
            if (whyPanelImg) {
                whyPanelImg.classList.add('fade-swap');
                setTimeout(() => {
                    whyPanelImg.src = card.dataset.img;
                    whyPanelImg.classList.remove('fade-swap');
                }, 350);
            }

            // Update stat badge
            if (whyStatBadge && statData[i]) {
                const d = statData[i];
                whyStatBadge.querySelector('.why-stat-num').innerHTML = d.num + '<span>' + d.sup + '</span>';
                whyStatBadge.querySelector('.why-stat-label').textContent = d.label;
            }
        });
    });

    // Sticky Stack Services Scroll Logic
    const stackCards = document.querySelectorAll('.stack-card');
    const bgImages = document.querySelectorAll('.service-bg-img');

    if (stackCards.length > 0 && bgImages.length > 0) {
        window.addEventListener('scroll', () => {
            let activeIndex = 0;
            
            stackCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                // Since cards stick around 120px-220px, check if they are near the top
                // We add a little buffer (e.g. 300px) so it triggers as it slides in
                if (rect.top < 350) {
                    activeIndex = index;
                }
            });

            bgImages.forEach(img => img.classList.remove('active'));
            if (bgImages[activeIndex]) {
                bgImages[activeIndex].classList.add('active');
            }
        });
    }

    // Vertical Tabs Logic (Why MS Logistic Section)
    const vTabs = document.querySelectorAll('.v-tab');
    vTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            vTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');

            // Hide all panes
            const targetId = tab.getAttribute('data-target');
            document.querySelectorAll('.v-tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });

            // Show target pane
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isOpen));
            mobileNav.setAttribute('aria-hidden', String(isOpen));
            // Toggle visibility (CSS handles display for larger screens)
            mobileNav.style.display = isOpen ? 'none' : 'block';
        });
    }

    const themeToggles = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if(icon) {
                icon.classList.remove('ph-moon');
                icon.classList.add('ph-sun');
            }
        });
    }

    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            let targetTheme = 'light';
            if (document.documentElement.getAttribute('data-theme') !== 'dark') {
                targetTheme = 'dark';
            }

            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);

            document.querySelectorAll('.theme-toggle i').forEach(icon => {
                if (targetTheme === 'dark') {
                    icon.classList.remove('ph-moon');
                    icon.classList.add('ph-sun');
                } else {
                    icon.classList.remove('ph-sun');
                    icon.classList.add('ph-moon');
                }
            });
        });
    });


    // Why Businesses Choose — vertical tab switching
    const wbcTabs = document.querySelectorAll('.wbc-tab');
    const wbcPanels = document.querySelectorAll('.wbc-panel');

    wbcTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            wbcTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            wbcPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = document.getElementById(target);
            if (panel) panel.classList.add('active');
        });
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", __initSite);
} else {
  __initSite();
}
