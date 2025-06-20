export const slide19LabSimulation = {
  id: "slide-19",
  type: "interactive",
  title: "מעבדת מחשבים - שלב 2 🔬",
  content: {
    type: "lab-simulation",
    instructions: "בדוק מה קורה כשחסר רכיב במחשב",
    scenarios: [
      {
        name: "מחשב בלי מעבד",
        description: "מה קורה כשחסר המוח?",
        result: "המחשב לא יעלה בכלל - אין מי שיעבד הוראות",
        icon: "❌"
      },
      {
        name: "מחשב בלי זיכרון RAM",
        description: "מה קורה כשחסר זיכרון זמני?",
        result: "המחשב יעלה אבל יהיה מאוד איטי",
        icon: "🐌"
      },
      {
        name: "מחשב בלי הארד דיסק",
        description: "מה קורה כשחסר אחסון?",
        result: "המחשב יעלה אבל לא יהיה מקום לקבצים",
        icon: "📁"
      },
      {
        name: "מחשב בלי כרטיס מסך",
        description: "מה קורה כשחסר כרטיס מסך?",
        result: "לא תהיה תצוגה על המסך",
        icon: "🖥️"
      }
    ],
    duration: 300
  }
}; 