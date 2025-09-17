"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Clock, Star } from "lucide-react";

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

interface ServiceTableProps {
  services: ServiceData[];
  onEdit: (service: ServiceData) => void;
  onDelete: (serviceId: string) => Promise<void>;
  isLoading?: boolean;
}

export function ServiceTable({
  services,
  onEdit,
  onDelete,
  isLoading,
}: ServiceTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (serviceId: string) => {
    setDeletingId(serviceId);
    try {
      await onDelete(serviceId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Popular</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No services found. Create your first service to get started.
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{service.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {service.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {service.category && (
                    <Badge variant="outline">
                      {service.category.charAt(0).toUpperCase() +
                        service.category.slice(1)}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{service.price}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {service.features.length} feature
                      {service.features.length !== 1 ? "s" : ""}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {service.features.slice(0, 2).join(", ")}
                      {service.features.length > 2 && "..."}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {service.popular && (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(service)}
                      disabled={isLoading}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isLoading || deletingId === service.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Service</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &ldquo;
                            {service.title}&rdquo;? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              service.id && handleDelete(service.id)
                            }
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
