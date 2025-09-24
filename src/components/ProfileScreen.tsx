import { useState } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  Settings,
  Edit2,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Star,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Award,
  TrendingUp,
  Users,
  MessageCircle,
  Camera
} from 'lucide-react';

interface ProfileScreenProps {
  onBack: () => void;
  onSignOut: () => void;
}

export function ProfileScreen({ onBack, onSignOut }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const userStats = {
    issuesReported: 12,
    issuesResolved: 8,
    joinDate: 'March 2024',
    points: 850
  };

  const achievements = [
    { id: 1, title: 'First Reporter', description: 'Reported your first issue', unlocked: true },
    { id: 2, title: 'Community Helper', description: 'Helped resolve 5 issues', unlocked: true },
    { id: 3, title: 'Streak Master', description: '7 days of active reporting', unlocked: true },
    { id: 4, title: 'Local Hero', description: 'Top contributor this month', unlocked: false }
  ];

  const recentActivity = [
    { id: 1, action: 'Reported street light outage', date: '2 days ago', type: 'report' },
    { id: 2, action: 'Issue marked as resolved', date: '3 days ago', type: 'resolved' },
    { id: 3, action: 'Updated pothole report', date: '1 week ago', type: 'update' }
  ];

  return (
    <div className="w-full bg-background flex flex-col overflow-x-hidden hide-scrollbar" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-2 p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-yellow-500">Profile</h1>
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <Settings size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
        {/* User Info Card */}
        <Card className="m-4 p-6 rounded-xl border-0 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-16 h-16 bg-[#1976D2] text-white">
                <div className="flex items-center justify-center w-full h-full text-xl">
                  N
                </div>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0 bg-[#388E3C] hover:bg-[#2E7D32]"
              >
                <Camera size={12} />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3>Neelesh</h3>
                <Button variant="ghost" size="sm" className="p-1">
                  <Edit2 size={14} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">neelesh14@gmail.com</p>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="px-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Card className="p-4 rounded-xl border-0 shadow-sm text-center">
              <div className="text-2xl text-[#1976D2] mb-1">{userStats.issuesReported}</div>
              <div className="text-xs text-muted-foreground">Issues Reported</div>
            </Card>
            <Card className="p-4 rounded-xl border-0 shadow-sm text-center">
              <div className="text-2xl text-[#388E3C] mb-1">{userStats.issuesResolved}</div>
              <div className="text-xs text-muted-foreground">Issues Resolved</div>
            </Card>
          </div>
          
          <Card className="p-4 rounded-xl border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-yellow-500" />
                <span className="text-sm">Community Points</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{userStats.points}</span>
                <TrendingUp size={16} className="text-[#388E3C]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <div className="p-4">
          <h4 className="mb-3 text-white">Achievements</h4>
          <div className="grid grid-cols-2 gap-3 w-full">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`p-3 rounded-xl border-0 shadow-sm ${
                  achievement.unlocked ? 'bg-card' : 'bg-muted/30 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Award size={16} className={achievement.unlocked ? 'text-yellow-500' : 'text-muted-foreground'} />
                  <span className="text-sm">{achievement.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-4">
          <h4 className="mb-3 text-white">Recent Activity</h4>
          <Card className="rounded-xl border-0 shadow-sm">
            {recentActivity.map((activity, index) => (
              <div key={activity.id}>
                <div className="p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    {activity.type === 'report' && <AlertTriangle size={14} className="text-[#1976D2]" />}
                    {activity.type === 'resolved' && <CheckCircle size={14} className="text-[#388E3C]" />}
                    {activity.type === 'update' && <Edit2 size={14} className="text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                {index < recentActivity.length - 1 && <Separator />}
              </div>
            ))}
          </Card>
        </div>

        {/* Settings */}
        <div className="p-4">
          <h4 className="mb-3 text-white">Settings</h4>
          <Card className="rounded-xl border-0 shadow-sm">
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell size={16} />
                  <span className="text-sm">Push Notifications</span>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin size={16} />
                  <span className="text-sm">Location Sharing</span>
                </div>
                <Switch 
                  checked={locationSharing} 
                  onCheckedChange={setLocationSharing}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users size={16} />
                  <span className="text-sm">Public Profile</span>
                </div>
                <Switch 
                  checked={publicProfile} 
                  onCheckedChange={setPublicProfile}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Menu Options */}
        <div className="p-4 space-y-3">
          <Card className="rounded-xl border-0 shadow-sm">
            <Button variant="ghost" className="w-full justify-start p-4 h-auto">
              <Shield size={16} className="mr-3" />
              <span>Privacy & Security</span>
            </Button>
            
            <Separator />
            
            <Button variant="ghost" className="w-full justify-start p-4 h-auto">
              <MessageCircle size={16} className="mr-3" />
              <span>Community Guidelines</span>
            </Button>
            
            <Separator />
            
            <Button variant="ghost" className="w-full justify-start p-4 h-auto">
              <HelpCircle size={16} className="mr-3" />
              <span>Help & Support</span>
            </Button>
          </Card>
          
          <Card className="rounded-xl border-0 shadow-sm">
            <Button 
              variant="ghost" 
              className="w-full justify-start p-4 h-auto text-[#D32F2F] hover:text-[#D32F2F]/80"
              onClick={onSignOut}
            >
              <LogOut size={16} className="mr-3" />
              <span>Sign Out</span>
            </Button>
          </Card>
        </div>

        {/* App Info */}
        <div className="p-4 pb-6">
          <div className="text-center text-xs text-muted-foreground">
            <p>Civic Reporter v2.1.0</p>
            <p className="mt-1">Member since {userStats.joinDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}