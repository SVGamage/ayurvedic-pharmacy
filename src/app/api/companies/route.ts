import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

// Public brand index: only brands that have products, with counts instead of
// the full product lists (those load per brand from /api/companies/[id]).
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
    const limit = Math.min(
      48,
      Math.max(1, parseInt(searchParams.get("limit") || "12") || 12),
    );
    const search = (searchParams.get("search") || "").trim();

    const skip = (page - 1) * limit;

    const conditions: Prisma.CompanyWhereInput[] = [
      { companyProducts: { some: {} } },
    ];
    if (search) {
      conditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          {
            companyProducts: {
              some: { name: { contains: search, mode: "insensitive" } },
            },
          },
        ],
      });
    }
    const where: Prisma.CompanyWhereInput = { AND: conditions };

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
          _count: { select: { companyProducts: true } },
        },
        orderBy: { name: "asc" },
        skip,
        take: limit,
      }),
      prisma.company.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      companies: companies.map(({ _count, ...company }) => ({
        ...company,
        productCount: _count.companyProducts,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 },
    );
  }
}
