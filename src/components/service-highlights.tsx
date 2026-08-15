import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { Service } from "@/types/service";
import { formatServicePrice } from "@/config/currency";
import { prisma } from "../../prisma/client";

// Pull the services an admin has flagged as popular. Newest first so the
// most recently highlighted services lead the section.
//
// IMPORTANT: this is a Server Component. Do NOT resolve `iconName` to a
// Lucide icon component here — a resolved component/function cannot be
// serialized across the server/client boundary and will crash with
// "Functions cannot be passed directly to Client Components". Pass the raw
// `iconName` string; ServiceCard (a Client Component) resolves the icon
// itself.
async function getPopularServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      where: { popular: true },
      orderBy: { updatedAt: "desc" },
      take: 3,
    });

    return services.map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      duration: service.duration,
      price: formatServicePrice(
        typeof service.price === "string"
          ? parseFloat(service.price.replace(/[^\d.-]/g, "")) || 0
          : service.price,
      ),
      features: service.features,
      image: service.image ?? undefined,
      iconName: service.iconName,
      category:
        service.category === "ayurvedic" || service.category === "nakshatra"
          ? service.category
          : undefined,
      popular: service.popular,
      buttonText: service.buttonText ?? undefined,
    }));
  } catch (error) {
    console.error("Error fetching popular services:", error);
    return [];
  }
}

export async function ServiceHighlights() {
  const services = await getPopularServices();

  // Hide the section entirely when nothing has been marked as popular.
  if (services.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Our <span className="text-emerald-700 italic">Services</span>
            </h2>
            <p className="text-lg text-stone-600">
              Experience holistic healing through our comprehensive Ayurvedic
              and traditional services designed for your wellness journey.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            asChild
          >
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              showRating={true}
              rating={5}
              className="bg-white"
            />
          ))}
        </div>

        <div className="text-center md:hidden">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            asChild
          >
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
