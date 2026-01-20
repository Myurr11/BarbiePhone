import { Phone, User, Heart, Music } from "lucide-react";

interface BarbieScreenProps {
  selectedContact: {
    name: string;
    description: string;
    key: string;
  } | null;
  isPlaying: boolean;
  isOpen: boolean;
}

const BarbieScreen = ({ selectedContact, isPlaying, isOpen }: BarbieScreenProps) => {
  return (
    <div className="w-full h-full rounded-2xl screen-gradient screen-shadow flex flex-col overflow-hidden">
      {/* Status bar */}
      <div className="flex justify-between items-center px-3 py-1.5 text-xs font-medium text-primary/70 bg-phone-screen-bg">
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span className="text-[10px]">Barbie</span>
        </div>
        <span className="text-[10px]">💖</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px]">100%</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Main display area */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 bg-phone-screen-bg">
        {selectedContact ? (
          <div className="text-center">
            {/* Contact avatar */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            
            {/* Contact name */}
            <p className="text-xl font-bold text-primary font-barbie">
              {selectedContact.name}
            </p>
            
            {/* Description */}
            <p className="text-xs mt-1 text-muted-foreground font-medium px-2">
              {selectedContact.description}
            </p>
            
            {/* Key indicator */}
            <div className="mt-2 flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-primary fill-primary" />
              <span className="text-xs text-primary font-semibold">Key {selectedContact.key}</span>
              <Heart className="w-3 h-3 text-primary fill-primary" />
            </div>

            {/* Playing indicator */}
            {isPlaying && (
              <div className="mt-4 flex items-center justify-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span 
                    key={i}
                    className="w-1.5 bg-primary rounded-full animate-visualizer" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            )}

            {/* Call prompt */}
            {!isPlaying && (
              <p className="mt-3 text-xs text-accent animate-pulse font-semibold">
                Press 📞 to play!
              </p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="relative mb-4">
              <Phone className="w-14 h-14 mx-auto text-primary" />
              <Heart className="absolute -top-1 -right-1 w-5 h-5 text-accent fill-accent animate-pulse" />
            </div>
            <p className="text-xl font-barbie text-primary">Barbie Phone</p>
            <p className="text-xs mt-2 text-muted-foreground font-medium">
              Press a key to call! 💕
            </p>
            <div className="mt-4 flex justify-center gap-1">
              <Heart className="w-3 h-3 text-primary/40 fill-primary/40" />
              <Heart className="w-4 h-4 text-primary/60 fill-primary/60" />
              <Heart className="w-3 h-3 text-primary/40 fill-primary/40" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation bar */}
      <div className="flex justify-around items-center px-2 py-1 bg-secondary/50 rounded-b-lg">
        <button className="text-[10px] text-muted-foreground font-semibold">☰</button>
        <span className="text-[10px] font-bold text-primary">Select</span>
        <button className="text-[10px] text-muted-foreground font-semibold">←</button>
      </div>
    </div>
  );
};

export default BarbieScreen;
