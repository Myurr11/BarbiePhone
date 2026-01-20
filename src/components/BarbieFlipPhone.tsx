import { useState, useRef } from "react";
import BarbieScreen from "./BarbieScreen";
import BarbieKeypad from "./BarbieKeypad";
import CallDiary from "./CallDiary";
import barbiePhoneClosed from "@/assets/barbie-phone-closed.avif";

const CONTACTS: Record<string, { name: string; description: string; audioUrl?: string }> = {
  "1": { name: "Diveesh", description: "🎤 Chai wala", audioUrl: "/audio/Diveesh/Chaiyaaa.mp3" },
  "2": { name: "Diveesh", description: "🎤 Chiki wala", audioUrl: "/audio/Diveesh/Chikiwala_Diveesh.mp3" },
  "3": { name: "Diveesh", description: "🎤 Marathi paul padte pudhe", audioUrl: "/audio/Diveesh/Marathi_paul_padte_pudhe.mp3" },
  "4": { name: "Diveesh", description: "🎤 Kanada Raja pandhari cha", audioUrl: "/audio/Diveesh/kanada_raja_diveesh.mp3" },
  "5": { name: "Kartik", description: "🎤 Banana Banana", audioUrl: "/audio/Kartik/banana_banana.mp3" },
  "6": { name: "Kartik", description: "🎤 Walay", audioUrl: "/audio/Kartik/walay.mp3" },
  "7": { name: "Rupesh", description: "🎤 Chikni kamar", audioUrl: "/audio/Rupesh/Jadoon_tera.mp3" },
  "8": { name: "Rupesh", description: "🎤 Udli Udli Udli", audioUrl: "/audio/Rupesh/UDLI UDLI UDLIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII ft.Rupesh.mp3" },
  "9": { name: "Rupesh", description: "🎤 Aaj din chadeya", audioUrl: "/audio/Rupesh/baksha_gunaho.mp3" },
  "0": { name: "Rupesh", description: "🎤 Meowing anna", audioUrl: "/audio/Rupesh/meow.mp3" },
  "10": { name: "Rupesh", description: "🎤 In dino", audioUrl: "/audio/Rupesh/usko_chupa_krke.mp3" },
  "11": { name: "Shubham", description: "🎤 Rani Mazya Malya mandi", audioUrl: "/audio/Shubham/Rani_mazya_malya_mandi.mp3" },
  "12": { name: "Shubham", description: "🎤 Dakar", audioUrl: "/audio/Shubham/dakar_shubham.mp3" },
  "13": { name: "Shubham", description: "🎤 Snoring", audioUrl: "/audio/Shubham/snoring_shubham.mp3" },
};

