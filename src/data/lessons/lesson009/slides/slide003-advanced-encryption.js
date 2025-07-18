export const slide3AdvancedEncryption = {
  id: "slide-3",
  type: "content",
  title: "הצפנה מתקדמת - Advanced Encryption 🔐",
  content: {
    sections: [
      {
        title: "מה זה הצפנה מתקדמת?",
        content: "הצפנה מתקדמת היא שימוש באלגוריתמים מורכבים וטכניקות מתקדמות להגנה על מידע רגיש."
      },
      {
        title: "סוגי הצפנה מתקדמים",
        items: [
          {
            icon: "🔑",
            title: "הצפנה אסימטרית",
            description: "RSA, ECC - שימוש בזוג מפתחות (ציבורי ופרטי)"
          },
          {
            icon: "🔒",
            title: "הצפנה סימטרית",
            description: "AES, ChaCha20 - מפתח אחד להצפנה ופענוח"
          },
          {
            icon: "🔐",
            title: "הצפנה היברידית",
            description: "שילוב של הצפנה אסימטרית וסימטרית"
          },
          {
            icon: "🛡️",
            title: "הצפנה מקצה לקצה",
            description: "End-to-End Encryption - הצפנה מלאה של התקשורת"
          }
        ]
      },
      {
        title: "פרוטוקולי הצפנה מתקדמים",
        items: [
          "TLS 1.3 - הגרסה החדשה ביותר של SSL/TLS",
          "Signal Protocol - פרוטוקול הצפנה למסרים",
          "WireGuard - פרוטוקול VPN מודרני",
          "PGP/GPG - הצפנת אימייל מתקדמת"
        ]
      },
      {
        title: "אתגרים בהצפנה מתקדמת",
        items: [
          "ניהול מפתחות - איך לשמור מפתחות בצורה בטוחה",
          "ביצועים - הצפנה דורשת משאבי מחשוב",
          "קוונטום - מחשבים קוונטיים עלולים לשבור הצפנה",
          "יישום נכון - הצפנה לא נכונה עלולה להיות מסוכנת"
        ]
      }
    ],
    examples: [
      {
        type: "code",
        title: "דוגמה: הצפנת AES",
        code: "AES-256-GCM - הצפנה סימטרית עם אימות"
      }
    ]
  }
}; 