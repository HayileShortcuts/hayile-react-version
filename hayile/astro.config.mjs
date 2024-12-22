// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true
  },

  integrations: [preact(), tailwind({
    configFile: "./tailwind.config.mjs"
  })],
  adapter: vercel()
});