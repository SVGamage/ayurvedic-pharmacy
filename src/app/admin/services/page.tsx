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
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              Loading services...
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <AdminHeader />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Services Management</h1>
            <p className="text-muted-foreground">
              Manage your service offerings
            </p>
          </div>
          <Button
            onClick={handleCreateService}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Services
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalServices}</div>
              <p className="text-xs text-muted-foreground">
                Active services offered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ayurvedic Services
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {services.filter((s) => s.category === "ayurvedic").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Traditional Ayurvedic treatments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nakshatra Services
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {services.filter((s) => s.category === "nakshatra").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Astrological consultations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery ? "No services found" : "No services yet"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first service"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={handleCreateService}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Service
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
              service &quot;{deletingService?.title}&quot; from your offerings.
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
  );
}
