import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  Trophy, 
  Star,
  Clock,
  Target,
  X
} from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");

  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/user-stats"],
    enabled: isAuthenticated,
  });

  const { data: userAchievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ["/api/user-achievements"],
    enabled: isAuthenticated,
  });

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Welcome to MindBoost</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <p className="text-neutral-600 mb-6">
                Sign in to track your progress, compete with others, and unlock achievements.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Trophy className="w-4 h-4 text-primary" />
                <span>Track your cognitive improvement</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Target className="w-4 h-4 text-primary" />
                <span>Compete on global leaderboards</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Star className="w-4 h-4 text-primary" />
                <span>Earn badges and achievements</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Clock className="w-4 h-4 text-primary" />
                <span>Sync progress across devices</span>
              </div>
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium py-3"
              size="lg"
            >
              Sign In to Continue
            </Button>

            <p className="text-xs text-center text-neutral-500">
              Secure authentication powered by industry-standard protocols
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Account Dashboard</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-xl">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user?.firstName || "Brain Trainer"}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{user?.email || "No email provided"}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {userStats?.currentStreak || 0}
                    </div>
                    <div className="text-sm text-neutral-600">Day Streak</div>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {userStats?.totalBadges || 0}
                    </div>
                    <div className="text-sm text-neutral-600">Total Badges</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Account Settings</Label>
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Account Verified</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>
                </div>

                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="w-full"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Games Played</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {statsLoading ? "..." : userStats?.totalGamesPlayed || 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Total Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {statsLoading ? "..." : `${Math.floor((userStats?.totalTimeSpent || 0) / 3600)}h`}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span>Global Rank</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {statsLoading ? "..." : userStats?.globalRank || "---"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>Current Streak</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {statsLoading ? "..." : `${userStats?.currentStreak || 0} days`}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Memory Games</span>
                    <Badge variant="secondary">Intermediate</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Speed Challenges</span>
                    <Badge variant="secondary">Advanced</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Logic Puzzles</span>
                    <Badge variant="secondary">Beginner</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Word Games</span>
                    <Badge variant="secondary">Intermediate</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {achievementsLoading ? (
                  <div className="text-center py-8 text-neutral-500">
                    Loading achievements...
                  </div>
                ) : userAchievements && userAchievements.length > 0 ? (
                  <div className="space-y-3">
                    {userAchievements.slice(0, 5).map((achievement: any, index: number) => (
                      <div key={achievement.id || index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {achievement.achievementType === 'streak' && 'Streak Master'}
                            {achievement.achievementType === 'score' && 'High Scorer'}
                            {achievement.achievementType === 'time' && 'Speed Demon'}
                            {!['streak', 'score', 'time'].includes(achievement.achievementType) && 'Achievement Unlocked'}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {new Date(achievement.earnedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          +{achievement.achievementValue} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-neutral-500 mb-2">No achievements yet</p>
                    <p className="text-sm text-neutral-400">
                      Start playing games to earn your first badge!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badge Collection</CardTitle>
                <CardDescription>
                  Unlock badges by completing challenges and reaching milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((badge) => (
                    <div key={badge} className="text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1 ${
                        badge <= (userStats?.totalBadges || 0) 
                          ? 'bg-gradient-to-br from-primary to-purple-600' 
                          : 'bg-neutral-200'
                      }`}>
                        <Star className={`w-6 h-6 ${
                          badge <= (userStats?.totalBadges || 0) ? 'text-white' : 'text-neutral-400'
                        }`} />
                      </div>
                      <div className="text-xs text-neutral-500">
                        {badge <= (userStats?.totalBadges || 0) ? 'Earned' : 'Locked'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
