# FSOCIETY Arcade Login System

A custom authentication system with email verification, login validation, and password recovery that leads to a retro-style fsociety arcade interface.

## Features

✨ **Authentication System**
- Custom login page with fsociety theming
- Simple demo authentication (can be extended with real database)
- Email and password validation
- Session management with cookies

🎮 **Fsociety Arcade**
- Authentic Mr. Robot inspired terminal interface
- Startup sequence with hacker aesthetics
- Interactive game selection menu
- Retro green-on-black terminal styling

🔐 **Demo Credentials**
- Email: `admin@fsociety.com`, Password: `password123`
- Email: `user@test.com`, Password: `test123`
- Email: `hacker@demo.com`, Password: `demo123`

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Wouter for routing
- Radix UI components
- React Query for state management

**Backend:**
- Express.js server
- Simple authentication endpoints
- Cookie-based session management

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5000`

## Project Structure

```
├── client/src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main application pages
│   │   ├── login.tsx  # Authentication interface
│   │   ├── arcade.tsx # Fsociety arcade interface
│   │   └── not-found.tsx
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── App.tsx        # Main app component
├── server/
│   ├── routes.ts      # API endpoints
│   ├── auth.ts        # Authentication utilities
│   ├── index.ts       # Express server setup
│   └── vite.ts        # Development server
└── shared/
    └── schema.ts      # Type definitions
```

## Usage

1. **Login Page**: Start at the root URL to see the fsociety-themed login interface
2. **Authentication**: Use any of the demo credentials to log in
3. **Arcade Interface**: After login, experience the authentic startup sequence
4. **Enter Alias**: Set your hacker alias to access the game menu
5. **Game Selection**: Browse through classic arcade games (ready for implementation)

## Customization

### Adding Real Authentication
To implement real user authentication:

1. Set up a proper database (PostgreSQL schema is already defined)
2. Replace the hardcoded credentials in `server/routes.ts`
3. Implement proper password hashing with bcrypt
4. Add email verification functionality

### Adding Games
The arcade interface is ready for game implementation:

1. Create game components in `client/src/components/games/`
2. Add routing for individual games
3. Implement game logic and scoring
4. Connect to the database for score tracking

### Styling
The project uses a cohesive green-on-black terminal aesthetic:
- Primary color: `#00ff41` (terminal green)
- Background: `#0d1117` (dark terminal)
- Font: `Fira Code` (monospace)

## Security Notes

⚠️ **This is a demo project**:
- Passwords are stored in plain text
- Session tokens are simple base64 encoding
- No rate limiting or security headers

For production use, implement:
- Proper password hashing (bcrypt)
- JWT tokens with proper secrets
- HTTPS enforcement
- Rate limiting
- Input sanitization

## License

This project is open source and available under the MIT License.

## Credits

Inspired by the Mr. Robot TV series fsociety aesthetic.
Built with modern web technologies for educational purposes.

---

**"Control is an illusion" - Mr. Robot**