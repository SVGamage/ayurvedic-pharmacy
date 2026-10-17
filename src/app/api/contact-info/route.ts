import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET() {
  try {
    const info = await prisma.contactPageInfo.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(info || {});
  } catch (error) {
    console.error("Error fetching public contact page info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact page info" },
      { status: 500 },
    );
  }
}
