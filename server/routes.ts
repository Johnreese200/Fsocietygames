import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple hardcoded authentication for demo purposes
  const validCredentials = [
    { email: "admin@fsociety.com", password: "password123" },
    { email: "user@test.com", password: "test123" },
    { email: "hacker@demo.com", password: "demo123" }
  ];

  // Login endpoint
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check credentials
      const validUser = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );
      
      if (!validUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a simple token (in production, use proper JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      res.json({ 
        token, 
        user: { email, username: email.split('@')[0] } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Signup endpoint
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      // For demo, just return success
      res.json({ message: "Account created successfully! You can now log in with any demo credentials." });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // Forgot password endpoint
  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      res.json({ message: "Reset instructions sent! (Demo mode - use any valid credentials)" });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Failed to process request" });
    }
  });

  // Simple health check
  app.get('/api/health', (req, res) => {
    res.json({ status: "OK", message: "FSOCIETY Arcade API is running" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
