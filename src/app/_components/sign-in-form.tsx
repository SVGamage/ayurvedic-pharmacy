"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Card className="border-2 border-emerald-200 shadow-xl bg-gradient-to-br from-white to-emerald-50 rounded-xl overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 text-white">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🔓</span>
          </div>
          Welcome Back
        </CardTitle>
        <CardDescription className="text-emerald-100 font-medium">
          Enter your credentials to access your wellness dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-emerald-800 font-bold">
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
              className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-emerald-800 font-bold">
                Password
              </Label>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
            />
          </div>

          <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <Checkbox
              id="remember"
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
              className="border-emerald-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
            <Label htmlFor="remember" className="text-emerald-800 font-medium">
              Remember me for future visits
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
            disabled={loading}
            onClick={async () => {
              await signIn.email(
                {
                  email,
                  password,
                },
                {
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                  onError: (ctx) => {
                    toast.error(ctx.error.message);
                  },
                  onSuccess: async () => {
                    router.push("/admin");
                  },
                }
              );
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>Signing In...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <span>🔐</span>
                Access Wellness Dashboard
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
