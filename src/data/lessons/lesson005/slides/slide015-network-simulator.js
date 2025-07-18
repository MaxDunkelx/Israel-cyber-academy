export const slide15NetworkSimulator = {
  id: "slide-15",
  type: "interactive",
  title: "סימולטור רשת - בניית רשת וירטואלית 🌐",
  content: {
    type: "network-simulator",
    instructions: "בנו רשת וירטואלית! חברו מחשבים, נתבים ושרתים ולמדו איך רשתות עובדות",
    components: [
      {
        id: "computer",
        name: "מחשב",
        icon: "💻",
        properties: {
          ip: "192.168.1.10",
          mac: "00:1B:44:11:3A:B7",
          os: "Windows/Linux"
        },
        connections: ["switch", "router"]
      },
      {
        id: "switch",
        name: "מתג",
        icon: "🔌",
        properties: {
          ports: 8,
          speed: "1Gbps",
          type: "Ethernet"
        },
        connections: ["computer", "router", "server"]
      },
      {
        id: "router",
        name: "נתב",
        icon: "📡",
        properties: {
          wan_ip: "203.0.113.1",
          lan_ip: "192.168.1.1",
          dhcp: true
        },
        connections: ["switch", "internet"]
      },
      {
        id: "server",
        name: "שרת",
        icon: "🖥️",
        properties: {
          ip: "192.168.1.100",
          services: ["Web", "DNS", "Email"],
          os: "Linux"
        },
        connections: ["switch"]
      },
      {
        id: "firewall",
        name: "חומת אש",
        icon: "🛡️",
        properties: {
          rules: ["HTTP", "HTTPS", "SSH"],
          logging: true
        },
        connections: ["router", "internet"]
      }
    ],
    scenarios: [
      {
        name: "רשת ביתית",
        description: "רשת בסיסית לבית",
        components: ["computer", "switch", "router"],
        budget: 1000,
        requirements: { internet: true, wifi: true }
      },
      {
        name: "רשת עסקית",
        description: "רשת למשרד קטן",
        components: ["computer", "switch", "router", "server", "firewall"],
        budget: 5000,
        requirements: { security: true, services: true }
      },
      {
        name: "רשת דאטה סנטר",
        description: "רשת מתקדמת לשרתים",
        components: ["server", "switch", "router", "firewall"],
        budget: 20000,
        requirements: { high_availability: true, security: true }
      }
    ],
    protocols: [
      {
        name: "TCP/IP",
        description: "פרוטוקול התקשורת הבסיסי",
        layers: ["Application", "Transport", "Internet", "Network Access"]
      },
      {
        name: "HTTP/HTTPS",
        description: "פרוטוקול לגלישה באינטרנט",
        port: "80/443"
      },
      {
        name: "DNS",
        description: "מערכת שמות דומיין",
        port: "53"
      },
      {
        name: "SSH",
        description: "חיבור מאובטח מרחוק",
        port: "22"
      }
    ],
    tips: [
      "כל מחשב צריך כתובת IP ייחודית",
      "הנתב מחבר בין הרשת המקומית לאינטרנט",
      "חומת האש מגנה על הרשת מפני איומים",
      "המתג מחבר מחשבים ברשת המקומית",
      "השרת מספק שירותים למחשבים ברשת"
    ],
    duration: 900,
    learningObjectives: [
      "להבין את המבנה של רשתות מחשבים",
      "לזהות רכיבי רשת שונים",
      "להכיר פרוטוקולי תקשורת",
      "לבנות רשת וירטואלית"
    ]
  }
}; 