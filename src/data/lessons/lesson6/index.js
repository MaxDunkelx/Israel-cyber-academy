// Lesson 6: Protocols - index.js
import { slide1Intro } from './slides/slide1-intro';
import { slide2Poll } from './slides/slide2-poll';
import { slide3WhatIsProtocol } from './slides/slide3-what-is-protocol';
import { slide4ProtocolTypes } from './slides/slide4-protocol-types';
import { slide5HttpHttps } from './slides/slide5-http-https';
import { slide6EmailProtocols } from './slides/slide6-email-protocols';
import { slide7FileProtocols } from './slides/slide7-file-protocols';
import { slide8ProtocolGame } from './slides/slide8-protocol-game';
import { slide9SecurityProtocols } from './slides/slide9-security-protocols';
import { slide10ProtocolLayers } from './slides/slide10-protocol-layers';
import { slide11Break } from './slides/slide11-break';
import { slide12RealWorld } from './slides/slide12-real-world';
import { slide13ProtocolSimulator } from './slides/slide13-protocol-simulator';
import { slide14Quiz } from './slides/slide14-quiz';
import { slide15Reflection } from './slides/slide15-reflection';
import { slide16FinalQuiz } from './slides/slide16-final-quiz';
import { slide17Reflection } from './slides/slide17-reflection';
import { slide18Summary } from './slides/slide18-summary';

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