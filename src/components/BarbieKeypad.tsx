import { Phone, PhoneOff, Heart } from "lucide-react";
import { useState } from "react";

interface Contact {
  name: string;
  description: string;
  audioUrl?: string;
}

interface BarbieKeypadProps {
  contacts: Record<string, Contact>;
  onKeyPress: (key: string) => void;
  onCall: () => void;
  onEndCall: () => void;
  isPlaying: boolean;
}

const BarbieKeypad = ({ contacts, onKeyPress, onCall, onEndCall, isPlaying }: BarbieKeypadProps) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const keys = [
    { key: "1", sub: "" },
    { key: "2", sub: "abc" },
    { key: "3", sub: "def" },
    { key: "4", sub: "ghi" },
    { key: "5", sub: "jkl" },
    { key: "6", sub: "mno" },
    { key: "7", sub: "pqrs" },
    { key: "8", sub: "tuv" },
    { key: "9", sub: "wxyz" },
    { key: "*", sub: "♡" },
    { key: "0", sub: "+" },
    { key: "#", sub: "✿" },
  ];

  const handleKeyClick = (key: string) => {
    setPressedKey(key);
    onKeyPress(key);
    setTimeout(() => setPressedKey(null), 150);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      {/* D-Pad / Navigation area */}
      <div className="flex justify-center mb-1">
        <div className="relative w-20 h-20 rounded-full bg-phone-nav flex items-center justify-center nav-shadow">
          {/* Center button */}
          <div className="w-10 h-10 rounded-lg bg-secondary border-2 border-secondary/50 flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </div>
          {/* Direction indicators */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-primary/40 text-xs">▲</div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-primary/40 text-xs">▼</div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 text-primary/40 text-xs">◀</div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 text-primary/40 text-xs">▶</div>
        </div>
      </div>

      {/* Number keys grid */}
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {keys.map(({ key, sub }) => {
          const hasContact = contacts[key];
          return (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className={`
                relative rounded-lg key-gradient hearts-pattern
                flex flex-col items-center justify-center
                transition-all duration-100 active:scale-95
                ${pressedKey === key ? 'key-shadow-pressed translate-y-[2px]' : 'key-shadow'}
                hover:brightness-110
              `}
            >
              <span className="text-lg font-bold text-phone-key-text drop-shadow-sm">
                {key}
              </span>
              {sub && (
                <span className="text-[8px] text-phone-key-text/80 font-medium">
                  {sub}
                </span>
              )}
              {hasContact && (
                <Heart className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-accent fill-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Call and End buttons */}
      <div className="flex gap-2 mt-1">
        <button
          onClick={onCall}
          disabled={isPlaying}
          className={`
            flex-1 h-10 rounded-lg flex items-center justify-center gap-1.5
            bg-primary text-primary-foreground font-bold text-sm
            transition-all duration-100
            ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 active:scale-95'}
            shadow-[0_3px_0_hsl(330_100%_40%)]
          `}
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </button>
        
        <button
          onClick={onEndCall}
          className={`
            flex-1 h-10 rounded-lg flex items-center justify-center gap-1.5
            bg-phone-end text-primary-foreground font-bold text-sm
            transition-all duration-100 hover:brightness-110 active:scale-95
            shadow-[0_3px_0_hsl(330_70%_50%)]
          `}
        >
          <PhoneOff className="w-4 h-4" />
          <span>End</span>
        </button>
      </div>
    </div>
  );
};

export default BarbieKeypad;
