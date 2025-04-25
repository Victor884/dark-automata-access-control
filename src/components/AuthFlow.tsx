
import React, { useState, useEffect } from 'react';

// Documentation Component
const AutomataDocumentation = () => (
  <div className="w-full bg-card rounded-lg p-6 border border-neon-green/20 mb-8">
    <h2 className="text-xl font-bold text-neon-green mb-4">Documentação dos Autômatos</h2>
    
    <div className="space-y-4 text-left">
      <section>
        <h3 className="text-lg font-semibold text-neon-green mb-2">Autômato Finito Determinístico (AFD)</h3>
        <p className="text-sm text-muted-foreground">
          O AFD modela o fluxo de autenticação com transições determinísticas onde:
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
          <li>Q0: Estado inicial (não autenticado)</li>
          <li>Q1: Formulário de acesso exibido</li>
          <li>Q2: Validação de credenciais</li>
          <li>Q3: Estado de erro (credenciais inválidas)</li>
          <li>Q4: Autenticado com sucesso</li>
          <li>Q5: Acesso concedido aos recursos (estado final)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-neon-green mb-2">Autômato Finito Não-Determinístico (AFN)</h3>
        <p className="text-sm text-muted-foreground">
          O AFN representa múltiplos caminhos possíveis durante a autenticação:
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
          <li>Q0: Estado inicial (não autenticado)</li>
          <li>Q1: Formulário de acesso exibido</li>
          <li>Q2: Validação de credenciais</li>
          <li>Q3: Autenticação fraca (requer 2FA)</li>
          <li>Q4: Estado de erro</li>
          <li>Q5: Autenticado com sucesso</li>
          <li>Q6: Acesso concedido aos recursos (estado final)</li>
        </ul>
      </section>
    </div>
  </div>
);

