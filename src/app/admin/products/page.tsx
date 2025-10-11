"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Package } from "lucide-react";
import { Product } from "@/types/product";
import { AdminProductCard } from "@/components/admin/admin-product-card";
import { ProductForm } from "@/components/admin/product-form";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/app/_components/admin-header";
import ProductLoading from "@/components/product-loading";

interface PaginationData {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deletingProduct, setDeletingProduct] = useState<Product | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Reduced for easier pagination testing
  const [totalProducts, setTotalProducts] = useState(0);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    total: 0,
  });

  const { toast } = useToast();

  const fetchProducts = useCallback(
    async (page = 1, limit = itemsPerPage, search = searchQuery) => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
        });

        const response = await fetch(`/api/admin/products?${params}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          setPaginationData({
            page: data.pagination.page,
            totalPages: data.pagination.totalPages,
            hasNext: data.pagination.hasNext,
            hasPrev: data.pagination.hasPrev,
            total: data.pagination.total,
          });
          setTotalProducts(data.pagination.total);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch products",
            variant: "destructive",
          });
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
    },
    [itemsPerPage, searchQuery, toast]
  );

  useEffect(() => {
    fetchProducts(1, itemsPerPage, searchQuery);
    setCurrentPage(1);
  }, [fetchProducts, itemsPerPage, searchQuery]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page, itemsPerPage, searchQuery);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    fetchProducts(1, newItemsPerPage, searchQuery);
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
    // The useEffect above will trigger fetchProducts
  };

  const handleCreateProduct = () => {
    setEditingProduct(undefined);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (data: Partial<Product>) => {
    setIsSubmitting(true);
    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: editingProduct
            ? "Product updated successfully"
            : "Product created successfully",
        });
        setIsDialogOpen(false);
        setEditingProduct(undefined);
        fetchProducts();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to save product",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;

    try {
      const response = await fetch(
        `/api/admin/products/${deletingProduct.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
        setIsDeleteDialogOpen(false);
        setDeletingProduct(undefined);
        fetchProducts();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to delete product",
          variant: "destructive",
        });
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

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingProduct(undefined);
  };

  if (isLoading) {
    return <ProductLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 relative overflow-hidden">
      {/* Ayurvedic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-emerald-300 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-20 left-32 w-28 h-28 border-2 border-orange-300 rounded-full animate-pulse animation-delay-400"></div>
        <div className="absolute bottom-40 right-40 w-20 h-20 border-2 border-emerald-400 rounded-full animate-pulse animation-delay-300"></div>
      </div>

      <div className="relative z-10">
        <AdminHeader />

        <div className="container mx-auto py-8 px-6">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-yellow-600 bg-clip-text mb-2">
                  Products Management
                </h1>
                <p className="text-lg text-emerald-700 font-medium">
                  Manage your Ayurvedic product catalog with natural wellness
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-yellow-400 mt-2 rounded-full"></div>
              </div>
              <Button
                onClick={handleCreateProduct}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span className="font-semibold">Add Product</span>
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    {totalProducts}
                  </div>
                  <p className="text-sm text-emerald-600">
                    Active products in catalog
                  </p>
                </CardContent>
              </Card>

              <Card className="group bg-gradient-to-br from-white to-yellow-50 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold text-yellow-800">
                    Average Price
                  </CardTitle>
                  <div className="p-2 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors">
                    <Package className="h-6 w-6 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-700 mb-2">
                    Rs.{" "}
                    {products.length > 0
                      ? Math.round(
                          products.reduce((sum, p) => sum + p.price, 0) /
                            products.length
                        )
                      : 0}
                  </div>
                  <p className="text-sm text-yellow-600">
                    Average product price
                  </p>
                </CardContent>
              </Card>

              <Card className="group bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold text-orange-800">
                    Average Rating
                  </CardTitle>
                  <div className="p-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                    <Package className="h-6 w-6 text-orange-600" />
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
                    From {products.reduce((sum, p) => sum + p.reviews, 0)}{" "}
                    reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
              <Input
                placeholder="Search Ayurvedic products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 py-3 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 bg-white/80 backdrop-blur-sm rounded-xl shadow-md"
              />
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <Card className="text-center py-16 bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-lg rounded-xl">
                <CardContent>
                  <div className="p-4 bg-emerald-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <Package className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-emerald-800">
                    {searchQuery ? "No products found" : "No products yet"}
                  </h3>
                  <p className="text-emerald-600 mb-6 text-lg">
                    {searchQuery
                      ? "Try adjusting your search terms"
                      : "Start your Ayurvedic journey by adding your first product"}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={handleCreateProduct}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      <span className="font-semibold">
                        Add Your First Product
                      </span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product: Product) => (
                    <AdminProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-md">
                  <AdminPagination
                    currentPage={paginationData.page}
                    totalPages={paginationData.totalPages}
                    totalItems={paginationData.total}
                    itemsPerPage={itemsPerPage}
                    hasNext={paginationData.hasNext}
                    hasPrev={paginationData.hasPrev}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </div>
              </>
            )}
          </div>

          {/* Create/Edit Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Create New Product"}
                </DialogTitle>
              </DialogHeader>
              <ProductForm
                product={editingProduct}
                onSubmit={handleSubmit}
                onCancel={handleDialogClose}
                isLoading={isSubmitting}
              />
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product &quot;{deletingProduct?.name}&quot; from your catalog.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
