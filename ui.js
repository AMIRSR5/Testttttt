// ============================================================
// کمک‌های مشترک رابط کاربری
// ============================================================

const UI = {
  toast(message, type = 'info') {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.style.borderColor = type === 'error' ? 'var(--danger)' : 'var(--gold-dim)';
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  },

  initSplash() {
    const splash = document.querySelector('.splash');
    if (!splash) return;
    const done = () => splash.classList.add('hide');
    if (sessionStorage.getItem('splash_shown')) {
      splash.classList.add('hide');
      return;
    }
    sessionStorage.setItem('splash_shown', '1');
    setTimeout(done, 1100);
  },

  initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = 'var(--nav-h)';
      nav.style.right = '0';
      nav.style.left = '0';
      nav.style.background = 'var(--bg-elevated)';
      nav.style.padding = '20px 24px';
      nav.style.borderBottom = '1px solid var(--line)';
    });
  },

  initReveal() {
    // هر بلوک اصلی داخل <section> یا <main> به‌صورت خودکار انیمیشن
    // «محو + بالا آمدن» موقع اسکرول می‌گیرد — نیازی به کلاس‌گذاری دستی در هر صفحه نیست.
    const autoTargets = document.querySelectorAll(
      '.section > .container > *, .section > *, main > .container > *'
    );
    autoTargets.forEach((el) => {
      if (!el.classList.contains('reveal') && !el.classList.contains('no-reveal')) {
        el.classList.add('reveal');
      }
    });

    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((e, i) => {
      e.style.transitionDelay = (i % 4) * 90 + 'ms';
      io.observe(e);
    });

    // بازتولید Reveal برای محتوایی که بعداً با JS (مثل کارت محصولات) اضافه می‌شود
    const grids = document.querySelectorAll('.grid, #product-list, #featured-products, #reviews-wrap, #cart-items');
    grids.forEach((grid) => {
      const mo = new MutationObserver(() => {
        Array.from(grid.children).forEach((child, i) => {
          if (!child.classList.contains('reveal') && !child.classList.contains('in')) {
            child.classList.add('reveal');
            child.style.transitionDelay = (i % 4) * 80 + 'ms';
            requestAnimationFrame(() => requestAnimationFrame(() => child.classList.add('in')));
          }
        });
      });
      mo.observe(grid, { childList: true });
    });
  },

  // پارالاکس ملایم برای تصویر هیرو صفحه اصلی هنگام اسکرول
  initParallax() {
    const el = document.querySelector('[data-parallax]');
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    window.addEventListener(
      'scroll',
      () => {
        const offset = window.scrollY * 0.12;
        el.style.transform = `translateY(${offset}px)`;
      },
      { passive: true }
    );
  },

  // اعتبارسنجی ساده فرم‌ها
  validateField(input, rules = {}) {
    const wrap = input.closest('.field');
    const errorEl = wrap?.querySelector('.error');
    let message = '';

    if (rules.required && !input.value.trim()) message = 'این فیلد الزامی است';
    else if (rules.minLength && input.value.trim().length < rules.minLength)
      message = `حداقل ${rules.minLength} کاراکتر وارد کنید`;
    else if (rules.pattern && !rules.pattern.test(input.value.trim())) message = rules.patternMessage || 'مقدار نامعتبر است';

    if (message) {
      wrap?.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
      return false;
    }
    wrap?.classList.remove('has-error');
    return true;
  },

  setLoading(button, isLoading, loadingText = 'در حال پردازش...') {
    if (isLoading) {
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = `<span class="spinner"></span> ${loadingText}`;
      button.disabled = true;
    } else {
      button.innerHTML = button.dataset.originalText || button.innerHTML;
      button.disabled = false;
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  UI.initSplash();
  UI.initMobileNav();
  UI.initReveal();
  UI.initParallax();
});

window.UI = UI;
