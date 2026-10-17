import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

interface RawFaqDoc {
  _id?: { $oid?: string } | string;
  id?: string;
  question?: string;
  answer?: string;
  isActive?: boolean;
}

function normalizeFaq(doc: RawFaqDoc) {
  const id =
    doc.id ||
    (typeof doc._id === "string"
      ? doc._id
      : doc._id && typeof doc._id === "object"
        ? doc._id.$oid || ""
        : "");
  return {
    id,
    question: doc.question || "",
    answer: doc.answer || "",
    isActive: doc.isActive ?? true,
  };
}

export async function GET() {
  try {
    const delegate = (
      prisma as unknown as {
        faq?: {
          findMany: (args: {
            where: { isActive: boolean };
            orderBy: { createdAt: "asc" };
          }) => Promise<RawFaqDoc[]>;
        };
      }
    ).faq;

    if (delegate && typeof delegate.findMany === "function") {
      const faqs = await delegate.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
      });
      return NextResponse.json(faqs);
    }

    const res = (await prisma.$runCommandRaw({
      find: "faq",
      filter: { isActive: true },
      sort: { createdAt: 1 },
    })) as {
      cursor?: { firstBatch?: RawFaqDoc[] };
    };

    const docs = res?.cursor?.firstBatch || [];
    return NextResponse.json(docs.map(normalizeFaq));
  } catch (error) {
    console.error("Error fetching public FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 },
    );
  }
}
