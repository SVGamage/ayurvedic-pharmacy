"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
}

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  hasNext,
  hasPrev,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [5, 10, 20, 50],
}: AdminPaginationProps) {
  // Add safety checks for undefined/null values
  const safeCurrentPage = currentPage || 1;
  const safeItemsPerPage = itemsPerPage || 10;
  const safeTotalItems = totalItems || 0;
  const safeTotalPages = totalPages || 1;

  // Calculate the range of items being displayed
  const startItem = (safeCurrentPage - 1) * safeItemsPerPage + 1;
  const endItem = Math.min(safeCurrentPage * safeItemsPerPage, safeTotalItems);

  // Don't show pagination if there's no data
  if (safeTotalItems === 0) {
    return null;
  }

  // For debugging and testing, let's always show some pagination info when there's data
  const showFullPagination = safeTotalPages > 1;
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (safeTotalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic
      if (safeCurrentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(safeTotalPages);
      } else if (safeCurrentPage >= safeTotalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push("ellipsis");
        for (let i = safeTotalPages - 3; i <= safeTotalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push("ellipsis");
        for (let i = safeCurrentPage - 1; i <= safeCurrentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(safeTotalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Debug Info - Remove this in production */}
      <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
        Debug: Page {safeCurrentPage}/{safeTotalPages}, Items: {safeTotalItems},
        Per Page: {safeItemsPerPage}, ShowFull: {showFullPagination.toString()}
      </div>

      {/* Pagination Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>
            Showing {startItem} to {endItem} of {safeTotalItems} entries
          </span>
        </div>

        {/* Items per page selector */}
        <div className="flex items-center gap-2">
          <span>Show</span>
          <Select
            value={safeItemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>
      </div>

      {/* Pagination Controls */}
      {showFullPagination && (
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => hasPrev && onPageChange(safeCurrentPage - 1)}
                className={
                  !hasPrev ? "pointer-events-none opacity-50" : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <PaginationItem key={`ellipsis-${index}-${safeCurrentPage}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              const pageNum = page as number;
              const isActive = pageNum === safeCurrentPage;

              return (
                <PaginationItem key={`page-${pageNum}`}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNum)}
                    isActive={isActive}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => hasNext && onPageChange(safeCurrentPage + 1)}
                className={
                  !hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
