import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoginFirst = () =>{
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
        <CardHeader>
            <CardTitle className="text-center">دسترسی محدود</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
            برای دسترسی به این بخش باید وارد شوید
            </p>
            <Button 
            variant="persian" 
            onClick={() => window.location.href = '/login'}
            >
            ورود
            </Button>
        </CardContent>
        </Card>
        </div>
    );
};

export default LoginFirst;