import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subcategory = await prisma.subCategory.findUnique({
      where: { id },
      include: {
        category: true,
        _count: {
          select: { products: true },
        },
      },
    });

    if (!subcategory) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategory" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const subcategory = await prisma.subCategory.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
        categoryId: body.categoryId,
        isActive: body.isActive,
      },
      include: {
        category: true,
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return NextResponse.json(
      { error: "Failed to update subcategory" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Check if subcategory has products
    const subcategoryWithProducts = await prisma.subCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (
      subcategoryWithProducts &&
      subcategoryWithProducts._count.products > 0
    ) {
      return NextResponse.json(
        { error: "Cannot delete subcategory with existing products" },
        { status: 400 }
      );
    }

    await prisma.subCategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return NextResponse.json(
      { error: "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}
