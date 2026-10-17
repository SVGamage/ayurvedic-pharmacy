"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ContactPageInfoData } from "@/types/contact-info";
import { Users, Stethoscope, Save, Loader2 } from "lucide-react";

interface ContactInfoFormProps {
  initialData?: ContactPageInfoData | null;
  onSubmit: (data: ContactPageInfoData) => Promise<void>;
  isLoading?: boolean;
}

const normalizeText = (value?: string) => (value || "").trim();

const normalizeRichText = (value?: string) =>
  (value || "").replace(/^<p>\s*<\/p>$/i, "").trim();

export function ContactInfoForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ContactInfoFormProps) {
  const [formData, setFormData] = useState<ContactPageInfoData>({
    teamTitle: initialData?.teamTitle || "",
    teamImage: initialData?.teamImage || "",
    teamDescription: initialData?.teamDescription || "",
    doctorName: initialData?.doctorName || "",
    doctorSpecialty: initialData?.doctorSpecialty || "",
    doctorImage: initialData?.doctorImage || "",
    doctorDescription: initialData?.doctorDescription || "",
  });

  const [baselineData, setBaselineData] = useState<ContactPageInfoData>({
    teamTitle: initialData?.teamTitle || "",
    teamImage: initialData?.teamImage || "",
    teamDescription: initialData?.teamDescription || "",
    doctorName: initialData?.doctorName || "",
    doctorSpecialty: initialData?.doctorSpecialty || "",
    doctorImage: initialData?.doctorImage || "",
    doctorDescription: initialData?.doctorDescription || "",
  });

  useEffect(() => {
    if (initialData) {
      const synced: ContactPageInfoData = {
        teamTitle: initialData.teamTitle || "",
        teamImage: initialData.teamImage || "",
        teamDescription: initialData.teamDescription || "",
        doctorName: initialData.doctorName || "",
        doctorSpecialty: initialData.doctorSpecialty || "",
        doctorImage: initialData.doctorImage || "",
        doctorDescription: initialData.doctorDescription || "",
      };
      setFormData(synced);
      setBaselineData(synced);
    }
  }, [initialData]);

  const hasChanges = useMemo(() => {
    return (
      normalizeText(formData.teamTitle) !==
        normalizeText(baselineData.teamTitle) ||
      normalizeText(formData.teamImage) !==
        normalizeText(baselineData.teamImage) ||
      normalizeRichText(formData.teamDescription) !==
        normalizeRichText(baselineData.teamDescription) ||
      normalizeText(formData.doctorName) !==
        normalizeText(baselineData.doctorName) ||
      normalizeText(formData.doctorSpecialty) !==
        normalizeText(baselineData.doctorSpecialty) ||
      normalizeText(formData.doctorImage) !==
        normalizeText(baselineData.doctorImage) ||
      normalizeRichText(formData.doctorDescription) !==
        normalizeRichText(baselineData.doctorDescription)
    );
  }, [formData, baselineData]);

  const handleChange = (field: keyof ContactPageInfoData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges || isLoading) return;
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Our Team Section */}
        <Card className="border-2 border-emerald-200 shadow-md bg-gradient-to-br from-white to-emerald-50/40 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 text-white">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <span>Team Showcase</span>
                <p className="text-xs font-normal text-emerald-100 mt-0.5">
                  Displayed on the Contact Us page
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="teamTitle" className="text-emerald-800 font-bold">
                Team Heading (Optional)
              </Label>
              <Input
                id="teamTitle"
                value={formData.teamTitle || ""}
                onChange={(e) => handleChange("teamTitle", e.target.value)}
                placeholder="e.g., Our Dedicated Wellness Team"
                className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-emerald-800 font-bold">Team Image</Label>
              <div className="border-2 border-dashed border-emerald-200 rounded-xl p-3 sm:p-4 bg-white">
                <ImageUpload
                  value={formData.teamImage || ""}
                  onChange={(url) => handleChange("teamImage", url)}
                  onRemove={() => handleChange("teamImage", "")}
                  folder="team"
                  placeholder="Upload team photo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-emerald-800 font-bold">
                Team Description
              </Label>
              <RichTextEditor
                value={formData.teamDescription || ""}
                onChange={(val) => handleChange("teamDescription", val)}
                placeholder="Write about your pharmacy and wellness team..."
                theme="emerald"
                minHeightClassName="min-h-[160px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Doctor Section */}
        <Card className="border-2 border-emerald-200 shadow-md bg-gradient-to-br from-white to-teal-50/40 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 text-white">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <span>Doctor Profile</span>
                <p className="text-xs font-normal text-emerald-100 mt-0.5">
                  Displayed on the Contact Us page
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="doctorName"
                  className="text-emerald-800 font-bold"
                >
                  Doctor Name / Title (Optional)
                </Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName || ""}
                  onChange={(e) => handleChange("doctorName", e.target.value)}
                  placeholder="e.g., Dr. Rathnadeepa"
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="doctorSpecialty"
                  className="text-emerald-800 font-bold"
                >
                  Qualifications / Role (Optional)
                </Label>
                <Input
                  id="doctorSpecialty"
                  value={formData.doctorSpecialty || ""}
                  onChange={(e) =>
                    handleChange("doctorSpecialty", e.target.value)
                  }
                  placeholder="e.g., Chief Ayurvedic Physician"
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-emerald-800 font-bold">Doctor Image</Label>
              <div className="border-2 border-dashed border-emerald-200 rounded-xl p-3 sm:p-4 bg-white">
                <ImageUpload
                  value={formData.doctorImage || ""}
                  onChange={(url) => handleChange("doctorImage", url)}
                  onRemove={() => handleChange("doctorImage", "")}
                  folder="doctor"
                  placeholder="Upload doctor photo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-emerald-800 font-bold">
                Doctor Description
              </Label>
              <RichTextEditor
                value={formData.doctorDescription || ""}
                onChange={(val) => handleChange("doctorDescription", val)}
                placeholder="Write about the doctor's background, experience, and healing philosophy..."
                theme="emerald"
                minHeightClassName="min-h-[160px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!hasChanges || isLoading}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-6 rounded-xl shadow-lg transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Saving Changes...
            </>
          ) : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save Team & Doctor Info
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
