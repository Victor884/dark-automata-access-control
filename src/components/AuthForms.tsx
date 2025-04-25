
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Lock, User, Key } from "lucide-react";

interface AuthFormProps {
  isLogin?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin = true }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    
    // Simulate authentication flow
    if (isLogin) {
      if (username && password) {
        // In a real app, you would verify credentials on a server
        // For demo, we'll use localStorage to check if user exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.username === username && u.password === password);
        
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          toast.success("Login bem-sucedido!");
          navigate('/dashboard');
        } else {
          toast.error("Credenciais inválidas!");
        }
      }
    } else {
      // Registration flow
      if (username && password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username already exists
        if (users.some((u: any) => u.username === username)) {
          toast.error("Nome de usuário já existe!");
          return;
        }
        
        // Add new user
        users.push({ username, password, role: 'user' });
        localStorage.setItem('users', JSON.stringify(users));
        
        toast.success("Cadastro realizado com sucesso!");
        navigate('/login');
      }
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto border border-neon-green/20 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-neon-green flex items-center justify-center text-2xl mb-2">
          <Lock className="mr-2" size={24} />
          {isLogin ? "Login" : "Cadastro"}
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          {isLogin 
            ? "Entre com suas credenciais para acessar" 
            : "Crie uma nova conta para acessar o sistema"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm flex items-center">
              <User className="mr-2" size={16} />
              Nome de Usuário
            </Label>
            <Input
              id="username"
              placeholder="Digite seu username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-secondary border-neon-green/30 focus:border-neon-green"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm flex items-center">
              <Key className="mr-2" size={16} />
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary border-neon-green/30 focus:border-neon-green"
              required
            />
          </div>
          
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm flex items-center">
                <Key className="mr-2" size={16} />
                Confirme a Senha
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-secondary border-neon-green/30 focus:border-neon-green"
                required
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-neon-darkGreen hover:bg-neon-darkGreen/80 text-neon-green border border-neon-green/50 hover:shadow-[0_0_10px_rgba(57,255,20,0.5)]"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <a 
            href={isLogin ? "/register" : "/login"} 
            className="text-neon-green hover:underline"
          >
            {isLogin ? "Cadastre-se" : "Faça Login"}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
