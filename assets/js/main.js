/**
* Template Name: Craftivo
* Template URL: https://bootstrapmade.com/craftivo-bootstrap-portfolio-template/
* Updated: Oct 04 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1800
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach((el, idx) => {
          // Ensure start at 0 for a smooth animation
          try { el.style.width = '0%'; } catch (e) {}
          // get target value from aria-valuenow, data-percent or inline style
          const target = el.getAttribute('aria-valuenow') || el.dataset.percent || (el.style.width ? el.style.width.replace('%','') : '0');
          setTimeout(() => {
            el.style.width = target + '%';
            if (!el.getAttribute('aria-valuenow')) el.setAttribute('aria-valuenow', target);
          }, idx * 140);
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
      // expose instances globally so other UI controls can call .arrange()
      window.isotopeInstances = window.isotopeInstances || [];
      window.isotopeInstances.push(initIsotope);
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function(e) {
        // If user clicks the 'All Work' (*) button, clear other selections and show all
        const filterValue = this.getAttribute('data-filter');
        const allBtn = filterValue === '*';

        if (allBtn) {
          // remove active from all and set this one
          isotopeItem.querySelectorAll('.isotope-filters li.filter-active').forEach(el => el.classList.remove('filter-active'));
          this.classList.add('filter-active');
          initIsotope.arrange({ filter: '*' });
          if (typeof aosInit === 'function') aosInit();
          return;
        }

        // Toggle this filter's active state
        this.classList.toggle('filter-active');

        // If any non-* filter is active, remove 'All Work' active state
        const anyActive = Array.from(isotopeItem.querySelectorAll('.isotope-filters li')).some(li => li.classList.contains('filter-active') && li.getAttribute('data-filter') !== '*');
        if (anyActive) {
          const allLi = isotopeItem.querySelector('.isotope-filters li[data-filter="*"]');
          if (allLi) allLi.classList.remove('filter-active');
        }

        // Build combined selector (OR) from all active filters (except '*')
        const activeFilters = Array.from(isotopeItem.querySelectorAll('.isotope-filters li.filter-active'))
          .map(li => li.getAttribute('data-filter'))
          .filter(f => f && f !== '*');

        const selector = activeFilters.length ? activeFilters.join(',') : '*';
        initIsotope.arrange({ filter: selector });
        if (typeof aosInit === 'function') aosInit();
      }, false);
    });

  });

  /**
   * Helper: filter portfolio and scroll to portfolio section.
   * Accepts a CSS selector like '.filter-python' or '*' for all.
   */
  function filterPortfolioAndScroll(filterSelector) {
    try {
      const iso = (window.isotopeInstances && window.isotopeInstances[0]) || null;
      if (iso) iso.arrange({ filter: filterSelector });

      // Replace visual active state: set active class on any isotope-filters li
      // whose data-filter matches one of the selectors provided (supports comma-separated selectors).
      const isotopeFilterItems = Array.from(document.querySelectorAll('.isotope-filters li'));
      isotopeFilterItems.forEach(el => el.classList.remove('filter-active'));

      // Normalize incoming selector(s) into an array of trimmed selectors
      const selectors = String(filterSelector).split(',').map(s => s.trim()).filter(Boolean);
      let matched = false;

      isotopeFilterItems.forEach(li => {
        const liFilter = li.getAttribute('data-filter');
        if (!liFilter) return;

        if (liFilter === '*' && (filterSelector === '*' || selectors.includes('*'))) {
          li.classList.add('filter-active');
          matched = true;
          return;
        }

        if (selectors.includes(liFilter)) {
          li.classList.add('filter-active');
          matched = true;
        }
      });

      // Fallback: if nothing matched, try exact match with original string (safe-guard)
      if (!matched) {
        const liExact = isotopeFilterItems.find(li => li.getAttribute('data-filter') === filterSelector);
        if (liExact) liExact.classList.add('filter-active');
      }

      // scroll to portfolio section and account for scroll-margin-top
      const section = document.querySelector('#portfolio');
      if (section) {
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop || '90px';
        window.scrollTo({ top: section.offsetTop - parseInt(scrollMarginTop), behavior: 'smooth' });
      }
    } catch (e) {
      console.error('filterPortfolioAndScroll error', e);
    }
  }

  // Attach behavior to any anchor with a data-filter attribute (nav, skills links)
  document.querySelectorAll('a[data-filter]').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const filter = this.getAttribute('data-filter');
      if (filter) filterPortfolioAndScroll(filter);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();