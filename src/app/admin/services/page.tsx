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
import { Plus, Search, Briefcase } from "lucide-react";
import { Service } from "@/types/service";
import { AdminServiceCard } from "@/components/admin/admin-service-card";
import { ServiceForm } from "@/components/admin/service-form";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/app/_components/admin-header";

interface ServiceFormData {
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
}

interface PaginationData {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>();
  const [deletingService, setDeletingService] = useState<Service | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Reduced for easier pagination testing
  const [totalServices, setTotalServices] = useState(0);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    total: 0,
  });

  const { toast } = useToast();

  // Convert Service to ServiceFormData
  const serviceToFormData = (service: Service): ServiceFormData => ({
    id: service.id,
    title: service.title,
    duration: service.duration,
    price: service.price,
    description: service.description,
    features: service.features,
    popular: service.popular || false,
    category: service.category,
    image: service.image,
    buttonText: service.buttonText,
    iconName: "Star", // Default icon name since we can't extract from React component
  });

  // Convert ServiceFormData to Service data for API
  const formDataToService = (data: ServiceFormData): Partial<Service> => ({
    id: data.id,
    title: data.title,
    duration: data.duration,
    price: data.price,
    description: data.description,
    features: data.features,
    popular: data.popular,
    category: data.category as "ayurvedic" | "nakshatra" | undefined,
    image: data.image,
    buttonText: data.buttonText,
    // iconName will be handled by the backend
  });

  const fetchServices = useCallback(
    async (page = 1, limit = itemsPerPage, search = searchQuery) => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
        });

        const response = await fetch(`/api/admin/services?${params}`);
        if (response.ok) {
          const data = await response.json();
          setServices(data.services);
          setPaginationData({
            page: data.pagination.page,
            totalPages: data.pagination.totalPages,
            hasNext: data.pagination.hasNext,
            hasPrev: data.pagination.hasPrev,
            total: data.pagination.total,
          });
          setTotalServices(data.pagination.total);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch services",
            variant: "destructive",
          });
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
    },
    [itemsPerPage, searchQuery, toast]
  );

  useEffect(() => {
    fetchServices(1, itemsPerPage, searchQuery);
    setCurrentPage(1);
  }, [fetchServices, itemsPerPage, searchQuery]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchServices(page, itemsPerPage, searchQuery);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    fetchServices(1, newItemsPerPage, searchQuery);
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
    // The useEffect above will trigger fetchServices
  };

  const handleCreateService = () => {
    setEditingService(undefined);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = (service: Service) => {
    setDeletingService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      const serviceData = formDataToService(data);
      const url = editingService
        ? `/api/admin/services/${editingService.id}`
        : "/api/admin/services";
      const method = editingService ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...serviceData, iconName: data.iconName }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: editingService
            ? "Service updated successfully"
            : "Service created successfully",
        });
        setIsDialogOpen(false);
        setEditingService(undefined);
        fetchServices();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to save service",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingService) return;

    try {
      const response = await fetch(
        `/api/admin/services/${deletingService.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Service deleted successfully",
        });
        setIsDeleteDialogOpen(false);
        setDeletingService(undefined);
        fetchServices();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to delete service",
          variant: "destructive",
        });
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

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingService(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Briefcase className="h-10 w-10 text-yellow-600" />
            </div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-yellow-200 rounded-full animate-spin border-t-yellow-600 mx-auto"></div>
          </div>
          <h3 className="text-2xl font-bold text-yellow-800 mb-2">
            Loading Healing Services...
          </h3>
          <p className="text-yellow-600">Preparing your wellness offerings</p>
        </div>
      </div>
    );
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
                  Services Management
                </h1>
                <p className="text-lg text-emerald-700 font-medium">
                  Manage your holistic healing and wellness services
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-yellow-400 mt-2 rounded-full"></div>
              </div>
              <Button
                onClick={handleCreateService}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span className="font-semibold">Add Service</span>
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="group bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold text-emerald-800">
                    Total Services
                  </CardTitle>
                  <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                    <Briefcase className="h-6 w-6 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-700 mb-2">
                    {totalServices}
                  </div>
                  <p className="text-sm text-emerald-600">
                    Holistic services offered
                  </p>
                </CardContent>
              </Card>

              <Card className="group bg-gradient-to-br from-white to-yellow-50 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold text-yellow-800">
                    Ayurvedic Services
                  </CardTitle>
                  <div className="p-2 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors">
                    <Briefcase className="h-6 w-6 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-700 mb-2">
                    {services.filter((s) => s.category === "ayurvedic").length}
                  </div>
                  <p className="text-sm text-yellow-600">
                    Traditional healing treatments
                  </p>
                </CardContent>
              </Card>

              <Card className="group bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold text-orange-800">
                    Nakshatra Services
                  </CardTitle>
                  <div className="p-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                    <Briefcase className="h-6 w-6 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-700 mb-2">
                    {services.filter((s) => s.category === "nakshatra").length}
                  </div>
                  <p className="text-sm text-orange-600">
                    Astrological consultations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
              <Input
                placeholder="Search healing services..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 py-3 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 bg-white/80 backdrop-blur-sm rounded-xl shadow-md"
              />
            </div>

            {/* Services Grid */}
            {services.length === 0 ? (
              <Card className="text-center py-16 bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-lg rounded-xl">
                <CardContent>
                  <div className="p-4 bg-yellow-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <Briefcase className="h-12 w-12 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-emerald-800">
                    {searchQuery ? "No services found" : "No services yet"}
                  </h3>
                  <p className="text-emerald-600 mb-6 text-lg">
                    {searchQuery
                      ? "Try adjusting your search terms"
                      : "Begin your healing journey by adding your first service"}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={handleCreateService}
                      className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      <span className="font-semibold">
                        Add Your First Service
                      </span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service: Service) => (
                    <AdminServiceCard
                      key={service.id}
                      service={service}
                      onEdit={handleEditService}
                      onDelete={handleDeleteService}
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
                  {editingService ? "Edit Service" : "Create New Service"}
                </DialogTitle>
              </DialogHeader>
              <ServiceForm
                service={
                  editingService ? serviceToFormData(editingService) : undefined
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
                  service &quot;{deletingService?.title}&quot; from your
                  offerings.
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
