import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        subcategory: {
          include: {
            category: true,
          },
        },
        productPrices: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Delete existing product prices and create new ones
    await prisma.productPrice.deleteMany({
      where: { productId: id },
    });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        categoryId: body.categoryId || null,
        subcategoryId: body.subcategoryId || null,
        rating: body.rating || 0,
        reviews: body.reviews || 0,
        image: body.image,
        badge: body.badge || null,
        description: body.description || null,
        productPrices: {
          create: (body.productPrices || []).map(
            (price: { variant: string; price: number }) => ({
              variant: price.variant,
              price: price.price,
            }),
          ),
        },
      },
      include: {
        category: true,
        subcategory: {
          include: {
            category: true,
          },
        },
        productPrices: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
