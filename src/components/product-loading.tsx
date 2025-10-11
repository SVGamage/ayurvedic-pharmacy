import { Package } from "lucide-react";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Package className="h-10 w-10 text-emerald-600" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600 mx-auto"></div>
        </div>
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">
          Loading Ayurvedic Products...
        </h3>
        <p className="text-emerald-600">Preparing your wellness catalog</p>
      </div>
    </div>
  );
}
