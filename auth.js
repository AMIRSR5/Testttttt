// ============================================================
// احراز هویت — Supabase Auth (ایمیل/رمز + Google OAuth، هر دو رایگان)
// ============================================================

const Auth = {
  async signUp(email, password, fullName, phone) {
    const { data, error } = await window.supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });
    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/index.html' },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    await window.supabaseClient.auth.signOut();
    window.location.href = 'index.html';
  },

  async getUser() {
    const { data } = await window.supabaseClient.auth.getUser();
    return data?.user || null;
  },

  async getProfile() {
    const user = await this.getUser();
    if (!user) return null;
    const { data } = await window.supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    return data;
  },

  async requireLogin(redirectTo = 'login.html') {
    const user = await this.getUser();
    if (!user) window.location.href = redirectTo;
    return user;
  },
};

window.Auth = Auth;
