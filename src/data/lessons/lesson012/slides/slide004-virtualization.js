export const slide4Virtualization = {
  id: "slide-4",
  type: "content",
  title: "וירטואליזציה - Virtualization Technologies 🖥️",
  content: {
    sections: [
      {
        title: "מהי וירטואליזציה?",
        content: "וירטואליזציה היא טכנולוגיה המאפשרת יצירת גרסאות וירטואליות של משאבי מחשב כמו שרתים, אחסון, רשת ומערכות הפעלה."
      },
      {
        title: "סוגי וירטואליזציה",
        items: [
          {
            type: "Server Virtualization",
            description: "חלוקת שרת פיזי למספר שרתים וירטואליים",
            examples: ["VMware vSphere", "Microsoft Hyper-V", "KVM", "Xen"],
            benefits: ["חיסכון בעלויות", "גמישות", "ניצול משאבים יעיל"]
          },
          {
            type: "Desktop Virtualization",
            description: "יצירת סביבות עבודה וירטואליות",
            examples: ["VMware Horizon", "Citrix Virtual Apps", "Microsoft VDI"],
            benefits: ["אבטחה משופרת", "ניהול מרכזי", "גישה מרחוק"]
          },
          {
            type: "Storage Virtualization",
            description: "איחוד משאבי אחסון פיזיים למשאב וירטואלי",
            examples: ["VMware vSAN", "Microsoft Storage Spaces", "NetApp"],
            benefits: ["ניהול פשוט", "גמישות", "יעילות"]
          },
          {
            type: "Network Virtualization",
            description: "יצירת רשתות וירטואליות מעל תשתית פיזית",
            examples: ["VMware NSX", "Cisco ACI", "OpenStack Neutron"],
            benefits: ["בידוד", "גמישות", "אבטחה"]
          }
        ]
      },
      {
        title: "טכנולוגיות וירטואליזציה",
        items: [
          {
            technology: "Type 1 Hypervisor (Bare Metal)",
            description: "היפרבסור שרץ ישירות על החומרה",
            examples: ["VMware ESXi", "Microsoft Hyper-V", "Xen", "KVM"],
            advantages: ["ביצועים טובים", "אבטחה גבוהה", "יציבות"]
          },
          {
            technology: "Type 2 Hypervisor (Hosted)",
            description: "היפרבסור שרץ על מערכת הפעלה",
            examples: ["VMware Workstation", "VirtualBox", "Parallels"],
            advantages: ["קלות שימוש", "גמישות", "תאימות"]
          }
        ]
      },
      {
        title: "אתגרי אבטחה בוירטואליזציה",
        items: [
          "VM Escape - בריחה מהמכונה הוירטואלית",
          "Hypervisor Attacks - התקפות על ההיפרבסור",
          "Resource Contention - תחרות על משאבים",
          "VM Sprawl - ריבוי מכונות וירטואליות",
          "Snapshot Security - אבטחת גיבויים"
        ]
      },
      {
        title: "טכניקות הגנה",
        items: [
          "בידוד בין מכונות וירטואליות",
          "ניטור פעילות היפרבסור",
          "הצפנת מכונות וירטואליות",
          "ניהול הרשאות קפדני",
          "עדכונים קבועים"
        ]
      }
    ],
    tips: [
      "בחרו את סוג הוירטואליזציה המתאים לצרכים",
      "תכננו אבטחה מתחילת התכנון",
      "ניטרו פעילות הוירטואליזציה",
      "תחזקו את ההיפרבסור באופן קבוע"
    ]
  }
}; 