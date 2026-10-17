import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

interface RawFaqDoc {
  _id?: { $oid?: string } | string;
  id?: string;
  question?: string;
  answer?: string;
  isActive?: boolean;
  createdAt?: Date | string | { $date?: string };
  updatedAt?: Date | string | { $date?: string };
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
            orderBy: { createdAt: "desc" };
          }) => Promise<RawFaqDoc[]>;
        };
      }
    ).faq;

    if (delegate && typeof delegate.findMany === "function") {
      const faqs = await delegate.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(faqs);
    }

    const res = (await prisma.$runCommandRaw({
      find: "faq",
      sort: { createdAt: -1 },
    })) as {
      cursor?: { firstBatch?: RawFaqDoc[] };
    };

    const docs = res?.cursor?.firstBatch || [];
    return NextResponse.json(docs.map(normalizeFaq));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const payload = {
      question: body.question,
      answer: body.answer,
      isActive: body.isActive ?? true,
    };

    const delegate = (
      prisma as unknown as {
        faq?: {
          create: (args: { data: typeof payload }) => Promise<RawFaqDoc>;
        };
      }
    ).faq;

    if (delegate && typeof delegate.create === "function") {
      const faq = await delegate.create({
        data: payload,
      });
      return NextResponse.json(faq, { status: 201 });
    }

    const nowIso = new Date().toISOString();
    await prisma.$runCommandRaw({
      insert: "faq",
      documents: [
        {
          ...payload,
          createdAt: { $date: nowIso },
          updatedAt: { $date: nowIso },
        },
      ],
    });

    const res = (await prisma.$runCommandRaw({
      find: "faq",
      sort: { createdAt: -1 },
      limit: 1,
    })) as {
      cursor?: { firstBatch?: RawFaqDoc[] };
    };

    const created = res?.cursor?.firstBatch?.[0];
    return NextResponse.json(
      created ? normalizeFaq(created) : payload,
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 },
    );
  }
}
