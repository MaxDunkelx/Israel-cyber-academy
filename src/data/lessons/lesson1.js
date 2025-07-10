export const lesson1 = {
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
              duration: 45,
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
              animationType: "bounce",
              element: "💻",
              style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
            }
          ],
          duration: 180
        }
      },
      {
        id: "slide-4",
        type: "video",
        title: "סוגי האקרים - הסבר וידאו 🎥",
        content: {
          description: "צפה בסרטון קצר המסביר על סוגי האקרים השונים",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          duration: 180
        }
      },
      {
        id: "slide-5",
        type: "interactive",
        title: "סוגי האקרים - משחק התאמה 🎯",
        content: {
          type: "drag-drop",
          instructions: "לחץ על האקר ואז על הקטגוריה המתאימה לו",
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
            },
            {
              id: 5,
              text: "אדם שפורץ לחשבונות של אחרים",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
              correctCategory: "black"
            },
            {
              id: 6,
              text: "אדם שמוצא באג אבל מבקש כסף תמורת המידע",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
              correctCategory: "gray"
            }
          ],
          duration: 300
        }
      },
      {
        id: "slide-6",
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
        id: "slide-7",
        type: "interactive",
        title: "כלים בסיסיים לאבטחה 🛠️",
        content: {
          type: "matching",
          instructions: "לחץ על כלי ואז על התיאור המתאים לו",
          pairs: [
            { tool: "אנטי וירוס", description: "מחפש תוכנות זדוניות במחשב", icon: "🦠" },
            { tool: "פיירוול", description: "בודק תעבורה נכנסת ויוצאת", icon: "🔥" },
            { tool: "סיסמה חזקה", description: "מגנה על החשבון שלך", icon: "🔐" },
            { tool: "גיבוי", description: "שומר על הקבצים שלך", icon: "💾" },
            { tool: "הצפנה", description: "מסתיר מידע חשוב", icon: "🔒" },
            { tool: "אימות דו-שלבי", description: "מוסיף שכבת הגנה נוספת", icon: "📱" }
          ],
          duration: 300
        }
      },
      {
        id: "slide-8",
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
              type: "list",
              items: [
                "🔐 סודיות (Confidentiality) - רק אנשים מורשים יכולים לגשת למידע",
                "✅ שלמות (Integrity) - המידע נשאר מדויק ולא משתנה",
                "🔄 זמינות (Availability) - המידע זמין כשצריך אותו"
              ],
              style: { fontSize: "1.3rem", color: "#333", textAlign: "right", lineHeight: "2.5" }
            },
            {
              type: "image",
              src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
              alt: "Security Triangle",
              style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
            }
          ],
          duration: 200
        }
      },
      {
        id: "slide-9",
        type: "interactive",
        title: "מבחן ידע - תנאי הסייבר 🧠",
        content: {
          type: "multiple-choice",
          question: "איזה מהתנאים הבאים מתייחס לכך שהמידע נשאר מדויק ולא משתנה?",
          options: [
            { id: "a", text: "סודיות", icon: "🔐" },
            { id: "b", text: "שלמות", icon: "✅" },
            { id: "c", text: "זמינות", icon: "🔄" },
            { id: "d", text: "אבטחה", icon: "🛡️" }
          ],
          correctAnswer: "b",
          explanation: "שלמות (Integrity) מתייחסת לכך שהמידע נשאר מדויק, שלם ולא משתנה ללא הרשאה.",
          hint: "חשב על המילה 'שלם' - מה זה אומר?"
        }
      },
      {
        id: "slide-10",
        type: "break",
        title: "הפסקה קצרה ☕",
        content: {
          message: "בואו ננוח רגע לפני שנמשיך לחלק הבא!",
          duration: 120,
          activity: {
            title: "חידון מהיר",
            question: "מה זה VPN?",
            hint: "זה קשור לרשת פרטית..."
          }
        }
      },
      {
        id: "slide-11",
        type: "presentation",
        title: "איומים דיגיטליים נפוצים ⚠️",
        content: {
          background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          elements: [
            {
              type: "title",
              text: "איומים דיגיטליים נפוצים",
              style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
            },
            {
              type: "list",
              items: [
                "🦠 וירוסים - תוכנות זדוניות שמתפשטות",
                "🎣 פישינג - הונאות דרך אימייל או הודעות",
                "🔓 סוס טרויאני - תוכנה שמסתירה קוד זדוני",
                "💰 כופר - תוכנה שחוסמת גישה לקבצים",
                "👥 הנדסה חברתית - מניפולציה פסיכולוגית",
                "🌐 התקפות DDoS - הצפת שרתים"
              ],
              style: { fontSize: "1.2rem", color: "#333", textAlign: "right", lineHeight: "2" }
            }
          ],
          duration: 300
        }
      },
      {
        id: "slide-12",
        type: "interactive",
        title: "זיהוי איומים דיגיטליים 🔍",
        content: {
          type: "multiple-choice",
          question: "אימייל שמבקש ממך ללחוץ על קישור ולזין פרטי בנק הוא דוגמה ל:",
          content: {
            text: "תמונה של אימייל חשוד"
          },
          options: [
            { id: "a", text: "וירוס", icon: "🦠" },
            { id: "b", text: "פישינג", icon: "🎣" },
            { id: "c", text: "סוס טרויאני", icon: "🔓" },
            { id: "d", text: "כופר", icon: "💰" }
          ],
          correctAnswer: "b",
          explanation: "זהו פישינג - ניסיון להונות אותך לתת פרטים אישיים דרך אימייל מזויף.",
          hint: "חשב על דיג - מה הדייג מנסה לתפוס?"
        }
      },
      {
        id: "slide-13",
        type: "presentation",
        title: "איך להישאר בטוחים באינטרנט? 🛡️",
        content: {
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          elements: [
            {
              type: "title",
              text: "טיפים לאבטחה אישית",
              style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
            },
            {
              type: "list",
              items: [
                "🔐 השתמש בסיסמאות חזקות וייחודיות",
                "📱 הפעל אימות דו-שלבי",
                "🔄 עדכן תוכנות באופן קבוע",
                "🔍 בדוק כתובות אתרים לפני לחיצה",
                "💾 גבה קבצים חשובים",
                "🚫 אל תפתח קבצים מכתובות לא מוכרות",
                "👥 אל תשתף מידע אישי ברשתות חברתיות",
                "🔒 השתמש ברשתות WiFi מאובטחות"
              ],
              style: { fontSize: "1.1rem", color: "#333", textAlign: "right", lineHeight: "2" }
            }
          ],
          duration: 240
        }
      },
      {
        id: "slide-14",
        type: "interactive",
        title: "בניית סיסמה חזקה 🔐",
        content: {
          type: "drag-drop",
          instructions: "בנה סיסמה חזקה על ידי בחירת האלמנטים הנכונים",
          categories: [
            { id: "strong", name: "סיסמה חזקה", color: "#4CAF50", description: "מכילה את כל האלמנטים הנדרשים" },
            { id: "weak", name: "סיסמה חלשה", color: "#f44336", description: "חסרים אלמנטים חשובים" }
          ],
          items: [
            {
              id: 1,
              text: "123456",
              correctCategory: "weak"
            },
            {
              id: 2,
              text: "password",
              correctCategory: "weak"
            },
            {
              id: 3,
              text: "MyP@ssw0rd2024!",
              correctCategory: "strong"
            },
            {
              id: 4,
              text: "abc123",
              correctCategory: "weak"
            },
            {
              id: 5,
              text: "Tr0ub4dor&3",
              correctCategory: "strong"
            },
            {
              id: 6,
              text: "qwerty",
              correctCategory: "weak"
            }
          ],
          duration: 300
        }
      },
      {
        id: "slide-15",
        type: "video",
        title: "סרטון על אבטחת סיסמאות 🎬",
        content: {
          description: "צפה בסרטון המסביר איך ליצור ולשמור סיסמאות חזקות",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          duration: 180
        }
      },
      {
        id: "slide-16",
        type: "interactive",
        title: "מבחן סופי - מה למדנו? 🎓",
        content: {
          type: "multiple-choice",
          question: "איזה מהבאים הוא האקר כובע לבן?",
          options: [
            { id: "a", text: "אדם שפורץ לבנק לגניבת כסף", icon: "😈" },
            { id: "b", text: "אדם שמוצא באגים ומדווח עליהם", icon: "🛡️" },
            { id: "c", text: "אדם שפורץ לחשבונות של אחרים", icon: "🔓" },
            { id: "d", text: "אדם שדורש כסף תמורת מידע", icon: "💰" }
          ],
          correctAnswer: "b",
          explanation: "האקר כובע לבן הוא אדם שמשתמש בידע שלו כדי לעזור ולהגן על מערכות.",
          hint: "חשב על צבע לבן - מה הוא מסמל?"
        }
      },
      {
        id: "slide-17",
        type: "reflection",
        title: "הרהור על מה שלמדנו 🤔",
        content: {
          questions: [
            "מה הדבר הכי מעניין שלמדת היום?",
            "איך תשנה את ההתנהגות שלך באינטרנט אחרי השיעור?",
            "מה היית רוצה ללמוד עוד על אבטחת סייבר?"
          ],
          duration: 300
        }
      },
      {
        id: "slide-18",
        type: "presentation",
        title: "סיכום השיעור 📚",
        content: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          elements: [
            {
              type: "title",
              text: "כל הכבוד! סיימת את השיעור הראשון",
              style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
            },
            {
              type: "list",
              items: [
                "✅ למדת מה זה סייבר ואבטחת מידע",
                "✅ הכרת סוגי האקרים השונים",
                "✅ הבנת איומים דיגיטליים נפוצים",
                "✅ למדת איך להישאר בטוחים באינטרנט",
                "✅ התאמנת על כלים אינטראקטיביים"
              ],
              style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
            },
            {
              type: "subtitle",
              text: "בשיעור הבא נלמד על רשתות מחשבים ואבטחתן!",
              style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginTop: "2rem", opacity: 0.9 }
            }
          ],
          duration: 120
        }
      }
    ]
  }
}; 