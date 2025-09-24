import { CheckCircle, Clock, AlertTriangle, User, Wrench } from 'lucide-react';

interface ProgressStep {
  status: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

interface ProgressStepperProps {
  timeline: Array<{
    status: string;
    timestamp: string;
    description: string;
  }>;
  currentStatus: string;
}

export function ProgressStepper({ timeline, currentStatus }: ProgressStepperProps) {
  // Define the standard progress steps
  const standardSteps = [
    { key: 'reported', label: 'Reported', icon: AlertTriangle },
    { key: 'assigned', label: 'Assigned', icon: User },
    { key: 'in-progress', label: 'In Progress', icon: Wrench },
    { key: 'resolved', label: 'Resolved', icon: CheckCircle }
  ];

  // Map timeline to steps with completion status
  const stepsWithStatus = standardSteps.map((step, index) => {
    const timelineEvent = timeline.find(event => event.status === step.key);
    const isCompleted = timelineEvent !== undefined;
    const isCurrent = step.key === currentStatus;
    
    return {
      ...step,
      completed: isCompleted,
      current: isCurrent,
      timestamp: timelineEvent?.timestamp || '',
      description: timelineEvent?.description || ''
    };
  });

  const getStepColor = (step: any) => {
    if (step.completed) {
      if (step.key === 'resolved') return 'text-green-600 bg-green-100 border-green-600';
      return 'text-blue-600 bg-blue-100 border-blue-600';
    }
    if (step.current) {
      if (step.key === 'in-progress') return 'text-yellow-600 bg-yellow-100 border-yellow-600';
      return 'text-blue-600 bg-blue-100 border-blue-600';
    }
    return 'text-gray-400 bg-gray-100 border-gray-300';
  };

  const getConnectorColor = (index: number) => {
    const currentStep = stepsWithStatus[index];
    const nextStep = stepsWithStatus[index + 1];
    
    if (currentStep.completed) {
      return 'bg-blue-600';
    }
    return 'bg-gray-300';
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between relative">
        {stepsWithStatus.map((step, index) => {
          const IconComponent = step.icon;
          const stepColor = getStepColor(step);
          
          return (
            <div key={step.key} className="flex flex-col items-center relative flex-1">
              {/* Connector Line */}
              {index < stepsWithStatus.length - 1 && (
                <div 
                  className={`absolute top-6 left-1/2 w-full h-0.5 ${getConnectorColor(index)} z-0`}
                  style={{ 
                    left: '50%', 
                    right: '-50%',
                    width: 'calc(100% - 24px)',
                    marginLeft: '12px'
                  }}
                />
              )}
              
              {/* Step Circle */}
              <div className={`
                relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center
                ${stepColor}
                ${step.current && !step.completed ? 'animate-pulse' : ''}
              `}>
                <IconComponent size={20} />
              </div>
              
              {/* Step Label */}
              <div className="mt-2 text-center min-h-[20px]">
                <p className={`text-xs font-medium ${
                  step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                </p>
                {step.timestamp && (
                  <p className="text-xs text-gray-500 mt-1">
                    {step.timestamp}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Current Step Details */}
      {stepsWithStatus.some(step => step.current && step.description) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <Clock size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Current Status</p>
              <p className="text-sm text-blue-700">
                {stepsWithStatus.find(step => step.current)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}