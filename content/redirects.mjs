/**
 * 301 map from the WordPress site to the rebuild (brief section 10).
 * Every other URL keeps its slug, so it needs no redirect.
 * A CSV copy for Search Console / other hosts lives in redirects.csv.
 */
const redirects = [
  // Dr Jil P. Patel was published as a page instead of a doctor profile.
  { source: "/dr-jil-p-patel/", destination: "/doctor-team/dr-jil-p-patel/", statusCode: 301 },

  // Misspelt testimonials archive.
  { source: "/testimonails/", destination: "/testimonials/", statusCode: 301 },
  { source: "/testimonails/:slug/", destination: "/testimonials/:slug/", statusCode: 301 },

  // "Uncategorized" is retired; its two posts live under their real categories.
  { source: "/category/uncategorized/", destination: "/blogs/", statusCode: 301 },
  { source: "/category/uncategorized/page/:n/", destination: "/blogs/", statusCode: 301 },

  // WordPress category pagination (we list a whole category on one page).
  { source: "/category/:slug/page/:n/", destination: "/category/:slug/", statusCode: 301 },

  // Post-submit page from the old contact form.
  { source: "/thank-you/", destination: "/contact-us/", statusCode: 301 },

  // WordPress feeds and author archive.
  { source: "/feed/", destination: "/blogs/", statusCode: 301 },
  { source: "/author/admin/", destination: "/blogs/", statusCode: 301 },

  // Old WordPress sitemaps → the new single sitemap.
  { source: "/sitemap_index.xml", destination: "/sitemap.xml", statusCode: 301 },
  { source: "/page-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
  { source: "/post-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
  { source: "/doctor-team-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
  { source: "/testimonails-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
  { source: "/category-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },

  // [CONFIRM] Dr Gopal Singh Rajpurohit's slug carries a WordPress "-2" suffix.
  // Once the hospital confirms his details, change the doctor's slug in
  // content/doctors.ts and uncomment this line.
  // { source: "/doctor-team/dr-gopal-singh-rajpurohit-2/", destination: "/doctor-team/dr-gopal-singh-rajpurohit/", statusCode: 301 },
];

export default redirects;
