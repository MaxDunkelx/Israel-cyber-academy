// Import all slides for lesson 3
import { slide1Intro } from './slides/slide001-intro.js';
import { slide2Welcome } from './slides/slide002-welcome.js';
import { slide3Poll } from './slides/slide003-poll.js';
import { slide4WhatIsOS } from './slides/slide004-what-is-os.js';
import { slide5TypesOfOS } from './slides/slide005-types-of-os.js';
import { slide6WindowsHistory } from './slides/slide006-windows-history.js';
import { slide7WindowsVersions } from './slides/slide007-windows-versions.js';
import { slide8CLIVsGUI } from './slides/slide008-cli-vs-gui.js';
import { slide9UseWindows } from './slides/slide009-use-windows.js';
import { slide10ControlPanel } from './slides/slide010-control-panel.js';
import { slide11UserControl } from './slides/slide011-user-control.js';
import { slide12Permissions } from './slides/slide012-permissions.js';
import { slide13PackageManager } from './slides/slide013-package-manager.js';
import { slide14Break } from './slides/slide014-break.js';
import { slide15Processes } from './slides/slide015-processes.js';
import { slide16SystemMonitoring } from './slides/slide016-system-monitoring.js';
import { slide17LinuxSimulator } from './slides/slide017-linux-simulator.js';
import { slide18Security } from './slides/slide018-security.js';
import { slide19UsersGroups } from './slides/slide019-users-groups.js';
import { slide20ShellScripting } from './slides/slide020-shell-scripting.js';
import { slide21ScriptingGame } from './slides/slide021-scripting-game.js';
import { slide22Networking } from './slides/slide022-networking.js';
import { slide23FinalQuiz } from './slides/slide023-final-quiz.js';
import { slide24Reflection } from './slides/slide024-reflection.js';
import { slide25Summary } from './slides/slide025-summary.js';
import { slide26CmdIntro } from './slides/slide026-cmd-intro.js';
import { slide27OpenCmd } from './slides/slide027-open-cmd.js';
import { slide28BasicCommands } from './slides/slide028-basic-commands.js';
import { slide29CmdQuiz } from './slides/slide029-cmd-quiz.js';
import { slide30FinalSummary } from './slides/slide030-final-summary.js';

// Export the complete lesson 3 structure
export const lesson003 = {
  id: "lesson003",
  originalId: "lesson003",
  title: "מערכות הפעלה",
  description: "שיעור אינטראקטיבי בן 3 שעות - הכרת מערכות הפעלה, Windows, Linux, ממשק משתמש ופקודות",
  icon: "🖥️",
  duration: "3 שעות",
  difficulty: "בינוני",
  targetAge: "10-13",
  breakDuration: 15,
  content: {
    slides: [
      slide1Intro,
      slide2Welcome,
      slide3Poll,
      slide4WhatIsOS,
      slide5TypesOfOS,
      slide6WindowsHistory,
      slide7WindowsVersions,
      slide8CLIVsGUI,
      slide9UseWindows,
      slide10ControlPanel,
      slide11UserControl,
      slide12Permissions,
      slide13PackageManager,
      slide14Break,
      slide15Processes,
      slide16SystemMonitoring,
      slide17LinuxSimulator,
      slide18Security,
      slide19UsersGroups,
      slide20ShellScripting,
      slide21ScriptingGame,
      slide22Networking,
      slide23FinalQuiz,
      slide24Reflection,
      slide25Summary,
      slide26CmdIntro,
      slide27OpenCmd,
      slide28BasicCommands,
      slide29CmdQuiz,
      slide30FinalSummary
    ]
  }
}; 