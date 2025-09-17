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
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { SubCategory } from "@/types/product";
import Image from "next/image";

interface SubCategoryWithCounts extends SubCategory {
  _count?: {
    products: number;
  };
}

interface SubCategoryTableProps {
  subcategories: SubCategoryWithCounts[];
  onEdit: (subcategory: SubCategory) => void;
  onDelete: (subcategoryId: string) => Promise<void>;
  isLoading?: boolean;
}

export function SubCategoryTable({
  subcategories,
  onEdit,
  onDelete,
  isLoading,
}: SubCategoryTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (subcategoryId: string) => {
    setDeletingId(subcategoryId);
    try {
      await onDelete(subcategoryId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Parent Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcategories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No subcategories found. Create your first subcategory to get
                started.
              </TableCell>
            </TableRow>
          ) : (
            subcategories.map((subcategory) => (
              <TableRow key={subcategory.id}>
                <TableCell>
                  <div className="w-12 h-12 relative rounded-md overflow-hidden bg-gray-100">
                    {subcategory.image ? (
                      <Image
                        src={subcategory.image}
                        alt={subcategory.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {subcategory.name}
                </TableCell>
                <TableCell>
                  {subcategory.category ? (
                    <Badge variant="outline">{subcategory.category.name}</Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      No category
                    </span>
                  )}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate text-sm text-muted-foreground">
                    {subcategory.description || "No description"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={subcategory.isActive ? "default" : "secondary"}
                    className={
                      subcategory.isActive ? "bg-green-100 text-green-800" : ""
                    }
                  >
                    {subcategory.isActive ? (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {subcategory._count?.products || 0} products
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(subcategory)}
                      disabled={isLoading}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isLoading || deletingId === subcategory.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Subcategory
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &ldquo;
                            {subcategory.name}&rdquo;? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(subcategory.id)}
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
