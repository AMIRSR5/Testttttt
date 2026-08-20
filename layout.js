// ============================================================
// هدر و فوتر مشترک — به‌صورت رشته JS تزریق می‌شود
// (به‌جای include سمت سرور، چون پروژه بدون Build اجرا می‌شود)
// ============================================================

function renderHeader(activePage = '') {
  const nav = [
    { href: 'index.html', label: 'خانه', key: 'home' },
    { href: 'shop.html', label: 'فروشگاه', key: 'shop' },
    { href: 'about.html', label: 'درباره ما', key: 'about' },
    { href: 'contact.html', label: 'تماس با ما', key: 'contact' },
    { href: 'location.html', label: 'لوکیشن فروشگاه', key: 'location' },
  ];

  const links = nav
    .map(
      (i) =>
        `<li><a href="${i.href}" class="${i.key === activePage ? 'active' : ''}">${i.label}</a></li>`
    )
    .join('');

  return `
  <div class="splash"><div class="splash-logo">طلای <span style="color:#f2ede2">سرافراز</span></div></div>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="logo">طلای <span>سرافراز</span></a>
      <ul class="nav-links">${links}</ul>
      <div class="nav-actions">
        <a href="cart.html" class="icon-btn" title="سبد خرید">🛒<span class="cart-badge" data-cart-badge style="display:none">0</span></a>
        <a href="login.html" class="icon-btn" title="حساب کاربری">👤</a>
        <button class="menu-toggle" aria-label="منو">☰</button>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="index.html" class="logo">طلای <span>سرافراز</span></a>
          <p style="margin-top:16px; max-width:340px;">طراحی و ساخت زیورآلات طلا با دقت و اصالت؛ تجربه‌ای لوکس از خرید طلای آنلاین.</p>
        </div>
        <div>
          <h4>دسترسی سریع</h4>
          <ul>
            <li><a href="shop.html">فروشگاه</a></li>
            <li><a href="reviews.html">نقد و بررسی‌ها</a></li>
            <li><a href="terms.html">قوانین و شرایط</a></li>
          </ul>
        </div>
        <div>
          <h4>حساب کاربری</h4>
          <ul>
            <li><a href="login.html">ورود / ثبت‌نام</a></li>
            <li><a href="cart.html">سبد خرید</a></li>
          </ul>
        </div>
        <div>
          <h4>ارتباط با ما</h4>
          <ul id="footer-contact">
            <li><a href="contact.html">تماس با ما</a></li>
            <li><a href="location.html">لوکیشن فروشگاه</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} تمام حقوق برای طلای سرافراز محفوظ است.</div>
    </div>
  </footer>`;
}

function mountLayout(activePage = '') {
  const headerMount = document.getElementById('app-header');
  const footerMount = document.getElementById('app-footer');
  if (headerMount) headerMount.outerHTML = renderHeader(activePage);
  if (footerMount) footerMount.outerHTML = renderFooter();
}
