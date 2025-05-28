import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { isAuthenticated, user } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState([50]);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-neutral-800">MindBoost</span>
          </div>
          
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">Challenges</a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">Progress</a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">Leaderboard</a>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {/* Audio Controls */}
            <div className="flex items-center space-x-2 bg-neutral-100 rounded-full px-3 py-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto hover:bg-white rounded-full"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-neutral-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-neutral-600" />
                )}
              </Button>
              <div className="w-16">
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user?.profileImageUrl && (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium text-neutral-700 hidden sm:block">
                  {user?.firstName || "User"}
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogin} className="bg-primary text-white hover:bg-primary/90">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
