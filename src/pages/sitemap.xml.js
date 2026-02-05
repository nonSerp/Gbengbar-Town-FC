// src/pages/sitemap.xml.js
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://gbengbartown.com/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts.map(post => `
        <url>
          <loc>https:///blog/${post.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}