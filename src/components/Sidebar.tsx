import { Keyboard, Shield, Settings, Map as MapIcon, Box } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'keyboard', icon: Keyboard, label: 'Keyboard' },
    { id: 'vault', icon: Shield, label: 'Vault' },
    { id: 'map', icon: MapIcon, label: 'Settings/Map' },
  ];

  return (
    <div 
      className="w-20 bg-[#151619] border-r border-[#2a2b2f] flex flex-col items-center py-8 gap-10"
      id="omnitype-sidebar"
    >
      <div className="mb-4 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
        <Box className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex flex-col gap-6 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`p-3 rounded-xl transition-all duration-300 relative group ${
              activeTab === item.id 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10' 
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
            }`}
            title={item.label}
          >
            <item.icon className="w-6 h-6" />
            {activeTab === item.id && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-[-4px] top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"
              />
            )}
            <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-zinc-700">
              {item.label}
            </div>
          </button>
        ))}
      </div>

      <button className="p-3 text-zinc-500 hover:text-zinc-300 transition-colors">
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
}
