import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { GameCard } from "@/components/game-card";

const gameCategories = [
  {
    id: 1,
    name: "Memory Palace",
    description: "Test your ability to remember sequences, patterns, and spatial relationships.",
    difficulty: "Medium",
    color: "from-blue-500 to-blue-600",
    icon: "lightbulb",
    duration: "5 min"
  },
  {
    id: 2,
    name: "Speed Focus",
    description: "Quick reaction challenges that improve your processing speed and attention.",
    difficulty: "Easy",
    color: "from-green-500 to-green-600",
    icon: "zap",
    duration: "5 min"
  },
  {
    id: 3,
    name: "Logic Puzzles",
    description: "Complex problem-solving challenges that enhance critical thinking skills.",
    difficulty: "Hard",
    color: "from-orange-500 to-orange-600",
    icon: "settings",
    duration: "5 min"
  },
  {
    id: 4,
    name: "Word Masters",
    description: "Vocabulary and language games that boost verbal intelligence and creativity.",
    difficulty: "Medium",
    color: "from-purple-500 to-purple-600",
    icon: "book",
    duration: "5 min"
  },
  {
    id: 5,
    name: "Number Ninja",
    description: "Mathematical reasoning and calculation challenges for quantitative thinking.",
    difficulty: "Hard",
    color: "from-pink-500 to-pink-600",
    icon: "hash",
    duration: "5 min"
  },
  {
    id: 6,
    name: "Visual Patterns",
    description: "Spatial reasoning and pattern recognition games for visual intelligence.",
    difficulty: "Medium",
    color: "from-indigo-500 to-indigo-600",
    icon: "eye",
    duration: "5 min"
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
      <Header />
      <HeroSection />
      
      {/* Game Categories Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Choose Your Challenge</h2>
            <p className="text-lg text-neutral-600">Each game takes just 5 minutes. Perfect for breaks, commutes, or focused training sessions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameCategories.map((category) => (
              <GameCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">MindBoost</span>
              </div>
              <p className="text-neutral-400 mb-4 max-w-md">
                Transform your cognitive abilities with scientifically-designed brain training games. Just 5 minutes a day can make a difference.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Games</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Memory Palace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Speed Focus</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Logic Puzzles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Word Masters</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
            <p className="text-neutral-400">© 2024 MindBoost. All rights reserved. Built for cognitive enhancement.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
