// ============================================================
// ماژول قیمت طلا و قیمت‌گذاری محصولات
// ============================================================

const GoldPrice = {
  _cached: null,

  // خواندن تنظیمات قیمت طلا از دیتابیس (منبع واحد حقیقت)
  async getSettings() {
    const { data, error } = await window.supabaseClient
      .from('gold_price_settings')
      .select('*')
      .eq('id', 1)
      .single();
    if (error) throw error;
    return data;
  },

  // قیمت هر گرم طلا را برمی‌گرداند (تومان)
  // اگر source_type = 'api' باشد و آدرس API ست شده باشد، تلاش می‌کند از آن بخواند
  // (فراخوانی مستقیم API از Frontend ممکن است با CORS محدود شود؛
  //  در آن صورت باید از Supabase Edge Function به‌عنوان پراکسی استفاده شود)
  // در غیر این صورت روی last_fetched_price یا manual_price_per_gram می‌افتد.
  async getPricePerGram() {
    if (this._cached) return this._cached;
    const s = await this.getSettings();

    if (s.source_type === 'api' && s.api_url) {
      try {
        const res = await fetch(s.api_url);
        const json = await res.json();
        const path = (s.api_path || '').split('.').filter(Boolean);
        let value = json;
        for (const key of path) value = value?.[key];
        const price = Number(value);
        if (!isNaN(price) && price > 0) {
          this._cached = price;
          return price;
        }
      } catch (e) {
        console.warn('گرفتن قیمت از API ناموفق بود، برگشت به قیمت ذخیره‌شده', e);
      }
    }

    const fallback = s.last_fetched_price || s.manual_price_per_gram || 0;
    this._cached = fallback;
    return fallback;
  },

  // محاسبه قیمت نهایی یک محصول بر اساس فرمول:
  // final = (weight * pricePerGram) * (1 + profit% / 100) + making_fee
  // مگر این‌که manual_price_override ست شده باشد.
  calcProductPrice(product, pricePerGram) {
    if (product.manual_price_override && product.manual_price_override > 0) {
      return Math.round(product.manual_price_override);
    }
    const base = Number(product.weight_grams || 0) * Number(pricePerGram || 0);
    const withProfit = base * (1 + Number(product.profit_percent || 0) / 100);
    const total = withProfit + Number(product.making_fee || 0);
    return Math.round(total);
  },

  formatToman(n) {
    return Number(n || 0).toLocaleString('fa-IR') + ' تومان';
  },
};

window.GoldPrice = GoldPrice;
