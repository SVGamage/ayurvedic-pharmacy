"use client";

import { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Edit, Trash2, Eye, EyeOff, Filter, Search } from "lucide-react";
import { SubCategory, Category } from "@/types/product";
import Image from "next/image";

interface SubCategoryWithCounts extends SubCategory {
  _count?: {
    products: number;
  };
}

interface SubCategoryTableProps {
  subcategories: SubCategoryWithCounts[];
  categories?: Category[];
  onEdit: (subcategory: SubCategory) => void;
  onDelete: (subcategoryId: string) => Promise<void>;
  isLoading?: boolean;
}

export function SubCategoryTable({
  subcategories,
  categories = [],
  onEdit,
  onDelete,
  isLoading,
}: SubCategoryTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter subcategories based on selected category and search query
  const filteredSubcategories = useMemo(() => {
    let filtered = subcategories;

    // Filter by category
    if (selectedCategoryId !== "all") {
      filtered = filtered.filter(
        (subcategory) => subcategory.categoryId === selectedCategoryId
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((subcategory) =>
        subcategory.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim())
      );
    }

    return filtered;
  }, [subcategories, selectedCategoryId, searchQuery]);

  const handleDelete = async (subcategoryId: string) => {
    setDeletingId(subcategoryId);
    try {
      await onDelete(subcategoryId);
    } finally {
      setDeletingId(null);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategoryId("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategoryId !== "all" || searchQuery.trim() !== "";

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Search:</span>
          </div>
          <div className="relative flex-1 max-w-xs">
            <Input
              placeholder="Search subcategories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Category:</span>
          </div>
          <Select
            value={selectedCategoryId}
            onValueChange={setSelectedCategoryId}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Table */}
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
            {filteredSubcategories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  {!hasActiveFilters
                    ? "No subcategories found. Create your first subcategory to get started."
                    : "No subcategories found matching your filters."}
                </TableCell>
              </TableRow>
            ) : (
              filteredSubcategories.map((subcategory) => (
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
                      <Badge variant="outline">
                        {subcategory.category.name}
                      </Badge>
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
                        subcategory.isActive
                          ? "bg-green-100 text-green-800"
                          : ""
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
                            disabled={
                              isLoading || deletingId === subcategory.id
                            }
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
    </div>
  );
}
