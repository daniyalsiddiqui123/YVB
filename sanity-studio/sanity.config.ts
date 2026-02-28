/**
 * Sanity Studio - Standalone
 * Run with: cd sanity-studio && npm run dev
 * Access at: http://localhost:3333
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./src/sanity/schema";

export default defineConfig({
  name: "default",
  title: "YVB Fragrances CMS",

  // Using actual values directly
  projectId: "xa70vklg",
  dataset: "production",

  plugins: [
    deskTool(),
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
