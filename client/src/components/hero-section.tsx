import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function HeroSection() {
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Scroll to game categories
      const element = document.querySelector('[data-section="games"]');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = "/api/login";
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-float mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6">
            Train Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Mind</span>
          </h1>
          
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Challenge yourself with quick 5-minute brain training games. Compete with others, track your progress, and unlock your cognitive potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
              size="lg"
            >
              {isAuthenticated ? "Continue Training" : "Start Training"}
            </Button>
            <Button 
              variant="outline"
              className="border border-neutral-300 text-neutral-700 px-8 py-4 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-lg"
              size="lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-secondary/10 rounded-full animate-pulse-slow"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-accent/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-primary/10 rounded-full animate-pulse-slow"></div>
    </section>
  );
}
