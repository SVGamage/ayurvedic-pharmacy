import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const CONFIG = {
  // Path to CSV file
  csvFilePath: "./scripts/hp_products_normalized.csv",

  // Company ID to associate products with (REQUIRED)
  // Set to null to create a new company, or provide existing company ObjectId
  companyId: "68ec04ad9208284f2670e02c",

  // If companyId is null, create a company with this name
  companyName: "Link Natural ( ලින්ක් නැචුරල්)", // Change this to your company name

  // Category ID for subcategories that don't exist
  // You MUST provide this - get it from your database
  defaultCategoryId: "68e9804c8ad7a855e30aa473", // e.g., "6578a1b2c3d4e5f6a7b8c9d0"
};

// ============================================
// TYPES
// ============================================
interface CSVRow {
  code: string;
  name: string;
  unit: string;
  price: string;
  category: string;
  subCategory: string;
}

interface ProductVariant {
  variant: string;
  price: number;
}

interface GroupedProduct {
  code: string;
  name: string;
  category: string;
  subCategory: string;
  variants: ProductVariant[];
}

// ============================================
// CSV PARSER
// ============================================
function parseCSV(filePath: string): CSVRow[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim());
  const headers = lines[0].split(",").map((h) => h.trim());

  const rows: CSVRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    if (values.length === headers.length) {
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row as unknown as CSVRow);
    }
  }
  return rows;
}

// ============================================
// GROUP PRODUCTS BY CODE
// ============================================
function groupProductsByCode(rows: CSVRow[]): GroupedProduct[] {
  const grouped: Record<string, GroupedProduct> = {};

  for (const row of rows) {
    const code = row.code;

    if (!grouped[code]) {
      grouped[code] = {
        code: row.code,
        name: row.name,
        category: row.category,
        subCategory: row.subCategory,
        variants: [],
      };
    }

    grouped[code].variants.push({
      variant: row.unit,
      price: parseFloat(row.price),
    });
  }

  return Object.values(grouped);
}

// ============================================
// MAIN IMPORT FUNCTION
// ============================================
async function importProducts(): Promise<void> {
  console.log("🚀 Starting import process...\n");

  // Validate configuration
  if (!CONFIG.defaultCategoryId) {
    console.error("❌ ERROR: defaultCategoryId is required!");
    console.log("\nTo find your category IDs, run this query in MongoDB:");
    console.log("   db.category.find({}, { _id: 1, name: 1 })");
    console.log("\nOr use Prisma:");
    console.log("   const categories = await prisma.category.findMany();");
    process.exit(1);
  }

  try {
    // Step 1: Get or create company
    let companyId = CONFIG.companyId;

    if (!companyId) {
      console.log(`📦 Creating company: ${CONFIG.companyName}`);
      const company = await prisma.company.create({
        data: { name: CONFIG.companyName },
      });
      companyId = company.id;
      console.log(`   ✅ Company created with ID: ${companyId}\n`);
    } else {
      console.log(`📦 Using existing company ID: ${companyId}\n`);
    }

    // Step 2: Parse CSV
    console.log("📄 Parsing CSV file...");
    const rows = parseCSV(CONFIG.csvFilePath);
    console.log(`   Found ${rows.length} rows\n`);

    // Step 3: Group products by code
    console.log("🔄 Grouping products by code...");
    const products = groupProductsByCode(rows);
    console.log(`   Found ${products.length} unique products\n`);

    // Step 4: Get unique subcategories from CSV
    const uniqueSubCategories = [...new Set(rows.map((r) => r.subCategory))];
    console.log(
      `📁 Found ${uniqueSubCategories.length} subcategories in CSV:`,
      uniqueSubCategories.join(", "),
      "\n"
    );

    // Step 5: Ensure all subcategories exist
    console.log("📁 Ensuring subcategories exist...");
    const subCategoryMap: Record<string, string> = {};

    for (const subCatName of uniqueSubCategories) {
      // Check if subcategory exists
      let subCategory = await prisma.subCategory.findFirst({
        where: { name: subCatName },
      });

      if (!subCategory) {
        // Create subcategory
        console.log(`   Creating subcategory: ${subCatName}`);
        subCategory = await prisma.subCategory.create({
          data: {
            name: subCatName,
            categoryId: CONFIG.defaultCategoryId,
            isActive: true,
          },
        });
        console.log(`   ✅ Created: ${subCatName}`);
      } else {
        console.log(`   ℹ️  Already exists: ${subCatName}`);
      }

      subCategoryMap[subCatName] = subCategory.id;
    }
    console.log("");

    // Step 6: Import products with variants
    console.log("📦 Importing products and variants...\n");

    let productsCreated = 0;
    let variantsCreated = 0;
    let productsSkipped = 0;

    for (const product of products) {
      const subCategoryId = subCategoryMap[product.subCategory];

      // Check if product already exists
      const existingProduct = await prisma.companyProduct.findFirst({
        where: {
          code: product.code,
          companyId: companyId,
        },
      });

      if (existingProduct) {
        console.log(
          `   ⏭️  Skipping existing product: ${product.code} - ${product.name}`
        );
        productsSkipped++;
        continue;
      }

      // Create product with variants
      await prisma.companyProduct.create({
        data: {
          name: product.name,
          code: product.code,
          subCategoryId: subCategoryId,
          companyId: companyId,
          companyProductPrices: {
            create: product.variants.map((v) => ({
              variant: v.variant,
              price: v.price,
            })),
          },
        },
        include: {
          companyProductPrices: true,
        },
      });

      productsCreated++;
      variantsCreated += product.variants.length;

      console.log(
        `   ✅ ${product.code} - ${product.name} (${product.variants.length} variants)`
      );
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 IMPORT SUMMARY");
    console.log("=".repeat(50));
    console.log(`   Company ID:        ${companyId}`);
    console.log(`   Products created:  ${productsCreated}`);
    console.log(`   Products skipped:  ${productsSkipped}`);
    console.log(`   Variants created:  ${variantsCreated}`);
    console.log(`   Subcategories:     ${uniqueSubCategories.length}`);
    console.log("=".repeat(50));
    console.log("\n✅ Import completed successfully!");
  } catch (error) {
    console.error("\n❌ Import failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// ============================================
// RUN
// ============================================
importProducts();
