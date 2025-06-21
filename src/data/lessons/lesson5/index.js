// Import all slides for lesson 5
import { slide1Intro } from './slides/slide1-intro.js';
import { slide2Poll } from './slides/slide2-poll.js';
import { slide3WhatIsNetwork } from './slides/slide3-what-is-network.js';
import { slide4NetworkTypes } from './slides/slide4-network-types.js';
import { slide5InternetHistory } from './slides/slide5-internet-history.js';
import { slide6HowInternetWorks } from './slides/slide6-how-internet-works.js';
import { slide7Protocols } from './slides/slide7-protocols.js';
import { slide8ProtocolGame } from './slides/slide8-protocol-game.js';
import { slide9IpAddresses } from './slides/slide9-ip-addresses.js';
import { slide10Break } from './slides/slide10-break.js';
import { slide11Browsers } from './slides/slide11-browsers.js';
import { slide12Servers } from './slides/slide12-servers.js';
import { slide13NetworkSecurity } from './slides/slide13-network-security.js';
import { slide14Wifi } from './slides/slide14-wifi.js';
import { slide15NetworkSimulator } from './slides/slide15-network-simulator.js';
import { slide16CloudComputing } from './slides/slide16-cloud-computing.js';
import { slide17InternetOfThings } from './slides/slide17-internet-of-things.js';
import { slide18FiveG } from './slides/slide18-5g.js';
import { slide19FinalQuizIntro } from './slides/slide19-final-quiz-intro.js';
import { slide20FinalQuiz } from './slides/slide20-final-quiz.js';
import { slide21Reflection } from './slides/slide21-reflection.js';
import { slide22Summary } from './slides/slide22-summary.js';

// Export the complete lesson 5 structure
export const lesson5 = {
  id: 5,
  title: "רשתות",
  description: "שיעור אינטראקטיבי בן 3 שעות - הכרת עולם הרשתות והאינטרנט. כולל הפסקה של 15 דקות.",
  icon: "🌐",
  duration: "3 שעות",
  difficulty: "בינוני",
  targetAge: "10-13",
  breakDuration: 15,
  content: {
    slides: [
      slide1Intro,
      slide2Poll,
      slide3WhatIsNetwork,
      slide4NetworkTypes,
      slide5InternetHistory,
      slide6HowInternetWorks,
      slide7Protocols,
      slide8ProtocolGame,
      slide9IpAddresses,
      slide10Break,
      slide11Browsers,
      slide12Servers,
      slide13NetworkSecurity,
      slide14Wifi,
      slide15NetworkSimulator,
      slide16CloudComputing,
      slide17InternetOfThings,
      slide18FiveG,
      slide19FinalQuizIntro,
      slide20FinalQuiz,
      slide21Reflection,
      slide22Summary
    ]
  }
}; 