const BarbieFlipPhone = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialedNumber, setDialedNumber] = useState("");
  const [selectedContact, setSelectedContact] = useState<{
    name: string;
    description: string;
    key: string;
    audioUrl?: string;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePhoneClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleKeyPress = (key: string) => {
    const newDialedNumber = (dialedNumber + key).slice(-3);
    setDialedNumber(newDialedNumber);
    
    let contact = CONTACTS[newDialedNumber];
    let matchedKey = newDialedNumber;
    
    if (!contact && newDialedNumber.length > 1) {
      const last2 = newDialedNumber.slice(-2);
      if (CONTACTS[last2]) {
        contact = CONTACTS[last2];
        matchedKey = last2;
      }
    }
    
    if (!contact) {
      contact = CONTACTS[key];
      matchedKey = key;
    }
    
    if (contact) {
      setSelectedContact({ ...contact, key: matchedKey });
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
  };

  const handleCall = () => {
    if (selectedContact && !isPlaying) {
      if (selectedContact.audioUrl) {
        if (!audioRef.current) {
          audioRef.current = new Audio(selectedContact.audioUrl);
        } else if (audioRef.current.src !== selectedContact.audioUrl) {
          audioRef.current.pause();
          audioRef.current = new Audio(selectedContact.audioUrl);
        }
        
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            audioRef.current!.onended = () => {
              setIsPlaying(false);
              audioRef.current!.currentTime = 0;
            };
          })
          .catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(true);
            setTimeout(() => {
              setIsPlaying(false);
            }, 5000);
          });
      } else {
        setIsPlaying(true);
        setTimeout(() => {
          setIsPlaying(false);
        }, 5000);
      }
    }
  };

  const handleEndCall = () => {
    setIsPlaying(false);
    setSelectedContact(null);
    setDialedNumber("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleClosePhone = () => {
    if (isOpen && !isPlaying) {
      setIsOpen(false);
      setSelectedContact(null);
      setDialedNumber("");
    }
  };

  const handleCallFromDiary = (key: string) => {
    const contact = CONTACTS[key];
    if (contact) {
      setIsOpen(true);
      setDialedNumber(key);
      setSelectedContact({ ...contact, key });
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Call Diary Button */}
      <CallDiary contacts={CONTACTS} onCallContact={handleCallFromDiary} />

      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-barbie text-primary drop-shadow-lg mb-2">
          Barbie Phone
        </h1>
        <p className="text-muted-foreground font-medium">
          {isOpen ? "Press a key & hit Call! 💕" : "Tap to flip open! ✨"}
        </p>
      </div>

      {/* Phone container with perspective */}
      <div className="relative" style={{ perspective: "1200px" }}>
        
        {/* CLOSED STATE - Show phone image */}
        {!isOpen && (
          <div 
            className="cursor-pointer animate-float hover:scale-105 transition-transform"
            onClick={handlePhoneClick}
          >
            <img 
              src={barbiePhoneClosed} 
              alt="Barbie Flip Phone" 
              className="w-64 h-auto drop-shadow-2xl animate-barbie-glow rounded-4xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold bg-primary/80 px-4 py-2 rounded-full animate-pulse shadow-lg">
                Tap me! 💖
              </span>
            </div>
          </div>
        )}

        {/* OPEN STATE - Rendered flip phone */}
        {isOpen && (
          <div className="flex flex-col items-center">
            {/* Top half (screen) - positioned above keypad */}
            <div 
              className="w-[260px] phone-gradient rounded-3xl phone-shadow p-3 origin-bottom transition-all duration-700 ease-out"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Inner content */}
              <div className="bg-secondary/30 rounded-2xl p-2 flex flex-col">
                {/* Earpiece */}
                <div className="flex justify-center mb-1">
                  <div className="w-12 h-1.5 bg-phone-body-dark/40 rounded-full" />
                </div>
                
                {/* Screen */}
                <div className="h-[260px]">
                  <BarbieScreen 
                    selectedContact={selectedContact}
                    isPlaying={isPlaying}
                    isOpen={isOpen}
                  />
                </div>

                {/* Brand */}
                <div className="text-center mt-1">
                  <span className="font-barbie text-primary text-sm">✧ Barbie ✧</span>
                </div>
              </div>
            </div>

            {/* Hinge connector between screen and keypad */}
            <div className="w-32 h-2 bg-phone-hinge rounded-full shadow-inner -my-1 z-20" />

            {/* Bottom half (keypad) */}
            <div className="w-[260px] phone-gradient rounded-3xl phone-shadow p-3">
              {/* Inner hot pink area */}
              <div className="inner-gradient rounded-2xl p-2 pt-3">
                {/* Barbie logo */}
                <div className="text-center mb-1">
                  <span className="font-barbie text-primary-foreground text-lg drop-shadow-md">Barbie</span>
                </div>
                
                {/* Keypad */}
                <div className="h-[340px]">
                  <BarbieKeypad
                    contacts={CONTACTS}
                    onKeyPress={handleKeyPress}
                    onCall={handleCall}
                    onEndCall={handleEndCall}
                    isPlaying={isPlaying}
                  />
                </div>
              </div>
              
              {/* Bottom speaker grille */}
              <div className="flex justify-center gap-0.5 mt-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-4 h-1 bg-phone-body-dark/50 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close button */}
      {isOpen && (
        <button
          onClick={handleClosePhone}
          className="mt-8 px-6 py-2.5 bg-secondary hover:bg-secondary/80 rounded-full font-semibold text-secondary-foreground transition-colors shadow-md"
        >
          Close Phone 💕
        </button>
      )}
    </div>
  );
};

export default BarbieFlipPhone;