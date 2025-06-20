// Import all slides for lesson 2
import { slide1Intro } from './slides/slide1-intro.js';
import { slide2Poll } from './slides/slide2-poll.js';
import { slide3History } from './slides/slide3-history.js';
import { slide4HistoryMatching } from './slides/slide4-history-matching.js';
import { slide5WhatIsComputer } from './slides/slide5-what-is-computer.js';
import { slide6DataVsInfo } from './slides/slide6-data-vs-info.js';
import { slide7HardwareSoftware } from './slides/slide7-hardware-software.js';
import { slide8HardwareSoftwareGame } from './slides/slide8-hardware-software-game.js';
import { slide9MainComponents } from './slides/slide9-main-components.js';
import { slide10Cpu } from './slides/slide10-cpu.js';
import { slide11Storage } from './slides/slide11-storage.js';
import { slide12Ram } from './slides/slide12-ram.js';
import { slide13Motherboard } from './slides/slide13-motherboard.js';
import { slide14Psu } from './slides/slide14-psu.js';
import { slide15Gpu } from './slides/slide15-gpu.js';
import { slide16ComponentMatching } from './slides/slide16-component-matching.js';
import { slide17ComputerSimulator } from './slides/slide17-computer-simulator.js';
import { slide18RecommendedSpecs } from './slides/slide18-recommended-specs.js';
import { slide19LabSimulation } from './slides/slide19-lab-simulation.js';
import { slide20Quiz } from './slides/slide20-quiz.js';
import { slide21InputOutput } from './slides/slide21-input-output.js';
import { slide22InputOutputGame } from './slides/slide22-input-output-game.js';
import { slide23FinalPoll } from './slides/slide23-final-poll.js';
import { slide24Summary } from './slides/slide24-summary.js';
import { slide25Reflection } from './slides/slide25-reflection.js';

// Export the complete lesson 2 structure
export const lesson2 = {
  id: 2,
  title: "מבנה המחשב וחומרה",
  description: "שיעור אינטראקטיבי בן 2 שעות - הכרת רכיבי המחשב, היסטוריה, סימולטורים ומשחקי למידה",
  icon: "💻",
  duration: "2 שעות",
  difficulty: "קל",
  targetAge: "10-13",
  breakDuration: 10,
  content: {
    slides: [
      slide1Intro,
      slide2Poll,
      slide3History,
      slide4HistoryMatching,
      slide5WhatIsComputer,
      slide6DataVsInfo,
      slide7HardwareSoftware,
      slide8HardwareSoftwareGame,
      slide9MainComponents,
      slide10Cpu,
      slide11Storage,
      slide12Ram,
      slide13Motherboard,
      slide14Psu,
      slide15Gpu,
      slide16ComponentMatching,
      slide17ComputerSimulator,
      slide18RecommendedSpecs,
      slide19LabSimulation,
      slide20Quiz,
      slide21InputOutput,
      slide22InputOutputGame,
      slide23FinalPoll,
      slide24Summary,
      slide25Reflection
    ]
  }
}; 