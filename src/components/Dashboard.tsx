import { useState } from 'react';
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';

import { 
  Home, 
  MapPin, 
  Bell, 
  User, 
  Plus, 
  Navigation,
  Phone,
  AlertTriangle,
  Thermometer,
  MessageCircle,
  Construction,
  Lightbulb,
  Volume2,
  Satellite,
  Map
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

interface Issue {
  id: number;
  title: string;
  type: 'infrastructure' | 'safety' | 'environment' | 'noise';
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  location: { x: number; y: number };
  description: string;
  reportedAt: string;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isSatelliteMode, setIsSatelliteMode] = useState(false);

  const mapIssues: Issue[] = [
    {
      id: 1,
      title: 'Street Light Outage',
      type: 'infrastructure',
      status: 'in-progress',
      priority: 'medium',
      location: { x: 45, y: 30 },
      description: 'Multiple street lights are not working on 5th Avenue',
      reportedAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Large Pothole',
      type: 'infrastructure',
      status: 'pending',
      priority: 'high',
      location: { x: 65, y: 55 },
      description: 'Dangerous pothole blocking traffic lane',
      reportedAt: '1 day ago'
    },
    {
      id: 3,
      title: 'Noise Complaint',
      type: 'noise',
      status: 'resolved',
      priority: 'low',
      location: { x: 25, y: 70 },
      description: 'Construction noise during restricted hours',
      reportedAt: '3 hours ago'
    },
    {
      id: 4,
      title: 'Broken Sidewalk',
      type: 'safety',
      status: 'pending',
      priority: 'medium',
      location: { x: 75, y: 25 },
      description: 'Cracked sidewalk causing tripping hazard',
      reportedAt: '5 hours ago'
    },
    {
      id: 5,
      title: 'Graffiti Cleanup',
      type: 'environment',
      status: 'in-progress',
      priority: 'low',
      location: { x: 55, y: 80 },
      description: 'Vandalism on public property wall',
      reportedAt: '1 day ago'
    }
  ];

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'infrastructure':
        return <Construction size={16} />;
      case 'safety':
        return <AlertTriangle size={16} />;
      case 'environment':
        return <Lightbulb size={16} />;
      case 'noise':
        return <Volume2 size={16} />;
      default:
        return <MapPin size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-600';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-gray-800';
      case 'medium':
        return 'border-gray-600';
      case 'low':
        return 'border-gray-400';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <div className="w-full bg-background flex flex-col overflow-y-auto hide-scrollbar" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Weather Widget */}
      <Card className="mx-4 mt-4 p-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl border-0 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Today</p>
            <h3 className="text-white">22°C</h3>
            <p className="text-sm opacity-90">Partly Cloudy</p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1707396171816-fb12f0ecdec3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwc3VubnklMjBpY29ufGVufDF8fHx8MTc1NzQwMDI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Weather icon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* Compact Location Map Widget */}
      <Card className="mx-4 mt-4 rounded-xl border-0 shadow-lg overflow-hidden">
        <div className="h-32 relative bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer" onClick={() => onNavigate('map')}>
          {/* Simple Map Background */}
          <div className="absolute inset-0">
            {/* Street Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="compactGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#compactGrid)" />
            </svg>
            
            {/* Main Streets */}
            <div className="absolute top-1/3 left-0 w-full h-0.5 bg-slate-400 opacity-50"></div>
            <div className="absolute top-2/3 left-0 w-full h-0.5 bg-slate-400 opacity-50"></div>
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-slate-400 opacity-50"></div>
            
            {/* Area landmarks */}
            <div className="absolute top-1/4 left-1/4 w-6 h-4 bg-slate-400 rounded-sm opacity-30"></div>
            <div className="absolute top-3/4 right-1/4 w-4 h-6 bg-slate-400 rounded-sm opacity-30"></div>
            <div className="absolute bottom-1/4 left-1/6 w-5 h-3 bg-slate-400 rounded-sm opacity-30"></div>
          </div>

          {/* Current Location Pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-gray-700 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div className="absolute inset-0 w-4 h-4 bg-gray-700 rounded-full opacity-25 animate-ping"></div>
            </div>
          </div>

          {/* Location Info */}
          <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-md shadow-sm">
            <p className="text-xs text-slate-700 flex items-center">
              <MapPin size={10} className="mr-1" />
              Chennai
            </p>
          </div>
          
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md shadow-sm">
            <p className="text-xs text-slate-600">View Map</p>
          </div>
        </div>
      </Card>

      {/* Interactive Map Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="text-gray-800">Area Issues Map</h3>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-gray-600 hover:bg-gray-100 hover:text-gray-800" 
            onClick={() => onNavigate('map')}
          >
            View Full Map
          </Button>
        </div>
        
        <Card className="mx-4 rounded-xl border-0 shadow-lg overflow-hidden">
          {/* Map Header with Satellite Toggle */}
          <div className="flex items-center justify-between p-3 bg-white border-b border-border">
            <h4 className="text-sm">Chennai Area</h4>
            <Button 
              size="sm" 
              variant="ghost" 
              className={`p-1.5 h-auto transition-colors ${isSatelliteMode ? 'bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsSatelliteMode(!isSatelliteMode);
              }}
            >
              {isSatelliteMode ? <Map size={14} /> : <Satellite size={14} />}
            </Button>
          </div>
          
          {/* Map Container with Issues */}
          <div className={`h-44 relative cursor-pointer transition-all duration-300 ${isSatelliteMode 
            ? 'bg-gradient-to-br from-gray-700 to-gray-900' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100'}`} 
            onClick={() => onNavigate('map')}>
            
            {/* Map Background */}
            <div className="absolute inset-0">
              {!isSatelliteMode ? (
                /* Regular Map View */
                <>
                  {/* Street Grid */}
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                      <pattern id="issueMapGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#64748b" strokeWidth="0.7"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#issueMapGrid)" />
                  </svg>
                  
                  {/* Main Roads */}
                  <div className="absolute top-1/4 left-0 w-full h-1 bg-slate-500 opacity-40"></div>
                  <div className="absolute top-3/4 left-0 w-full h-1 bg-slate-500 opacity-40"></div>
                  <div className="absolute top-0 left-1/3 w-1 h-full bg-slate-500 opacity-40"></div>
                  <div className="absolute top-0 right-1/3 w-1 h-full bg-slate-500 opacity-40"></div>
                  
                  {/* Area Buildings */}
                  <div className="absolute top-1/6 left-1/5 w-8 h-6 bg-slate-400 rounded-sm opacity-30"></div>
                  <div className="absolute top-2/3 right-1/4 w-6 h-8 bg-slate-400 rounded-sm opacity-30"></div>
                  <div className="absolute bottom-1/6 left-1/2 w-7 h-5 bg-slate-400 rounded-sm opacity-30"></div>
                </>
              ) : (
                /* Satellite View */
                <>
                  {/* Urban areas */}
                  <div className="absolute top-1/6 left-1/5 w-10 h-8 bg-gray-500 rounded-sm opacity-60"></div>
                  <div className="absolute top-2/3 right-1/4 w-8 h-10 bg-gray-600 rounded-sm opacity-60"></div>
                  <div className="absolute bottom-1/6 left-1/2 w-9 h-7 bg-gray-500 rounded-sm opacity-60"></div>
                  
                  {/* Vegetation */}
                  <div className="absolute top-1/8 right-1/8 w-12 h-14 bg-green-700 rounded-lg opacity-50"></div>
                  <div className="absolute bottom-1/5 left-1/8 w-10 h-12 bg-green-800 rounded-lg opacity-40"></div>
                  
                  {/* Water features */}
                  <div className="absolute top-1/3 left-1/6 w-14 h-2 bg-blue-800 rounded-full opacity-60"></div>
                  
                  {/* Roads in satellite */}
                  <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gray-300 opacity-70"></div>
                  <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gray-300 opacity-70"></div>
                  <div className="absolute top-0 left-1/3 w-0.5 h-full bg-gray-300 opacity-70"></div>
                  <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gray-300 opacity-70"></div>
                  
                  {/* Satellite texture */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-600/10 to-slate-700/20"></div>
                </>
              )}
            </div>
            
            {/* Dynamic Issue Markers */}
            {mapIssues.map((issue) => (
              <div
                key={issue.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform ${getStatusColor(issue.status)}`}
                style={{ 
                  left: `${issue.location.x}%`, 
                  top: `${issue.location.y}%`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIssue(selectedIssue?.id === issue.id ? null : issue);
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white">
                  {getIssueIcon(issue.type)}
                </div>
              </div>
            ))}
            
            {/* Current Location Pin */}
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-5 h-5 bg-gray-700 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute inset-0 w-5 h-5 bg-gray-700 rounded-full opacity-30 animate-ping"></div>
              </div>
            </div>
            
            {/* Map Info Overlay */}
            <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm">
              <p className="text-xs text-slate-700 flex items-center">
                <MapPin size={12} className="mr-1" />
                Chennai
              </p>
            </div>
            
            <div className="absolute top-3 right-3 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm">
              <p className="text-xs text-slate-600">{mapIssues.length} active issues</p>
            </div>
          </div>
          
          {/* Issue Details Popup */}
          {selectedIssue && (
            <div className="p-4 border-t border-border bg-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedIssue.status)}`}></div>
                  <h4 className="text-sm font-medium">{selectedIssue.title}</h4>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="p-1 h-auto" 
                  onClick={() => setSelectedIssue(null)}
                >
                  ×
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{selectedIssue.description}</p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getPriorityColor(selectedIssue.priority)}`}
                  >
                    {selectedIssue.priority} priority
                  </Badge>
                  <span className="text-muted-foreground">{selectedIssue.reportedAt}</span>
                </div>
                <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                  View Details
                </Button>
              </div>
            </div>
          )}
          
          {/* Map Legend */}
          <div className="p-4 border-t border-border bg-white">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-gray-700">Resolved</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-700">In Progress</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-700">Pending</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Quick Map Actions */}
        <div className="px-4 mt-3">
          <div className="grid grid-cols-3 gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-col h-16 p-2 border-gray-500 hover:bg-gray-100 text-gray-700 hover:text-gray-900 bg-white/80 backdrop-blur-sm shadow-lg"
              onClick={() => onNavigate('add-issue')}
            >
              <Plus size={16} className="mb-1" />
              <span className="text-xs">Report Issue</span>
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-col h-16 p-2 border-gray-500 hover:bg-gray-100 text-gray-700 hover:text-gray-900 bg-white/80 backdrop-blur-sm shadow-lg"
              onClick={() => onNavigate('map')}
            >
              <Navigation size={16} className="mb-1" />
              <span className="text-xs">Navigate</span>
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-col h-16 p-2 border-gray-500 hover:bg-gray-100 text-gray-700 hover:text-gray-900 bg-white/80 backdrop-blur-sm shadow-lg"
              onClick={() => {
                const pendingIssues = mapIssues.filter(issue => issue.status === 'pending');
                if (pendingIssues.length > 0) {
                  setSelectedIssue(pendingIssues[0]);
                }
              }}
            >
              <AlertTriangle size={16} className="mb-1" />
              <span className="text-xs">Nearby Issues</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Emergency Services - Chennai */}
      <div className="mt-4 pb-4">
        <h3 className="px-4 mb-3 text-gray-800">Emergency Services - Chennai</h3>
        <div className="px-4 space-y-3">
          <Card className="p-4 rounded-xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1643055420019-402d60ee19a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbWVkaWNhbHxlbnwxfHx8fDE3NTczOTc0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Government Hospital"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4>Government Hospital</h4>
                <p className="text-sm text-muted-foreground">24/7 Emergency & General Care</p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin size={14} className="mr-1" />
                  1.2 km away • Open 24/7
                </p>
              </div>
              <Button size="sm" variant="outline" className="rounded-lg">
                <Phone size={16} />
              </Button>
            </div>
          </Card>

          <Card className="p-4 rounded-xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1587577565424-d45675526c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBzdGF0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU3Mzk3NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Tiruvannamalai Police Station"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4>Chennai Police</h4>
                <p className="text-sm text-muted-foreground">City Police Station</p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin size={14} className="mr-1" />
                  0.8 km away • 24/7 Service
                </p>
              </div>
              <Button size="sm" variant="outline" className="rounded-lg">
                <Phone size={16} />
              </Button>
            </div>
          </Card>

          <Card className="p-4 rounded-xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwc3RhdGlvbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1NzQwMDM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fire Station"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4>Fire & Rescue Station</h4>
                <p className="text-sm text-muted-foreground">Emergency Fire Services</p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin size={14} className="mr-1" />
                  1.5 km away • Active 24/7
                </p>
              </div>
              <Button size="sm" variant="outline" className="rounded-lg">
                <Phone size={16} />
              </Button>
            </div>
          </Card>

          <Card className="p-4 rounded-xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJ1bGFuY2UlMjBlbWVyZ2VuY3l8ZW58MXx8fHwxNzU3NDAwNDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Ambulance Service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4>108 Ambulance</h4>
                <p className="text-sm text-muted-foreground">Emergency Medical Service</p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin size={14} className="mr-1" />
                  Available across city • Call 108
                </p>
              </div>
              <Button size="sm" variant="outline" className="rounded-lg">
                <Phone size={16} />
              </Button>
            </div>
          </Card>


        </div>
      </div>

    </div>
  );
}