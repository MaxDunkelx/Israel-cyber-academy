export const slide15LinuxSimulator = {
  id: "slide-15",
  type: "interactive",
  title: "סימולטור Linux - תרגול טרמינל 🐧",
  content: {
    type: "linux-simulator",
    instructions: "תרגלו את השימוש בטרמינל Linux בסביבה בטוחה! למדו פקודות בסיסיות וחקרו את המערכת",
    commands: [
      {
        category: "ניווט",
        commands: [
          { command: "pwd", description: "הצג את הנתיב הנוכחי", example: "pwd" },
          { command: "ls", description: "רשום קבצים ותיקיות", example: "ls -la" },
          { command: "cd", description: "שנה תיקייה", example: "cd /home/user" },
          { command: "mkdir", description: "צור תיקייה חדשה", example: "mkdir my_folder" }
        ]
      },
      {
        category: "ניהול קבצים",
        commands: [
          { command: "cp", description: "העתק קובץ", example: "cp file1.txt file2.txt" },
          { command: "mv", description: "העבר או שנה שם", example: "mv old_name.txt new_name.txt" },
          { command: "rm", description: "מחק קובץ", example: "rm file.txt" },
          { command: "cat", description: "הצג תוכן קובץ", example: "cat file.txt" }
        ]
      },
      {
        category: "מערכת",
        commands: [
          { command: "top", description: "הצג תהליכים פעילים", example: "top" },
          { command: "ps", description: "רשום תהליכים", example: "ps aux" },
          { command: "kill", description: "סיים תהליך", example: "kill 1234" },
          { command: "df", description: "בדוק מקום פנוי", example: "df -h" }
        ]
      },
      {
        category: "רשת",
        commands: [
          { command: "ping", description: "בדוק חיבור", example: "ping google.com" },
          { command: "ifconfig", description: "הצג הגדרות רשת", example: "ifconfig" },
          { command: "netstat", description: "בדוק חיבורים", example: "netstat -tuln" },
          { command: "ssh", description: "התחבר מרחוק", example: "ssh user@server" }
        ]
      }
    ],
    scenarios: [
      {
        name: "מתחיל",
        description: "למדו פקודות בסיסיות",
        tasks: [
          "נווטו בין תיקיות",
          "צרו תיקייה חדשה",
          "העתיקו קובץ",
          "בדקו את הנתיב הנוכחי"
        ]
      },
      {
        name: "מתקדם",
        description: "ניהול מערכת בסיסי",
        tasks: [
          "בדקו תהליכים פעילים",
          "בדקו מקום פנוי",
          "חפשו קבצים",
          "בדקו הרשאות"
        ]
      },
      {
        name: "מנהל מערכת",
        description: "ניהול מתקדם",
        tasks: [
          "התקינו חבילה",
          "עדכנו את המערכת",
          "בדקו לוגים",
          "ניהלו שירותים"
        ]
      }
    ],
    tips: [
      "השתמשו ב-Tab להשלמה אוטומטית",
      "השתמשו ב-Ctrl+C לעצירת פקודה",
      "השתמשו ב-Ctrl+L לניקוי המסך",
      "השתמשו ב-↑↓ לניווט בהיסטוריה",
      "השתמשו ב-man לקבלת עזרה"
    ],
    duration: 900,
    learningObjectives: [
      "להכיר את ממשק הטרמינל",
      "להשתמש בפקודות בסיסיות",
      "לנהל קבצים ותיקיות",
      "לנטר את המערכת"
    ]
  }
}; 