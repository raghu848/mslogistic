/**
 * MS LOGISTICS — Interactive Website Module
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initTracking();
  initQuoteForm();
  initFAQ();
  initScrollReveal();
  initGlobalMap();
});

/* ==========================================================================
   1. Navbar & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.ms-navbar');
  const toggleBtn = document.querySelector('.ms-mobile-toggle');
  const drawer = document.querySelector('.ms-mobile-drawer');
  const closeBtn = document.querySelector('.ms-mobile-close');
  const overlay = document.querySelector('.ms-overlay');
  const navLinks = document.querySelectorAll('.ms-nav-link');

  // Sticky Scroll
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Mobile Drawer Toggle
  if (toggleBtn && drawer) {
    const openDrawer = () => {
      drawer.classList.add('open', 'active');
      overlay?.classList.add('active', 'open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('open', 'active');
      overlay?.classList.remove('active', 'open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);

    // Close when clicking any nav link inside drawer
    const drawerLinks = drawer.querySelectorAll('a, button:not(.ms-mobile-close)');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Viewport Animated Counters
   ========================================================================== */
function initCounters() {
  const statNumbers = document.querySelectorAll('.ms-stat-number[data-target]');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));

          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.innerHTML = `${prefix}${current}${suffix}`;
          }, 16);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.ms-stats-bar');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   3. Interactive Shipment Tracking Simulator
   ========================================================================== */
function initTracking() {
  const trackBtns = document.querySelectorAll('.ms-btn-track');
  const modal = document.querySelector('#trackingModal');
  const modalClose = document.querySelector('.ms-modal-close');
  const trackDisplayCode = document.querySelector('#trackDisplayCode');

  trackBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.previousElementSibling || document.querySelector('#heroTrackInput') || document.querySelector('#mainTrackInput');
      const trackCode = input ? input.value.trim() : '';

      if (!trackCode) {
        alert('Please enter a valid tracking number (e.g. MS-908273)');
        return;
      }

      if (trackDisplayCode) {
        trackDisplayCode.textContent = trackCode.toUpperCase();
      }

      if (modal) {
        modal.classList.add('active');
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   4. Quote Form Validation & Submission
   ========================================================================== */
function initQuoteForm() {
  const quoteForm = document.querySelector('#quoteForm');
  const quoteModal = document.querySelector('#quoteSuccessModal');
  const modalClose = document.querySelector('#quoteSuccessClose');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = quoteForm.querySelector('[name="fullname"]')?.value.trim();
      const email = quoteForm.querySelector('[name="email"]')?.value.trim();
      const phone = quoteForm.querySelector('[name="phone"]')?.value.trim();

      if (!name || !email || !phone) {
        alert('Please complete all required fields (Name, Email, Phone).');
        return;
      }

      // Display Success Modal
      if (quoteModal) {
        quoteModal.classList.add('active');
        quoteForm.reset();
      } else {
        alert('Thank you! Your quote request has been submitted to MS LOGISTICS. Our logistics team will contact you shortly.');
        quoteForm.reset();
      }
    });
  }

  if (modalClose && quoteModal) {
    modalClose.addEventListener('click', () => {
      quoteModal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   5. FAQ Accordion Toggle
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.ms-faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.ms-faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.ms-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   7. Global Map Node Highlight
   ========================================================================== */
function initGlobalMap() {
  const nodes = document.querySelectorAll('.ms-map-node');
  const nodeInfo = document.querySelector('#mapNodeInfo');

  const infoMap = {
    india: 'India Hub — Primary South Asia Air & Sea Freight Gateway',
    middleeast: 'Middle East Hub — Dubai International Cargo Center',
    europe: 'Europe Hub — Frankfurt & Rotterdam Distribution Network',
    northamerica: 'North America Hub — JFK Air Cargo & Long Beach Port',
    asia: 'East Asia Hub — Singapore & Shanghai Transshipment Ports',
    africa: 'Africa Hub — Port of Durban & Cairo Logistics Facility'
  };

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const key = node.getAttribute('data-region');
      if (nodeInfo && infoMap[key]) {
        nodeInfo.textContent = infoMap[key];
        nodeInfo.style.color = '#FF5722';
      }
    });

    node.addEventListener('mouseleave', () => {
      if (nodeInfo) {
        nodeInfo.textContent = 'Hover over any node to view MS LOGISTICS key operational gateways.';
        nodeInfo.style.color = 'rgba(255, 255, 255, 0.7)';
      }
    });
  });
}
