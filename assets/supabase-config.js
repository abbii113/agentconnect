/* ============================================================
   AgentConnect — connect the website to your Supabase database
   ------------------------------------------------------------
   1. Supabase dashboard → Settings → API
   2. Copy your "Project URL" and the "anon public" key
   3. Paste them below, save, refresh the page.

   Leave them as null to keep using the built-in demo data.
   The anon key is SAFE to put here — it's the public client key,
   designed for browsers and protected by your RLS policies.
   (Never put the service_role key here — that one bypasses RLS.)
   ============================================================ */
window.SUPA = {
  url: null,        // e.g. "https://abcdxyz.supabase.co"
  anonKey: null     // e.g. "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
};
