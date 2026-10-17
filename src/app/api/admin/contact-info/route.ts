import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET() {
  try {
    const info = await prisma.contactPageInfo.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(info || {});
  } catch (error) {
    console.error("Error fetching contact page info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact page info" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const existing = await prisma.contactPageInfo.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    const payload = {
      teamTitle: body.teamTitle ?? null,
      teamImage: body.teamImage ?? null,
      teamDescription: body.teamDescription ?? null,
      doctorName: body.doctorName ?? null,
      doctorSpecialty: body.doctorSpecialty ?? null,
      doctorImage: body.doctorImage ?? null,
      doctorDescription: body.doctorDescription ?? null,
    };

    const updated = existing
      ? await prisma.contactPageInfo.update({
          where: { id: existing.id },
          data: payload,
        })
      : await prisma.contactPageInfo.create({
          data: payload,
        });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating contact page info:", error);
    return NextResponse.json(
      { error: "Failed to save contact page info" },
      { status: 500 },
    );
  }
}
