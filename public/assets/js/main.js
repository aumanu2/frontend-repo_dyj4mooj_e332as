// Main JS for School Carnival one-pager
// Smooth scrolling with Locomotive + ScrollTrigger

// Initialize Locomotive Scroll
let locoScroll;
window.addEventListener('load', () => {
  locoScroll = new LocomotiveScroll({
    el: document.querySelector('#smooth-content'),
    smooth: true,
    smartphone: { smooth: true },
    tablet: { smooth: true },
  });

  // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync)
  locoScroll.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy('#smooth-content', {
    scrollTop(value) { return arguments.length ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true }) : locoScroll.scroll.instance.scroll.y; },
    getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; },
    pinType: document.querySelector('#smooth-content').style.transform ? 'transform' : 'fixed'
  });

  // Reveal on view
  document.querySelectorAll('.reveal').forEach((el, i) => {
    gsap.fromTo(el, { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, scroller: '#smooth-content', start: 'top 85%' }
    });
  });

  // Parallax speed attribute
  document.querySelectorAll('[data-speed]')?.forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-speed')) || 1;
    gsap.to(el, {
      yPercent: (1 - speed) * -20,
      ease: 'none',
      scrollTrigger: { trigger: el, scroller: '#smooth-content', scrub: true }
    });
  });

  // Nav links smooth scroll via data-scroll-to
  document.querySelectorAll('[data-scroll-to]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) locoScroll.scrollTo(target, { offset: -80 });
      }
    });
  });

  // Update ScrollTrigger after everything
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
  ScrollTrigger.refresh();
});
