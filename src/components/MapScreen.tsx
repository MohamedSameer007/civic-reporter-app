import { useState } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Filter,
  MapPin,
  AlertTriangle,
  Construction,
  Lightbulb,
  Volume2,
  Plus,
  Satellite,
  Map
} from 'lucide-react';

interface MapScreenProps {
  onBack: () => void;
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

export function MapScreen({ onBack, onNavigate }: MapScreenProps) {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isSatelliteMode, setIsSatelliteMode] = useState(false);

  const issues: Issue[] = [
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
    },
    {
      id: 6,
      title: 'Damaged Traffic Sign',
      type: 'safety',
      status: 'pending',
      priority: 'high',
      location: { x: 85, y: 40 },
      description: 'Stop sign is bent and barely visible',
      reportedAt: '6 hours ago'
    },
    {
      id: 9,
      title: 'Illegal Dumping',
      type: 'environment',
      status: 'pending',
      priority: 'medium',
      location: { x: 80, y: 75 },
      description: 'Large pile of construction debris dumped illegally',
      reportedAt: '3 days ago'
    },
    {
      id: 10,
      title: 'Broken Bench',
      type: 'infrastructure',
      status: 'pending',
      priority: 'low',
      location: { x: 40, y: 85 },
      description: 'Park bench has broken slats and is unsafe',
      reportedAt: '1 week ago'
    },
    {
      id: 11,
      title: 'Loud Construction',
      type: 'noise',
      status: 'in-progress',
      priority: 'medium',
      location: { x: 70, y: 15 },
      description: 'Construction work exceeding noise limits',
      reportedAt: '4 hours ago'
    },
    {
      id: 12,
      title: 'Missing Manhole Cover',
      type: 'safety',
      status: 'pending',
      priority: 'high',
      location: { x: 90, y: 65 },
      description: 'Open manhole creating serious safety hazard',
      reportedAt: '2 hours ago'
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
        return 'border-red-600';
      case 'medium':
        return 'border-yellow-600';
      case 'low':
        return 'border-green-600';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <div className="w-full bg-background flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-2 p-2 bg-white hover:bg-white/90"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-yellow-500">Issue Map</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-2 transition-colors ${isSatelliteMode ? 'bg-gray-700 text-white hover:bg-gray-800' : 'bg-white hover:bg-white/90'}`}
            onClick={() => setIsSatelliteMode(!isSatelliteMode)}
          >
            {isSatelliteMode ? <Map size={20} /> : <Satellite size={20} />}
          </Button>
          <Button variant="ghost" size="sm" className="p-2 bg-white hover:bg-white/90">
            <Search size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 bg-white hover:bg-white/90"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="p-4 border-b border-border bg-accent/30">
          <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
            <Badge variant="outline" className="whitespace-nowrap">All Types</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Infrastructure</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Safety</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Environment</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Noise</Badge>
          </div>
        </div>
      )}

      {/* Map Container with Scrolling */}
      <div className={`flex-1 relative overflow-auto transition-all duration-300 ${isSatelliteMode ? 'bg-slate-800' : 'bg-green-100'}`}>
        {/* Scrollable Map Background - Made larger than viewport */}
        <div className={`relative transition-all duration-300 ${isSatelliteMode 
          ? 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-green-200 to-green-300'}`} 
          style={{ width: '200%', height: '200%', minWidth: '800px', minHeight: '800px' }}>
          
          {!isSatelliteMode ? (
            /* Regular Map View */
            <>
              {/* Street Grid Pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-30">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#666" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              {/* Extended Mock Streets for larger map */}
              <div className="absolute top-1/8 left-0 w-full h-2 bg-gray-400"></div>
              <div className="absolute top-1/4 left-0 w-full h-2 bg-gray-400"></div>
              <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-400"></div>
              <div className="absolute top-2/3 left-0 w-full h-2 bg-gray-400"></div>
              <div className="absolute top-3/4 left-0 w-full h-2 bg-gray-400"></div>
              <div className="absolute top-7/8 left-0 w-full h-2 bg-gray-400"></div>
              
              <div className="absolute top-0 left-1/8 w-2 h-full bg-gray-400"></div>
              <div className="absolute top-0 left-1/4 w-2 h-full bg-gray-400"></div>
              <div className="absolute top-0 left-1/3 w-2 h-full bg-gray-400"></div>
              <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-400"></div>
              <div className="absolute top-0 left-2/3 w-2 h-full bg-gray-400"></div>
              <div className="absolute top-0 left-3/4 w-2 h-full bg-gray-400"></div>
              <div className="absolute top-0 left-7/8 w-2 h-full bg-gray-400"></div>
              
              {/* Extended Mock Buildings for larger map */}
              <div className="absolute top-1/6 left-1/8 w-12 h-16 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/6 left-1/5 w-12 h-16 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/6 left-2/5 w-10 h-14 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/6 left-3/5 w-14 h-18 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/6 left-4/5 w-8 h-12 bg-gray-600 rounded shadow-lg"></div>
              
              <div className="absolute top-1/3 left-1/8 w-10 h-12 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/3 left-3/8 w-16 h-20 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/3 left-5/8 w-12 h-16 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/3 left-7/8 w-10 h-14 bg-gray-600 rounded shadow-lg"></div>
              
              <div className="absolute top-1/2 left-1/8 w-14 h-18 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-16 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/2 left-1/2 w-10 h-12 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/2 left-3/4 w-10 h-12 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-1/2 left-7/8 w-16 h-20 bg-gray-600 rounded shadow-lg"></div>
              
              <div className="absolute top-2/3 left-1/6 w-12 h-16 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-2/3 left-2/6 w-10 h-14 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-2/3 left-4/6 w-14 h-18 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute top-2/3 left-5/6 w-8 h-12 bg-gray-600 rounded shadow-lg"></div>
              
              <div className="absolute bottom-1/4 left-1/8 w-10 h-12 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute bottom-1/4 left-1/3 w-12 h-16 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute bottom-1/4 left-1/2 w-14 h-18 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute bottom-1/4 left-2/3 w-8 h-12 bg-gray-600 rounded shadow-lg"></div>
              <div className="absolute bottom-1/4 left-5/6 w-10 h-14 bg-gray-600 rounded shadow-lg"></div>
            </>
          ) : (
            /* Satellite View */
            <>
              {/* Satellite terrain patterns - Extended for larger map */}
              <div className="absolute inset-0">
                {/* Urban areas with varied textures */}
                <div className="absolute top-0 left-0 w-full h-full opacity-40">
                  <div className="absolute top-1/8 left-1/8 w-16 h-20 bg-gray-500 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/8 left-3/8 w-12 h-14 bg-gray-600 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/8 left-5/8 w-18 h-22 bg-gray-500 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/8 left-7/8 w-14 h-16 bg-gray-600 rounded-sm shadow-md"></div>
                  
                  <div className="absolute top-1/4 left-1/6 w-10 h-12 bg-gray-500 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/4 left-2/6 w-16 h-20 bg-gray-600 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/4 left-4/6 w-12 h-14 bg-gray-500 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/4 left-5/6 w-14 h-16 bg-gray-600 rounded-sm shadow-md"></div>
                  
                  <div className="absolute top-1/2 left-1/8 w-12 h-14 bg-gray-600 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/2 left-3/8 w-18 h-22 bg-gray-500 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/2 left-5/8 w-10 h-12 bg-gray-600 rounded-sm shadow-md"></div>
                  <div className="absolute top-1/2 left-7/8 w-16 h-20 bg-gray-500 rounded-sm shadow-md"></div>
                  
                  <div className="absolute top-3/4 left-1/6 w-14 h-16 bg-gray-600 rounded-sm shadow-md"></div>
                  <div className="absolute top-3/4 left-2/6 w-10 h-12 bg-gray-500 rounded-sm shadow-md"></div>
                  <div className="absolute top-3/4 left-4/6 w-16 h-20 bg-gray-600 rounded-sm shadow-md"></div>
                  <div className="absolute top-3/4 left-5/6 w-12 h-14 bg-gray-500 rounded-sm shadow-md"></div>
                </div>
                
                {/* Extended Vegetation areas */}
                <div className="absolute top-1/8 right-1/8 w-20 h-24 bg-green-700 rounded-lg opacity-60"></div>
                <div className="absolute top-1/8 left-1/8 w-16 h-20 bg-green-800 rounded-lg opacity-50"></div>
                <div className="absolute top-1/3 left-1/3 w-12 h-14 bg-green-700 rounded-lg opacity-40"></div>
                <div className="absolute top-1/3 right-1/3 w-18 h-22 bg-green-800 rounded-lg opacity-55"></div>
                <div className="absolute top-2/3 left-1/8 w-14 h-16 bg-green-700 rounded-lg opacity-45"></div>
                <div className="absolute top-2/3 left-2/3 w-12 h-14 bg-green-700 rounded-lg opacity-40"></div>
                <div className="absolute bottom-1/5 left-1/8 w-16 h-20 bg-green-800 rounded-lg opacity-50"></div>
                <div className="absolute bottom-1/5 right-1/8 w-20 h-24 bg-green-700 rounded-lg opacity-60"></div>
                
                {/* Extended Water features */}
                <div className="absolute top-1/6 left-1/8 w-32 h-6 bg-blue-800 rounded-full opacity-70"></div>
                <div className="absolute top-1/4 left-1/6 w-24 h-4 bg-blue-800 rounded-full opacity-70"></div>
                <div className="absolute top-1/2 left-1/3 w-28 h-5 bg-blue-900 rounded-full opacity-65"></div>
                <div className="absolute top-2/3 right-1/4 w-20 h-3 bg-blue-800 rounded-full opacity-70"></div>
                <div className="absolute bottom-1/6 right-1/6 w-8 h-8 bg-blue-900 rounded-full opacity-60"></div>
                <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-blue-800 rounded-full opacity-65"></div>
                
                {/* Extended Roads in satellite view */}
                <div className="absolute top-1/8 left-0 w-full h-1 bg-gray-300 opacity-80"></div>
                <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-300 opacity-80"></div>
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 opacity-80"></div>
                <div className="absolute top-2/3 left-0 w-full h-1 bg-gray-300 opacity-80"></div>
                <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-300 opacity-80"></div>
                <div className="absolute top-7/8 left-0 w-full h-1 bg-gray-300 opacity-80"></div>
                
                <div className="absolute top-0 left-1/8 w-1 h-full bg-gray-300 opacity-80"></div>
                <div className="absolute top-0 left-1/4 w-1 h-full bg-gray-300 opacity-80"></div>
                <div className="absolute top-0 left-1/3 w-1 h-full bg-gray-300 opacity-80"></div>
                <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-300 opacity-80"></div>
                <div className="absolute top-0 left-2/3 w-1 h-full bg-gray-300 opacity-80"></div>
                <div className="absolute top-0 left-3/4 w-1 h-full bg-gray-300 opacity-80"></div>
                <div className="absolute top-0 left-7/8 w-1 h-full bg-gray-300 opacity-80"></div>
                
                {/* Satellite texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-600/10 to-slate-700/20"></div>
                
                {/* Noise texture for satellite realism */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <filter id="noise">
                      <feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
                      <feColorMatrix type="saturate" values="0"/>
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1"/>
                </svg>
              </div>
            </>
          )}
        </div>

        {/* Issue Markers */}
        {issues.map((issue) => (
          <div
            key={issue.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10`}
            style={{
              left: `${issue.location.x}%`,
              top: `${issue.location.y}%`
            }}
            onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}
          >
            {/* Marker Pin */}
            <div className={`relative`}>
              <div className={`w-8 h-8 rounded-full border-2 ${getPriorityColor(issue.priority)} bg-white shadow-lg flex items-center justify-center`}>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(issue.status)}`}></div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>

            {/* Chat Bubble Overlay */}
            {selectedIssue?.id === issue.id && (
              <Card className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 p-3 shadow-xl z-20 border-0 rounded-xl">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {getIssueIcon(issue.type)}
                      <h4 className="text-sm">{issue.title}</h4>
                    </div>
                    <Badge className={`${getStatusColor(issue.status)} text-white text-xs`}>
                      {issue.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">{issue.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Reported {issue.reportedAt}</span>
                    <span className={`${issue.priority === 'high' ? 'text-red-600' : issue.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {issue.priority} priority
                    </span>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1 text-xs h-7">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Update
                    </Button>
                  </div>
                </div>
                
                {/* Chat bubble arrow */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
              </Card>
            )}
          </div>
        ))}

        {/* Current Location Indicator - Positioned for initial view */}
        <div className="absolute" style={{ top: '30%', left: '40%' }}>
          <div className="relative">
            <div className="w-4 h-4 bg-gray-700 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 bg-gray-700 rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-6">
        <Button 
          className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-800 shadow-lg"
          onClick={() => onNavigate('add-issue')}
        >
          <Plus size={24} />
        </Button>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span>Resolved</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Pending</span>
            </div>
          </div>
          <span className="text-muted-foreground">{issues.length} issues</span>
        </div>
      </div>
    </div>
  );
}