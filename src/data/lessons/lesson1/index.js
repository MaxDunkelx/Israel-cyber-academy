import { slide1Intro } from './slides/slide1-intro.js';
import { slide1aWelcome } from './slides/slide1a-welcome.js';
import { slide2Poll } from './slides/slide2-poll.js';
import { slide3CyberIntro } from './slides/slide3-cyber-intro.js';
import { slide4HackerVideo } from './slides/slide4-hacker-video.js';
import { slide5HackerGame } from './slides/slide5-hacker-game.js';
import { slide6SecurityInfo } from './slides/slide6-security-info.js';
import { slide6aSecurityImplementation } from './slides/slide6a-security-implementation.js';
import { slide7SecurityTools } from './slides/slide7-security-tools.js';
import { slide8CyberTriangle } from './slides/slide8-cyber-triangle.js';
import { slide9CyberTriangleQuiz } from './slides/slide9-cyber-triangle-quiz.js';
import { slide10Break } from './slides/slide10-break.js';
import { slide11DigitalThreats } from './slides/slide11-digital-threats.js';
import { slide12ThreatIdentification } from './slides/slide12-threat-identification.js';
import { slide13StayingSafe } from './slides/slide13-staying-safe.js';
import { slide14PasswordStrength } from './slides/slide14-password-strength.js';
import { slide15PasswordVideo } from './slides/slide15-password-video.js';
import { slide16PasswordGenerator } from './slides/slide16-passwordGenerator.js';
import { slide17FinalQuiz } from './slides/slide17-final-quiz.js';
import { slide18Reflection } from './slides/slide18-reflection.js';
import { slide19Summary } from './slides/slide19-summary.js';

export const lesson1 = {
  id: 1,
  originalId: 1,
  title: "מבוא לעולם הסייבר",
  description: "שיעור מקיף בן 2.5 שעות - הכרת עולם הסייבר, האקרים, איומים דיגיטליים ופעילויות אינטראקטיביות משופרות",
  icon: "🛡️",
  duration: "2.5 שעות",
  difficulty: "קל",
  targetAge: "10-13",
  breakDuration: 15,
  content: {
    slides: [
      slide1Intro,
      slide1aWelcome,
      slide2Poll,
      slide3CyberIntro,
      slide4HackerVideo,
      slide5HackerGame,
      slide6SecurityInfo,
      slide6aSecurityImplementation,
      slide7SecurityTools,
      slide8CyberTriangle,
      slide9CyberTriangleQuiz,
      slide10Break,
      slide11DigitalThreats,
      slide12ThreatIdentification,
      slide13StayingSafe,
      slide14PasswordStrength,
      slide15PasswordVideo,
      slide16PasswordGenerator,
      slide17FinalQuiz,
      slide18Reflection,
      slide19Summary
    ]
  }
}; 