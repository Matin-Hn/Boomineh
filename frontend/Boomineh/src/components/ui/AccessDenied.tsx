// src/components/ui/AccessDenied.tsx

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Lock className="h-10 w-10 text-destructive mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-destructive">دسترسی غیرمجاز</h2>
      <p className="text-muted-foreground mb-4">برای دسترسی به این بخش، لطفاً وارد شوید.</p>
      <Button onClick={handleGoToLogin}>رفتن به صفحه ورود</Button>
    </div>
  );
};

export default AccessDenied;
