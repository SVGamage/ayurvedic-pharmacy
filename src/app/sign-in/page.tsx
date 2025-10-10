import React from "react";
import Link from "next/link";
import SignIn from "../_components/sign-in-form";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 relative overflow-hidden flex items-center justify-center">
      {/* Ayurvedic Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-emerald-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-32 h-32 border-2 border-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-32 left-40 w-36 h-36 border-2 border-orange-300 rounded-full animate-pulse animation-delay-400"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-emerald-400 rounded-full animate-pulse animation-delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-green-300 rounded-full animate-pulse animation-delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-amber-300 rounded-full animate-pulse animation-delay-600"></div>
      </div>

      <div className="w-full max-w-md p-6 relative z-10">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl">🧘‍♀️</span>
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-yellow-600 bg-clip-text mb-2">
            Welcome Back
          </h1>
          <p className="text-emerald-700 font-medium">
            Continue your Ayurvedic wellness journey
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-yellow-400 mx-auto mt-3 rounded-full"></div>
        </div>

        <SignIn />

        <div className="text-center mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-emerald-100">
          <p className="text-emerald-800 font-medium">
            New to our wellness center?{" "}
            <Link
              href="/sign-up"
              className="text-emerald-600 hover:text-emerald-800 font-bold hover:underline transition-colors duration-200"
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
