import { Building2, MessageSquare } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  // Auto-navigate after 2 seconds
  setTimeout(() => {
    onComplete();
  }, 2000);

  return (
    <div className="w-full h-full bg-[#1976D2] flex items-center justify-center" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="relative">
        {/* Civic Logo - Building icon in speech bubble */}
        <div className="bg-white rounded-3xl p-8 shadow-lg relative">
          <div className="flex items-center justify-center">
            <Building2 size={64} className="text-[#1976D2]" />
          </div>
          {/* Speech bubble tail */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}