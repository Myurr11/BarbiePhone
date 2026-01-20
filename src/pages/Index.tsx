import BarbieFlipPhone from "@/components/BarbieFlipPhone";
import { Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hearts */}
        <Heart className="absolute top-[10%] left-[10%] w-8 h-8 text-primary/20 fill-primary/20 animate-float" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-[20%] right-[15%] w-6 h-6 text-accent/20 fill-accent/20 animate-float" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute bottom-[30%] left-[8%] w-10 h-10 text-primary/15 fill-primary/15 animate-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-[20%] right-[10%] w-7 h-7 text-accent/20 fill-accent/20 animate-float" style={{ animationDelay: '1.5s' }} />
        <Heart className="absolute top-[40%] left-[5%] w-5 h-5 text-primary/20 fill-primary/20 animate-float" style={{ animationDelay: '2s' }} />
        <Heart className="absolute top-[15%] right-[25%] w-4 h-4 text-secondary/30 fill-secondary/30 animate-float" style={{ animationDelay: '0.3s' }} />
        
        {/* Sparkles */}
        <span className="absolute top-[25%] left-[20%] text-2xl animate-sparkle" style={{ animationDelay: '0s' }}>✨</span>
        <span className="absolute top-[35%] right-[20%] text-xl animate-sparkle" style={{ animationDelay: '0.7s' }}>✨</span>
        <span className="absolute bottom-[25%] left-[25%] text-lg animate-sparkle" style={{ animationDelay: '1.4s' }}>✨</span>
        <span className="absolute bottom-[35%] right-[25%] text-2xl animate-sparkle" style={{ animationDelay: '0.3s' }}>💖</span>
      </div>

      {/* Main content */}
      <BarbieFlipPhone />


    </div>
  );
};

export default Index;
