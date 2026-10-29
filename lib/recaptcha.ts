/** Loads reCAPTCHA v3 on demand. Returns null when no site key is configured. */
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, o: { action: string }) => Promise<string> };
  }
}

let loading: Promise<void> | null = null;

function load() {
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("recaptcha failed to load"));
    document.head.appendChild(s);
  });
  return loading;
}

export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (!SITE_KEY) return null;
  try {
    await load();
    return await new Promise((resolve) =>
      window.grecaptcha!.ready(() => window.grecaptcha!.execute(SITE_KEY, { action }).then(resolve, () => resolve(null))),
    );
  } catch {
    return null;
  }
}
