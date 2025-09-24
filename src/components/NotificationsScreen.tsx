import { useState } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ProgressStepper } from "./ProgressStepper";
import { 
  ArrowLeft, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const issues = [
    {
      id: 1,
      title: 'Street Light Outage',
      status: 'resolved',
      priority: 'medium',
      location: '5th Ave & Main St',
      reportedAt: '2 days ago',
      updatedAt: '1 hour ago',
      timeline: [
        { status: 'reported', timestamp: '2 days ago', description: 'Issue reported by you' },
        { status: 'assigned', timestamp: '1 day ago', description: 'Assigned to maintenance team' },
        { status: 'in-progress', timestamp: '4 hours ago', description: 'Work in progress' },
        { status: 'resolved', timestamp: '1 hour ago', description: 'Issue resolved - light repaired' }
      ]
    },
    {
      id: 2,
      title: 'Pothole on Oak Street',
      status: 'in-progress',
      priority: 'high',
      location: 'Oak Street Bridge',
      reportedAt: '1 day ago',
      updatedAt: '3 hours ago',
      timeline: [
        { status: 'reported', timestamp: '1 day ago', description: 'Issue reported by you' },
        { status: 'assigned', timestamp: '6 hours ago', description: 'Assigned to road maintenance crew' },
        { status: 'in-progress', timestamp: '3 hours ago', description: 'Crew on site - repair scheduled' }
      ]
    },
    {
      id: 3,
      title: 'Noise Complaint',
      status: 'pending',
      priority: 'low',
      location: 'Central Park Area',
      reportedAt: '3 hours ago',
      updatedAt: '3 hours ago',
      timeline: [
        { status: 'reported', timestamp: '3 hours ago', description: 'Issue reported by you' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-600 text-white';
      case 'in-progress':
        return 'bg-yellow-500 text-white';
      case 'pending':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'in-progress':
        return <Clock size={16} className="text-yellow-600" />;
      case 'pending':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
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
            className="mr-2 p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-yellow-500">My Issues</h1>
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <RefreshCw size={20} />
        </Button>
      </div>

      {/* Issues List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto hide-scrollbar">
        {issues.map((issue) => (
          <Card key={issue.id} className="rounded-xl border-0 shadow-sm overflow-hidden">
            <div 
              className="p-4 cursor-pointer"
              onClick={() => setExpandedIssue(
                expandedIssue === issue.id ? null : issue.id
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4>{issue.title}</h4>
                    <Badge className={`${getStatusColor(issue.status)} text-xs`}>
                      {issue.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{issue.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle size={14} className={getPriorityColor(issue.priority)} />
                      <span className={getPriorityColor(issue.priority)}>
                        {issue.priority} priority
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    Updated {issue.updatedAt}
                  </p>
                </div>
                
                <ChevronRight 
                  size={20} 
                  className={`text-muted-foreground transition-transform ${
                    expandedIssue === issue.id ? 'rotate-90' : ''
                  }`} 
                />
              </div>
            </div>

            {/* Expanded Timeline */}
            {expandedIssue === issue.id && (
              <div className="px-4 pb-4 border-t border-border bg-accent/30">
                <h4 className="mt-4 mb-3">Progress Tracker</h4>
                
                {/* Progress Stepper */}
                <ProgressStepper 
                  timeline={issue.timeline} 
                  currentStatus={issue.status}
                />
                
                {/* Detailed Timeline */}
                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-700">Detailed Timeline</h4>
                  <div className="space-y-3">
                    {issue.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(event.status)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{event.description}</p>
                          <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}

        {/* Empty State */}
        {issues.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3>No Issues Reported</h3>
            <p className="text-muted-foreground mt-2">
              You haven't reported any issues yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}