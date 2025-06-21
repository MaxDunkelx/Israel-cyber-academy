export const slide15NetworkSimulator = {
  id: "slide-15",
  type: "interactive",
  title: "סימולטור רשת - בנה רשת משלך 🎮",
  content: {
    type: "network-simulator",
    instructions: "בנה רשת מחשבים וראה איך המידע זורם",
    components: [
      {
        type: "computer",
        name: "מחשב 1",
        ip: "192.168.1.10"
      },
      {
        type: "computer",
        name: "מחשב 2",
        ip: "192.168.1.11"
      },
      {
        type: "server",
        name: "שרת אינטרנט",
        ip: "192.168.1.1"
      },
      {
        type: "router",
        name: "נתב",
        ip: "192.168.1.1"
      }
    ],
    connections: [
      {
        from: "מחשב 1",
        to: "נתב",
        protocol: "HTTP"
      },
      {
        from: "מחשב 2",
        to: "נתב",
        protocol: "FTP"
      },
      {
        from: "נתב",
        to: "שרת אינטרנט",
        protocol: "HTTPS"
      }
    ],
    duration: 300
  }
}; 