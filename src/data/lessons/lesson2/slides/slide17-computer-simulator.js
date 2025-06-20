export const slide17ComputerSimulator = {
  id: "slide-17",
  type: "interactive",
  title: "סימולטור: הרכבת מחשב 🧩",
  content: {
    type: "computer-build",
    instructions: "בנה מחשב וירטואלי על ידי בחירת רכיבים",
    components: [
      {
        id: "cpu",
        name: "מעבד",
        options: [
          { name: "Intel i3", price: 500, performance: 3, description: "מעבד בסיסי" },
          { name: "Intel i5", price: 800, performance: 4, description: "מעבד בינוני" },
          { name: "Intel i9", price: 1500, performance: 5, description: "מעבד חזק" }
        ]
      },
      {
        id: "ram",
        name: "זיכרון RAM",
        options: [
          { name: "8GB", price: 200, performance: 3, description: "זיכרון בסיסי" },
          { name: "16GB", price: 400, performance: 4, description: "זיכרון בינוני" },
          { name: "32GB", price: 800, performance: 5, description: "זיכרון חזק" }
        ]
      },
      {
        id: "storage",
        name: "אחסון",
        options: [
          { name: "500GB הארד דיסק", price: 100, performance: 2, description: "אחסון איטי" },
          { name: "1TB SSD", price: 300, performance: 4, description: "אחסון מהיר" },
          { name: "2TB SSD", price: 600, performance: 5, description: "אחסון מהיר וגדול" }
        ]
      },
      {
        id: "gpu",
        name: "כרטיס מסך",
        options: [
          { name: "מובנה", price: 0, performance: 2, description: "כרטיס בסיסי" },
          { name: "GTX 1660", price: 800, performance: 4, description: "כרטיס בינוני" },
          { name: "RTX 4080", price: 2000, performance: 5, description: "כרטיס חזק" }
        ]
      }
    ],
    budget: 5000,
    duration: 600
  }
}; 