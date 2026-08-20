// ============================================================
// اتصال به Supabase
// نکته امنیتی: فقط URL و anon key اینجا قرار می‌گیرد (این‌ها Public هستند
// و طراحی Supabase اجازه می‌دهد در Frontend باشند؛ دسترسی واقعی با RLS
// در دیتابیس کنترل می‌شود، نه با مخفی‌کردن این مقادیر).
// هرگز Service Role Key یا توکن ربات روبیکا را اینجا قرار ندهید.
// ============================================================

window.SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',
  anonKey: 'YOUR-ANON-PUBLIC-KEY',
};

// بارگذاری کتابخانه از CDN در index.html:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>

window.supabaseClient = window.supabase.createClient(
  window.SUPABASE_CONFIG.url,
  window.SUPABASE_CONFIG.anonKey
);
