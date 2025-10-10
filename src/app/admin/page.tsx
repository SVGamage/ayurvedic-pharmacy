"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AdminHeader from "../_components/admin-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Package,
  Settings,
  BarChart3,
  FolderTree,
  Tags,
} from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { ServiceForm } from "@/components/admin/service-form";
import { CategoryForm } from "@/components/admin/category-form";
import { SubCategoryForm } from "@/components/admin/subcategory-form";
import { CategoryTable } from "@/components/admin/category-table";
import { SubCategoryTable } from "@/components/admin/subcategory-table";
import { Product, Category, SubCategory } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

interface ServiceData {
  id?: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  category?: string;
  image?: string;
  buttonText?: string;
  iconName: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubCategoryDialogOpen, setIsSubCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingService, setEditingService] = useState<ServiceData | null>(
    null
  );
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { toast } = useToast();

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      // For dashboard overview, get a larger limit to show all products
      const response = await fetch("/api/admin/products?limit=1000");
      if (response.ok) {
        const data = await response.json();
        // Handle the new paginated response format
        setProducts(data.products || data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch services
  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      // For dashboard overview, get a larger limit to show all services
      const response = await fetch("/api/admin/services?limit=1000");
      if (response.ok) {
        const data = await response.json();
        // Handle the new paginated response format
        setServices(data.services || data);
      } else {
        throw new Error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch subcategories
  const fetchSubcategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/subcategories");
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data);
      } else {
        throw new Error("Failed to fetch subcategories");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch subcategories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchServices(),
        fetchCategories(),
        fetchSubcategories(),
      ]);
    };
    loadData();
  }, [fetchProducts, fetchServices, fetchCategories, fetchSubcategories]);

  // Product handlers
  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsProductDialogOpen(true);
  };
  const handleProductSubmit = async (data: Partial<Product>) => {
    try {
      setIsFormLoading(true);
      let response;

      if (editingProduct) {
        // Update existing product
        response = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        // Create new product
        response = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        await fetchProducts();
        setIsProductDialogOpen(false);
        setEditingProduct(null);
        toast({
          title: "Success",
          description: `Product ${editingProduct ? "updated" : "created"} successfully`,
        });
      } else {
        throw new Error(
          `Failed to ${editingProduct ? "update" : "create"} product`
        );
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: `Failed to ${editingProduct ? "update" : "create"} product`,
        variant: "destructive",
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  // Service handlers
  const handleCreateService = () => {
    setEditingService(null);
    setIsServiceDialogOpen(true);
  };

  const handleServiceSubmit = async (data: ServiceData) => {
    try {
      setIsFormLoading(true);
      let response;

      if (editingService) {
        // Update existing service
        response = await fetch(`/api/admin/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        // Create new service
        response = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        await fetchServices();
        setIsServiceDialogOpen(false);
        setEditingService(null);
        toast({
          title: "Success",
          description: `Service ${editingService ? "updated" : "created"} successfully`,
        });
      } else {
        throw new Error(
          `Failed to ${editingService ? "update" : "create"} service`
        );
      }
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Error",
        description: `Failed to ${editingService ? "update" : "create"} service`,
        variant: "destructive",
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  // Category handlers
  const handleCreateCategory = () => {
    setEditingCategory(null);
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleCategorySubmit = async (data: Partial<Category>) => {
    try {
      setIsFormLoading(true);
      let response;

      if (editingCategory) {
        // Update existing category
        response = await fetch(`/api/admin/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        // Create new category
        response = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        await fetchCategories();
        setIsCategoryDialogOpen(false);
        setEditingCategory(null);
        toast({
          title: "Success",
          description: `Category ${editingCategory ? "updated" : "created"} successfully`,
        });
      } else {
        throw new Error(
          `Failed to ${editingCategory ? "update" : "create"} category`
        );
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: `Failed to ${editingCategory ? "update" : "create"} category`,
        variant: "destructive",
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCategories();
        toast({
          title: "Success",
          description: "Category deleted successfully",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  // SubCategory handlers
  const handleCreateSubCategory = () => {
    setEditingSubCategory(null);
    setIsSubCategoryDialogOpen(true);
  };

  const handleEditSubCategory = (subcategory: SubCategory) => {
    setEditingSubCategory(subcategory);
    setIsSubCategoryDialogOpen(true);
  };

  const handleSubCategorySubmit = async (data: Partial<SubCategory>) => {
    try {
      setIsFormLoading(true);
      let response;

      if (editingSubCategory) {
        // Update existing subcategory
        response = await fetch(
          `/api/admin/subcategories/${editingSubCategory.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
      } else {
        // Create new subcategory
        response = await fetch("/api/admin/subcategories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        await fetchSubcategories();
        setIsSubCategoryDialogOpen(false);
        setEditingSubCategory(null);
        toast({
          title: "Success",
          description: `Subcategory ${editingSubCategory ? "updated" : "created"} successfully`,
        });
      } else {
        throw new Error(
          `Failed to ${editingSubCategory ? "update" : "create"} subcategory`
        );
      }
    } catch (error) {
      console.error("Error saving subcategory:", error);
      toast({
        title: "Error",
        description: `Failed to ${editingSubCategory ? "update" : "create"} subcategory`,
        variant: "destructive",
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteSubCategory = async (subcategoryId: string) => {
    try {
      const response = await fetch(
        `/api/admin/subcategories/${subcategoryId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await fetchSubcategories();
        toast({
          title: "Success",
          description: "Subcategory deleted successfully",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete subcategory");
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete subcategory",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 relative overflow-hidden">
      {/* Ayurvedic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-emerald-300 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-20 left-32 w-28 h-28 border-2 border-orange-300 rounded-full animate-pulse animation-delay-400"></div>
        <div className="absolute bottom-40 right-40 w-20 h-20 border-2 border-emerald-400 rounded-full animate-pulse animation-delay-300"></div>
      </div>

      <AdminHeader />

      <main className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-yellow-600 bg-clip-text mb-2">
            Ayurvedic Admin Dashboard
          </h1>
          <p className="text-lg text-emerald-700 font-medium">
            Manage your holistic wellness center with ancient wisdom and modern
            efficiency
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/products">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3">
                <Package className="h-5 w-5" />
                <span className="font-semibold">View All Products</span>
              </Button>
            </Link>
            <Link href="/admin/services">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3">
                <Settings className="h-5 w-5" />
                <span className="font-semibold">View All Services</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Card className="group bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-emerald-800">
                Total Products
              </CardTitle>
              <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-700 mb-2">
                {products.length}
              </div>
              <p className="text-sm text-emerald-600 mb-4">
                {products.filter((p) => p.badge).length} featured products
              </p>
              <div className="flex gap-2">
                <Link href="/admin/products" className="flex-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    Manage Products
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={handleCreateProduct}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Product
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-white to-yellow-50 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-yellow-800">
                Total Services
              </CardTitle>
              <div className="p-2 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors">
                <Settings className="h-6 w-6 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-700 mb-2">
                {services.length}
              </div>
              <p className="text-sm text-yellow-600 mb-4">
                {services.filter((s) => s.popular).length} popular services
              </p>
              <div className="flex gap-2">
                <Link href="/admin/services" className="flex-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                  >
                    Manage Services
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={handleCreateService}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Service
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-orange-800">
                Average Rating
              </CardTitle>
              <div className="p-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700 mb-2">
                {products.length > 0
                  ? (
                      products.reduce((sum, p) => sum + p.rating, 0) /
                      products.length
                    ).toFixed(1)
                  : "0.0"}
              </div>
              <p className="text-sm text-orange-600">
                From {products.reduce((sum, p) => sum + p.reviews, 0)} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Extended Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-emerald-800">
                Categories
              </CardTitle>
              <div className="p-2 bg-emerald-100 rounded-full">
                <FolderTree className="h-5 w-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700 mb-1">
                {categories.length}
              </div>
              <p className="text-sm text-emerald-600">Product categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-yellow-50 border-yellow-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-yellow-800">
                Subcategories
              </CardTitle>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Tags className="h-5 w-5 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700 mb-1">
                {subcategories.length}
              </div>
              <p className="text-sm text-yellow-600">Product subcategories</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
          <Tabs defaultValue="categories" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-emerald-50 border border-emerald-200 rounded-xl p-1">
              <TabsTrigger
                value="categories"
                className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-md rounded-lg font-semibold"
              >
                <FolderTree className="h-4 w-4 mr-2" />
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="subcategories"
                className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-md rounded-lg font-semibold"
              >
                <Tags className="h-4 w-4 mr-2" />
                Subcategories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-emerald-800">
                    Categories
                  </h2>
                  <p className="text-emerald-600 text-lg">
                    Organize your Ayurvedic products into meaningful categories
                  </p>
                </div>
                <Button
                  onClick={handleCreateCategory}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <FolderTree className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>

              <CategoryTable
                categories={categories}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="subcategories" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-yellow-800">
                    Subcategories
                  </h2>
                  <p className="text-yellow-600 text-lg">
                    Create detailed subcategories for precise product
                    organization
                  </p>
                </div>
                <Button
                  onClick={handleCreateSubCategory}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Tags className="h-4 w-4 mr-2" />
                  Add Subcategory
                </Button>
              </div>

              <SubCategoryTable
                subcategories={subcategories}
                categories={categories}
                onEdit={handleEditSubCategory}
                onDelete={handleDeleteSubCategory}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Create New Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct || undefined}
            onSubmit={handleProductSubmit}
            onCancel={() => setIsProductDialogOpen(false)}
            isLoading={isFormLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Create New Service"}
            </DialogTitle>
          </DialogHeader>
          <ServiceForm
            service={editingService || undefined}
            onSubmit={handleServiceSubmit}
            onCancel={() => setIsServiceDialogOpen(false)}
            isLoading={isFormLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Create New Category"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            category={editingCategory || undefined}
            onSubmit={handleCategorySubmit}
            onCancel={() => setIsCategoryDialogOpen(false)}
            isLoading={isFormLoading}
          />
        </DialogContent>
      </Dialog>

      {/* SubCategory Dialog */}
      <Dialog
        open={isSubCategoryDialogOpen}
        onOpenChange={setIsSubCategoryDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSubCategory
                ? "Edit Subcategory"
                : "Create New Subcategory"}
            </DialogTitle>
          </DialogHeader>
          <SubCategoryForm
            subcategory={editingSubCategory || undefined}
            onSubmit={handleSubCategorySubmit}
            onCancel={() => setIsSubCategoryDialogOpen(false)}
            isLoading={isFormLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
