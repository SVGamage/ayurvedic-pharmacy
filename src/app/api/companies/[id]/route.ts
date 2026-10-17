import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

// Public brand page data: the brand and every product it has, with prices.
// Contact details (phone, email, address) stay internal to the admin.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!/^[a-f0-9]{24}$/i.test(id)) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    const company = await prisma.company.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        companyProducts: {
          select: {
            id: true,
            name: true,
            code: true,
            subCategory: { select: { id: true, name: true } },
            companyProductPrices: { select: { variant: true, price: true } },
          },
          orderBy: { name: "asc" },
        },
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: company.id,
      name: company.name,
      image: company.image,
      description: company.description,
      products: company.companyProducts.map(
        ({ companyProductPrices, ...product }) => ({
          ...product,
          prices: companyProductPrices,
        }),
      ),
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand" },
      { status: 500 },
    );
  }
}
