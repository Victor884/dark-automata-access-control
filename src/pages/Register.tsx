
import React from 'react';
import { AuthForm } from '@/components/AuthForms';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 text-neon-green hover:bg-neon-darkGreen/20"
        >
          ← Voltar
        </Button>
        
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-3xl font-bold mb-8 text-neon-green">Cadastro de Usuário</h1>
          <AuthForm isLogin={false} />
        </div>
      </div>
    </div>
  );
};

export default Register;
