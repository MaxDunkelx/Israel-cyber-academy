export const lessons = [
  {
    id: 1,
    title: "מבוא לעולם הסייבר",
    description: "שיעור מקיף בן 2.15 שעות - הכרת עולם הסייבר, האקרים, איומים דיגיטליים ופעילויות אינטראקטיביות",
    icon: "🛡️",
    duration: "2.15 שעות",
    difficulty: "קל",
    targetAge: "10-13",
    breakDuration: 15,
    content: {
      slides: [
        {
          id: "slide-1",
          type: "presentation",
          title: "ברוכים הבאים לעולם הסייבר! 🚀",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "שיעור 1: מבוא לעולם הסייבר",
                style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "היום נלמד על האקרים, איומים דיגיטליים ואיך להישאר בטוחים באינטרנט",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
              },
              {
                type: "image",
                src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
                alt: "Cybersecurity",
                style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
              },
              {
                type: "timer",
                duration: 30,
                text: "זמן קריאה"
              }
            ]
          }
        },
        {
          id: "slide-2",
          type: "poll",
          title: "מה דעתך על האקרים? 🤔",
          content: {
            question: "כשאתה שומע את המילה 'האקר', מה אתה חושב?",
            options: [
              { id: 1, text: "אנשים רעים שפורצים למחשבים", emoji: "😈" },
              { id: 2, text: "גאונים מחשבים", emoji: "🧠" },
              { id: 3, text: "אנשים שעוזרים לאבטח מחשבים", emoji: "🛡️" },
              { id: 4, text: "לא יודע", emoji: "🤷‍♂️" }
            ],
            allowMultiple: false,
            showResults: true,
            duration: 120
          }
        },
        {
          id: "slide-3",
          type: "presentation",
          title: "מה זה סייבר? 🧭",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "מה זה סייבר?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🔹 קיצור של 'קיברנטיקה' – תקשורת בין אדם למכונה",
                  "🔹 'סייבר סיקיוריטי' = הגנה על מחשבים ומידע",
                  "🔹 'סייבר התקפי' = תקיפות מחשבים",
                  "🔹 'האקר' = אדם שמבצע פעולות בתחום"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "animation",
                type: "bounce",
                element: "💻",
                style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-4",
          type: "interactive",
          title: "סוגי האקרים - משחק התאמה 🎯",
          content: {
            type: "drag-drop",
            instructions: "גרור כל האקר לקטגוריה הנכונה",
            categories: [
              { id: "white", name: "כובע לבן", color: "#4CAF50", description: "מגן על מערכות" },
              { id: "gray", name: "כובע אפור", color: "#9E9E9E", description: "בדרך כלל טוב אך ייתכן שינצל הזדמנויות" },
              { id: "black", name: "כובע שחור", color: "#f44336", description: "משתמש בידע לפגיעה והונאה" }
            ],
            items: [
              {
                id: 1,
                text: "אדם שמוצא באגים באתרים ומדווח עליהם",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                correctCategory: "white"
              },
              {
                id: 2,
                text: "אדם שפורץ לבנק לגניבת כסף",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150",
                correctCategory: "black"
              },
              {
                id: 3,
                text: "אדם שמוצא חולשה אבל לא בטוח אם לדווח",
                image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150",
                correctCategory: "gray"
              },
              {
                id: 4,
                text: "אדם שעובד בחברת אבטחה",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150",
                correctCategory: "white"
              }
            ],
            duration: 300
          }
        },
        {
          id: "slide-5",
          type: "presentation",
          title: "מה זה אבטחת מידע? 🔒",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "מה זה אבטחת מידע?",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "הגנה על מערכות מידע",
                style: { fontSize: "1.5rem", color: "#666", textAlign: "center", marginBottom: "1rem" }
              },
              {
                type: "list",
                items: [
                  "💻 מחשבים, שרתים, רשתות",
                  "🚗 תחבורה חכמה",
                  "🏠 מכשירים חכמים (IoT)",
                  "📱 טלפונים ניידים"
                ],
                style: { fontSize: "1.3rem", color: "#333", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "subtitle",
                text: "שיטות הגנה:",
                style: { fontSize: "1.2rem", color: "#666", textAlign: "center", marginTop: "2rem" }
              },
              {
                type: "list",
                items: [
                  "✅ אימות זהות",
                  "👁️ ניטור פעילות",
                  "🎛️ בקרה על גישה",
                  "📚 מודעות והדרכה"
                ],
                style: { fontSize: "1.1rem", color: "#333", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-6",
          type: "interactive",
          title: "כלים בסיסיים לאבטחה 🛠️",
          content: {
            type: "matching",
            instructions: "התאם כל כלי לתיאור שלו",
            pairs: [
              { tool: "אנטי וירוס", description: "מחפש תוכנות זדוניות במחשב", icon: "🦠" },
              { tool: "פיירוול", description: "בודק תעבורה נכנסת ויוצאת", icon: "🔥" },
              { tool: "סיסמה חזקה", description: "מגנה על החשבון שלך", icon: "🔐" },
              { tool: "גיבוי", description: "שומר על הקבצים שלך", icon: "💾" }
            ],
            duration: 300
          }
        },
        {
          id: "slide-7",
          type: "presentation",
          title: "שלושת תנאי הסייבר 📊",
          content: {
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            elements: [
              {
                type: "title",
                text: "שלושת תנאי הסייבר",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "cards",
                items: [
                  {
                    title: "🌐 רשת",
                    description: "חיבור בין מחשבים",
                    color: "#4facfe"
                  },
                  {
                    title: "📄 מידע",
                    description: "משהו ששווה לגנוב",
                    color: "#43e97b"
                  },
                  {
                    title: "👤 גורם אנושי",
                    description: "תמים או פגיע",
                    color: "#fa709a"
                  }
                ]
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-8",
          type: "interactive",
          title: "המשולש הקדוש: CIA 🏛️",
          content: {
            type: "triangle-game",
            instructions: "לחץ על כל צד של המשולש כדי ללמוד עליו",
            triangle: {
              confidentiality: {
                title: "Confidentiality - סודיות",
                description: "המידע נשאר סודי ורק אנשים מורשים יכולים לגשת אליו",
                icon: "🤐",
                color: "#4CAF50"
              },
              integrity: {
                title: "Integrity - מהימנות",
                description: "המידע נשאר מדויק ולא השתנה",
                icon: "✅",
                color: "#2196F3"
              },
              availability: {
                title: "Availability - זמינות",
                description: "המידע זמין כשצריכים אותו",
                icon: "🕐",
                color: "#FF9800"
              }
            },
            duration: 300
          }
        },
        {
          id: "slide-9",
          type: "video",
          title: "ניתוח סרטון על פגיעות באזרחים 🎬",
          content: {
            videoUrl: "https://www.youtube.com/embed/aAj8zHOEfiI",
            description: "סרטון שמראה איך תקיפות סייבר יכולות לפגוע באזרחים רגילים",
            duration: 240,
            questions: [
              {
                question: "איך תקיפת סייבר יכולה לפגוע באזרחים רגילים?",
                type: "text",
                required: true
              },
              {
                question: "מה אתה חושב על זה שאנשים רגילים יכולים להיות קורבנות?",
                type: "text",
                required: true
              }
            ]
          }
        },
        {
          id: "slide-10",
          type: "interactive",
          title: "מפת תקיפות סייבר בזמן אמת 🗺️",
          content: {
            type: "live-map",
            instructions: "צפה במפת התקיפות בזמן אמת",
            mapUrl: "https://threatmap.checkpoint.com",
            description: "זוהי מפה שמראה תקיפות סייבר שקורות ברגע זה בכל העולם",
            observations: [
              "איזה מדינות מופיעות הכי הרבה?",
              "איזה סוגי תקיפות אתה רואה?",
              "מה אתה חושב על הכמות של התקיפות?"
            ],
            duration: 300
          }
        },
        {
          id: "slide-11",
          type: "presentation",
          title: "אמצעי הלחימה בסייבר ⚔️",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "אמצעי הלחימה בסייבר",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🤫 שקטים – קשה לזיהוי",
                  "🦠 ויראליים – התפשטות רחבה",
                  "👻 אנונימיים – קשה לדעת מי תוקף"
                ],
                style: { fontSize: "1.4rem", color: "white", textAlign: "right", lineHeight: "2.5" }
              },
              {
                type: "warning",
                text: "⚠️ זהירות: גם פרטיים יכולים להחזיק כלי נשק דיגיטליים!",
                style: { fontSize: "1.2rem", color: "#ffeb3b", textAlign: "center", marginTop: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-12",
          type: "presentation",
          title: "דוגמה: Stuxnet 🦠",
          content: {
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
            elements: [
              {
                type: "title",
                text: "Stuxnet - הנשק האלקטרוני הראשון",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🦠 תולעת מחשב שפגעה פיזית בתשתית גרעינית",
                  "🎯 נחשבת לנשק האלקטרוני הראשון",
                  "⚠️ מראה את הסכנה – גם פרטיים יכולים להחזיק כלי נשק דיגיטליים",
                  "🌍 השפיעה על תשתיות באיראן"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "animation",
                type: "pulse",
                element: "💥",
                style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-13",
          type: "interactive",
          title: "סוגי תוקפים - משחק זיהוי 🎮",
          content: {
            type: "attacker-identification",
            instructions: "זהה איזה סוג תוקף כל אחד",
            attackers: [
              {
                id: 1,
                name: "אקטיביסט",
                description: "פועל בשם צדק חברתי",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150",
                type: "activist",
                explanation: "מאמין שהוא עושה טוב לחברה"
              },
              {
                id: 2,
                name: "האקר עצמי",
                description: "מנצל חולשות לרווח אישי",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150",
                type: "selfish",
                explanation: "רוצה כסף או מידע אישי"
              },
              {
                id: 3,
                name: "סקיד",
                description: "משתמש בכלים קיימים בלי הבנה מעמיקה",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                type: "script-kiddie",
                explanation: "לא מבין מה הוא עושה, רק משתמש בכלים"
              }
            ],
            duration: 300
          }
        },
        {
          id: "slide-14",
          type: "break",
          title: "הפסקה קצרה! ☕",
          content: {
            duration: 900, // 15 minutes
            message: "זמן הפסקה! חזור בעוד 15 דקות",
            activity: {
              type: "puzzle",
              title: "חידת סייבר",
              question: "מה המשותף בין מחשב לבין בית?",
              answer: "שניהם צריכים דלתות נעולות (סיסמאות) כדי להישאר בטוחים!",
              hint: "חשב על אבטחה..."
            }
          }
        },
        {
          id: "slide-15",
          type: "presentation",
          title: "איום הסייבר כיום 📈",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "איום הסייבר כיום",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "statistics",
                items: [
                  {
                    number: "3+ מיליון",
                    label: "משרות סייבר פתוחות בעולם",
                    icon: "💼"
                  },
                  {
                    number: "גבוה מאוד",
                    label: "משכורות בתחום הסייבר",
                    icon: "💰"
                  },
                  {
                    number: "עולה כל שנה",
                    label: "הביקוש לאנשי סייבר",
                    icon: "📈"
                  }
                ]
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-16",
          type: "interactive",
          title: "על מה מגנים? 🛡️",
          content: {
            type: "protection-targets",
            instructions: "לחץ על כל מטרה כדי ללמוד עליה",
            targets: [
              {
                id: "personal",
                name: "מידע אישי",
                description: "סיסמאות, פרטי בנק, תמונות פרטיות",
                icon: "👤",
                color: "#4CAF50"
              },
              {
                id: "business",
                name: "מידע עסקי",
                description: "נתונים של חברות, רשימות לקוחות",
                icon: "🏢",
                color: "#2196F3"
              },
              {
                id: "government",
                name: "מידע ממשלתי",
                description: "נתונים של מדינות, צבא, משטרה",
                icon: "🏛️",
                color: "#FF9800"
              },
              {
                id: "devices",
                name: "מכשירים",
                description: "מחשבים, סלולרים, אתרים, שרתים",
                icon: "💻",
                color: "#9C27B0"
              }
            ],
            duration: 300
          }
        },
        {
          id: "slide-17",
          type: "presentation",
          title: "האם ניתן להגן ב-100%? ❓",
          content: {
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
            elements: [
              {
                type: "title",
                text: "האם ניתן להגן ב-100%?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "answer",
                text: "לא!",
                style: { fontSize: "3rem", color: "#ffeb3b", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "שלושה גורמים עיקריים שמונעים זאת:",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "1rem" }
              },
              {
                type: "list",
                items: [
                  "👤 הגורם האנושי – אנשים עושים טעויות",
                  "😴 עצלנות – לא מעדכנים תוכנות",
                  "💰 חסכנות – לא רוצים לשלם על אבטחה"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-18",
          type: "interactive",
          title: "משחק סייבר אינטראקטיבי 🎮",
          content: {
            type: "cyber-game",
            instructions: "שחק במשחק סייבר אינטראקטיבי",
            gameUrl: "https://www.pbs.org/wgbh/nova/labs/lab/cyber/#",
            description: "משחק שמלמד על אבטחת סייבר בדרך מהנה",
            objectives: [
              "למד על סוגי תקיפות",
              "הגן על מערכות",
              "זהה חולשות"
            ],
            duration: 600
          }
        },
        {
          id: "slide-19",
          type: "interactive",
          title: "תרגיל לסיכום: DoS ו-DDoS 📝",
          content: {
            type: "quiz",
            instructions: "ענה על השאלות ובדוק כמה למדת",
            questions: [
              {
                question: "מהי התקפת DoS?",
                options: [
                  "התקפה שמנסה לעצור שירות",
                  "התקפה שמנסה לגנוב מידע",
                  "התקפה שמנסה לפרוץ למחשב",
                  "התקפה שמנסה להפיץ וירוס"
                ],
                correct: 0,
                explanation: "DoS = Denial of Service - מנסה לעצור שירות"
              },
              {
                question: "מה ההבדל בין DoS ל-DDoS?",
                options: [
                  "אין הבדל",
                  "DDoS מגיע ממקור אחד, DoS ממקורות רבים",
                  "DoS מגיע ממקור אחד, DDoS ממקורות רבים",
                  "DoS יותר מסוכן"
                ],
                correct: 2,
                explanation: "DDoS = Distributed DoS - מגיע ממקורות רבים"
              },
              {
                question: "מה זה 'המחשב שלי הוא Botnet'?",
                options: [
                  "המחשב שלי חזק מאוד",
                  "המחשב שלי נגוע וירוס שמשתמשים בו לתקיפות",
                  "המחשב שלי מחובר לרשת",
                  "המחשב שלי מוגן"
                ],
                correct: 1,
                explanation: "Botnet = רשת מחשבים נגועים שמשתמשים בהם לתקיפות"
              }
            ],
            showResults: true,
            certificate: true,
            duration: 300
          }
        },
        {
          id: "slide-20",
          type: "presentation",
          title: "חשיבות התחום והצורך באנשי סייבר 🌟",
          content: {
            background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
            elements: [
              {
                type: "title",
                text: "למה חשוב ללמוד סייבר?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "💰 מקצוע עם שכר גבוה",
                  "🎯 עניין רב ואתגרים",
                  "🚀 עתיד מבטיח",
                  "🌍 מגן על העולם הדיגיטלי",
                  "🎓 האקינג חוקי כל עוד משתמשים בו לטובה"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "animation",
                type: "bounce",
                element: "🏆",
                style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-21",
          type: "reflection",
          title: "מה למדת היום? 🤔",
          content: {
            questions: [
              "מה היה הדבר הכי מעניין שלמדת על האקרים?",
              "מה הדבר הכי חשוב שתזכור על אבטחת סייבר?",
              "איך תשנה את ההתנהגות שלך באינטרנט?",
              "האם תרצה ללמוד עוד על סייבר? למה?",
              "מה היית רוצה ללמוד בשיעור הבא?"
            ],
            type: "text",
            required: true,
            duration: 300
          }
        }
      ],
      progress: {
        totalSlides: 21,
        requiredActivities: ["slide-2", "slide-4", "slide-6", "slide-8", "slide-10", "slide-13", "slide-16", "slide-19"],
        minimumScore: 70
      }
    }
  },
  {
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
        {
          id: "slide-1",
          type: "presentation",
          title: "ברוכים הבאים לעולם המחשבים! 🚀",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "שיעור 2: מבנה המחשב וחומרה",
                style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "היום נלמד על רכיבי המחשב, היסטוריה מרתקת ונבנה מחשב וירטואלי!",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
              },
              {
                type: "image",
                src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
                alt: "Computer Components",
                style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
              },
              {
                type: "timer",
                duration: 30,
                text: "זמן קריאה"
              }
            ]
          }
        },
        {
          id: "slide-2",
          type: "poll",
          title: "מה אתה יודע על מחשבים? 🤔",
          content: {
            question: "איזה רכיב מחשב אתה מכיר?",
            options: [
              { id: 1, text: "מעבד (CPU)", emoji: "🧠" },
              { id: 2, text: "זיכרון (RAM)", emoji: "💾" },
              { id: 3, text: "כרטיס מסך", emoji: "🖥️" },
              { id: 4, text: "לוח אם", emoji: "🔌" },
              { id: 5, text: "לא יודע", emoji: "🤷‍♂️" }
            ],
            allowMultiple: true,
            showResults: true,
            duration: 120
          }
        },
        {
          id: "slide-3",
          type: "presentation",
          title: "היסטוריה מרתקת של המחשב 🕰️",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "מסע בזמן: היסטוריה של המחשב",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "timeline",
                events: [
                  {
                    year: "1642",
                    title: "מכונת החישוב הראשונה",
                    description: "בלז פסקל יצר מכונה לחישובים מתמטיים",
                    icon: "🧮"
                  },
                  {
                    year: "1946",
                    title: "ENIAC",
                    description: "המחשב האלקטרוני הראשון - בגודל חדר שלם!",
                    icon: "🏢"
                  },
                  {
                    year: "1975",
                    title: "Apple II",
                    description: "המחשב האישי הראשון - מהפכה!",
                    icon: "🍎"
                  },
                  {
                    year: "2024",
                    title: "IoT - מחשבים בכל מקום",
                    description: "מטוסים, רכבים, כספומטים, טלפונים חכמים",
                    icon: "🌐"
                  }
                ],
                style: { color: "white", fontSize: "1.2rem" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-4",
          type: "interactive",
          title: "משחק התאמה: היסטוריה 🎯",
          content: {
            type: "matching",
            instructions: "התאם כל מחשב לשנת היצירה שלו",
            pairs: [
              { tool: "ENIAC", description: "1946 - המחשב האלקטרוני הראשון", icon: "🏢" },
              { tool: "Apple II", description: "1975 - המחשב האישי הראשון", icon: "🍎" },
              { tool: "מכונת פסקל", description: "1642 - מכונת חישוב מכנית", icon: "🧮" },
              { tool: "iPhone", description: "2007 - הטלפון החכם הראשון", icon: "📱" }
            ],
            duration: 300
          }
        },
        {
          id: "slide-5",
          type: "presentation",
          title: "מה זה מחשב? 🧠",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "מה זה מחשב?",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "definition",
                text: "מכונה אלקטרונית שמבצעת עיבוד נתונים (קלט) ומפיקה תוצאה (פלט)",
                style: { fontSize: "1.5rem", color: "#333", textAlign: "center", padding: "2rem", backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "15px" }
              },
              {
                type: "comparison",
                title: "הבדל בין נתונים למידע",
                items: [
                  {
                    title: "נתונים (Data)",
                    description: "עובדות גולמיות - מספרים, מילים, תמונות",
                    icon: "📊"
                  },
                  {
                    title: "מידע (Information)",
                    description: "נתונים בעלי משמעות ומטרה",
                    icon: "📈"
                  }
                ],
                style: { fontSize: "1.2rem", color: "#333" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-6",
          type: "interactive",
          title: "משחק: נתונים או מידע? 🎮",
          content: {
            type: "matching",
            instructions: "התאם בין המונח להסבר המתאים לו (נתון גולמי או מידע עם משמעות)",
            pairs: [
              { tool: "טמפרטורה: 25 מעלות", description: "נתון גולמי של טמפרטורה (Data)", icon: "🌡️" },
              { tool: "היום חם מאוד - 25 מעלות", description: "מידע עם משמעות על מזג האוויר (Information)", icon: "☀️" },
              { tool: "שם: דני כהן", description: "נתון גולמי של שם (Data)", icon: "🧑" },
              { tool: "דני כהן הוא התלמיד הכי טוב בכיתה", description: "מידע עם משמעות על דני (Information)", icon: "🏆" },
              { tool: "צבע: כחול", description: "נתון גולמי של צבע (Data)", icon: "🎨" },
              { tool: "השמיים כחולים היום", description: "מידע עם משמעות על השמיים (Information)", icon: "☁️" }
            ],
            duration: 300
          }
        },
        {
          id: "slide-7",
          type: "presentation",
          title: "חומרה ותוכנה - ההבדל 🧱",
          content: {
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            elements: [
              {
                type: "title",
                text: "חומרה vs תוכנה",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "analogy",
                title: "דוגמה: אופנוע",
                description: "תוכנה = האדם שמפעיל, חומרה = האופנוע שהוא הכלי",
                style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "comparison",
                title: "ההבדלים",
                items: [
                  {
                    title: "תוכנה",
                    description: "הוראות שהמחשב מפעיל - מערכת הפעלה, Word, משחקים",
                    icon: "💿",
                    color: "#4CAF50"
                  },
                  {
                    title: "חומרה",
                    description: "כל החלקים הפיזיים - אלקטרוניים או מכניים",
                    icon: "🔧",
                    color: "#2196F3"
                  }
                ],
                style: { fontSize: "1.2rem", color: "white" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-8",
          type: "interactive",
          title: "משחק: חומרה או תוכנה? 🎯",
          content: {
            type: "drag-drop",
            instructions: "גרור כל פריט לקטגוריה הנכונה",
            categories: [
              { id: "hardware", name: "חומרה", color: "#2196F3", description: "חלקים פיזיים" },
              { id: "software", name: "תוכנה", color: "#4CAF50", description: "הוראות ותוכנות" }
            ],
            items: [
              {
                id: 1,
                text: "מעבד (CPU)",
                correctCategory: "hardware"
              },
              {
                id: 2,
                text: "Windows 11",
                correctCategory: "software"
              },
              {
                id: 3,
                text: "כרטיס מסך",
                correctCategory: "hardware"
              },
              {
                id: 4,
                text: "Minecraft",
                correctCategory: "software"
              },
              {
                id: 5,
                text: "זיכרון RAM",
                correctCategory: "hardware"
              },
              {
                id: 6,
                text: "Google Chrome",
                correctCategory: "software"
              }
            ],
            duration: 300
          }
        },
        {
          id: "slide-9",
          type: "presentation",
          title: "רכיבי החומרה העיקריים 🖥️",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "רכיבי החומרה העיקריים",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "נכיר את 6 הרכיבים החשובים ביותר במחשב",
                style: { fontSize: "1.3rem", color: "white", textAlign: "center", opacity: 0.9 }
              },
              {
                type: "image",
                src: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
                alt: "Computer Components",
                style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
              }
            ],
            duration: 120
          }
        },
        {
          id: "slide-10",
          type: "presentation",
          title: "1. מעבד (CPU) - המוח של המחשב 🧠",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "המעבד - המוח של המחשב",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "מבצע את כל ההוראות בתוכנה",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🔹 זיכרון מטמון - זיכרון מהיר מאוד",
                  "🔹 אוגרים - זיכרון זמני קטן",
                  "🔹 ליבות - כמה 'מוחות' במקביל",
                  "🔹 שעון (Clock) - קובע מהירות הפעולה"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "animation",
                type: "pulse",
                element: "🧠",
                style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-11",
          type: "presentation",
          title: "2. זיכרון ארוך טווח 💾",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "זיכרון ארוך טווח",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "Hard Disk / SSD - לאחסון קבוע",
                style: { fontSize: "1.5rem", color: "#666", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "comparison",
                title: "סוגי אחסון",
                items: [
                  {
                    title: "SSD",
                    description: "מהיר ויקר - כמו זיכרון פלאש",
                    icon: "⚡",
                    color: "#4CAF50"
                  },
                  {
                    title: "הארד דיסק",
                    description: "מגנטי וזול יותר - כמו תקליט",
                    icon: "💿",
                    color: "#2196F3"
                  }
                ],
                style: { fontSize: "1.2rem", color: "#333" }
              },
              {
                type: "list",
                items: [
                  "📁 קבצים, תמונות, סרטים",
                  "💻 מערכת הפעלה",
                  "🎮 תוכנות ומשחקים",
                  "📚 מסמכים ועבודות"
                ],
                style: { fontSize: "1.2rem", color: "#333", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-12",
          type: "presentation",
          title: "3. זיכרון קצר טווח (RAM) 🚀",
          content: {
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            elements: [
              {
                type: "title",
                text: "זיכרון קצר טווח - RAM",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "הסגן מנהל שמזכיר למעבד משימות",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "⚡ מאוד מהיר - כמו זיכרון זמני",
                  "🔄 נדיף - נמחק כשכבים את המחשב",
                  "📱 לתהליכים שרצים בזמן אמת",
                  "🎯 עוזר למעבד לעבוד מהר יותר"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "analogy",
                title: "דוגמה: שולחן עבודה",
                description: "RAM הוא כמו שולחן העבודה - מקום זמני לעבודה פעילה",
                style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginTop: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-13",
          type: "presentation",
          title: "4. לוח אם (Motherboard) 🏠",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "לוח האם - הבית של החומרה",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "מחבר בין כל הרכיבים",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🔌 מחבר את כל הרכיבים יחד",
                  "🎛️ מאפשר בקרה ותיאום",
                  "📡 מעביר מידע בין הרכיבים",
                  "⚡ מספק חשמל לכל החלקים"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "image",
                src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300",
                alt: "Motherboard",
                style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-14",
          type: "presentation",
          title: "5. ספק כוח (PSU) ⚡",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "ספק כוח - PSU",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "מספק מתח לכל רכיבי המחשב",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🔌 ממיר חשמל מהשקע למחשב",
                  "⚡ מספק מתח מתאים לכל רכיב",
                  "💪 ככל שההספק גבוה יותר - יכולת העיבוד גבוהה יותר",
                  "🛡️ מגן על הרכיבים מפני נזקי חשמל"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "animation",
                type: "flash",
                element: "⚡",
                style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-15",
          type: "presentation",
          title: "6. כרטיס מסך (GPU) 🖥️",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "כרטיס מסך - GPU",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "מתרגם פעולות לתצוגה גרפית",
                style: { fontSize: "1.5rem", color: "#666", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "comparison",
                title: "סוגי כרטיסי מסך",
                items: [
                  {
                    title: "בסיסי",
                    description: "מובנה בלוח אם - למשימות פשוטות",
                    icon: "📺",
                    color: "#4CAF50"
                  },
                  {
                    title: "חיצוני",
                    description: "חזק - למשחקים וגרפיקה מתקדמת",
                    icon: "🎮",
                    color: "#2196F3"
                  }
                ],
                style: { fontSize: "1.2rem", color: "#333" }
              },
              {
                type: "list",
                items: [
                  "🎨 מציג תמונות וסרטים",
                  "🎮 מאפשר משחקים מתקדמים",
                  "📊 עוזר בעיבוד גרפי",
                  "🖼️ מטפל בצבעים ופרטים"
                ],
                style: { fontSize: "1.2rem", color: "#333", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-16",
          type: "interactive",
          title: "משחק: זיהוי רכיבים 🎯",
          content: {
            type: "matching",
            instructions: "התאם כל רכיב לתיאור שלו",
            pairs: [
              { tool: "מעבד (CPU)", description: "המוח של המחשב - מבצע הוראות", icon: "🧠" },
              { tool: "זיכרון RAM", description: "זיכרון מהיר לתהליכים פעילים", icon: "🚀" },
              { tool: "הארד דיסק", description: "אחסון קבוע לקבצים", icon: "💾" },
              { tool: "כרטיס מסך", description: "מציג תמונות על המסך", icon: "🖥️" },
              { tool: "לוח אם", description: "מחבר בין כל הרכיבים", icon: "🏠" },
              { tool: "ספק כוח", description: "מספק חשמל לכל הרכיבים", icon: "⚡" }
            ],
            duration: 360
          }
        },
        {
          id: "slide-17",
          type: "interactive",
          title: "סימולטור: הרכבת מחשב 🧩",
          content: {
            type: "computer-build",
            instructions: "בנה מחשב וירטואלי על ידי בחירת רכיבים",
            components: [
              {
                id: "cpu",
                name: "מעבד",
                options: [
                  { name: "Intel i3", price: 500, performance: 3, description: "מעבד בסיסי" },
                  { name: "Intel i5", price: 800, performance: 4, description: "מעבד בינוני" },
                  { name: "Intel i9", price: 1500, performance: 5, description: "מעבד חזק" }
                ]
              },
              {
                id: "ram",
                name: "זיכרון RAM",
                options: [
                  { name: "8GB", price: 200, performance: 3, description: "זיכרון בסיסי" },
                  { name: "16GB", price: 400, performance: 4, description: "זיכרון בינוני" },
                  { name: "32GB", price: 800, performance: 5, description: "זיכרון חזק" }
                ]
              },
              {
                id: "storage",
                name: "אחסון",
                options: [
                  { name: "500GB הארד דיסק", price: 100, performance: 2, description: "אחסון איטי" },
                  { name: "1TB SSD", price: 300, performance: 4, description: "אחסון מהיר" },
                  { name: "2TB SSD", price: 600, performance: 5, description: "אחסון מהיר וגדול" }
                ]
              },
              {
                id: "gpu",
                name: "כרטיס מסך",
                options: [
                  { name: "מובנה", price: 0, performance: 2, description: "כרטיס בסיסי" },
                  { name: "GTX 1660", price: 800, performance: 4, description: "כרטיס בינוני" },
                  { name: "RTX 4080", price: 2000, performance: 5, description: "כרטיס חזק" }
                ]
              }
            ],
            budget: 5000,
            duration: 600
          }
        },
        {
          id: "slide-18",
          type: "presentation",
          title: "מפרט טכני מומלץ 💻",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "מפרט טכני מומלץ לדוגמה",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "specs",
                items: [
                  { component: "מעבד", spec: "Intel i9 או AMD Ryzen 9", icon: "🧠" },
                  { component: "זיכרון RAM", spec: "לפחות 16GB DDR5", icon: "🚀" },
                  { component: "אחסון", spec: "500GB SSD + 2TB הארד דיסק", icon: "💾" },
                  { component: "כרטיס מסך", spec: "RTX 4070 או דומה", icon: "🖥️" },
                  { component: "ספק כוח", spec: "750W או יותר", icon: "⚡" },
                  { component: "לוח אם", spec: "תואם למעבד הנבחר", icon: "🏠" }
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-19",
          type: "interactive",
          title: "מעבדת מחשבים - שלב 2 🔬",
          content: {
            type: "lab-simulation",
            instructions: "בדוק מה קורה כשחסר רכיב במחשב",
            scenarios: [
              {
                name: "מחשב בלי מעבד",
                description: "מה קורה כשחסר המוח?",
                result: "המחשב לא יעלה בכלל - אין מי שיעבד הוראות",
                icon: "❌"
              },
              {
                name: "מחשב בלי זיכרון RAM",
                description: "מה קורה כשחסר זיכרון זמני?",
                result: "המחשב יעלה אבל יהיה מאוד איטי",
                icon: "🐌"
              },
              {
                name: "מחשב בלי הארד דיסק",
                description: "מה קורה כשחסר אחסון?",
                result: "המחשב יעלה אבל לא יהיה מקום לקבצים",
                icon: "📁"
              },
              {
                name: "מחשב בלי כרטיס מסך",
                description: "מה קורה כשחסר כרטיס מסך?",
                result: "לא תהיה תצוגה על המסך",
                icon: "🖥️"
              }
            ],
            duration: 300
          }
        },
        {
          id: "slide-20",
          type: "quiz",
          title: "בוחן: רכיבי המחשב 📝",
          content: {
            questions: [
              {
                question: "איזה רכיב נקרא 'המוח של המחשב'?",
                options: ["מעבד (CPU)", "זיכרון RAM", "הארד דיסק", "כרטיס מסך"],
                correct: 0,
                explanation: "המעבד הוא המוח - הוא מבצע את כל ההוראות"
              },
              {
                question: "מה ההבדל בין RAM להארד דיסק?",
                options: ["אין הבדל", "RAM מהיר יותר אבל נמחק", "הארד דיסק יותר יקר", "RAM גדול יותר"],
                correct: 1,
                explanation: "RAM מהיר יותר אבל נמחק כשכבים את המחשב"
              },
              {
                question: "מה תפקיד לוח האם?",
                options: ["להציג תמונות", "לחבר בין רכיבים", "לספק חשמל", "לאחסן קבצים"],
                correct: 1,
                explanation: "לוח האם מחבר בין כל הרכיבים"
              },
              {
                question: "איזה רכיב מספק חשמל לכל המחשב?",
                options: ["מעבד", "ספק כוח", "לוח אם", "כרטיס מסך"],
                correct: 1,
                explanation: "ספק הכוח ממיר חשמל מהשקע למחשב"
              }
            ],
            duration: 480
          }
        },
        {
          id: "slide-21",
          type: "presentation",
          title: "קלט ופלט - איך המחשב עובד 🔄",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "קלט ופלט - איך המחשב עובד",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "flow",
                steps: [
                  { step: "קלט", description: "עכבר, מקלדת, מיקרופון", icon: "🖱️" },
                  { step: "עיבוד", description: "המעבד מעבד את המידע", icon: "🧠" },
                  { step: "זיכרון", description: "RAM מאחסן זמנית", icon: "💾" },
                  { step: "פלט", description: "מסך, רמקולים, מדפסת", icon: "🖥️" }
                ],
                style: { fontSize: "1.3rem", color: "white" }
              },
              {
                type: "example",
                title: "דוגמה: כתיבת טקסט",
                description: "מקלדת → מעבד → זיכרון → מסך",
                style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginTop: "2rem" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-22",
          type: "interactive",
          title: "משחק: זיהוי קלט ופלט 🎮",
          content: {
            type: "drag-drop",
            instructions: "גרור כל מכשיר לקטגוריה הנכונה",
            categories: [
              { id: "input", name: "קלט", color: "#4CAF50", description: "מכניס מידע למחשב" },
              { id: "output", name: "פלט", color: "#2196F3", description: "מציג תוצאות מהמחשב" },
              { id: "both", name: "קלט ופלט", color: "#FF9800", description: "גם מכניס וגם מציג" }
            ],
            items: [
              {
                id: 1,
                text: "מקלדת",
                correctCategory: "input"
              },
              {
                id: 2,
                text: "מסך",
                correctCategory: "output"
              },
              {
                id: 3,
                text: "עכבר",
                correctCategory: "input"
              },
              {
                id: 4,
                text: "רמקולים",
                correctCategory: "output"
              },
              {
                id: 5,
                text: "מסך מגע",
                correctCategory: "both"
              },
              {
                id: 6,
                text: "מיקרופון",
                correctCategory: "input"
              }
            ],
            duration: 300
          }
        },
        {
          id: "slide-23",
          type: "poll",
          title: "מה למדת היום? 🤔",
          content: {
            question: "איזה נושא היה הכי מעניין?",
            options: [
              { id: 1, text: "היסטוריה של המחשב", emoji: "🕰️" },
              { id: 2, text: "רכיבי החומרה", emoji: "💻" },
              { id: 3, text: "סימולטור הרכבת מחשב", emoji: "🧩" },
              { id: 4, text: "קלט ופלט", emoji: "🔄" },
              { id: 5, text: "הכל מעניין!", emoji: "🌟" }
            ],
            allowMultiple: false,
            showResults: true,
            duration: 120
          }
        },
        {
          id: "slide-24",
          type: "presentation",
          title: "סיכום השיעור 📚",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "מה למדנו היום?",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🕰️ היסטוריה מרתקת של המחשב",
                  "🧠 מה זה מחשב ואיך הוא עובד",
                  "💻 6 רכיבי החומרה העיקריים",
                  "🧩 הרכבנו מחשב וירטואלי",
                  "🔄 הבנו קלט ופלט",
                  "🎮 שיחקנו משחקי למידה"
                ],
                style: { fontSize: "1.3rem", color: "#333", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "subtitle",
                text: "עכשיו אתם מומחי מחשבים! 🎉",
                style: { fontSize: "1.5rem", color: "#666", textAlign: "center", marginTop: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-25",
          type: "reflection",
          title: "שאלות למחשבה 💭",
          content: {
            questions: [
              "איך לדעתך ייראו המחשבים בעתיד?",
              "איזה רכיב מחשב אתה חושב הכי חשוב? למה?",
              "מה היית רוצה ללמוד על מחשבים בהמשך?",
              "איך לדעתך המחשבים משנים את העולם?"
            ],
            duration: 300
          }
        }
      ]
    }
  },
  {
    id: 3,
    title: "הכרת Windows",
    description: "עבודה עם מערכת ההפעלה Windows. כולל הפסקה של 45-55 דקות.",
    icon: "🪟",
    duration: "3 שעות",
    difficulty: "בינוני",
    content: {
      theory: [
        "ממשק המשתמש",
        "ניהול קבצים ותיקיות",
        "הגדרות מערכת",
        "כלי ניהול"
      ],
      exercises: [
        {
          type: "simulation",
          title: "ניווט במערכת הקבצים",
          steps: [
            "יצירת תיקיה חדשה",
            "העברת קבצים",
            "שינוי הרשאות",
            "גיבוי קבצים"
          ]
        }
      ]
    }
  },
  {
    id: 4,
    title: "הכרת Linux",
    description: "עבודה עם מערכת ההפעלה Linux. כולל הפסקה של 45-55 דקות.",
    icon: "🐧",
    duration: "3 שעות",
    difficulty: "בינוני",
    content: {
      theory: [
        "ממשק שורת הפקודה",
        "פקודות בסיסיות",
        "ניהול הרשאות",
        "התקנת תוכנות"
      ],
      exercises: [
        {
          type: "terminal",
          title: "פקודות Linux בסיסיות",
          commands: [
            { command: "ls", description: "הצגת תוכן תיקיה" },
            { command: "cd", description: "שינוי תיקיה" },
            { command: "mkdir", description: "יצירת תיקיה" },
            { command: "rm", description: "מחיקת קובץ" }
          ]
        }
      ]
    }
  },
  {
    id: 5,
    title: "רשתות",
    description: "הכרת עולם הרשתות והאינטרנט. כולל הפסקה של 45-55 דקות.",
    icon: "🌐",
    duration: "3 שעות",
    difficulty: "בינוני",
    content: {
      theory: [
        "מהי רשת מחשבים?",
        "סוגי רשתות",
        "פרוטוקולי תקשורת",
        "כתובות IP"
      ],
      exercises: [
        {
          type: "network_simulation",
          title: "בניית רשת פשוטה",
          components: ["נתב", "מחשבים", "כבלים", "מודם"]
        }
      ]
    }
  },
  {
    id: 6,
    title: "פרוטוקולים",
    description: "הכרת פרוטוקולי תקשורת. כולל הפסקה של 45-55 דקות.",
    icon: "📡",
    duration: "3 שעות",
    difficulty: "בינוני",
    content: {
      theory: [
        "HTTP ו-HTTPS",
        "FTP",
        "SSH",
        "DNS"
      ],
      exercises: [
        {
          type: "protocol_analysis",
          title: "ניתוח תעבורת רשת",
          scenarios: [
            "גלישה לאתר מאובטח",
            "העברת קבצים",
            "חיבור מרחוק"
          ]
        }
      ]
    }
  },
  {
    id: 7,
    title: "תכנות והקמת אתר",
    description: "בניית אתר אינטרנט בסיסי. כולל הפסקה של 45-55 דקות.",
    icon: "💻",
    duration: "3 שעות",
    difficulty: "בינוני",
    content: {
      theory: [
        "HTML בסיסי",
        "CSS לעיצוב",
        "JavaScript בסיסי",
        "עקרונות פיתוח אתרים"
      ],
      exercises: [
        {
          type: "code_editor",
          title: "בניית דף HTML פשוט",
          template: "<!DOCTYPE html>\n<html>\n<head>\n<title>האתר שלי</title>\n</head>\n<body>\n<h1>שלום עולם!</h1>\n</body>\n</html>"
        }
      ]
    }
  },
  {
    id: 8,
    title: "הכרת דפדפן",
    description: "עבודה מתקדמת עם דפדפן האינטרנט. כולל הפסקה של 45-55 דקות.",
    icon: "🌍",
    duration: "3 שעות",
    difficulty: "קל",
    content: {
      theory: [
        "כלי פיתוח",
        "ניהול סיסמאות",
        "הגדרות אבטחה",
        "תוספים ושיפורים"
      ],
      exercises: [
        {
          type: "browser_inspection",
          title: "בדיקת קוד אתר",
          tasks: [
            "פתיחת כלי פיתוח",
            "בדיקת אלמנטים",
            "ניתוח רשת",
            "בדיקת ביצועים"
          ]
        }
      ]
    }
  },
  {
    id: 9,
    title: "אנונימיות",
    description: "הגנה על פרטיות באינטרנט",
    icon: "🕵️",
    duration: "75 דקות",
    difficulty: "בינוני",
    content: {
      theory: [
        "מהי אנונימיות?",
        "VPN - רשת פרטית וירטואלית",
        "Tor Browser",
        "הגנה על זהות דיגיטלית"
      ],
      exercises: [
        {
          type: "privacy_check",
          title: "בדיקת פרטיות דיגיטלית",
          checks: [
            "הגדרות פרטיות ברשתות חברתיות",
            "הסרת מידע אישי",
            "הגנה על סיסמאות"
          ]
        }
      ]
    }
  },
  {
    id: 10,
    title: "קריפטוגרפיה",
    description: "הצפנה ופענוח מידע",
    icon: "🔐",
    duration: "90 דקות",
    difficulty: "מתקדם",
    content: {
      theory: [
        "עקרונות ההצפנה",
        "הצפנה סימטרית",
        "הצפנה אסימטרית",
        "חתימה דיגיטלית"
      ],
      exercises: [
        {
          type: "crypto_puzzle",
          title: "פענוח הודעות מוצפנות",
          messages: [
            { encrypted: "Khoor Zruog", key: 3, method: "caesar" },
            { encrypted: "01001000 01101001", method: "binary" }
          ]
        }
      ]
    }
  },
  {
    id: 11,
    title: "סטגנוגרפיה",
    description: "הסתרת מידע בתוך מידע אחר",
    icon: "📝",
    duration: "60 דקות",
    difficulty: "מתקדם",
    content: {
      theory: [
        "מהי סטגנוגרפיה?",
        "הסתרת מידע בתמונות",
        "הסתרת מידע בטקסט",
        "זיהוי סטגנוגרפיה"
      ],
      exercises: [
        {
          type: "stego_challenge",
          title: "מציאת הודעות מוסתרות",
          files: ["תמונה עם הודעה מוסתרת", "מסמך עם טקסט מוסתר"]
        }
      ]
    }
  },
  {
    id: 12,
    title: "איסוף מודעין",
    description: "איסוף מידע ממקורות פתוחים",
    icon: "🔍",
    duration: "75 דקות",
    difficulty: "בינוני",
    content: {
      theory: [
        "OSINT - מודיעין ממקורות פתוחים",
        "חיפוש מתקדם בגוגל",
        "ניתוח מידע ברשתות חברתיות",
        "כלי איסוף מידע"
      ],
      exercises: [
        {
          type: "osint_investigation",
          title: "חקירה דיגיטלית",
          scenarios: [
            "חיפוש מידע על חברה",
            "ניתוח פרופיל ברשת חברתית",
            "מציאת מידע נסתר"
          ]
        }
      ]
    }
  },
  {
    id: 13,
    title: "גוגל האקינג",
    description: "חיפוש מתקדם ואיתור מידע רגיש",
    icon: "🔎",
    duration: "60 דקות",
    difficulty: "מתקדם",
    content: {
      theory: [
        "פקודות חיפוש מתקדמות",
        "איתור קבצים רגישים",
        "חיפוש באתרים ספציפיים",
        "הגנה מפני גוגל האקינג"
      ],
      exercises: [
        {
          type: "google_dorks",
          title: "חיפוש מתקדם בגוגל",
          queries: [
            "site:example.com filetype:pdf",
            "intitle:admin login",
            "inurl:config"
          ]
        }
      ]
    }
  },
  {
    id: 14,
    title: "סניפינג",
    description: "יירוט וניתוח תעבורת רשת",
    icon: "📡",
    duration: "90 דקות",
    difficulty: "מתקדם",
    content: {
      theory: [
        "מהו סניפינג?",
        "כלי יירוט תעבורה",
        "ניתוח חבילות נתונים",
        "הגנה מפני סניפינג"
      ],
      exercises: [
        {
          type: "packet_analysis",
          title: "ניתוח תעבורת רשת",
          scenarios: [
            "יירוט תעבורת HTTP",
            "ניתוח חבילות TCP",
            "זיהוי פעילות חשודה"
          ]
        }
      ]
    }
  },
  {
    id: 15,
    title: "פישינג",
    description: "הכרת מתקפות פישינג והגנה מפניהן",
    icon: "🎣",
    duration: "75 דקות",
    difficulty: "בינוני",
    content: {
      theory: [
        "מהו פישינג?",
        "סוגי מתקפות פישינג",
        "זיהוי הודעות פישינג",
        "הגנה מפני פישינג"
      ],
      exercises: [
        {
          type: "phishing_detection",
          title: "זיהוי הודעות פישינג",
          emails: [
            { content: "הודעה חשובה מהבנק", suspicious: true },
            { content: "אישור הזמנה", suspicious: false },
            { content: "זכייה בלוטו", suspicious: true }
          ]
        }
      ]
    }
  },
  {
    id: 16,
    title: "בינה מלאכותית",
    description: "AI בסייבר - הזדמנויות ואתגרים",
    icon: "🤖",
    duration: "90 דקות",
    difficulty: "מתקדם",
    content: {
      theory: [
        "AI בסייבר אבטחה",
        "זיהוי איומים באמצעות AI",
        "AI בהתקפות סייבר",
        "עתיד AI בסייבר"
      ],
      exercises: [
        {
          type: "ai_demo",
          title: "הדגמת AI בזיהוי איומים",
          demonstrations: [
            "זיהוי דפוסי התנהגות חשודים",
            "ניתוח לוגים אוטומטי",
            "חיזוי מתקפות"
          ]
        }
      ]
    }
  },
  {
    id: 17,
    title: "שפות תכנות",
    description: "שיעור מקיף על שפות תכנות, HTML, CSS, JavaScript - כולל תרגול מעשי ופרויקטים",
    icon: "💻",
    duration: "2.5 שעות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 15,
    content: {
      slides: [
        {
          id: "slide-1",
          type: "presentation",
          title: "ברוכים הבאים לעולם התכנות! 🚀",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "שיעור 4: שפות תכנות",
                style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "היום נלמד על שפות תכנות, נכתוב קוד ונבנה אתרים!",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
              },
              {
                type: "image",
                src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400",
                alt: "Programming",
                style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
              },
              {
                type: "timer",
                duration: 30,
                text: "זמן קריאה"
              }
            ]
          }
        },
        {
          id: "slide-2",
          type: "poll",
          title: "איזה שפת תכנות אתה מכיר? 🤔",
          content: {
            question: "איזה שפת תכנות שמעת עליה?",
            options: [
              { id: 1, text: "Python", emoji: "🐍" },
              { id: 2, text: "JavaScript", emoji: "📜" },
              { id: 3, text: "HTML", emoji: "🌐" },
              { id: 4, text: "Java", emoji: "☕" },
              { id: 5, text: "לא מכיר אף אחת", emoji: "🤷‍♂️" }
            ],
            allowMultiple: true,
            showResults: true,
            duration: 120
          }
        },
        {
          id: "slide-3",
          type: "presentation",
          title: "התפתחות שפות התכנות 📈",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "מבינארי לשפות מתקדמות",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "timeline",
                events: [
                  {
                    year: "1940s",
                    title: "בינארי (0/1)",
                    description: "השפה הראשונה - רק אפסים ואחדים",
                    icon: "🔢"
                  },
                  {
                    year: "1950s",
                    title: "Assembly",
                    description: "שפה קרובה לחומרה",
                    icon: "⚙️"
                  },
                  {
                    year: "1970s",
                    title: "C Language",
                    description: "שפה חזקה ויעילה",
                    icon: "🔧"
                  },
                  {
                    year: "1990s",
                    title: "Python, Java",
                    description: "שפות ידידותיות למשתמש",
                    icon: "🐍"
                  }
                ],
                style: { color: "white", fontSize: "1.2rem" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-4",
          type: "presentation",
          title: "סוגי שפות תכנות 🏗️",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "שפות נמוכות vs גבוהות",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "comparison",
                title: "ההבדלים",
                items: [
                  {
                    title: "שפות נמוכות",
                    description: "C, Assembly - קרובות לחומרה, מהירות, מורכבות",
                    icon: "⚡",
                    color: "#4CAF50"
                  },
                  {
                    title: "שפות גבוהות",
                    description: "Python, Java - ידידותיות, דורשות מהדר",
                    icon: "🎯",
                    color: "#2196F3"
                  }
                ],
                style: { fontSize: "1.2rem", color: "#333" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-5",
          type: "interactive",
          title: "משחק: זיהוי שפות תכנות 🎯",
          content: {
            type: "drag-drop",
            instructions: "גרור כל שפה לקטגוריה הנכונה",
            categories: [
              { id: "low", name: "שפות נמוכות", color: "#4CAF50", description: "קרובות לחומרה" },
              { id: "high", name: "שפות גבוהות", color: "#2196F3", description: "ידידותיות למשתמש" }
            ],
            items: [
              {
                id: 1,
                text: "C Language",
                correctCategory: "low"
              },
              {
                id: 2,
                text: "Python",
                correctCategory: "high"
              },
              {
                id: 3,
                text: "Assembly",
                correctCategory: "low"
              },
              {
                id: 4,
                text: "Java",
                correctCategory: "high"
              },
              {
                id: 5,
                text: "JavaScript",
                correctCategory: "high"
              }
            ],
            duration: 300
          }
        },
        {
          id: "slide-6",
          type: "presentation",
          title: "שפות לפי שימוש 🎯",
          content: {
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            elements: [
              {
                type: "title",
                text: "איזה שפה למה?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "💻 מחשבים: Python, Java, SQL, C",
                  "🌐 אינטרנט: HTML, CSS, JavaScript, PHP",
                  "📱 אפליקציות: Swift, Kotlin, React Native",
                  "🎮 משחקים: C++, Unity, Unreal Engine"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-7",
          type: "presentation",
          title: "Client vs Server Side 🌐",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "איפה הקוד רץ?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "comparison",
                title: "Client vs Server",
                items: [
                  {
                    title: "Client Side",
                    description: "רץ בדפדפן של המשתמש - HTML, CSS, JavaScript",
                    icon: "💻",
                    color: "#4CAF50"
                  },
                  {
                    title: "Server Side",
                    description: "רץ בשרת מרוחק - PHP, Python, Java",
                    icon: "🖥️",
                    color: "#2196F3"
                  }
                ],
                style: { fontSize: "1.2rem", color: "white" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-8",
          type: "interactive",
          title: "משחק: Client או Server? 🎮",
          content: {
            type: "drag-drop",
            instructions: "גרור כל טכנולוגיה לקטגוריה הנכונה",
            categories: [
              { id: "client", name: "Client Side", color: "#4CAF50", description: "רץ בדפדפן" },
              { id: "server", name: "Server Side", color: "#2196F3", description: "רץ בשרת" }
            ],
            items: [
              {
                id: 1,
                text: "HTML",
                correctCategory: "client"
              },
              {
                id: 2,
                text: "CSS",
                correctCategory: "client"
              },
              {
                id: 3,
                text: "JavaScript",
                correctCategory: "client"
              },
              {
                id: 4,
                text: "PHP",
                correctCategory: "server"
              },
              {
                id: 5,
                text: "Python",
                correctCategory: "server"
              }
            ],
            duration: 300
          }
        },
        {
          id: "slide-9",
          type: "presentation",
          title: "HTML - יסודות השפה 🌐",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "HTML - שפת הסימון",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "מבנה הדף - תגיות (Tags)",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "code-example",
                title: "דוגמה בסיסית",
                code: `<h1>כותרת ראשית</h1>
<p>פסקה עם טקסט</p>
<img src="תמונה.jpg" alt="תיאור">
<a href="https://example.com">קישור</a>`,
                language: "html",
                style: { fontSize: "1.1rem", color: "white", backgroundColor: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "10px" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-10",
          type: "interactive",
          title: "תרגול: כתיבת HTML 🛠️",
          content: {
            type: "code-editor",
            instructions: "כתוב קוד HTML ליצירת דף אישי",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>הדף שלי</title>
</head>
<body>
    <h1>שלום! אני [שם שלך]</h1>
    <p>אני אוהב [תחביב]</p>
    <img src="https://via.placeholder.com/300x200" alt="תמונה שלי">
</body>
</html>`,
            language: "html",
            duration: 600
          }
        },
        {
          id: "slide-11",
          type: "presentation",
          title: "טופסי HTML 📝",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "איך ליצור טפסים?",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "code-example",
                title: "טופס התחברות",
                code: `<form action="/login" method="post">
    <input type="text" name="username" placeholder="שם משתמש">
    <input type="password" name="password" placeholder="סיסמה">
    <input type="submit" value="התחבר">
</form>`,
                language: "html",
                style: { fontSize: "1.1rem", color: "#333", backgroundColor: "rgba(255,255,255,0.8)", padding: "1rem", borderRadius: "10px" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-12",
          type: "interactive",
          title: "תרגול: יצירת טפסים 📋",
          content: {
            type: "code-editor",
            instructions: "צור טופס הרשמה עם שדות שונים",
            template: `<form action="/register" method="post">
    <h2>הרשמה לאתר</h2>
    <input type="text" name="name" placeholder="שם מלא">
    <input type="email" name="email" placeholder="אימייל">
    <input type="password" name="password" placeholder="סיסמה">
    <input type="file" name="photo">
    <button type="submit">הרשם</button>
</form>`,
            language: "html",
            duration: 480
          }
        },
        {
          id: "slide-13",
          type: "presentation",
          title: "CSS - עיצוב הדף 🎨",
          content: {
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            elements: [
              {
                type: "title",
                text: "CSS - עיצוב וסגנון",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "חיבור CSS ל-HTML",
                style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "1rem" }
              },
              {
                type: "code-example",
                title: "חיבור CSS",
                code: `<link rel="stylesheet" href="style.css">`,
                language: "html",
                style: { fontSize: "1.2rem", color: "white", backgroundColor: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "10px" }
              },
              {
                type: "code-example",
                title: "סינטקס CSS",
                code: `h1 {
    color: red;
    text-align: center;
    font-size: 24px;
}`,
                language: "css",
                style: { fontSize: "1.1rem", color: "white", backgroundColor: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "10px", marginTop: "1rem" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-14",
          type: "interactive",
          title: "תרגול: עיצוב עם CSS 🎨",
          content: {
            type: "code-editor",
            instructions: "עצב את הדף האישי שלך עם CSS",
            template: `body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
    text-align: center;
}

h1 {
    color: #333;
    font-size: 2.5em;
    margin-bottom: 20px;
}

p {
    color: #666;
    font-size: 1.2em;
    line-height: 1.6;
}

img {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin: 20px;
}`,
            language: "css",
            duration: 480
          }
        },
        {
          id: "slide-15",
          type: "break",
          title: "הפסקה קצרה! ☕",
          content: {
            duration: 900,
            message: "זמן הפסקה! חזור בעוד 15 דקות",
            activity: {
              type: "puzzle",
              title: "חידת תכנות",
              question: "מה ההבדל בין HTML ל-CSS?",
              answer: "HTML מבנה את התוכן, CSS מעצב אותו!",
              hint: "חשב על בנייה ועיצוב..."
            }
          }
        },
        {
          id: "slide-16",
          type: "interactive",
          title: "פרויקט: בניית אתר אישי 🏗️",
          content: {
            type: "project",
            title: "בנה אתר אישי מלא",
            instructions: "צור דף HTML עם CSS שמציג עליך",
            requirements: [
              "כותרת ראשית עם השם שלך",
              "פסקה על עצמך",
              "תמונה (אמיתית או placeholder)",
              "רשימת תחביבים",
              "עיצוב יפה עם CSS"
            ],
            template: {
              html: `<!DOCTYPE html>
<html>
<head>
    <title>האתר שלי</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>שלום! אני [שם]</h1>
    <p>אני בן/בת [גיל] ואני אוהב [תחביבים]</p>
    <img src="https://via.placeholder.com/300x200" alt="תמונה שלי">
    <h2>התחביבים שלי:</h2>
    <ul>
        <li>[תחביב 1]</li>
        <li>[תחביב 2]</li>
        <li>[תחביב 3]</li>
    </ul>
</body>
</html>`,
              css: `body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
}

h1 {
    font-size: 3em;
    margin-bottom: 20px;
}

img {
    border-radius: 15px;
    margin: 20px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background: rgba(255,255,255,0.2);
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
}`
            },
            duration: 900
          }
        },
        {
          id: "slide-17",
          type: "quiz",
          title: "בוחן: שפות תכנות 📝",
          content: {
            questions: [
              {
                question: "מה ההבדל בין שפה נמוכה לגבוהה?",
                options: [
                  "אין הבדל",
                  "שפה נמוכה קרובה לחומרה, גבוהה ידידותית",
                  "שפה גבוהה מהירה יותר",
                  "שפה נמוכה קלה יותר"
                ],
                correct: 1,
                explanation: "שפה נמוכה קרובה לחומרה ומהירה, גבוהה ידידותית למשתמש"
              },
              {
                question: "איזה תג HTML יוצר כותרת ראשית?",
                options: ["<p>", "<h1>", "<title>", "<head>"],
                correct: 1,
                explanation: "<h1> יוצר כותרת ראשית"
              },
              {
                question: "איך מחברים CSS ל-HTML?",
                options: [
                  "<script src='style.css'>",
                  "<link rel='stylesheet' href='style.css'>",
                  "<css src='style.css'>",
                  "<style href='style.css'>"
                ],
                correct: 1,
                explanation: "משתמשים בתג <link> עם rel='stylesheet'"
              }
            ],
            duration: 360
          }
        },
        {
          id: "slide-18",
          type: "presentation",
          title: "סיכום השיעור 📚",
          content: {
            background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
            elements: [
              {
                type: "title",
                text: "מה למדנו היום?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "📈 התפתחות שפות התכנות",
                  "🏗️ סוגי שפות (נמוכות/גבוהות)",
                  "🌐 Client vs Server Side",
                  "📝 יסודות HTML",
                  "🎨 עיצוב עם CSS",
                  "🏗️ בניית אתר אישי"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "subtitle",
                text: "עכשיו אתם מתכנתים! 🎉",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginTop: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-19",
          type: "reflection",
          title: "שאלות למחשבה 💭",
          content: {
            questions: [
              "איזה שפת תכנות הכי מעניינת אותך? למה?",
              "מה היית רוצה לבנות עם תכנות?",
              "איך לדעתך תכנות ישנה את העולם?",
              "מה היית רוצה ללמוד בהמשך?"
            ],
            duration: 300
          }
        }
      ]
    }
  },
  {
    id: 18,
    title: "קבצי עוגיות ואבטחת דפדפן",
    description: "שיעור אינטראקטיבי בן 60 דקות - עוגיות, פרטיות, האקינג אתי ואמצעי הגנה",
    icon: "🍪",
    duration: "60 דקות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 0,
    content: {
      slides: [
        {
          id: "slide-1",
          type: "presentation",
          title: "ברוכים הבאים לעולם העוגיות! 🍪",
          content: {
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            elements: [
              {
                type: "title",
                text: "שיעור 5: קבצי עוגיות ואבטחת דפדפן",
                style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "60 דקות אינטראקטיביות - עוגיות, פרטיות, האקינג אתי ואמצעי הגנה",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
              },
              {
                type: "image",
                src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
                alt: "Cookies",
                style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
              },
              {
                type: "timer",
                duration: 30,
                text: "זמן קריאה"
              }
            ]
          }
        },
        {
          id: "slide-2",
          type: "presentation",
          title: "חלק 1: יסודות העוגיות (15 דקות) 📚",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "מה זה עוגיות?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "definition",
                text: "קבצי טקסט קטנים שהדפדפן שומר (למשל: login_token.txt)",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", padding: "2rem", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "15px" }
              },
              {
                type: "analogy",
                title: "דוגמה: תעודת זהות דיגיטלית",
                description: "אתרים נותנים לך 'תעודת זהות' כדי לזכור אותך",
                style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginTop: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🎯 מטרה: לזכור אותך → התאמה אישית",
                  "🔐 התחברויות, העדפות, פרסומות",
                  "💾 נשמרות במחשב שלך",
                  "📅 יש להן תאריך תפוגה"
                ],
                style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-3",
          type: "presentation",
          title: "סוגי עוגיות - טבלה מפורטת 📊",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "סוגי עוגיות לפי תפקיד",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "table",
                headers: ["סוג", "תפקיד", "דוגמה מהחיים"],
                rows: [
                  {
                    type: "Essential",
                    function: "פונקציונליות האתר",
                    example: "אפשרות 'זכור אותי' בהתחברות"
                  },
                  {
                    type: "Performance",
                    function: "עקיבה אחרי פעילות באתר זה",
                    example: "סעיף 'נצפה לאחרונה'"
                  },
                  {
                    type: "Advertising",
                    function: "מעקב בין אתרים",
                    example: "פרסומות לנעליים אחרי חיפוש נעליים"
                  }
                ],
                style: { fontSize: "1.2rem", color: "#333" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-4",
          type: "interactive",
          title: "תרגול: בדיקת עוגיות ב-DevTools 🔍",
          content: {
            type: "browser-inspection",
            instructions: "פתח את כלי הפיתוח ובדוק עוגיות ב-YouTube",
            steps: [
              "לחץ F12 או קליק ימני -> בדוק אלמנט",
              "עבור לטאב Application/Storage",
              "חפש Cookies בצד שמאל",
              "בקר ב-YouTube וחפש עוגיה בשם VISITOR_INFO1_LIVE",
              "בדוק את תאריך התפוגה והמידע שנשמר"
            ],
            duration: 300
          }
        },
        {
          id: "slide-5",
          type: "presentation",
          title: "חלק 2: סכנות אבטחה וזומבים (15 דקות) ⚠️",
          content: {
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
            elements: [
              {
                type: "title",
                text: "הצד האפל של העוגיות",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "warning",
                text: "⚠️ עוגיות יכולות להיות מסוכנות!",
                style: { fontSize: "1.5rem", color: "#ffeb3b", textAlign: "center", marginBottom: "2rem" }
              }
            ],
            duration: 120
          }
        },
        {
          id: "slide-6",
          type: "presentation",
          title: "🕵️ Session Hijacking - גניבת התחברות",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "Session Hijacking",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "diagram",
                title: "איך זה קורה?",
                steps: [
                  "האקר גונב את עוגיית ההתחברות שלך",
                  "משתמש בה כדי להתחבר לחשבון שלך",
                  "יכול לגשת לכל המידע שלך"
                ],
                style: { fontSize: "1.2rem", color: "white" }
              },
              {
                type: "code-example",
                title: "דוגמה: עוגיית התחברות",
                code: `login_token=abc123xyz789; expires=2024-12-31`,
                language: "text",
                style: { fontSize: "1.1rem", color: "white", backgroundColor: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "10px" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-7",
          type: "presentation",
          title: "☠️ Zombie Cookies - עוגיות זומבי",
          content: {
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            elements: [
              {
                type: "title",
                text: "עוגיות זומבי",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🧟 מסתירות ב-3+ מקומות (cache, Flash storage)",
                  "🔄 משכפלות את עצמן אחרי מחיקה",
                  "👻 חוזרות לחיים כמו זומבי",
                  "💀 קשות מאוד למחיקה"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "animation",
                type: "pulse",
                element: "🧟",
                style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-8",
          type: "presentation",
          title: "⚡ Super Cookies (UIDH) - עוגיות על",
          content: {
            background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
            elements: [
              {
                type: "title",
                text: "Super Cookies - עוגיות על",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "👻 מעקב ברמת ספק האינטרנט (למשל: Verizon)",
                  "🚫 עוקפות את כל בקרות הדפדפן",
                  "🔒 לא ניתן למחוק אותן",
                  "📡 עוקבות כל פעילות באינטרנט"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-9",
          type: "presentation",
          title: "🛡️ ערכת הגנה - כלי הנגד",
          content: {
            background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
            elements: [
              {
                type: "title",
                text: "איך להגן על עצמך?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🌐 דפדפן: חסום עוגיות צד שלישי (הגדרות > פרטיות)",
                  "🛡️ כלים: uBlock Origin / Privacy Badger",
                  "💥 אפשרות גרעינית: גלישה 'משרפה' קבועה",
                  "🔐 Brave/Firefox + VPN + מחיקת cache חודשית"
                ],
                style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-10",
          type: "presentation",
          title: "חלק 3: מעבדת האקינג אתי (20 דקות) 🎮",
          content: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            elements: [
              {
                type: "title",
                text: "האקינג אתי במשחקים",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "שינוי משתנים במשחקים דרך הדפדפן",
                style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "warning",
                text: "⚠️ רק במשחקים! לא בבנקים או חנויות!",
                style: { fontSize: "1.2rem", color: "#ffeb3b", textAlign: "center", marginTop: "2rem" }
              }
            ],
            duration: 120
          }
        },
        {
          id: "slide-11",
          type: "interactive",
          title: "משחק 1: Cookie Clicker Exploit 🍪",
          content: {
            type: "game-hacking",
            instructions: "האק את משחק Cookie Clicker",
            game: {
              name: "Cookie Clicker",
              url: "https://orteil.dashnet.org/cookieclicker/",
              hacks: [
                {
                  code: "Game.cookies = 999999999;",
                  description: "עוגיות אינסופיות!"
                },
                {
                  code: "Game.UpgradesById.forEach(u=>u.buy());",
                  description: "פתח הכל!"
                }
              ],
              steps: [
                "פתח את המשחק",
                "לחץ F12 לפתוח DevTools",
                "עבור לטאב Console",
                "הדבק את הקוד ולחץ Enter"
              ]
            },
            duration: 300
          }
        },
        {
          id: "slide-12",
          type: "interactive",
          title: "משחק 2: 2048 שיא עולם 🔢",
          content: {
            type: "game-hacking",
            instructions: "שנה את השיא במשחק 2048",
            game: {
              name: "2048",
              url: "https://play2048.co/",
              hacks: [
                {
                  code: "localStorage.setItem('bestScore', '999999');",
                  description: "קבע שיא גבוה"
                },
                {
                  code: "location.reload();",
                  description: "רענן כדי לראות"
                }
              ],
              steps: [
                "פתח את המשחק 2048",
                "פתח DevTools (F12)",
                "עבור ל-Console",
                "הדבק את הקוד"
              ]
            },
            duration: 300
          }
        },
        {
          id: "slide-13",
          type: "interactive",
          title: "משחק 3: דינוזאור בן אלמוות 🦖",
          content: {
            type: "game-hacking",
            instructions: "הפוך את הדינוזאור לבן אלמוות",
            game: {
              name: "Google Dino",
              url: "chrome://dino/",
              hacks: [
                {
                  code: "Runner.prototype.gameOver = function(){};",
                  description: "לעולם לא תמות"
                },
                {
                  code: "Runner.instance_.setSpeed(900);",
                  description: "מהירות על"
                }
              ],
              steps: [
                "פתח את משחק הדינוזאור",
                "פתח DevTools (F12)",
                "עבור ל-Console",
                "הדבק את הקוד"
              ]
            },
            duration: 300
          }
        },
        {
          id: "slide-14",
          type: "presentation",
          title: "חלק 4: תרגיל הגנה (10 דקות) 🛡️",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "תרחיש: חיפשת 'טיפול בחרדה'",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "subtitle",
                text: "עכשיו אתה רואה פרסומות ממוקדות",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🎯 המשימה שלך: הגן על הפרטיות שלך",
                  "🔍 מצא עוגיות מעקב ב-DevTools",
                  "🚫 חסום עוגיות צד שלישי",
                  "🛡️ התקן uBlock Origin",
                  "🧹 נקה אחסון חלופי (Flash/cache)"
                ],
                style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-15",
          type: "interactive",
          title: "מדדי הצלחה 📊",
          content: {
            type: "success-metrics",
            instructions: "בדוק אם הצלחת להגן על עצמך",
            metrics: [
              {
                metric: "פרסומות הפכו לגנריות",
                time: "תוך 2 דקות",
                icon: "🎯"
              },
              {
                metric: "פונקציונליות האתר נשארה",
                time: "עדיין עובד",
                icon: "✅"
              },
              {
                metric: "עוגיות מעקב נחסמו",
                time: "בדוק ב-DevTools",
                icon: "🚫"
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-16",
          type: "presentation",
          title: "שיעורי בית 📚",
          content: {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            elements: [
              {
                type: "title",
                text: "משימות לבית",
                style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "📋 בדיקת עוגיות: ייצא עוגיות מ-3 אתרים → סווג סוגים",
                  "🧟 ציד זומבי: בקר ב-zombiecookies.com",
                  "🔍 נסה למחוק עוגיות → צפה בתחייה",
                  "💭 הרהור האקינג: 'אם אפשר להאק משחקים עם עוגיות, מה האקרים יכולים לעשות עם עוגיות הבנק שלך?'"
                ],
                style: { fontSize: "1.2rem", color: "#333", textAlign: "right", lineHeight: "2" }
              }
            ],
            duration: 240
          }
        },
        {
          id: "slide-17",
          type: "quiz",
          title: "בוחן: עוגיות ואבטחה 📝",
          content: {
            questions: [
              {
                question: "מה זה cookies באינטרנט?",
                options: [
                  "עוגיות אמיתיות",
                  "קבצי טקסט קטנים ששומרים מידע",
                  "סוג של וירוס",
                  "תוכנה זדונית"
                ],
                correct: 1,
                explanation: "Cookies הם קבצי טקסט קטנים ששומרים מידע על המשתמש"
              },
              {
                question: "איזה סוג עוגיות הכי מסוכן?",
                options: [
                  "עוגיות בסיסיות",
                  "Zombie Cookies",
                  "עוגיות ביצועים",
                  "עוגיות פרסום"
                ],
                correct: 1,
                explanation: "Zombie Cookies מסוכנות כי הן משכפלות את עצמן"
              },
              {
                question: "מה זה Super Cookies?",
                options: [
                  "עוגיות גדולות יותר",
                  "מעקב ברמת ספק האינטרנט",
                  "עוגיות מהירות יותר",
                  "עוגיות צבעוניות"
                ],
                correct: 1,
                explanation: "Super Cookies עוקבות ברמת ספק האינטרנט"
              },
              {
                question: "איך להגן על עצמך מעוגיות מעקב?",
                options: [
                  "לאכול פחות עוגיות",
                  "לחסום עוגיות צד שלישי",
                  "למחוק את הדפדפן",
                  "לא להשתמש באינטרנט"
                ],
                correct: 1,
                explanation: "חסימת עוגיות צד שלישי היא דרך טובה להגנה"
              }
            ],
            duration: 360
          }
        },
        {
          id: "slide-18",
          type: "presentation",
          title: "סיכום השיעור 📚",
          content: {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            elements: [
              {
                type: "title",
                text: "מה למדנו היום?",
                style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
              },
              {
                type: "list",
                items: [
                  "🍪 יסודות העוגיות וסוגיהן",
                  "⚠️ סכנות אבטחה (Session Hijacking, Zombie Cookies)",
                  "⚡ Super Cookies ברמת ספק האינטרנט",
                  "🎮 האקינג אתי במשחקים",
                  "🛡️ אמצעי הגנה ופרטיות",
                  "🔍 תרגול מעשי עם DevTools"
                ],
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
              },
              {
                type: "subtitle",
                text: "עכשיו אתם מומחי פרטיות ואבטחה! 🛡️",
                style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginTop: "2rem" }
              }
            ],
            duration: 180
          }
        },
        {
          id: "slide-19",
          type: "reflection",
          title: "שאלות למחשבה 💭",
          content: {
            questions: [
              "האם אתה מודאג מפרטיות באינטרנט? למה?",
              "איזה אמצעי הגנה תנסה להשתמש בו?",
              "מה דעתך על מעקב אחרי משתמשים?",
              "איך לדעתך אפשר לאזן בין נוחות לפרטיות?",
              "אם אפשר להאק משחקים עם עוגיות, מה האקרים יכולים לעשות עם עוגיות הבנק שלך?"
            ],
            duration: 300
          }
        }
      ]
    }
  }
];

export const getLessonById = (id) => {
  return lessons.find(lesson => lesson.id === id);
};

export const getNextLesson = (currentId) => {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
  return lessons[currentIndex + 1] || null;
};

export const getPreviousLesson = (currentId) => {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
  return lessons[currentIndex - 1] || null;
}; 