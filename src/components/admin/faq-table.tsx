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
import { Edit, Trash2, Eye, EyeOff, HelpCircle } from "lucide-react";
import { Faq } from "@/types/faq";

interface FaqTableProps {
  faqs: Faq[];
  onEdit: (faq: Faq) => void;
  onDelete: (faqId: string) => Promise<void>;
  isLoading?: boolean;
}

export function FaqTable({ faqs, onEdit, onDelete, isLoading }: FaqTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (faqId: string) => {
    setDeletingId(faqId);
    try {
      await onDelete(faqId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="border-2 border-emerald-200 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-emerald-50 to-green-50 border-b-2 border-emerald-200">
            <TableHead className="font-bold text-emerald-800">
              Question
            </TableHead>
            <TableHead className="font-bold text-emerald-800">Answer</TableHead>
            <TableHead className="font-bold text-emerald-800 w-28">
              Status
            </TableHead>
            <TableHead className="text-right font-bold text-emerald-800 w-32">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-12 text-emerald-600"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <HelpCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <p className="text-lg font-medium">No FAQs found</p>
                  <p className="text-sm text-emerald-500">
                    Add your first Frequently Asked Question to get started
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            faqs.map((faq) => (
              <TableRow
                key={faq.id}
                className="hover:bg-emerald-50/50 transition-colors duration-200 border-b border-emerald-100"
              >
                <TableCell className="font-bold text-emerald-800 max-w-xs sm:max-w-sm whitespace-normal">
                  {faq.question}
                </TableCell>
                <TableCell className="max-w-xs sm:max-w-md whitespace-normal">
                  <p className="line-clamp-2 text-sm text-emerald-700">
                    {faq.answer}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={faq.isActive ? "default" : "secondary"}
                    className={
                      faq.isActive
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0 font-semibold"
                        : "bg-gray-200 text-gray-600 border-0 font-semibold"
                    }
                  >
                    {faq.isActive ? (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" />
                        Hidden
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(faq)}
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
                          disabled={isLoading || deletingId === faq.id}
                          className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-semibold"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="border-2 border-red-200 bg-gradient-to-br from-white to-red-50">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-800 text-xl font-bold">
                            Delete FAQ
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-red-600">
                            Are you sure you want to delete &ldquo;
                            {faq.question}&rdquo;? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(faq.id)}
                            className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-semibold"
                          >
                            Delete FAQ
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
