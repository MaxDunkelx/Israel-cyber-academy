export const slide20WindowsSimulator = {
  id: "slide-20",
  type: "interactive",
  title: "סימולטור: ניהול Windows 🖥️",
  content: {
    type: "windows-simulator",
    instructions: "נהל את המחשב הווירטואלי שלך",
    tasks: [
      {
        id: "desktop",
        name: "שולחן העבודה",
        description: "ארגן סמלים ותיקיות",
        options: [
          { name: "צור תיקייה חדשה", action: "create_folder", points: 10 },
          { name: "העבר סמל", action: "move_icon", points: 5 },
          { name: "שנה רקע", action: "change_wallpaper", points: 15 }
        ]
      },
      {
        id: "files",
        name: "ניהול קבצים",
        description: "עבוד עם קבצים ותיקיות",
        options: [
          { name: "העתק קובץ", action: "copy_file", points: 10 },
          { name: "מחק תיקייה", action: "delete_folder", points: 8 },
          { name: "חפש קבצים", action: "search_files", points: 12 }
        ]
      },
      {
        id: "settings",
        name: "הגדרות",
        description: "שנה הגדרות מערכת",
        options: [
          { name: "שנה רזולוציה", action: "change_resolution", points: 15 },
          { name: "הגדר צלילים", action: "set_sounds", points: 10 },
          { name: "עדכן מערכת", action: "update_system", points: 20 }
        ]
      },
      {
        id: "performance",
        name: "ביצועים",
        description: "נהל משאבי מערכת",
        options: [
          { name: "סגור תוכנה", action: "close_program", points: 8 },
          { name: "נקה זיכרון", action: "clean_memory", points: 12 },
          { name: "בדוק וירוסים", action: "scan_virus", points: 15 }
        ]
      }
    ],
    budget: 100,
    duration: 600
  }
}; 