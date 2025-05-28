import { useEffect, useState } from "react";

export default function Arcade() {
  const [currentUsername, setCurrentUsername] = useState('');
  const [showStartup, setShowStartup] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const startupMessages = [
    'FSOCIETY ONLINE PROJECT',
    'INITIALIZING SECURE CONNECTION...',
    'BYPASSING FIREWALL...',
    'CONNECTION ESTABLISHED',
    'WELCOME TO THE ARCADE'
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const showNextMessage = () => {
      if (messageIndex < startupMessages.length) {
        setMessageIndex(prev => prev + 1);
        setTimeout(showNextMessage, 1500);
      } else {
        setShowStartup(false);
        setShowWelcome(true);
      }
    };

    const timer = setTimeout(showNextMessage, 1000);
    return () => clearTimeout(timer);
  }, [messageIndex]);

  const setUsername = () => {
    const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
    const username = usernameInput?.value.trim();
    
    if (username) {
      setCurrentUsername(username);
      setShowWelcome(false);
      setShowDashboard(true);
    } else {
      alert('Please enter a username!');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setUsername();
    }
  };

  return (
    <div style={{
      fontFamily: "'Fira Code', monospace",
      background: '#0d1117',
      color: '#00ff41',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      lineHeight: 1.6
    }}>
      {/* Startup Sequence Modal */}
      {showStartup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: '#0d1117',
            border: '2px solid #00ff41',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 0 10px #00ff41'
          }}>
            <div style={{
              fontSize: '2rem',
              textAlign: 'center',
              margin: '20px 0',
              textShadow: '0 0 5px #00ff41',
              animation: 'flicker 2s infinite alternate'
            }}>
              {startupMessages[messageIndex] || startupMessages[0]}
            </div>
          </div>
        </div>
      )}

      {/* Welcome Modal */}
      {showWelcome && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: '#0d1117',
            border: '2px solid #00ff41',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 0 10px #00ff41'
          }}>
            <h2 style={{
              textShadow: '0 0 5px #00ff41',
              marginBottom: '20px'
            }}>⚡ FSOCIETY TERMINAL ACCESS GRANTED ⚡</h2>
            <div style={{
              fontSize: '0.9rem',
              margin: '20px 0',
              fontFamily: 'monospace'
            }}>
              ╔═══════════════════════════════════╗<br/>
              ║    SECURE CONNECTION ESTABLISHED  ║<br/>
              ║      Enter your hacker alias     ║<br/>
              ╚═══════════════════════════════════╝
            </div>
            <input
              type="text"
              id="usernameInput"
              style={{
                background: 'transparent',
                border: '1px solid #00ff41',
                color: '#00ff41',
                padding: '10px',
                fontFamily: 'inherit',
                borderRadius: '3px',
                margin: '5px'
              }}
              placeholder="Enter your hacker alias..."
              maxLength={20}
              onKeyPress={handleKeyPress}
            />
            <br/><br/>
            <button
              onClick={setUsername}
              style={{
                background: 'transparent',
                border: '1px solid #00ff41',
                color: '#00ff41',
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                borderRadius: '3px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#00ff41';
                e.currentTarget.style.color = '#0d1117';
                e.currentTarget.style.boxShadow = '0 0 10px #00ff41';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#00ff41';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🔓 ACCESS MAINFRAME 🔓
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      {showDashboard && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          minHeight: '100vh'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            border: '2px solid #00ff41',
            padding: '20px',
            background: 'rgba(0, 255, 65, 0.05)',
            boxShadow: '0 0 10px #00ff41'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 600,
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '0 0 5px #00ff41'
            }}>⚡ FSOCIETY ARCADE GAMES ⚡</h1>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.8
            }}>~ Classic Terminal Games ~</p>
          </div>

          <div style={{
            background: 'rgba(0, 255, 65, 0.1)',
            border: '1px solid #00ff41',
            padding: '15px',
            marginBottom: '30px',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <h3>🔮 Welcome, <span style={{ textShadow: '0 0 5px #00ff41' }}>{currentUsername}</span>! 🔮</h3>
            <p>Select your game below...</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {[
              { title: '🐍 SNAKE.EXE', desc: 'Classic snake game - eat food to grow longer but don\'t hit the walls or yourself. Use WASD or arrow keys to control.' },
              { title: '🧱 TETRIS.EXE', desc: 'Arrange falling blocks to complete lines. Use A/D to move, S to drop faster, W to rotate pieces.' },
              { title: '👻 PAC-MAN.EXE', desc: 'Navigate the maze, eat all dots while avoiding ghosts. Collect power pellets to turn the tables!' },
              { title: '❌ TIC-TAC-TOE.EXE', desc: 'Classic strategy game - get three in a row to win. Play against the computer AI.' },
              { title: '🏓 PONG.EXE', desc: 'The original arcade game! Control your paddle and keep the ball in play. First to 10 points wins.' },
              { title: '🧱 BREAKOUT.EXE', desc: 'Destroy all bricks with your ball and paddle. Don\'t let the ball fall off the screen!' },
              { title: '🚀 ASTEROIDS.EXE', desc: 'Navigate space and destroy asteroids. Use thrust and rotation to survive in zero gravity!' },
              { title: '🐸 FROGGER.EXE', desc: 'Help the frog cross busy roads and rivers. Timing and quick reflexes are key to survival!' },
              { title: '🧠 MEMORY.EXE', desc: 'Test your memory by matching pairs of cards. Find all pairs to complete each level.' },
              { title: '💥 MISSILE-COMMAND.EXE', desc: 'Defend your cities from incoming missiles. Click to launch defensive missiles and save the planet!' }
            ].map((game, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(0, 255, 65, 0.08)',
                  border: '1px solid #00ff41',
                  padding: '20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => alert('Game coming soon!')}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 65, 0.15)';
                  e.currentTarget.style.boxShadow = '0 0 10px #00ff41';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 65, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 500,
                  marginBottom: '10px',
                  color: '#00ff41'
                }}>{game.title}</h3>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  lineHeight: 1.4
                }}>{game.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '40px',
            padding: '20px',
            borderTop: '1px solid #00ff41',
            opacity: 0.7
          }}>
            <p>🌟 Created by John Reese 🌟</p>
            <p>~ Game On! ~</p>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap');
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}