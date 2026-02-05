import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://gbengbartown.com',
  integrations: [
    sitemap()
  ],
  output: 'hybrid',
  adapter: vercel(),
});