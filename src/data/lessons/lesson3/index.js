// Import all slides for lesson 3
import { slide1Intro } from './slides/slide1-intro.js';
import { slide2Poll } from './slides/slide2-poll.js';
import { slide3WindowsHistory } from './slides/slide3-windows-history.js';
import { slide4WindowsVersions } from './slides/slide4-windows-versions.js';
import { slide5DesktopInterface } from './slides/slide5-desktop-interface.js';
import { slide6DesktopGame } from './slides/slide6-desktop-game.js';
import { slide7FileExplorer } from './slides/slide7-file-explorer.js';
import { slide8FileManagement } from './slides/slide8-file-management.js';
import { slide9FileExplorerGame } from './slides/slide9-file-explorer-game.js';
import { slide10ControlPanel } from './slides/slide10-control-panel.js';
import { slide11Settings } from './slides/slide11-settings.js';
import { slide12Break } from './slides/slide12-break.js';
import { slide13TaskManager } from './slides/slide13-task-manager.js';
import { slide14SystemTools } from './slides/slide14-system-tools.js';
import { slide15WindowsSimulator } from './slides/slide15-windows-simulator.js';
import { slide16SecurityFeatures } from './slides/slide16-security-features.js';
import { slide17UserAccounts } from './slides/slide17-user-accounts.js';
import { slide18KeyboardShortcuts } from './slides/slide18-keyboard-shortcuts.js';
import { slide19ShortcutsGame } from './slides/slide19-shortcuts-game.js';
import { slide20Troubleshooting } from './slides/slide20-troubleshooting.js';
import { slide21FinalQuiz } from './slides/slide21-final-quiz.js';
import { slide22Reflection } from './slides/slide22-reflection.js';
import { slide23Summary } from './slides/slide23-summary.js';

// Export the complete lesson 3 structure
export const lesson3 = {
  id: 3,
  title: "הכרת Windows",
  description: "שיעור אינטראקטיבי בן 3 שעות - הכרת מערכת ההפעלה Windows, ממשק המשתמש, ניהול קבצים וכלים מתקדמים",
  icon: "🪟",
  duration: "3 שעות",
  difficulty: "בינוני",
  targetAge: "10-13",
  breakDuration: 15,
  content: {
    slides: [
      slide1Intro,
      slide2Poll,
      slide3WindowsHistory,
      slide4WindowsVersions,
      slide5DesktopInterface,
      slide6DesktopGame,
      slide7FileExplorer,
      slide8FileManagement,
      slide9FileExplorerGame,
      slide10ControlPanel,
      slide11Settings,
      slide12Break,
      slide13TaskManager,
      slide14SystemTools,
      slide15WindowsSimulator,
      slide16SecurityFeatures,
      slide17UserAccounts,
      slide18KeyboardShortcuts,
      slide19ShortcutsGame,
      slide20Troubleshooting,
      slide21FinalQuiz,
      slide22Reflection,
      slide23Summary
    ]
  }
}; 