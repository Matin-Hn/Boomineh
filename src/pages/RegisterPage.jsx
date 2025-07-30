import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
