/**
 * Sanity Studio page
 * Access at: http://localhost:3333
 */

import { NextStudio } from "next-sanity/studio";
import config from "../sanity.config";

export const { metadata, viewport } = NextStudio;

export default function StudioPage() {
  return <NextStudio config={config} />;
}
