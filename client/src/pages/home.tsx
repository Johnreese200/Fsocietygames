import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { GameCard } from "@/components/game-card";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { user } = useAuth();
  
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/game-categories"],
  });

  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/user-stats"],
  });

  const { data: userScores, isLoading: scoresLoading } = useQuery({
    queryKey: ["/api/user-scores"],
  });

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
      <Header />
      
      {/* Welcome Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              Welcome back, {user?.firstName || "Trainer"}!
            </h1>
            <p className="text-lg text-neutral-600">
              Ready for today's brain training session? Pick a challenge below.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-800">
                    {statsLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : userStats?.currentStreak || 0}
                  </div>
                  <div className="text-sm text-neutral-600">Day Streak</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-800">
                    {statsLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : userStats?.totalBadges || 0}
                  </div>
                  <div className="text-sm text-neutral-600">Badges</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-800">
                    {statsLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : userStats?.globalRank || "---"}
                  </div>
                  <div className="text-sm text-neutral-600">Rank</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-800">
                    {statsLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : `${Math.floor((userStats?.totalTimeSpent || 0) / 3600)}h`}
                  </div>
                  <div className="text-sm text-neutral-600">Total Time</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Choose Your Challenge</h2>
            <p className="text-lg text-neutral-600">Each game takes just 5 minutes. Perfect for focused training sessions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category: any) => (
              <GameCard key={category.id} category={category} authenticated />
            ))}
          </div>
        </div>
      </section>

      {/* Progress Dashboard */}
      <ProgressDashboard userStats={userStats} userScores={userScores} loading={statsLoading || scoresLoading} />
    </div>
  );
}
