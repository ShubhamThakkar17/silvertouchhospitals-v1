import media from "@/content/imported/media.json";

export type Img = { src: string; width: number; height: number };

const MAP = media as Record<string, Img>;

/**
 * Resolves an original WordPress image URL to the local WebP copy
 * downloaded by `npm run import`. Throws at build time if an image is
 * missing so broken images never ship.
 */
export function img(url: string): Img {
  const key = url.replace("http://", "https://").split("?")[0];
  const hit = MAP[key];
  if (!hit) throw new Error(`Image not imported: ${url}. Add it to scripts/assets.ts and run npm run import.`);
  return hit;
}

export const UP = "https://www.silvertouchhospitals.com/wp-content/uploads";
export const up = (path: string) => img(`${UP}/${path}`);
