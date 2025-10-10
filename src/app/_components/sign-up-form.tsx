"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-2 border-yellow-200 shadow-xl bg-gradient-to-br from-white to-yellow-50 rounded-xl overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-500 text-white">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🌟</span>
          </div>
          Join Our Community
        </CardTitle>
        <CardDescription className="text-yellow-100 font-medium">
          Create your account to start your Ayurvedic wellness journey
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="first-name" className="text-yellow-800 font-bold">
                First Name
              </Label>
              <Input
                id="first-name"
                placeholder="Enter first name"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="last-name" className="text-yellow-800 font-bold">
                Last Name
              </Label>
              <Input
                id="last-name"
                placeholder="Enter last name"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
                className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email" className="text-yellow-800 font-bold">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="password" className="text-yellow-800 font-bold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Create a secure password"
              className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div className="grid gap-3">
            <Label
              htmlFor="password_confirmation"
              className="text-yellow-800 font-bold"
            >
              Confirm Password
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm your password"
              className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image" className="text-yellow-800 font-bold">
              Profile Image (Optional)
            </Label>
            <div className="border-2 border-dashed border-yellow-200 rounded-xl p-4 bg-yellow-50/50">
              <div className="flex items-end gap-4">
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-yellow-300">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 w-full">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                  {imagePreview && (
                    <X
                      className="cursor-pointer text-yellow-600 hover:text-yellow-800 transition-colors"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
            disabled={loading}
            onClick={async () => {
              await signUp.email({
                email,
                password,
                name: `${firstName} ${lastName}`,
                image: image ? await convertImageToBase64(image) : "",
                callbackURL: "/dashboard",
                fetchOptions: {
                  onResponse: () => {
                    setLoading(false);
                  },
                  onRequest: () => {
                    setLoading(true);
                  },
                  onError: (ctx) => {
                    toast.error(ctx.error.message);
                  },
                  onSuccess: async () => {
                    router.push("/admin");
                  },
                },
              });
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <span>🌱</span>
                Start Your Wellness Journey
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
