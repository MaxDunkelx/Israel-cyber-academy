// Lesson 6: Protocols - index.js
import { slide1Intro } from './slides/slide1-intro.js';
import { slide2Poll } from './slides/slide2-poll.js';
import { slide3WhatIsProtocol } from './slides/slide3-what-is-protocol.js';
import { slide4ProtocolTypes } from './slides/slide4-protocol-types.js';
import { slide5HttpHttps } from './slides/slide5-http-https.js';
import { slide6EmailProtocols } from './slides/slide6-email-protocols.js';
import { slide7FileProtocols } from './slides/slide7-file-protocols.js';
import { slide8ProtocolGame } from './slides/slide8-protocol-game.js';
import { slide9SecurityProtocols } from './slides/slide9-security-protocols.js';
import { slide10ProtocolLayers } from './slides/slide10-protocol-layers.js';
import { slide11Break } from './slides/slide11-break.js';
import { slide12RealWorld } from './slides/slide12-real-world.js';
import { slide13ProtocolSimulator } from './slides/slide13-protocol-simulator.js';
import { slide14Quiz } from './slides/slide14-quiz.js';
import { slide15Reflection } from './slides/slide15-reflection.js';
import { slide16FinalQuiz } from './slides/slide16-final-quiz.js';
import { slide17Reflection } from './slides/slide17-reflection.js';
import { slide18Summary } from './slides/slide18-summary.js';

export const lesson6 = {
  id: 6,
  title: 'פרוטוקולים',
  description: 'היכרות עם פרוטוקולי תקשורת, אבטחה, שכבות OSI, משחקים, סימולציות וחידונים',
  icon: "📡",
  duration: "3 שעות",
  difficulty: "בינוני",
  targetAge: "10-13",
  breakDuration: 15,
  content: {
    slides: [
      slide1Intro,
      slide2Poll,
      slide3WhatIsProtocol,
      slide4ProtocolTypes,
      slide5HttpHttps,
      slide6EmailProtocols,
      slide7FileProtocols,
      slide8ProtocolGame,
      slide9SecurityProtocols,
      slide10ProtocolLayers,
      slide11Break,
      slide12RealWorld,
      slide13ProtocolSimulator,
      slide14Quiz,
      slide15Reflection,
      slide16FinalQuiz,
      slide17Reflection,
      slide18Summary
    ]
  }
}; 