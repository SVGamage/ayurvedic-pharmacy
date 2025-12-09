import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        companyProducts: {
          include: {
            companyProductPrices: true,
            subCategory: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, companyProducts } = body;

    interface PriceInput {
      variant: string;
      price: number;
    }

    interface ProductInput {
      name: string;
      code: string;
      prices: PriceInput[];
      subCategoryId?: string;
    }

    const company = await prisma.company.create({
      data: {
        name,
        companyProducts: {
          create:
            companyProducts?.map((product: ProductInput) => ({
              name: product.name,
              code: product.code,
              subCategoryId: product.subCategoryId || null,
              companyProductPrices: {
                create:
                  product.prices?.map((price: PriceInput) => ({
                    variant: price.variant,
                    price: price.price,
                  })) || [],
              },
            })) || [],
        },
      },
      include: {
        companyProducts: {
          include: {
            companyProductPrices: true,
            subCategory: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    );
  }
}
