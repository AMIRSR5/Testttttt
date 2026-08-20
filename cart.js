// ============================================================
// سبد خرید — ذخیره در localStorage (بدون هزینه سرور)
// ساختار هر آیتم: { productId, name, unitPrice, quantity, image }
// ============================================================

const Cart = {
  KEY: 'gold_shop_cart',

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
    }
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('cart:changed', { detail: items }));
  },

  add(item, qty = 1) {
    const items = this.getAll();
    const existing = items.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({ ...item, quantity: qty });
    }
    this.save(items);
  },

  updateQuantity(productId, qty) {
    let items = this.getAll();
    if (qty <= 0) {
      items = items.filter((i) => i.productId !== productId);
    } else {
      const item = items.find((i) => i.productId === productId);
      if (item) item.quantity = qty;
    }
    this.save(items);
  },

  remove(productId) {
    this.save(this.getAll().filter((i) => i.productId !== productId));
  },

  clear() {
    this.save([]);
  },

  count() {
    return this.getAll().reduce((sum, i) => sum + i.quantity, 0);
  },

  total() {
    return this.getAll().reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  },

  updateBadge() {
    document.querySelectorAll('[data-cart-badge]').forEach((el) => {
      const c = this.count();
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });
  },
};

document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
window.Cart = Cart;
