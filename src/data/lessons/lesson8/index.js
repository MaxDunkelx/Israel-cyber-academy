// Import all slides for lesson 8
import { slide1Intro } from './slides/slide1-intro.js';
import { slide2Poll } from './slides/slide2-poll.js';
import { slide3WhatIsDatabase } from './slides/slide3-what-is-database.js';
import { slide4DatabaseTypes } from './slides/slide4-database-types.js';
import { slide5SqlVsNosql } from './slides/slide5-sql-vs-nosql.js';
import { slide6DatabaseDesign } from './slides/slide6-database-design.js';
import { slide7SqlBasics } from './slides/slide7-sql-basics.js';
import { slide8SqlGame } from './slides/slide8-sql-game.js';
import { slide9DatabaseSecurity } from './slides/slide9-database-security.js';
import { slide10Break } from './slides/slide10-break.js';
import { slide11DatabaseSimulator } from './slides/slide11-database-simulator.js';
import { slide12SqlPractice } from './slides/slide12-sql-practice.js';
import { slide13DataModeling } from './slides/slide13-data-modeling.js';
import { slide14Relationships } from './slides/slide14-relationships.js';
import { slide15Normalization } from './slides/slide15-normalization.js';
import { slide16DatabaseTools } from './slides/slide15-database-tools.js';
import { slide17Break } from './slides/slide16-break.js';
import { slide18CloudDatabases } from './slides/slide16-cloud-databases.js';
import { slide19BigData } from './slides/slide17-big-data.js';
import { slide20DatabaseSecurity } from './slides/slide20-database-security.js';
import { slide21AdvancedQuiz } from './slides/slide21-advanced-quiz.js';
import { slide22Reflection } from './slides/slide22-reflection.js';
import { slide23FinalQuiz } from './slides/slide23-final-quiz.js';
import { slide24Summary } from './slides/slide24-summary.js';

// Export the complete lesson 8 structure
export const lesson8 = {
  id: 8,
  title: "יסודות מסדי נתונים",
  description: "שיעור מקיף בן 3 שעות - לימוד מסדי נתונים, SQL, עיצוב מסדי נתונים ואבטחה",
  icon: "🗄️",
  duration: "3 שעות",
  difficulty: "בינוני",
  targetAge: "10-13",
  breakDuration: 15,
  content: {
    slides: [
      slide1Intro,
      slide2Poll,
      slide3WhatIsDatabase,
      slide4DatabaseTypes,
      slide5SqlVsNosql,
      slide6DatabaseDesign,
      slide7SqlBasics,
      slide8SqlGame,
      slide9DatabaseSecurity,
      slide10Break,
      slide11DatabaseSimulator,
      slide12SqlPractice,
      slide13DataModeling,
      slide14Relationships,
      slide15Normalization,
      slide16DatabaseTools,
      slide17Break,
      slide18CloudDatabases,
      slide19BigData,
      slide20DatabaseSecurity,
      slide21AdvancedQuiz,
      slide22Reflection,
      slide23FinalQuiz,
      slide24Summary
    ]
  }
}; 