import { Home, Bell, User, Plus } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { 
      id: 'add-issue', 
      icon: () => (
        <div className="relative">
          <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
            <Plus size={14} strokeWidth={2.5} />
          </div>
        </div>
      ), 
      label: 'Report' 
    },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: '#2E2E2E' }}
    >
      <div className="flex justify-around items-center px-6 py-4 h-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 min-w-0 flex-1 group`}
          >
            <div 
              className={`mb-2 transition-all duration-300 ${
                currentScreen === tab.id ? 'transform scale-110' : 'group-hover:scale-105'
              }`}
              style={{ 
                color: currentScreen === tab.id ? '#F5F5F5' : '#A0A0A0'
              }}
            >
              <tab.icon size={24} strokeWidth={2} />
            </div>
            <span 
              className={`text-xs transition-all duration-300 ${
                currentScreen === tab.id ? 'transform scale-105' : ''
              }`}
              style={{ 
                color: currentScreen === tab.id ? '#F5F5F5' : '#A0A0A0',
                fontWeight: currentScreen === tab.id ? '600' : '500'
              }}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}