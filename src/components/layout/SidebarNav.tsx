import { Home, Calendar, SquareCheckBig, FolderOpen, Target, ChartColumn, Settings } from "lucide-react";

const navigationItems = [
  { name: "Home", icon: Home, active: true },
  { name: "Calendar", icon: Calendar, active: false },
  { name: "Tasks", icon: SquareCheckBig, active: false },
  { name: "Projects", icon: FolderOpen, active: false },
  { name: "Energy & Goals", icon: Target, active: false },
  { name: "Streams", icon: ChartColumn, active: false },
  { name: "Settings", icon: Settings, active: false },
];

export function SidebarNav() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/40 z-40">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-text-primary">SyncScript</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href="#"
                className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/30 shadow-glow"
                    : "text-text-subtle hover:bg-card-hover hover:text-text-primary"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Bottom settings */}
        <div className="absolute bottom-6 left-6">
          <button className="p-2 text-text-mute hover:text-text-primary transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
