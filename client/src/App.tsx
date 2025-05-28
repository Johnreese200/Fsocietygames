import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/login";
import Arcade from "@/pages/arcade";
import NotFound from "@/pages/not-found";

function Router() {
  // Check if user has a token (simple authentication)
  const token = document.cookie.split(';').find(row => row.startsWith('token='));
  const isAuthenticated = !!token;

  return (
    <Switch>
      <Route path="/arcade" component={Arcade} />
      <Route path="/" component={isAuthenticated ? Arcade : Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
