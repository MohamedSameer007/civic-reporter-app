import { useState } from 'react';
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  ArrowLeft, 
  Camera, 
  Mic, 
  MapPin, 
  AlertTriangle,
  Construction,
  Zap,
  Droplets,
  Car,
  TreePine,
  Lightbulb,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AddIssueScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function AddIssueScreen({ onBack, onSubmit }: AddIssueScreenProps) {
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showInfrastructure, setShowInfrastructure] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmit();
  };

  return (
    <div className="w-full bg-background flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-2 p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-black">Report Issue</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        
        <div className="p-4 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-black">Describe the issue</Label>
              <Textarea
                id="description"
                placeholder="Please provide details about the issue you're reporting..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-32 bg-input-background rounded-xl border border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 resize-none"
                required
              />
            </div>

            {/* Error Alert */}
            {showError && (
              <Alert className="border-[#D32F2F] bg-red-50">
                <AlertTriangle className="h-4 w-4 text-[#D32F2F]" />
                <AlertDescription className="text-[#D32F2F]">
                  Please add details before submitting
                </AlertDescription>
              </Alert>
            )}

            {/* Media and Location Buttons */}
            <div className="space-y-3">
              <Label className="text-black">Add attachments</Label>
              <div className="grid grid-cols-3 gap-3">
                <Card 
                  className={`p-4 cursor-pointer transition-colors border-2 border-yellow-500 ${
                    hasPhoto ? 'bg-[#1976D2] text-white' : 'bg-card hover:bg-accent'
                  }`}
                  onClick={() => setHasPhoto(!hasPhoto)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Camera size={24} />
                    <span className="text-sm">Photo</span>
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer transition-colors border-2 border-yellow-500 ${
                    hasAudio ? 'bg-[#1976D2] text-white' : 'bg-card hover:bg-accent'
                  }`}
                  onClick={() => setHasAudio(!hasAudio)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Mic size={24} />
                    <span className="text-sm">Audio</span>
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer transition-colors border-2 border-yellow-500 ${
                    hasLocation ? 'bg-[#1976D2] text-white' : 'bg-card hover:bg-accent'
                  }`}
                  onClick={() => setHasLocation(!hasLocation)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <MapPin size={24} />
                    <span className="text-sm">Location</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Attachments Preview */}
            {(hasPhoto || hasAudio || hasLocation) && (
              <Card className="p-4 bg-accent/50">
                <h4 className="mb-3">Attachments:</h4>
                <div className="space-y-2">
                  {hasPhoto && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Camera size={16} className="text-[#1976D2]" />
                      <span>Photo captured</span>
                    </div>
                  )}
                  {hasAudio && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mic size={16} className="text-[#1976D2]" />
                      <span>Audio recording (0:45)</span>
                    </div>
                  )}
                  {hasLocation && (
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin size={16} className="text-[#1976D2]" />
                      <span>Current location (GPS)</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-[#1976D2] hover:bg-[#1565C0] rounded-xl py-3 border-2 border-yellow-500"
            >
              Submit Report
            </Button>
          </form>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Label className="text-black">Quick Report</Label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button 
                variant="outline" 
                className="p-4 h-auto flex-col space-y-2 rounded-xl border-[#D32F2F] text-[#D32F2F] hover:bg-red-50"
                onClick={() => {
                  setDescription('Emergency: Immediate assistance required');
                  setHasLocation(true);
                }}
              >
                <AlertTriangle size={24} />
                <span>Emergency</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="p-4 h-auto flex-col space-y-2 rounded-xl border border-gray-400"
                onClick={() => setShowInfrastructure(!showInfrastructure)}
              >
                <div className="flex items-center space-x-2">
                  <MapPin size={24} />
                  {showInfrastructure ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                <span className="text-center text-black">Infrastructure</span>
                <span className="text-xs text-muted-foreground text-center">Roads, Utilities, Facilities</span>
              </Button>
            </div>

            {/* Infrastructure Categories (expandable) */}
            {showInfrastructure && (
              <div className="space-y-3 mt-4 p-4 bg-gray-50 rounded-xl border border-gray-400">
                <Label className="text-black">Select Infrastructure Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="p-3 h-auto flex-col space-y-2 rounded-xl border border-gray-400 text-black hover:bg-white"
                    onClick={() => {
                      setDescription('Road maintenance issue: Potholes, damaged pavement, or road surface problems');
                      setHasLocation(true);
                      setShowInfrastructure(false);
                    }}
                  >
                    <Construction size={20} />
                    <span className="text-sm text-center">Roads & Construction</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="p-3 h-auto flex-col space-y-2 rounded-xl border border-gray-400 text-black hover:bg-white"
                    onClick={() => {
                      setDescription('Electrical infrastructure issue: Power outage, streetlight malfunction, or electrical hazard');
                      setHasLocation(true);
                      setShowInfrastructure(false);
                    }}
                  >
                    <Zap size={20} />
                    <span className="text-sm text-center">Electrical & Power</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="p-3 h-auto flex-col space-y-2 rounded-xl border border-gray-400 text-black hover:bg-white"
                    onClick={() => {
                      setDescription('Water infrastructure issue: Water leak, drainage problem, or water supply disruption');
                      setHasLocation(true);
                      setShowInfrastructure(false);
                    }}
                  >
                    <Droplets size={20} />
                    <span className="text-sm text-center">Water & Drainage</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="p-3 h-auto flex-col space-y-2 rounded-xl border border-gray-400 text-black hover:bg-white"
                    onClick={() => {
                      setDescription('Traffic infrastructure issue: Traffic light malfunction, damaged signage, or parking problems');
                      setHasLocation(true);
                      setShowInfrastructure(false);
                    }}
                  >
                    <Car size={20} />
                    <span className="text-sm text-center">Traffic & Transport</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="p-3 h-auto flex-col space-y-2 rounded-xl border border-gray-400 text-black hover:bg-white"
                    onClick={() => {
                      setDescription('Public space issue: Park maintenance, tree damage, or public facility problems');
                      setHasLocation(true);
                      setShowInfrastructure(false);
                    }}
                  >
                    <TreePine size={20} />
                    <span className="text-sm text-center">Parks & Public Spaces</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="p-3 h-auto flex-col space-y-2 rounded-xl border border-gray-400 text-black hover:bg-white"
                    onClick={() => {
                      setDescription('Street lighting issue: Broken streetlights, inadequate lighting, or lighting safety concerns');
                      setHasLocation(true);
                      setShowInfrastructure(false);
                    }}
                  >
                    <Lightbulb size={20} />
                    <span className="text-sm text-center">Street Lighting</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}