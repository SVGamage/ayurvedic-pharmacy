"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Faq } from "@/types/faq";
import { HelpCircle } from "lucide-react";

interface FaqFormProps {
  faq?: Faq;
  onSubmit: (data: Partial<Faq>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function FaqForm({ faq, onSubmit, onCancel, isLoading }: FaqFormProps) {
  const [formData, setFormData] = useState<Partial<Faq>>({
    question: faq?.question || "",
    answer: faq?.answer || "",
    isActive: faq?.isActive ?? true,
  });

  const hasChanges = useMemo(() => {
    const q = (formData.question || "").trim();
    const a = (formData.answer || "").trim();
    if (!q || !a) return false;

    if (!faq) return true;

    return (
      q !== (faq.question || "").trim() ||
      a !== (faq.answer || "").trim() ||
      (formData.isActive ?? true) !== (faq.isActive ?? true)
    );
  }, [formData, faq]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges || isLoading) return;
    await onSubmit(formData);
  };

  const handleInputChange = (field: keyof Faq, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="border-2 border-emerald-200 shadow-xl bg-gradient-to-br from-white to-emerald-50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 text-white sticky top-0 z-10">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            {faq ? "Edit FAQ" : "Add New FAQ"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="question" className="text-emerald-800 font-bold">
                Question *
              </Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
                placeholder="e.g., How do I book a consultation?"
                required
                className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="answer" className="text-emerald-800 font-bold">
                Answer *
              </Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) => handleInputChange("answer", e.target.value)}
                placeholder="Enter a clear and helpful answer..."
                rows={4}
                required
                className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 bg-white"
              />
            </div>

            <div className="flex items-center space-x-3 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  handleInputChange("isActive", checked as boolean)
                }
                className="border-emerald-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              />
              <Label htmlFor="isActive" className="text-emerald-800 font-bold">
                Show this FAQ on Contact Us page
              </Label>
            </div>

            <div className="flex gap-3 pt-6 border-t border-emerald-200">
              <Button
                type="submit"
                disabled={!hasChanges || isLoading}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:opacity-50 text-white font-bold py-3 shadow-lg transition-all duration-200"
              >
                {isLoading ? "Saving..." : faq ? "Update FAQ" : "Add FAQ"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold px-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
