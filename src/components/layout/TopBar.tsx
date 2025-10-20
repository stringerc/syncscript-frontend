import { Search, Bell, Zap, User } from "lucide-react";

export function TopBar() {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-card/80 backdrop-blur-xs border-b border-border/40 z-50 flex items-center px-6">
      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-mute" />
          <input
            type="text"
            placeholder="Universal Search & Command"
            className="w-full pl-10 pr-4 py-2 bg-bg-raised border border-border/40 rounded-xl text-text-primary placeholder-text-mute focus:outline-none focus:border-accent-blue focus:shadow-glow transition-all duration-200"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-text-mute hover:text-text-primary transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-2 px-3 py-1 bg-bg-raised rounded-lg border border-border/40">
          <div className="w-2 h-2 bg-accent-red rounded-full"></div>
          <span className="text-sm text-text-subtle">Low Energy</span>
        </div>
        
        <div className="w-8 h-8 bg-bg-raised rounded-full border border-border/40 flex items-center justify-center">
          <User className="w-4 h-4 text-text-mute" />
        </div>
      </div>
    </div>
  );
}
