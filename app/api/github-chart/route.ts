import { NextResponse } from "next/server";

/**
 * Proxy ghchart SVG:
 *  - replace fixed width/height with viewBox so it fills any container
 *  - remap exact ghchart hex shades to zinc-950 theme colors
 *  - round corners on each cell
 *
 * ghchart source: base=216e39 → generates exactly these 5 fills:
 *   #EEEEEE  empty
 *   #1a582e  level 1
 *   #216e39  level 2
 *   #54a16c  level 3
 *   #6ebb86  level 4 (highest)
 *   #767676  day labels / axis text
 *
 * Theme palette — zinc base with sky-400 accent:
 *   empty  → #1c1c1f  (zinc-900ish, near invisible on zinc-950)
 *   l1     → #1d3040  (sky darkest)
 *   l2     → #1e4a6b  (sky dark)
 *   l3     → #1d7fbd  (sky mid)
 *   l4     → #38bdf8  (sky-400 full brightness)
 *   text   → #52525b  (zinc-600)
 */
const COLOUR_MAP: [RegExp, string][] = [
  [/#EEEEEE/gi, "#1c1c1f"],
  [/#1a582e/gi, "#1d3040"],
  [/#216e39/gi, "#1e4a6b"],
  [/#54a16c/gi, "#1d7fbd"],
  [/#6ebb86/gi, "#38bdf8"],
  [/#767676/gi, "#52525b"],
];

export async function GET() {
  const res = await fetch(
    "https://ghchart.rshah.org/216e39/mrsamirr",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    return NextResponse.json({ error: "chart_fetch_failed" }, { status: 502 });
  }

  let svg = await res.text();

  // 1. Replace the entire <svg ...> opening tag cleanly
  //    Original: <svg version="1.1" ... width="663" height="104">
  svg = svg.replace(
    /<svg([^>]+)width="(\d+)"([^>]*)height="(\d+)"([^>]*)>/,
    (_m, pre, w, mid, h, post) =>
      `<svg${pre}${mid}${post} viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block;overflow:visible;">`
  );

  // 2. Round cell corners + fix rendering
  svg = svg
    .replace(/<rect /g, '<rect rx="2" ry="2" ')
    .replace(/shape-rendering:crispedges/gi, "shape-rendering:geometricPrecision");

  // 3. Remap colours — regexes already have /gi so replace hits every occurrence
  for (const [from, to] of COLOUR_MAP) {
    svg = svg.replace(from, to);
  }

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
