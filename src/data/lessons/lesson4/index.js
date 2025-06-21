// Import all slides for lesson 4
import { slide1Intro } from './slides/slide1-intro.js';
import { slide2Poll } from './slides/slide2-poll.js';
import { slide3LinuxHistory } from './slides/slide3-linux-history.js';
import { slide4LinuxDistros } from './slides/slide4-linux-distros.js';
import { slide5TerminalBasics } from './slides/slide5-terminal-basics.js';
import { slide6TerminalGame } from './slides/slide6-terminal-game.js';
import { slide7FileSystem } from './slides/slide7-file-system.js';
import { slide8FileCommands } from './slides/slide8-file-commands.js';
import { slide9FileCommandsGame } from './slides/slide9-file-commands-game.js';
import { slide10Permissions } from './slides/slide10-permissions.js';
import { slide11PackageManager } from './slides/slide11-package-manager.js';
import { slide12Break } from './slides/slide12-break.js';
import { slide13Processes } from './slides/slide13-processes.js';
import { slide14SystemMonitoring } from './slides/slide14-system-monitoring.js';
import { slide15LinuxSimulator } from './slides/slide15-linux-simulator.js';
import { slide16Security } from './slides/slide16-security.js';
import { slide17UsersGroups } from './slides/slide17-users-groups.js';
import { slide18ShellScripting } from './slides/slide18-shell-scripting.js';
import { slide19ScriptingGame } from './slides/slide19-scripting-game.js';
import { slide20Networking } from './slides/slide20-networking.js';
import { slide21FinalQuiz } from './slides/slide21-final-quiz.js';
import { slide22Reflection } from './slides/slide22-reflection.js';
import { slide23Summary } from './slides/slide23-summary.js';
import { slide24FinalSummary } from './slides/slide24-final-summary.js';

// Export the complete lesson 4 structure
export const lesson4 = {
  id: 4,
  title: "הכרת Linux",
  description: "שיעור אינטראקטיבי בן 3 שעות - הכרת מערכת ההפעלה Linux, טרמינל, פקודות וכלים מתקדמים",
  icon: "🐧",
  duration: "3 שעות",
  difficulty: "בינוני",
  targetAge: "10-13",
  breakDuration: 15,
  content: {
    slides: [
      slide1Intro,
      slide2Poll,
      slide3LinuxHistory,
      slide4LinuxDistros,
      slide5TerminalBasics,
      slide6TerminalGame,
      slide7FileSystem,
      slide8FileCommands,
      slide9FileCommandsGame,
      slide10Permissions,
      slide11PackageManager,
      slide12Break,
      slide13Processes,
      slide14SystemMonitoring,
      slide15LinuxSimulator,
      slide16Security,
      slide17UsersGroups,
      slide18ShellScripting,
      slide19ScriptingGame,
      slide20Networking,
      slide21FinalQuiz,
      slide22Reflection,
      slide23Summary,
      slide24FinalSummary
    ]
  }
}; 