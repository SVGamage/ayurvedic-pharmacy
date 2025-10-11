import { Briefcase } from "lucide-react";

export default function ServiceLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Briefcase className="h-10 w-10 text-yellow-600" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-yellow-200 rounded-full animate-spin border-t-yellow-600 mx-auto"></div>
        </div>
        <h3 className="text-2xl font-bold text-yellow-800 mb-2">
          Loading Healing Services...
        </h3>
        <p className="text-yellow-600">Preparing your wellness offerings</p>
      </div>
    </div>
  );
}
