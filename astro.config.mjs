import { defineConfig } from 'astro/config';
// import sitemap from "@astrojs/sitemap"; // Removed sitemap import
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import lit from "@astrojs/lit";


// https://astro.build/config
export default defineConfig({
  // site: 'https://bespokeethos.com/', // Removed for privacy/schema concerns
  sitemap: false, // Disabled as per user request (privacy/schema concerns)
  integrations: [mdx(), lit(), icon()], // Added image optimization
});