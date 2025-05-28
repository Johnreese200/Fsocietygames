import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Lightbulb, 
  Zap, 
  Settings, 
  Book, 
  Hash, 
  Eye,
  Target,
  Brain
} from "lucide-react";

interface GameCategory {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  color: string;
  icon: string;
  duration?: string;
}

interface GameCardProps {
  category: GameCategory;
  authenticated?: boolean;
}

const iconMap = {
  lightbulb: Lightbulb,
  zap: Zap,
  settings: Settings,
  book: Book,
  hash: Hash,
  eye: Eye,
  target: Target,
  brain: Brain,
};

const colorMap = {
  "from-blue-500 to-blue-600": "bg-gradient-to-br from-blue-500 to-blue-600",
  "from-green-500 to-green-600": "bg-gradient-to-br from-green-500 to-green-600", 
  "from-orange-500 to-orange-600": "bg-gradient-to-br from-orange-500 to-orange-600",
  "from-purple-500 to-purple-600": "bg-gradient-to-br from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600": "bg-gradient-to-br from-pink-500 to-pink-600",
  "from-indigo-500 to-indigo-600": "bg-gradient-to-br from-indigo-500 to-indigo-600",
};

const buttonColorMap = {
  "from-blue-500 to-blue-600": "bg-blue-500 hover:bg-blue-600",
  "from-green-500 to-green-600": "bg-green-500 hover:bg-green-600",
  "from-orange-500 to-orange-600": "bg-orange-500 hover:bg-orange-600", 
  "from-purple-500 to-purple-600": "bg-purple-500 hover:bg-purple-600",
  "from-pink-500 to-pink-600": "bg-pink-500 hover:bg-pink-600",
  "from-indigo-500 to-indigo-600": "bg-indigo-500 hover:bg-indigo-600",
};

export function GameCard({ category, authenticated = false }: GameCardProps) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Brain;
  const colorClass = colorMap[category.color as keyof typeof colorMap] || "bg-gradient-to-br from-primary to-purple-600";
  const buttonColorClass = buttonColorMap[category.color as keyof typeof buttonColorMap] || "bg-primary hover:bg-primary/90";

  const handlePlay = () => {
    if (!authenticated) {
      window.location.href = "/api/login";
    } else {
      // TODO: Navigate to game
      console.log(`Starting game: ${category.name}`);
    }
  };

  return (
    <Card className="game-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className={`w-16 h-16 ${colorClass} rounded-xl flex items-center justify-center mb-4`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-neutral-800 mb-2">{category.name}</h3>
        <p className="text-neutral-600 mb-4 text-sm leading-relaxed">{category.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">
            {category.duration || "5 min"} • {category.difficulty}
          </span>
          <Button 
            onClick={handlePlay}
            className={`${buttonColorClass} text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium`}
          >
            {authenticated ? "Play Now" : "Login to Play"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
