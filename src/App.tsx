import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { SignInScreen } from './components/SignInScreen';
import { Dashboard } from './components/Dashboard';
import { AddIssueScreen } from './components/AddIssueScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { MapScreen } from './components/MapScreen';

import { ProfileScreen } from './components/ProfileScreen';
import { BottomNavigation } from './components/BottomNavigation';

type Screen = 'splash' | 'signin' | 'dashboard' | 'add-issue' | 'notifications' | 'map' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleSplashComplete = () => {
    setCurrentScreen('signin');
  };

  const handleSignIn = () => {
    setCurrentScreen('dashboard');
  };

  const handleIssueSubmit = () => {
    // Show success message and navigate back to dashboard
    setCurrentScreen('dashboard');
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-100 to-white relative overflow-hidden hide-scrollbar" style={{
      maxWidth: '390px',
      margin: '0 auto',
      boxShadow: '0 0 40px rgba(0,0,0,0.2)',
      border: '3px solid #6b7280',
      borderRadius: '32px'
    }}>
      {/* Android Status Bar */}
      <div className="h-7 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-between px-4 text-xs text-white backdrop-blur-sm">
        <div className="flex items-center space-x-1">
          <span className="font-medium tracking-wide">9:41</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-0.5">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/80 rounded-full"></div>
            <div className="w-1 h-3 bg-white/60 rounded-full"></div>
            <div className="w-1 h-3 bg-white/40 rounded-full"></div>
          </div>
          <div className="w-6 h-3 border border-white/70 rounded-sm relative">
            <div className="w-4/5 h-full bg-green-400 rounded-sm"></div>
            <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-1 bg-white/70 rounded-r-sm"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-b from-gray-50 to-white hide-scrollbar pb-20" style={{ minHeight: 'calc(100vh - 28px)' }}>
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
        
        {currentScreen === 'signin' && (
          <SignInScreen onSignIn={handleSignIn} />
        )}
        
        {currentScreen === 'dashboard' && (
          <Dashboard onNavigate={navigateToScreen} />
        )}
        
        {currentScreen === 'add-issue' && (
          <AddIssueScreen 
            onBack={() => setCurrentScreen('dashboard')} 
            onSubmit={handleIssueSubmit}
          />
        )}
        
        {currentScreen === 'notifications' && (
          <NotificationsScreen 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}

        {currentScreen === 'map' && (
          <MapScreen 
            onBack={() => setCurrentScreen('dashboard')} 
            onNavigate={navigateToScreen}
          />
        )}



        {currentScreen === 'profile' && (
          <ProfileScreen 
            onBack={() => setCurrentScreen('dashboard')} 
            onSignOut={() => setCurrentScreen('signin')}
          />
        )}
      </div>

      {/* Show bottom navigation for all screens except splash and signin */}
      {currentScreen !== 'splash' && currentScreen !== 'signin' && (
        <BottomNavigation currentScreen={currentScreen} onNavigate={navigateToScreen} />
      )}
    </div>
  );
}