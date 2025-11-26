import React from "react";
import Link from "next/link";
import SignIn from "../_components/sign-in-form";
import { Leaf } from "lucide-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23064e3b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-md p-6 relative z-10">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
            <Leaf className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-emerald-900 mb-3">
            Welcome Back
          </h1>
          <p className="text-stone-600 font-medium">
            Continue your Ayurvedic wellness journey
          </p>
          <div className="w-16 h-1 bg-emerald-700 mx-auto mt-4 rounded-full opacity-20"></div>
        </div>

        <SignIn />

        <div className="text-center mt-8">
          <p className="text-stone-600">
            New to our wellness center?{" "}
            <Link
              href="/sign-up"
              className="text-emerald-700 font-semibold hover:text-emerald-800 hover:underline transition-colors duration-200"
            >
              Begin Your Journey
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
