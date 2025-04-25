
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DFAVisualization, NFAVisualization, AutomataDocumentation } from "@/components/AuthFlow";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tighter text-center">
            <span className="text-neon-green animate-glow">Linguagens Formais e Autômatos</span>
            <span className="text-sm ml-2 text-muted-foreground">Controle de Acesso a Recursos</span>
          </h1>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            <p>Criado por: João Victor Vieira Matos e Bruno de Alencar Ferreira</p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <AutomataDocumentation />
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => navigate("/login")}
                className="bg-neon-darkGreen hover:bg-neon-darkGreen/80 text-neon-green border border-neon-green/50 hover:shadow-[0_0_10px_rgba(57,255,20,0.5)]"
              >
                Fazer Login
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                variant="outline" 
                className="border-neon-green/30 text-neon-green hover:bg-neon-darkGreen/20"
              >
                Criar Conta
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DFAVisualization />
          <NFAVisualization />
        </div>
      </main>
      
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Trabalho Acadêmico de Teoria da Computação - 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
