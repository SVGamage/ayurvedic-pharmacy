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

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
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

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProducts();
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  // Service handlers
  const handleCreateService = () => {
    setEditingService(null);
    setIsServiceDialogOpen(true);
  };

  const handleEditService = (service: ServiceData) => {
    setEditingService(service);
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

  const handleDeleteService = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchServices();
        toast({
          title: "Success",
          description: "Service deleted successfully",
        });
      } else {
        throw new Error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
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
    <div className="min-h-screen bg-gray-50 p-4">
      <AdminHeader />

      <main className="max-w-7xl mx-auto">
        {/* Quick Navigation */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/products">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Package className="h-4 w-4" />
                View All Products
              </Button>
            </Link>
            <Link href="/admin/services">
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <Settings className="h-4 w-4" />
                View All Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground mb-3">
                {products.filter((p) => p.badge).length} featured products
              </p>
              <div className="flex gap-2">
                <Link href="/admin/products">
                  <Button size="sm" variant="outline" className="flex-1">
                    Manage Products
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={handleCreateProduct}
                  className="flex-1"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Product
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Services
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services.length}</div>
              <p className="text-xs text-muted-foreground mb-3">
                {services.filter((s) => s.popular).length} popular services
              </p>
              <div className="flex gap-2">
                <Link href="/admin/services">
                  <Button size="sm" variant="outline" className="flex-1">
                    Manage Services
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={handleCreateService}
                  className="flex-1"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Service
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.length > 0
                  ? (
                      products.reduce((sum, p) => sum + p.rating, 0) /
                      products.length
                    ).toFixed(1)
                  : "0.0"}
              </div>
              <p className="text-xs text-muted-foreground">
                From {products.reduce((sum, p) => sum + p.reviews, 0)} reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Categories
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">
                Product categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subcategories
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subcategories.length}</div>
              <p className="text-xs text-muted-foreground">
                Product subcategories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Categories</h2>
                <p className="text-muted-foreground">
                  Manage product categories
                </p>
              </div>
              <Button onClick={handleCreateCategory}>
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
                <h2 className="text-2xl font-bold">Subcategories</h2>
                <p className="text-muted-foreground">
                  Manage product subcategories
                </p>
              </div>
              <Button onClick={handleCreateSubCategory}>
                <Tags className="h-4 w-4 mr-2" />
                Add Subcategory
              </Button>
            </div>

            <SubCategoryTable
              subcategories={subcategories}
              onEdit={handleEditSubCategory}
              onDelete={handleDeleteSubCategory}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
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
