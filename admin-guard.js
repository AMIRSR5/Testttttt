// ============================================================
// گارد امنیتی پنل مدیریت
// نکته: این فقط تجربه کاربری را کنترل می‌کند (مخفی‌کردن UI).
// امنیت واقعی از طریق RLS در دیتابیس تضمین می‌شود (is_admin())
// پس حتی اگر کسی این چک فرانت را دور بزند، به داده مدیریتی دسترسی نخواهد داشت.
// ============================================================

async function requireAdmin() {
  const user = await Auth.getUser();
  if (!user) {
    window.location.href = '../login.html';
    return null;
  }
  const profile = await Auth.getProfile();
  if (!profile || profile.role !== 'admin') {
    document.body.innerHTML =
      '<div style="min-height:100vh; display:flex; align-items:center; justify-content:center; color:#f2ede2; font-family:Vazirmatn,sans-serif; direction:rtl;">دسترسی شما به پنل مدیریت مجاز نیست.</div>';
    return null;
  }
  return profile;
}

function renderAdminNav(active) {
  const items = [
    { href: 'index.html', label: 'داشبورد', key: 'dashboard' },
    { href: 'products.html', label: 'محصولات', key: 'products' },
    { href: 'categories.html', label: 'دسته‌بندی‌ها', key: 'categories' },
    { href: 'gold-price.html', label: 'قیمت طلا', key: 'gold' },
    { href: 'orders.html', label: 'سفارش‌ها', key: 'orders' },
    { href: 'reviews.html', label: 'نقد و بررسی‌ها', key: 'reviews' },
    { href: 'wheel.html', label: 'گردونه شانس', key: 'wheel' },
    { href: 'settings.html', label: 'تنظیمات سایت', key: 'settings' },
  ];
  return `
  <aside class="admin-sidebar">
    <div class="admin-logo">پنل مدیریت <span>طلای سرافراز</span></div>
    <nav>
      ${items.map((i) => `<a href="${i.href}" class="${i.key === active ? 'active' : ''}">${i.label}</a>`).join('')}
    </nav>
    <button id="admin-logout" class="btn btn-ghost" style="margin-top:auto;">خروج</button>
  </aside>`;
}

function mountAdminLayout(active) {
  const mount = document.getElementById('admin-sidebar-mount');
  if (mount) mount.outerHTML = renderAdminNav(active);
  document.getElementById('admin-logout')?.addEventListener('click', () => Auth.signOut());
}
