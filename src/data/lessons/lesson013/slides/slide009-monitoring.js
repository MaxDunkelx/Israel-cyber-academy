export const slide9Monitoring = {
  id: "slide-9",
  type: "content",
  title: "ניטור רשתות מתקדם - Advanced Network Monitoring 📊",
  content: {
    sections: [
      {
        title: "מהו ניטור רשתות מתקדם?",
        content: "ניטור רשתות מתקדם כולל כלים וטכניקות לזיהוי, ניתוח ותגובה לאירועי אבטחה בזמן אמת."
      },
      {
        title: "כלי ניטור מתקדמים",
        items: [
          {
            tool: "SIEM (Security Information and Event Management)",
            description: "ניהול מידע ואירועי אבטחה",
            features: ["איסוף לוגים", "ניתוח בזמן אמת", "התראות", "דוחות"],
            examples: ["Splunk", "IBM QRadar", "Microsoft Sentinel", "Exabeam"]
          },
          {
            tool: "Network Traffic Analysis (NTA)",
            description: "ניתוח תעבורת רשת",
            features: ["ניתוח פרוטוקולים", "זיהוי אנומליות", "ניתוח התנהגות", "חיזוי איומים"],
            examples: ["Darktrace", "Cisco Stealthwatch", "ExtraHop"]
          },
          {
            tool: "Endpoint Detection and Response (EDR)",
            description: "זיהוי ותגובה בנקודות הקצה",
            features: ["ניטור מכשירים", "זיהוי איומים", "תגובה אוטומטית", "חקירה"],
            examples: ["CrowdStrike", "Carbon Black", "SentinelOne"]
          }
        ]
      },
      {
        title: "טכניקות ניטור מתקדמות",
        items: [
          "Real-time Monitoring - ניטור בזמן אמת",
          "Behavioral Analysis - ניתוח התנהגות",
          "Anomaly Detection - זיהוי אנומליות",
          "Threat Correlation - מתאם איומים",
          "Predictive Analytics - ניתוח חיזוי"
        ]
      },
      {
        title: "אתגרי ניטור מתקדם",
        items: [
          "Volume of Data - כמות נתונים עצומה",
          "False Positives - התראות שווא",
          "Complexity - מורכבות המערכות",
          "Skills Gap - מחסור במומחיות",
          "Cost - עלויות גבוהות"
        ]
      }
    ],
    tips: [
      "השתמשו בכלי ניטור מתאימים",
      "הגדירו התראות חכמות",
      "תעדו כל אירוע",
      "בצעו ניתוח תקופתי"
    ]
  }
}; 