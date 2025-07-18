export const slide28ComputerSimulator = {
  id: "slide-28",
  type: "interactive",
  title: "סימולטור בניית מחשב 🔧",
  content: {
    type: "computer-build-simulator",
    instructions: "בנו מחשב וירטואלי! בחרו רכיבים שונים ובדקו איך הם משפיעים על ביצועי המחשב",
    components: [
      {
        id: "cpu",
        name: "מעבד (CPU)",
        options: [
          { name: "Intel i3", price: 800, performance: 60, power: 65 },
          { name: "Intel i5", price: 1200, performance: 80, power: 95 },
          { name: "Intel i7", price: 2000, performance: 95, power: 125 },
          { name: "AMD Ryzen 5", price: 1000, performance: 75, power: 65 },
          { name: "AMD Ryzen 7", price: 1800, performance: 90, power: 105 }
        ]
      },
      {
        id: "ram",
        name: "זיכרון (RAM)",
        options: [
          { name: "8GB DDR4", price: 200, performance: 50, power: 15 },
          { name: "16GB DDR4", price: 400, performance: 80, power: 20 },
          { name: "32GB DDR4", price: 800, performance: 95, power: 25 },
          { name: "16GB DDR5", price: 600, performance: 90, power: 18 }
        ]
      },
      {
        id: "storage",
        name: "אחסון",
        options: [
          { name: "500GB HDD", price: 100, performance: 30, power: 10 },
          { name: "1TB HDD", price: 150, performance: 40, power: 12 },
          { name: "500GB SSD", price: 300, performance: 85, power: 8 },
          { name: "1TB SSD", price: 500, performance: 90, power: 10 },
          { name: "2TB SSD", price: 900, performance: 95, power: 12 }
        ]
      },
      {
        id: "gpu",
        name: "כרטיס מסך (GPU)",
        options: [
          { name: "Intel Graphics", price: 0, performance: 20, power: 15 },
          { name: "GTX 1650", price: 800, performance: 60, power: 75 },
          { name: "RTX 3060", price: 1500, performance: 80, power: 170 },
          { name: "RTX 4070", price: 2500, performance: 95, power: 200 }
        ]
      },
      {
        id: "psu",
        name: "ספק כוח (PSU)",
        options: [
          { name: "450W", price: 200, performance: 50, power: 450 },
          { name: "550W", price: 250, performance: 70, power: 550 },
          { name: "650W", price: 300, performance: 85, power: 650 },
          { name: "750W", price: 400, performance: 95, power: 750 }
        ]
      }
    ],
    scenarios: [
      {
        name: "מחשב משרדי",
        description: "לעבודה בסיסית, אינטרנט וטקסט",
        budget: 3000,
        requirements: { performance: 50, gaming: false }
      },
      {
        name: "מחשב גיימינג",
        description: "למשחקים מתקדמים וביצועים גבוהים",
        budget: 8000,
        requirements: { performance: 85, gaming: true }
      },
      {
        name: "מחשב עריכת וידאו",
        description: "לעריכת וידאו ותמונות מקצועית",
        budget: 6000,
        requirements: { performance: 90, storage: true }
      }
    ],
    tips: [
      "המעבד הוא הרכיב החשוב ביותר - השקיעו בו",
      "זיכרון RAM משפיע על מהירות המחשב",
      "SSD מהיר יותר מ-HDD",
      "ספק הכוח חייב להיות חזק מספיק לכל הרכיבים",
      "כרטיס מסך נחוץ למשחקים ועריכת וידאו"
    ],
    duration: 600,
    learningObjectives: [
      "להבין איך רכיבים שונים משפיעים על ביצועי המחשב",
      "ללמוד על תקציבים ומפרטים מומלצים",
      "להכיר את התאימות בין רכיבים שונים"
    ]
  }
}; 