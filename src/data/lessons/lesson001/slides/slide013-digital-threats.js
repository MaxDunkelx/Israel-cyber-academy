export const slide11DigitalThreats = {
  id: "slide-11",
  type: "content",
  title: "איומים דיגיטליים - מה צריך לדעת? ⚡",
  content: {
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    elements: [
      {
        type: "title",
        text: "איומים דיגיטליים - מה צריך לדעת? ⚡",
        style: { 
          fontSize: "3.5rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 6px 12px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "subtitle",
        text: "הכירו את האיומים הנפוצים ביותר באינטרנט ואיך להגן על עצמכם",
        style: { 
          fontSize: "1.5rem", 
          color: "white", 
          textAlign: "center", 
          opacity: 0.95, 
          marginBottom: "3rem",
          textShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "specs",
        items: [
          { icon: "🦠", component: "וירוסים", spec: "תוכנות זדוניות שמתפשטות במחשב" },
          { icon: "🎣", component: "פישינג", spec: "ניסיון לגנוב פרטים אישיים" },
          { icon: "🔒", component: "רנסומוור", spec: "חטיפת קבצים ודרישת כופר" },
          { icon: "👥", component: "גניבת זהות", spec: "שימוש בפרטים אישיים של אחרים" },
          { icon: "📱", component: "הונאות סלולר", spec: "הודעות מזויפות וקישורים חשודים" },
          { icon: "🌐", component: "אתרים מזויפים", spec: "העתקים של אתרים אמיתיים לגניבת מידע" }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "⚠️",
            title: "סימני אזהרה",
            description: "הודעות דחופות, פרסים מפתיעים, בקשות לפרטים אישיים"
          },
          {
            icon: "🛡️",
            title: "דרכי הגנה",
            description: "סיסמאות חזקות, אימות דו-שלבי, אנטי-וירוס מעודכן"
          }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "list",
        items: [
          "🔍 תמיד בדקו את כתובת האתר",
          "📧 אל תפתחו קישורים מהודעות חשודות",
          "🔐 אל תשתפו סיסמאות עם אף אחד",
          "📱 הפעילו אימות דו-שלבי",
          "🛡️ התקינו אנטי-וירוס מעודכן",
          "💾 עשו גיבוי לקבצים חשובים"
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "0 auto"
        }
      },
      {
        type: "tip",
        text: "💡 זכרו: אם משהו נשמע טוב מדי להיות אמיתי, כנראה שהוא לא אמיתי!",
        style: { 
          fontSize: "1.3rem",
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.15)",
          border: "3px solid rgba(255,255,255,0.3)"
        }
      }
    ]
  }
}; 