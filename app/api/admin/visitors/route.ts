import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getVisitors } from "@/lib/database";
import { VisitorRecord } from "@/lib/types";

export async function GET(request: Request) {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Admin authentication required" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  const visitors = getVisitors();

  if (format === "csv") {
    const csv = visitorRecordsToCsv(visitors);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="farmtomoney_visitors_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({ success: true, count: visitors.length, data: visitors });
}

function escapeCsv(value: string): string {
  const str = String(value ?? "");
  return /["\n\r,]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function visitorRecordsToCsv(visitors: VisitorRecord[]): string {
  const headers: (keyof VisitorRecord)[] = ["id", "name", "phone", "email", "role", "visitDate", "createdAt", "device"];
  const rows = visitors.map((v) =>
    headers
      .map((h) => escapeCsv((v[h] as string | undefined) ?? ""))
      .join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}
