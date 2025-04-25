
import React, { useState, useEffect } from 'react';

// DFA component - Deterministic Finite Automaton visualization
export const DFAVisualization = () => {
  const [currentState, setCurrentState] = useState('start');
  const [input, setInput] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // DFA transition function
  const transition = (state: string, inputSymbol: string): string => {
    switch (state) {
      case 'start':
        return inputSymbol === 'accessForm' ? 'showingForm' : 'start';
      case 'showingForm':
        return inputSymbol === 'submitCredentials' ? 'validating' : 'showingForm';
      case 'validating':
        return inputSymbol === 'validCredentials' ? 'authenticated' : 
               inputSymbol === 'invalidCredentials' ? 'error' : 'validating';
      case 'error':
        return inputSymbol === 'retryLogin' ? 'showingForm' : 'error';
      case 'authenticated':
        return inputSymbol === 'accessResource' ? 'accessGranted' : 
               inputSymbol === 'logout' ? 'start' : 'authenticated';
      case 'accessGranted':
        return inputSymbol === 'logout' ? 'start' : 'accessGranted';
      default:
        return state;
    }
  };
  
  // Simulate a login flow
  useEffect(() => {
    const simulatedInputs = [
      'accessForm',
      'submitCredentials',
      'validCredentials',
      'accessResource'
    ];
    
    setInput(simulatedInputs);
    
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < simulatedInputs.length) {
          setCurrentState(state => transition(state, simulatedInputs[prev]));
          return prev + 1;
        } else {
          clearInterval(timer);
          setIsComplete(true);
          return prev;
        }
      });
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="w-full bg-card rounded-lg p-6 border border-neon-green/20">
      <h3 className="text-xl font-bold text-neon-green mb-4 text-center">Modelo Determinístico (AFD)</h3>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Cada estado tem uma única transição possível para cada entrada
      </p>
      
      <div className="flex items-center justify-center mb-8">
        <div className="code-text">
          Estado atual: <span className="text-neon-green">{currentState}</span>
        </div>
      </div>
      
      <div className="relative h-64 overflow-hidden">
        {/* State nodes */}
        <div className={`automaton-node ${currentState === 'start' ? 'active' : ''} ${currentState === 'start' ? 'initial' : ''} absolute top-10 left-10`}>
          Start
        </div>
        
        <div className={`automaton-node ${currentState === 'showingForm' ? 'active' : ''} absolute top-10 left-1/3`}>
          Form
        </div>
        
        <div className={`automaton-node ${currentState === 'validating' ? 'active' : ''} absolute top-10 left-2/3`}>
          Validating
        </div>
        
        <div className={`automaton-node ${currentState === 'error' ? 'active' : ''} absolute bottom-10 left-1/3`}>
          Error
        </div>
        
        <div className={`automaton-node ${currentState === 'authenticated' ? 'active' : ''} absolute bottom-10 left-2/3`}>
          Auth
        </div>
        
        <div className={`automaton-node ${currentState === 'accessGranted' ? 'active' : ''} final absolute bottom-10 right-10`}>
          Access
        </div>
        
        {/* Connecting lines would be SVG paths in a real implementation */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          {/* Start to Form */}
          <path d="M80,40 L160,40" className="automaton-edge" fill="none" />
          <text x="120" y="30" className="text-xs text-neon-green">accessForm</text>
          
          {/* Form to Validating */}
          <path d="M220,40 L300,40" className="automaton-edge" fill="none" />
          <text x="260" y="30" className="text-xs text-neon-green">submitCredentials</text>
          
          {/* Validating to Auth */}
          <path d="M340,70 L340,150" className="automaton-edge" fill="none" />
          <text x="350" y="110" className="text-xs text-neon-green">validCredentials</text>
          
          {/* Validating to Error */}
          <path d="M300,70 L220,150" className="automaton-edge" fill="none" />
          <text x="240" y="110" className="text-xs text-neon-green">invalidCredentials</text>
          
          {/* Error to Form */}
          <path d="M160,150 L160,70" className="automaton-edge" fill="none" />
          <text x="130" y="110" className="text-xs text-neon-green">retryLogin</text>
          
          {/* Auth to Access */}
          <path d="M380,180 L420,180" className="automaton-edge" fill="none" />
          <text x="400" y="170" className="text-xs text-neon-green">accessResource</text>
          
          {/* Auth/Access to Start (logout) */}
          <path d="M40,180 C40,180 40,40 40,40" className="automaton-edge" fill="none" />
          <text x="10" y="110" className="text-xs text-neon-green">logout</text>
        </svg>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-sm">Sequência de entrada:</p>
        <div className="flex flex-wrap gap-2">
          {input.map((item, index) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded ${index < currentStep ? 'bg-neon-darkGreen text-neon-green' : 'bg-secondary text-muted-foreground'}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// NFA component - Non-deterministic Finite Automaton visualization
export const NFAVisualization = () => {
  const [currentStates, setCurrentStates] = useState<string[]>(['start']);
  const [input, setInput] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // NFA transition function - can return multiple possible states
  const transition = (state: string, inputSymbol: string): string[] => {
    switch (state) {
      case 'start':
        return inputSymbol === 'accessForm' ? ['showingForm'] : [];
      case 'showingForm':
        return inputSymbol === 'submitCredentials' ? ['validating'] : [];
      case 'validating':
        return inputSymbol === 'credentials' ? ['authenticated', 'weakAuth', 'error'] : [];
      case 'weakAuth':
        return inputSymbol === 'secondFactor' ? ['authenticated'] : 
               inputSymbol === 'timeout' ? ['error'] : [];
      case 'error':
        return inputSymbol === 'retryLogin' ? ['showingForm'] : [];
      case 'authenticated':
        return inputSymbol === 'accessResource' ? ['accessGranted'] : 
               inputSymbol === 'logout' ? ['start'] : [];
      case 'accessGranted':
        return inputSymbol === 'logout' ? ['start'] : [];
      default:
        return [];
    }
  };
  
  // Process the entire NFA for the current input
  const processNFA = (states: string[], inputSymbol: string): string[] => {
    let nextStates: string[] = [];
    
    states.forEach(state => {
      const transitions = transition(state, inputSymbol);
      transitions.forEach(newState => {
        if (!nextStates.includes(newState)) {
          nextStates.push(newState);
        }
      });
    });
    
    return nextStates;
  };
  
  // Simulate a login flow with multiple possibilities
  useEffect(() => {
    const simulatedInputs = [
      'accessForm',
      'submitCredentials',
      'credentials',
      'secondFactor',
      'accessResource'
    ];
    
    setInput(simulatedInputs);
    
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < simulatedInputs.length) {
          setCurrentStates(states => processNFA(states, simulatedInputs[prev]));
          return prev + 1;
        } else {
          clearInterval(timer);
          setIsComplete(true);
          return prev;
        }
      });
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="w-full bg-card rounded-lg p-6 border border-neon-green/20">
      <h3 className="text-xl font-bold text-neon-green mb-4 text-center">Modelo Não-Determinístico (AFN)</h3>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Uma entrada pode levar a múltiplos estados possíveis
      </p>
      
      <div className="flex items-center justify-center mb-8">
        <div className="code-text">
          Estados atuais: {currentStates.map((state, index) => (
            <span key={index} className="text-neon-green">{state}{index < currentStates.length - 1 ? ', ' : ''}</span>
          ))}
        </div>
      </div>
      
      <div className="relative h-64 overflow-hidden">
        {/* State nodes */}
        <div className={`automaton-node ${currentStates.includes('start') ? 'active' : ''} initial absolute top-10 left-10`}>
          Start
        </div>
        
        <div className={`automaton-node ${currentStates.includes('showingForm') ? 'active' : ''} absolute top-10 left-1/3`}>
          Form
        </div>
        
        <div className={`automaton-node ${currentStates.includes('validating') ? 'active' : ''} absolute top-10 right-1/3`}>
          Validating
        </div>
        
        <div className={`automaton-node ${currentStates.includes('error') ? 'active' : ''} absolute bottom-10 left-10`}>
          Error
        </div>
        
        <div className={`automaton-node ${currentStates.includes('weakAuth') ? 'active' : ''} absolute bottom-10 left-1/3`}>
          Weak Auth
        </div>
        
        <div className={`automaton-node ${currentStates.includes('authenticated') ? 'active' : ''} absolute bottom-10 right-1/3`}>
          Auth
        </div>
        
        <div className={`automaton-node ${currentStates.includes('accessGranted') ? 'active' : ''} final absolute bottom-10 right-10`}>
          Access
        </div>
        
        {/* Connecting lines would be SVG paths in a real implementation */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          {/* Start to Form */}
          <path d="M80,40 L160,40" className="automaton-edge" fill="none" />
          <text x="120" y="30" className="text-xs text-neon-green">accessForm</text>
          
          {/* Form to Validating */}
          <path d="M220,40 L300,40" className="automaton-edge" fill="none" />
          <text x="260" y="30" className="text-xs text-neon-green">submitCredentials</text>
          
          {/* Validating to multiple states */}
          <path d="M330,70 L330,150" className="automaton-edge" fill="none" />
          <path d="M300,70 L200,150" className="automaton-edge" fill="none" />
          <path d="M270,70 L80,150" className="automaton-edge" fill="none" />
          <text x="240" y="90" className="text-xs text-neon-green">credentials</text>
          
          {/* Weak Auth to Auth or Error */}
          <path d="M200,180 L300,180" className="automaton-edge" fill="none" />
          <text x="240" y="170" className="text-xs text-neon-green">secondFactor</text>
          
          <path d="M160,180 L80,180" className="automaton-edge" fill="none" />
          <text x="120" y="170" className="text-xs text-neon-green">timeout</text>
          
          {/* Auth to Access */}
          <path d="M380,180 L420,180" className="automaton-edge" fill="none" />
          <text x="400" y="170" className="text-xs text-neon-green">accessResource</text>
          
          {/* Error to Form */}
          <path d="M80,150 L160,70" className="automaton-edge" fill="none" />
          <text x="100" y="110" className="text-xs text-neon-green">retryLogin</text>
          
          {/* Logout paths */}
          <path d="M400,150 C300,100 100,100 40,40" className="automaton-edge" fill="none" />
          <text x="200" y="90" className="text-xs text-neon-green">logout</text>
        </svg>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-sm">Sequência de entrada:</p>
        <div className="flex flex-wrap gap-2">
          {input.map((item, index) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded ${index < currentStep ? 'bg-neon-darkGreen text-neon-green' : 'bg-secondary text-muted-foreground'}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
