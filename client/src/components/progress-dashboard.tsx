import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Award, TrendingUp, Clock } from "lucide-react";

interface ProgressDashboardProps {
  userStats?: {
    totalGamesPlayed: number;
    totalTimeSpent: number;
    currentStreak: number;
    totalBadges: number;
    globalRank: number;
  };
  userScores?: any[];
  loading?: boolean;
}

export function ProgressDashboard({ userStats, userScores, loading }: ProgressDashboardProps) {
  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  const skillAreas = [
    { name: "Memory", progress: 75, color: "bg-blue-500" },
    { name: "Speed", progress: 87, color: "bg-green-500" },
    { name: "Logic", progress: 62, color: "bg-orange-500" },
    { name: "Verbal", progress: 81, color: "bg-purple-500" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Track Your Progress</h2>
          <p className="text-lg text-neutral-600">Monitor your improvement across different cognitive areas</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Chart */}
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-neutral-800">Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillAreas.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600 w-16">{skill.name}</span>
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="flex-1 max-w-32">
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                    <span className="text-sm font-medium text-neutral-800 w-12 text-right">
                      {skill.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievement Stats */}
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-neutral-800">Your Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">
                    {userStats?.currentStreak || 0}
                  </div>
                  <div className="text-sm text-neutral-600">Day Streak</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">
                    {userStats?.totalBadges || 0}
                  </div>
                  <div className="text-sm text-neutral-600">Badges Earned</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">
                    {userStats?.globalRank || "---"}
                  </div>
                  <div className="text-sm text-neutral-600">Global Rank</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">
                    {Math.floor((userStats?.totalTimeSpent || 0) / 3600)}h
                  </div>
                  <div className="text-sm text-neutral-600">Total Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