// DFA component with traditional state notation
export const DFAVisualization = () => {
  const [currentState, setCurrentState] = useState('Q0');
  const [input, setInput] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Updated DFA transition function with Q-notation
  const transition = (state: string, inputSymbol: string): string => {
    switch (state) {
      case 'Q0': return inputSymbol === 'accessForm' ? 'Q1' : 'Q0';
      case 'Q1': return inputSymbol === 'submitCredentials' ? 'Q2' : 'Q1';
      case 'Q2': return inputSymbol === 'validCredentials' ? 'Q4' : 
                        inputSymbol === 'invalidCredentials' ? 'Q3' : 'Q2';
      case 'Q3': return inputSymbol === 'retryLogin' ? 'Q1' : 'Q3';
      case 'Q4': return inputSymbol === 'accessResource' ? 'Q5' : 'Q4';
      case 'Q5': return inputSymbol === 'logout' ? 'Q0' : 'Q5';
      default: return state;
    }
  };
  
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
        }
        clearInterval(timer);
        return prev;
      });
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="w-full bg-card rounded-lg p-6 border border-neon-green/20">
      <h2 className="text-xl font-bold text-neon-green mb-4">Autômato Finito Determinístico (AFD)</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Transições determinísticas no processo de autenticação
      </p>
      
      <div className="flex items-center justify-center mb-8">
        <div className="code-text">
          Estado atual: <span className="text-neon-green">{currentState}</span>
        </div>
      </div>
      
      <div className="relative h-64 overflow-hidden">
        {/* State nodes with Q-notation */}
        <div className={`automaton-node ${currentState === 'Q0' ? 'active' : ''} initial absolute top-10 left-10`}>
          Q0
        </div>
        
        <div className={`automaton-node ${currentState === 'Q1' ? 'active' : ''} absolute top-10 left-1/3`}>
          Q1
        </div>
        
        <div className={`automaton-node ${currentState === 'Q2' ? 'active' : ''} absolute top-10 left-2/3`}>
          Q2
        </div>
        
        <div className={`automaton-node ${currentState === 'Q3' ? 'active' : ''} absolute bottom-10 left-1/3`}>
          Q3
        </div>
        
        <div className={`automaton-node ${currentState === 'Q4' ? 'active' : ''} absolute bottom-10 left-2/3`}>
          Q4
        </div>
        
        <div className={`automaton-node ${currentState === 'Q5' ? 'active' : ''} final absolute bottom-10 right-10`}>
          Q5
        </div>
        
        {/* SVG paths with transition labels */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <path d="M80,40 L160,40" className="automaton-edge" fill="none" />
          <text x="120" y="30" className="text-xs text-neon-green">accessForm</text>
          
          <path d="M220,40 L300,40" className="automaton-edge" fill="none" />
          <text x="260" y="30" className="text-xs text-neon-green">submitCredentials</text>
          
          <path d="M340,70 L340,150" className="automaton-edge" fill="none" />
          <text x="350" y="110" className="text-xs text-neon-green">validCredentials</text>
          
          <path d="M300,70 L220,150" className="automaton-edge" fill="none" />
          <text x="240" y="110" className="text-xs text-neon-green">invalidCredentials</text>
          
          <path d="M160,150 L160,70" className="automaton-edge" fill="none" />
          <text x="130" y="110" className="text-xs text-neon-green">retryLogin</text>
          
          <path d="M380,180 L420,180" className="automaton-edge" fill="none" />
          <text x="400" y="170" className="text-xs text-neon-green">accessResource</text>
          
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

// NFA component with traditional state notation
export const NFAVisualization = () => {
  const [currentStates, setCurrentStates] = useState<string[]>(['Q0']);
  const [input, setInput] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Updated NFA transition function with Q-notation
  const transition = (state: string, inputSymbol: string): string[] => {
    switch (state) {
      case 'Q0': return inputSymbol === 'accessForm' ? ['Q1'] : [];
      case 'Q1': return inputSymbol === 'submitCredentials' ? ['Q2'] : [];
      case 'Q2': return inputSymbol === 'credentials' ? ['Q3', 'Q4', 'Q5'] : [];
      case 'Q3': return inputSymbol === 'secondFactor' ? ['Q5'] : 
                        inputSymbol === 'timeout' ? ['Q4'] : [];
      case 'Q4': return inputSymbol === 'retryLogin' ? ['Q1'] : [];
      case 'Q5': return inputSymbol === 'accessResource' ? ['Q6'] : [];
      case 'Q6': return inputSymbol === 'logout' ? ['Q0'] : [];
      default: return [];
    }
  };
  
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
          setCurrentStates(states => {
            const nextStates: string[] = [];
            states.forEach(state => {
              const transitions = transition(state, simulatedInputs[prev]);
              transitions.forEach(newState => {
                if (!nextStates.includes(newState)) {
                  nextStates.push(newState);
                }
              });
            });
            return nextStates;
          });
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-card rounded-lg p-6 border border-neon-green/20">
      <h2 className="text-xl font-bold text-neon-green mb-4">Autômato Finito Não-Determinístico (AFN)</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Transições não-determinísticas com múltiplos caminhos possíveis
      </p>
      
      <div className="flex items-center justify-center mb-8">
        <div className="code-text">
          Estados atuais: {currentStates.join(', ')}
        </div>
      </div>
      
      <div className="relative h-64 overflow-hidden">
        {/* State nodes with Q-notation */}
        <div className={`automaton-node ${currentStates.includes('Q0') ? 'active' : ''} initial absolute top-10 left-10`}>
          Q0
        </div>
        
        <div className={`automaton-node ${currentStates.includes('Q1') ? 'active' : ''} absolute top-10 left-1/3`}>
          Q1
        </div>
        
        <div className={`automaton-node ${currentStates.includes('Q2') ? 'active' : ''} absolute top-10 right-1/3`}>
          Q2
        </div>
        
        <div className={`automaton-node ${currentStates.includes('Q3') ? 'active' : ''} absolute bottom-10 left-10`}>
          Q3
        </div>
        
        <div className={`automaton-node ${currentStates.includes('Q4') ? 'active' : ''} absolute bottom-10 left-1/3`}>
          Q4
        </div>
        
        <div className={`automaton-node ${currentStates.includes('Q5') ? 'active' : ''} absolute bottom-10 right-1/3`}>
          Q5
        </div>
        
        <div className={`automaton-node ${currentStates.includes('Q6') ? 'active' : ''} final absolute bottom-10 right-10`}>
          Q6
        </div>
        
        {/* SVG paths with transition labels */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <path d="M80,40 L160,40" className="automaton-edge" fill="none" />
          <text x="120" y="30" className="text-xs text-neon-green">accessForm</text>
          
          <path d="M220,40 L300,40" className="automaton-edge" fill="none" />
          <text x="260" y="30" className="text-xs text-neon-green">submitCredentials</text>
          
          {/* Multiple paths from Q2 */}
          <path d="M340,70 L80,150" className="automaton-edge" fill="none" />
          <path d="M340,70 L220,150" className="automaton-edge" fill="none" />
          <path d="M340,70 L340,150" className="automaton-edge" fill="none" />
          <text x="240" y="90" className="text-xs text-neon-green">credentials</text>
          
          <path d="M80,180 L340,180" className="automaton-edge" fill="none" />
          <text x="200" y="170" className="text-xs text-neon-green">secondFactor</text>
          
          <path d="M380,180 L420,180" className="automaton-edge" fill="none" />
          <text x="400" y="170" className="text-xs text-neon-green">accessResource</text>
          
          <path d="M160,150 L160,70" className="automaton-edge" fill="none" />
          <text x="130" y="110" className="text-xs text-neon-green">retryLogin</text>
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
