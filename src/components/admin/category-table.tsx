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
import { Category, SubCategory } from "@/types/product";
import Image from "next/image";

interface CategoryWithCounts extends Category {
  subcategories?: SubCategory[];
  _count?: {
    products: number;
  };
}

interface CategoryTableProps {
  categories: CategoryWithCounts[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => Promise<void>;
  isLoading?: boolean;
}

export function CategoryTable({
  categories,
  onEdit,
  onDelete,
  isLoading,
}: CategoryTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (categoryId: string) => {
    setDeletingId(categoryId);
    try {
      await onDelete(categoryId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="border-2 border-emerald-200 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-emerald-50 to-green-50 border-b-2 border-emerald-200">
            <TableHead className="w-20 font-bold text-emerald-800">
              Image
            </TableHead>
            <TableHead className="font-bold text-emerald-800">Name</TableHead>
            <TableHead className="font-bold text-emerald-800">
              Description
            </TableHead>
            <TableHead className="font-bold text-emerald-800">Status</TableHead>
            <TableHead className="font-bold text-emerald-800">
              Subcategories
            </TableHead>
            <TableHead className="font-bold text-emerald-800">
              Products
            </TableHead>
            <TableHead className="text-right font-bold text-emerald-800">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-12 text-emerald-600"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <p className="text-lg font-medium">No categories found</p>
                  <p className="text-sm text-emerald-500">
                    Create your first Ayurvedic category to get started
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow
                key={category.id}
                className="hover:bg-emerald-50/50 transition-colors duration-200 border-b border-emerald-100"
              >
                <TableCell>
                  <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-emerald-100 border-2 border-emerald-200 shadow-sm">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg text-emerald-600">
                        🌱
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-bold text-emerald-800">
                  {category.name}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate text-sm text-emerald-600">
                    {category.description || "No description"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={category.isActive ? "default" : "secondary"}
                    className={
                      category.isActive
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0 font-semibold"
                        : "bg-gray-200 text-gray-600 border-0 font-semibold"
                    }
                  >
                    {category.isActive ? (
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
                  <div className="text-sm font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full text-center">
                    {category.subcategories?.length || 0} subcategories
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-center">
                    {category._count?.products || 0} products
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(category)}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 font-semibold"
                      disabled={isLoading}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isLoading || deletingId === category.id}
                          className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-semibold"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="border-2 border-red-200 bg-gradient-to-br from-white to-red-50">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-800 text-xl font-bold">
                            Delete Category
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-red-600">
                            Are you sure you want to delete &ldquo;
                            {category.name}&rdquo;? This action cannot be undone
                            and will affect all associated products.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(category.id)}
                            className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-semibold"
                          >
                            Delete Category
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
