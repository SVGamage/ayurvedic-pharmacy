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
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-md">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-800">
                Search:
              </span>
            </div>
            <div className="relative flex-1 max-w-xs">
              <Input
                placeholder="Search Ayurvedic subcategories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-800">
                Filter by Category:
              </span>
            </div>
            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
            >
              <SelectTrigger className="w-[200px] border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400">
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
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border-2 border-emerald-200 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
              <TableHead className="w-20 font-bold text-yellow-800">
                Image
              </TableHead>
              <TableHead className="font-bold text-yellow-800">Name</TableHead>
              <TableHead className="font-bold text-yellow-800">
                Parent Category
              </TableHead>
              <TableHead className="font-bold text-yellow-800">
                Description
              </TableHead>
              <TableHead className="font-bold text-yellow-800">
                Status
              </TableHead>
              <TableHead className="font-bold text-yellow-800">
                Products
              </TableHead>
              <TableHead className="text-right font-bold text-yellow-800">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubcategories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-yellow-600"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🌸</span>
                    </div>
                    <p className="text-lg font-medium">
                      {!hasActiveFilters
                        ? "No subcategories found"
                        : "No subcategories found matching your filters"}
                    </p>
                    <p className="text-sm text-yellow-500">
                      {!hasActiveFilters
                        ? "Create your first Ayurvedic subcategory to get started"
                        : "Try adjusting your search or filter criteria"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredSubcategories.map((subcategory) => (
                <TableRow
                  key={subcategory.id}
                  className="hover:bg-yellow-50/50 transition-colors duration-200 border-b border-yellow-100"
                >
                  <TableCell>
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-yellow-100 border-2 border-yellow-200 shadow-sm">
                      {subcategory.image ? (
                        <Image
                          src={subcategory.image}
                          alt={subcategory.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg text-yellow-600">
                          🌺
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-yellow-800">
                    {subcategory.name}
                  </TableCell>
                  <TableCell>
                    {subcategory.category ? (
                      <Badge
                        variant="outline"
                        className="border-emerald-300 text-emerald-700 bg-emerald-50 font-semibold"
                      >
                        {subcategory.category.name}
                      </Badge>
                    ) : (
                      <span className="text-gray-500 text-sm">No category</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-sm text-yellow-600">
                      {subcategory.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={subcategory.isActive ? "default" : "secondary"}
                      className={
                        subcategory.isActive
                          ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0 font-semibold"
                          : "bg-gray-200 text-gray-600 border-0 font-semibold"
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
                    <div className="text-sm font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full text-center">
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
                        className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-400 font-semibold"
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
                            className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-semibold"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="border-2 border-red-200 bg-gradient-to-br from-white to-red-50">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-red-800 text-xl font-bold">
                              Delete Subcategory
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-red-600">
                              Are you sure you want to delete &ldquo;
                              {subcategory.name}&rdquo;? This action cannot be
                              undone and will affect all associated products.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(subcategory.id)}
                              className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-semibold"
                            >
                              Delete Subcategory
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
