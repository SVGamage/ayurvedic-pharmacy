import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        title: body.title,
        duration: body.duration,
        price: body.price,
        description: body.description,
        features: body.features,
        popular: body.popular,
        category: body.category,
        image: body.image,
        buttonText: body.buttonText,
        iconName: body.iconName,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
