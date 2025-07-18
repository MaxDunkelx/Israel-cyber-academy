// Import all slides for lesson 8
import { slide1Intro } from './slides/slide001-intro.js';
import { slide2Poll } from './slides/slide002-poll.js';
import { slide3WhatIsDatabase } from './slides/slide003-what-is-database.js';
import { slide4DatabaseTypes } from './slides/slide004-database-types.js';
import { slide5SqlBasics } from './slides/slide005-sql-basics.js';
import { slide6DatabaseStructure } from './slides/slide006-database-structure.js';
import { slide7DatabaseGame } from './slides/slide007-database-game.js';
import { slide8SqlQueries } from './slides/slide008-sql-queries.js';
import { slide9DatabaseSimulator } from './slides/slide009-database-simulator.js';
import { slide10DataNormalization } from './slides/slide010-data-normalization.js';
import { slide11Joins } from './slides/slide011-joins.js';
import { slide12DataSecurity } from './slides/slide012-data-security.js';
import { slide13BackupRecovery } from './slides/slide013-backup-recovery.js';
import { slide14Break } from './slides/slide014-break.js';
import { slide15DataWarehouse } from './slides/slide015-data-warehouse.js';
import { slide16BigData } from './slides/slide016-big-data.js';
import { slide17DataAnalytics } from './slides/slide017-data-analytics.js';
import { slide18DataVisualization } from './slides/slide018-data-visualization.js';
import { slide19DataPrivacy } from './slides/slide019-data-privacy.js';
import { slide20DatabaseCareers } from './slides/slide020-database-careers.js';
import { slide21DatabaseQuiz } from './slides/slide021-database-quiz.js';
import { slide22DatabaseChallenge } from './slides/slide022-database-challenge.js';
import { slide23DataTrends } from './slides/slide023-data-trends.js';
import { slide24DataEthics } from './slides/slide024-data-ethics.js';
import { slide25FinalBreak } from './slides/slide025-final-break.js';
import { slide26FinalLab } from './slides/slide026-final-lab.js';
import { slide27FinalReflection } from './slides/slide027-final-reflection.js';
import { slide28Summary } from './slides/slide028-summary.js';
import { slide29Goodbye } from './slides/slide029-goodbye.js';
import { slide30Feedback } from './slides/slide030-feedback.js';

export const lesson008 = {
  id: "lesson-008",
  title: "מסדי נתונים וניהול מידע",
  subtitle: "Databases and Data Management",
  description: "לימוד יסודות מסדי נתונים, SQL וניהול מידע",
  duration: "90 דקות",
  difficulty: "מתחילים",
  category: "נתונים",
  tags: ["מסדי נתונים", "SQL", "נתונים", "ניתוח", "אבטחה"],
  slides: [
    slide1Intro,
    slide2Poll,
    slide3WhatIsDatabase,
    slide4DatabaseTypes,
    slide5SqlBasics,
    slide6DatabaseStructure,
    slide7DatabaseGame,
    slide8SqlQueries,
    slide9DatabaseSimulator,
    slide10DataNormalization,
    slide11Joins,
    slide12DataSecurity,
    slide13BackupRecovery,
    slide14Break,
    slide15DataWarehouse,
    slide16BigData,
    slide17DataAnalytics,
    slide18DataVisualization,
    slide19DataPrivacy,
    slide20DatabaseCareers,
    slide21DatabaseQuiz,
    slide22DatabaseChallenge,
    slide23DataTrends,
    slide24DataEthics,
    slide25FinalBreak,
    slide26FinalLab,
    slide27FinalReflection,
    slide28Summary,
    slide29Goodbye,
    slide30Feedback
  ],
  objectives: [
    "להבין מה זה מסד נתונים ולמה הוא חשוב",
    "ללמוד על סוגי מסדי נתונים שונים",
    "ללמוד שפת SQL ופקודות בסיסיות",
    "להבין מבנה מסדי נתונים ונרמול",
    "ללמוד על אבטחת נתונים וגיבוי",
    "להכיר עולם ניתוח הנתונים",
    "להבין פרטיות נתונים ואתיקה",
    "להכיר קריירה בעולם הנתונים",
    "להכיר טרנדים עכשוויים"
  ],
  prerequisites: [
    "ידע בסיסי במחשב",
    "יכולת קריאה וכתיבה בעברית",
    "גישה לאינטרנט"
  ],
  materials: [
    "מחשב עם דפדפן",
    "גישה לאינטרנט",
    "כלי ניתוח נתונים (אופציונלי)"
  ]
}; 