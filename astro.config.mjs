import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://gbengbartown.com',
  output: 'static',
  adapter: vercel(),
});