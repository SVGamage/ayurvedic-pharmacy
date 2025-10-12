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
import { Plus, Search, Building2, Package, TrendingUp } from "lucide-react";
import { Company } from "@/types/company";
import { AdminCompanyCard } from "@/components/admin/admin-company-card";
import { CompanyForm } from "@/components/admin/company-form";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/app/_components/admin-header";

interface CompanyFormData {
  id?: string;
  name: string;
  companyProducts: Array<{
    id?: string;
    name: string;
    code: string;
    price: string;
    categoryId?: string;
  }>;
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | undefined>();
  const [deletingCompany, setDeletingCompany] = useState<Company | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  // Convert Company to CompanyFormData
  const companyToFormData = (company: Company): CompanyFormData => ({
    id: company.id,
    name: company.name,
    companyProducts: company.companyProducts,
  });

  const fetchCompanies = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/company");
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch companies",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast({
        title: "Error",
        description: "Failed to fetch companies",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Filter companies based on search query
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.companyProducts.some(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Calculate statistics
  const totalCompanies = companies.length;
  const totalProducts = companies.reduce(
    (sum, company) => sum + company.companyProducts.length,
    0
  );
  const averageProductsPerCompany =
    totalCompanies > 0 ? Math.round(totalProducts / totalCompanies) : 0;

  const handleCreateCompany = () => {
    setEditingCompany(undefined);
    setIsDialogOpen(true);
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setIsDialogOpen(true);
  };

  const handleDeleteCompany = (company: Company) => {
    setDeletingCompany(company);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true);
    try {
      const url = editingCompany
        ? `/api/admin/company/${editingCompany.id}`
        : "/api/admin/company";
      const method = editingCompany ? "PUT" : "POST";

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
          description: editingCompany
            ? "Company updated successfully"
            : "Company created successfully",
        });
        setIsDialogOpen(false);
        setEditingCompany(undefined);
        fetchCompanies();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to save company",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving company:", error);
      toast({
        title: "Error",
        description: "Failed to save company",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingCompany) return;

    try {
      const response = await fetch(`/api/admin/company/${deletingCompany.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Company deleted successfully",
        });
        setIsDeleteDialogOpen(false);
        setDeletingCompany(undefined);
        fetchCompanies();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to delete company",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast({
        title: "Error",
        description: "Failed to delete company",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCompany(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-blue-700 font-medium text-lg">
            Loading companies...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-indigo-400 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-20 left-32 w-28 h-28 border-2 border-purple-300 rounded-full animate-pulse animation-delay-400"></div>
        <div className="absolute bottom-40 right-40 w-20 h-20 border-2 border-blue-400 rounded-full animate-pulse animation-delay-300"></div>
      </div>

      <div className="relative z-10">
        <AdminHeader />

        <div className="container mx-auto py-8 px-6">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text mb-2">
                  Companies Management
                </h1>
                <p className="text-lg text-blue-700 font-medium">
                  Manage your business partners and their product portfolios
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mt-2 rounded-full"></div>
              </div>
              <Button
                onClick={handleCreateCompany}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span className="font-semibold">Add Company</span>
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="group bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold text-blue-800">
                    Total Companies
                  </CardTitle>
                  <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    {totalCompanies}
                  </div>
                  <p className="text-sm text-blue-600">
                    Business partners registered
                  </p>
                </CardContent>
              </Card>

              <Card className="group bg-gradient-to-br from-white to-indigo-50 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold text-indigo-800">
                    Total Products
                  </CardTitle>
                  <div className="p-2 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                    <Package className="h-6 w-6 text-indigo-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-700 mb-2">
                    {totalProducts}
                  </div>
                  <p className="text-sm text-indigo-600">
                    Products across all companies
                  </p>
                </CardContent>
              </Card>

              <Card className="group bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold text-purple-800">
                    Average Products
                  </CardTitle>
                  <div className="p-2 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    {averageProductsPerCompany}
                  </div>
                  <p className="text-sm text-purple-600">
                    Products per company
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
              <Input
                placeholder="Search companies or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 border-blue-200 focus:border-blue-400 focus:ring-blue-400 bg-white/80 backdrop-blur-sm rounded-xl shadow-md"
              />
            </div>

            {/* Companies Grid */}
            {filteredCompanies.length === 0 ? (
              <Card className="text-center py-16 bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg rounded-xl">
                <CardContent>
                  <div className="p-4 bg-blue-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-blue-800">
                    {searchQuery ? "No companies found" : "No companies yet"}
                  </h3>
                  <p className="text-blue-600 mb-6 text-lg">
                    {searchQuery
                      ? "Try adjusting your search terms"
                      : "Start building your business network by adding your first company"}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={handleCreateCompany}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      <span className="font-semibold">
                        Add Your First Company
                      </span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company: Company) => (
                  <AdminCompanyCard
                    key={company.id}
                    company={company}
                    onEdit={handleEditCompany}
                    onDelete={handleDeleteCompany}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Create/Edit Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCompany ? "Edit Company" : "Create New Company"}
                </DialogTitle>
              </DialogHeader>
              <CompanyForm
                company={
                  editingCompany ? companyToFormData(editingCompany) : undefined
                }
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
                  company &quot;{deletingCompany?.name}&quot; and all its
                  associated products from your system.
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
