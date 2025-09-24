import { useState } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  Search,
  MessageCircle,
  Bell,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Send,
  Filter,
  MoreVertical
} from 'lucide-react';

interface MessagesScreenProps {
  onBack: () => void;
}

interface Message {
  id: number;
  type: 'chat' | 'notification' | 'announcement' | 'alert';
  sender?: string;
  title: string;
  content: string;
  timestamp: string;
  unread: boolean;
  priority?: 'high' | 'medium' | 'low';
  location?: string;
  issueId?: string;
  participants?: number;
  avatar?: string;
}

export function MessagesScreen({ onBack }: MessagesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'chats' | 'notifications' | 'announcements'>('all');

  const sampleMessages: Message[] = [
    {
      id: 1,
      type: 'alert',
      title: 'Emergency Road Closure',
      content: 'Main Street is closed due to water pipe burst. Alternative routes available via Gandhi Road.',
      timestamp: '5 min ago',
      unread: true,
      priority: 'high',
      location: 'Main Street, Thiruvannamalai'
    },
    {
      id: 2,
      type: 'chat',
      sender: 'Civic Community Group',
      title: 'Street Light Issue Discussion',
      content: 'Residents are discussing the street light outage on Temple Road. 12 people involved.',
      timestamp: '15 min ago',
      unread: true,
      participants: 12,
      location: 'Temple Road',
      avatar: 'C'
    },
    {
      id: 3,
      type: 'notification',
      title: 'Your Issue #124 - Status Update',
      content: 'Pothole repair on Gandhi Road has been scheduled for tomorrow morning.',
      timestamp: '1 hour ago',
      unread: false,
      issueId: '#124',
      location: 'Gandhi Road'
    },
    {
      id: 4,
      type: 'announcement',
      title: 'Municipal Corporation Notice',
      content: 'Scheduled power maintenance on March 15th from 9 AM to 2 PM in Sector 3.',
      timestamp: '2 hours ago',
      unread: true,
      priority: 'medium',
      location: 'Sector 3'
    },
    {
      id: 5,
      type: 'chat',
      sender: 'Neighborhood Watch',
      title: 'Park Maintenance Updates',
      content: 'Discussion about the new playground equipment installation. Join the conversation!',
      timestamp: '3 hours ago',
      unread: false,
      participants: 8,
      location: 'City Park',
      avatar: 'N'
    },
    {
      id: 6,
      type: 'notification',
      title: 'Issue Resolved - Thank You!',
      content: 'Your reported garbage collection issue has been resolved. Thank you for being an active citizen.',
      timestamp: '1 day ago',
      unread: false,
      issueId: '#118'
    },
    {
      id: 7,
      type: 'chat',
      sender: 'Local Business Forum',
      title: 'Traffic Signal Request',
      content: 'Business owners are supporting the traffic signal request at the busy intersection.',
      timestamp: '1 day ago',
      unread: false,
      participants: 15,
      location: 'Market Junction',
      avatar: 'L'
    },
    {
      id: 8,
      type: 'announcement',
      title: 'Community Meeting Invitation',
      content: 'Monthly town hall meeting this Saturday at 10 AM. Discuss ongoing civic improvements.',
      timestamp: '2 days ago',
      unread: false,
      priority: 'medium'
    },
    {
      id: 9,
      type: 'notification',
      title: 'Weekly Summary Report',
      content: 'This week: 8 issues reported, 5 resolved, 3 in progress. Great community participation!',
      timestamp: '3 days ago',
      unread: false
    },
    {
      id: 10,
      type: 'chat',
      sender: 'Student Council',
      title: 'School Zone Safety',
      content: 'Parents and students discussing school zone safety improvements.',
      timestamp: '3 days ago',
      unread: false,
      participants: 22,
      location: 'Government School Area',
      avatar: 'S'
    }
  ];

  const filteredMessages = sampleMessages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (message.sender && message.sender.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'chats' && message.type === 'chat') ||
                         (activeFilter === 'notifications' && message.type === 'notification') ||
                         (activeFilter === 'announcements' && (message.type === 'announcement' || message.type === 'alert'));
    
    return matchesSearch && matchesFilter;
  });

  const getMessageIcon = (type: string, priority?: string) => {
    switch (type) {
      case 'chat':
        return <MessageCircle size={16} className="text-[#1976D2]" />;
      case 'notification':
        return <Bell size={16} className="text-[#388E3C]" />;
      case 'announcement':
        return <Info size={16} className="text-[#1976D2]" />;
      case 'alert':
        return <AlertTriangle size={16} className="text-[#D32F2F]" />;
      default:
        return <MessageCircle size={16} className="text-[#1976D2]" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#D32F2F] text-white';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'low':
        return 'bg-[#388E3C] text-white';
      default:
        return 'bg-[#1976D2] text-white';
    }
  };

  const unreadCount = sampleMessages.filter(m => m.unread).length;

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
          <div>
            <h1 className="text-yellow-500">Messages</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-white/70">{unreadCount} unread messages</p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <MoreVertical size={20} className="text-white" />
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All', count: sampleMessages.length },
            { key: 'chats', label: 'Chats', count: sampleMessages.filter(m => m.type === 'chat').length },
            { key: 'notifications', label: 'Updates', count: sampleMessages.filter(m => m.type === 'notification').length },
            { key: 'announcements', label: 'News', count: sampleMessages.filter(m => m.type === 'announcement' || m.type === 'alert').length }
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.key as any)}
              className={`text-xs ${
                activeFilter === filter.key 
                  ? 'bg-[#1976D2] text-white' 
                  : 'bg-white text-foreground border-white/20'
              }`}
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`rounded-xl border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
              message.unread ? 'bg-[#1976D2]/5 border-l-4 border-l-[#1976D2]' : 'bg-card'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start space-x-3">
                {/* Avatar or Icon */}
                <div className="flex-shrink-0 mt-1">
                  {message.type === 'chat' && message.avatar ? (
                    <Avatar className="w-8 h-8 bg-[#1976D2] text-white text-sm">
                      {message.avatar}
                    </Avatar>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      {getMessageIcon(message.type, message.priority)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {message.sender && (
                        <span className="text-sm text-muted-foreground">{message.sender}</span>
                      )}
                      {message.priority && (
                        <Badge className={`text-xs px-2 py-0.5 ${getPriorityColor(message.priority)}`}>
                          {message.priority.toUpperCase()}
                        </Badge>
                      )}
                      {message.unread && (
                        <div className="w-2 h-2 bg-[#1976D2] rounded-full"></div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>

                  {/* Title */}
                  <h4 className={`mb-2 ${message.unread ? 'text-foreground' : 'text-foreground'}`}>
                    {message.title}
                  </h4>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {message.content}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      {message.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{message.location}</span>
                        </div>
                      )}
                      {message.participants && (
                        <div className="flex items-center space-x-1">
                          <Users size={12} />
                          <span>{message.participants} participants</span>
                        </div>
                      )}
                      {message.issueId && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle2 size={12} />
                          <span>{message.issueId}</span>
                        </div>
                      )}
                    </div>

                    {message.type === 'chat' && (
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-[#1976D2]">
                        Join Chat
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredMessages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-white mb-2">No messages found</h3>
            <p className="text-white/70 text-sm">
              {searchQuery ? 'Try adjusting your search terms' : 'Check back later for community updates'}
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1 bg-[#1976D2] hover:bg-[#1976D2]/90 text-white"
          >
            <MessageCircle size={16} className="mr-2" />
            Start Chat
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="bg-white text-foreground border-white/20"
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}