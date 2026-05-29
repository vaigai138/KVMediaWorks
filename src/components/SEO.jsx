import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/* Admin-editable per-route meta overrides, fetched once from the content store
   (written by the admin panel → public/content/page-meta.json). Cached per session. */
let _pageMetaCache = null;
let _pageMetaPromise = null;
function loadPageMeta() {
  if (_pageMetaCache) return Promise.resolve(_pageMetaCache);
  if (_pageMetaPromise) return _pageMetaPromise;
  _pageMetaPromise = fetch('/content/page-meta.json', { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : {}))
    .then((d) => { _pageMetaCache = d || {}; return _pageMetaCache; })
    .catch(() => { _pageMetaCache = {}; return _pageMetaCache; });
  return _pageMetaPromise;
}

/* ═══════════════════════════════════════════════════════════
   SEO — Centralized per-route meta tag management
   Wraps react-helmet-async with KV Media Works brand defaults,
   Open Graph, Twitter Card, canonical URLs, and JSON-LD support.
   ═══════════════════════════════════════════════════════════ */

// Site-wide config — change SITE_URL if the primary domain changes
export const SITE_URL = 'https://kvmediaworks.me';
export const SITE_NAME = 'KV Media Works';
export const DEFAULT_TITLE = 'KV Media Works — Premium Video Editing & Production Agency';
export const DEFAULT_DESCRIPTION =
  'KV Media Works is a premium video editing & post-production agency. From scroll-stopping Reels and YouTube videos to corporate films and motion graphics — 700+ videos delivered for 65+ clients worldwide.';
export const DEFAULT_KEYWORDS =
  'video editing, video production agency, post production, Instagram Reels editing, YouTube video editing, motion graphics, color grading, corporate video, podcast editing, short form video, KV Media Works';
// Default share image — replace with a dedicated 1200×630 OG image when available
export const DEFAULT_IMAGE = `${SITE_URL}/hero-logo.png`;
export const TWITTER_HANDLE = '@kv_mediaworks';

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
  children,
}) => {
  // Admin overrides from page-meta.json win over the per-page defaults below
  const [override, setOverride] = useState(() => (_pageMetaCache ? _pageMetaCache[path] : null));
  useEffect(() => {
    let cancelled = false;
    loadPageMeta().then((meta) => { if (!cancelled) setOverride(meta[path] || null); });
    return () => { cancelled = true; };
  }, [path]);

  const ov = override || {};
  const has = (v) => v && String(v).trim().length > 0;

  // Page title: admin override (verbatim) → "Page — KV Media Works" → brand default
  const fullTitle = has(ov.title) ? ov.title : (title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE);
  const finalDescription = has(ov.description) ? ov.description : description;
  const finalKeywords = has(ov.keywords) ? ov.keywords : keywords;
  const ogTitle = has(ov.ogTitle) ? ov.ogTitle : fullTitle;
  const ogDescription = has(ov.ogDescription) ? ov.ogDescription : finalDescription;
  const finalImage = has(ov.ogImage) ? ov.ogImage : image;
  const canonical = has(ov.canonical) ? ov.canonical : `${SITE_URL}${path === '/' ? '' : path}`;
  const imageUrl = finalImage?.startsWith('http') ? finalImage : `${SITE_URL}${finalImage}`;
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />

      {/* Structured data (JSON-LD) */}
      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {children}
    </Helmet>
  );
};

export default SEO;
