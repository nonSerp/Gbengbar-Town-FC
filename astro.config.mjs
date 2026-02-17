import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel';
import icon from "astro-icon";

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://gbengbartown.com',
  integrations: [sitemap(), icon(), react()],
  output: 'static',
  adapter: vercel(),
});