import { NextResponse } from "next/server";

/** Current-year contribution count (same metric as GitHub heatmap). */
export async function GET() {
  try {
    const res = await fetch(
      "https://github-contributions.vercel.app/api/v1/mrsamirr",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      return NextResponse.json({ thisYear: null, year: null });
    }
    const data = (await res.json()) as {
      years: { year: string; total: number }[];
    };
    const cy = String(new Date().getFullYear());
    const thisYear = data.years?.find((y) => y.year === cy)?.total ?? null;

    return NextResponse.json({ thisYear, year: cy });
  } catch {
    return NextResponse.json({ thisYear: null, year: null });
  }
}
