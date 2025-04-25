
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-neon-green">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-neon-darkGreen hover:bg-neon-darkGreen/80 text-neon-green border border-neon-green/50 hover:shadow-[0_0_10px_rgba(57,255,20,0.5)]"
        >
          Voltar para Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
