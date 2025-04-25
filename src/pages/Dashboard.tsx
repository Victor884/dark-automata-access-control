
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  
  useEffect(() => {
    // Check authentication status
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      toast.error("Você precisa estar autenticado para acessar esta página");
      navigate('/login');
      return;
    }
    
    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } catch (e) {
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success("Logout realizado com sucesso");
    navigate('/');
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 border-b border-border">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-neon-green">Painel de Controle</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <User className="text-neon-green mr-2" size={18} />
              <span className="text-sm">{user.username}</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-neon-green"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span className="ml-2">Sair</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 border border-neon-green/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-neon-green">Acesso Concedido</CardTitle>
              <CardDescription>
                Você está autenticado no sistema e pode acessar os recursos protegidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-secondary rounded-md">
                <p className="code-text text-neon-green mb-2">// Estado atual do autômato: accessGranted</p>
                <p className="code-text text-sm">
                  user: <span className="text-neon-green">{user.username}</span><br />
                  role: <span className="text-neon-green">{user.role}</span><br />
                  authenticated: <span className="text-neon-green">true</span><br />
                  session_created: <span className="text-neon-green">{new Date().toISOString()}</span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-neon-green/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Autômato Determinístico (AFD)</CardTitle>
                <CardDescription>
                  Modelo de controle de acesso determinístico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  O modelo determinístico representa um fluxo de autenticação onde cada entrada tem exatamente uma transição possível, 
                  como em sistemas de autenticação simples por usuário e senha.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate("/")}
                  variant="outline" 
                  className="border-neon-green/30 text-neon-green hover:bg-neon-darkGreen/20"
                >
                  Ver visualização
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border border-neon-green/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Autômato Não-Determinístico (AFN)</CardTitle>
                <CardDescription>
                  Modelo de controle de acesso não-determinístico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  O modelo não-determinístico representa um fluxo de autenticação onde uma entrada pode levar a múltiplos estados possíveis,
                  como em sistemas de autenticação multi-fator ou baseados em risco.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate("/")}
                  variant="outline" 
                  className="border-neon-green/30 text-neon-green hover:bg-neon-darkGreen/20"
                >
                  Ver visualização
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="py-4 border-t border-border">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>Sistema de demonstração de controle de acesso baseado em autômatos</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
