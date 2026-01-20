import { Book, Heart, Phone, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Contact {
  name: string;
  description: string;
  audioUrl?: string;
}

interface CallDiaryProps {
  contacts: Record<string, Contact>;
  onCallContact: (key: string) => void;
}

const CallDiary = ({ contacts, onCallContact }: CallDiaryProps) => {
  const sortedKeys = Object.keys(contacts).sort((a, b) => {
    // Sort numerically, with special chars at the end
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    if (!isNaN(aNum)) return -1;
    if (!isNaN(bNum)) return 1;
    return a.localeCompare(b);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold shadow-lg transition-all hover:scale-105">
          <Book className="w-4 h-4" />
          <span className="hidden sm:inline">Call Diary</span>
          <span className="sm:hidden">📖</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gradient-to-b from-phone-body to-phone-body-dark border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-center font-barbie text-2xl text-primary flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 fill-primary" />
            Call Diary
            <Heart className="w-5 h-5 fill-primary" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center text-sm text-muted-foreground mb-2">
          💡 Tip: Press multiple keys for combo numbers (e.g., 1+2 = 12)
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {sortedKeys.map((key) => {
              const contact = contacts[key];
              return (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors group"
                >
                  {/* Key badge */}
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">
                      {key}
                    </span>
                  </div>

                  {/* Contact info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-barbie text-lg text-primary truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.description}
                    </p>
                  </div>

                  {/* Call button */}
                  <button
                    onClick={() => onCallContact(key)}
                    className="w-9 h-9 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="text-center text-xs text-muted-foreground mt-2">
          {Object.keys(contacts).length} contacts 💕
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDiary;
