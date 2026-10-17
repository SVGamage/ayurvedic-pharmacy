import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleFaqs = [
  {
    question: "Do I need an appointment for a consultation?",
    answer:
      "Walk-ins are welcome, but we recommend booking an appointment via WhatsApp or phone (+94 76 057 5304) to minimize waiting time and ensure our physician is available.",
    isActive: true,
  },
  {
    question: "Are your products 100% natural?",
    answer:
      "Yes! All our Ayurvedic medicines and wellness products are made from authentic, natural herbal ingredients following traditional Sri Lankan Ayurvedic formulations.",
    isActive: true,
  },
  {
    question: "Do you offer island-wide delivery?",
    answer:
      "Yes, we deliver across Sri Lanka. Simply contact us via WhatsApp with your prescription or product list, and our team will arrange delivery to your doorstep.",
    isActive: true,
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are open everyday from 8:00 AM to 7:00 PM. Please note that we are closed on Poya Days (Public Holidays).",
    isActive: true,
  },
  {
    question: "Can I get personalized herbal treatments for chronic conditions?",
    answer:
      "Absolutely. Our qualified Ayurvedic physician provides personalized consultations and custom treatment plans tailored to your body constitution (Dosha) and specific health needs.",
    isActive: true,
  },
];

async function main() {
  console.log("Seeding sample FAQs...");

  const now = new Date().toISOString();

  // Check existing FAQs via raw command so it works even before prisma generate
  const existingResult = (await prisma.$runCommandRaw({
    find: "faq",
    filter: {},
  })) as {
    cursor?: {
      firstBatch?: Array<{ question?: string }>;
    };
  };

  const existingQuestions = new Set(
    (existingResult?.cursor?.firstBatch || []).map((f) =>
      f.question?.trim().toLowerCase()
    )
  );

  const docsToInsert = sampleFaqs
    .filter((faq) => !existingQuestions.has(faq.question.trim().toLowerCase()))
    .map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
      createdAt: { $date: now },
      updatedAt: { $date: now },
    }));

  if (docsToInsert.length === 0) {
    console.log("All sample FAQs already exist in the database.");
    return;
  }

  await prisma.$runCommandRaw({
    insert: "faq",
    documents: docsToInsert,
  });

  console.log(`Successfully inserted ${docsToInsert.length} sample FAQs!`);
}

main()
  .catch((e) => {
    console.error("Error seeding FAQs:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
