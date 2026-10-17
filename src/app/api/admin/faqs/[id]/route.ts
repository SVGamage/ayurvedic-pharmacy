import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const payload = {
      question: body.question,
      answer: body.answer,
      isActive: body.isActive ?? true,
    };

    const delegate = (
      prisma as unknown as {
        faq?: {
          update: (args: {
            where: { id: string };
            data: typeof payload;
          }) => Promise<unknown>;
        };
      }
    ).faq;

    if (delegate && typeof delegate.update === "function") {
      const faq = await delegate.update({
        where: { id },
        data: payload,
      });
      return NextResponse.json(faq);
    }

    const nowIso = new Date().toISOString();
    await prisma.$runCommandRaw({
      update: "faq",
      updates: [
        {
          q: { _id: { $oid: id } },
          u: {
            $set: {
              ...payload,
              updatedAt: { $date: nowIso },
            },
          },
        },
      ],
    });

    return NextResponse.json({ id, ...payload });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const delegate = (
      prisma as unknown as {
        faq?: {
          delete: (args: { where: { id: string } }) => Promise<unknown>;
        };
      }
    ).faq;

    if (delegate && typeof delegate.delete === "function") {
      await delegate.delete({
        where: { id },
      });
      return NextResponse.json({ message: "FAQ deleted successfully" });
    }

    await prisma.$runCommandRaw({
      delete: "faq",
      deletes: [
        {
          q: { _id: { $oid: id } },
          limit: 1,
        },
      ],
    });

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 },
    );
  }
}
