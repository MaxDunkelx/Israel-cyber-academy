export const slide16CodeEditor = {
  id: "slide-16",
  type: "interactive",
  title: "עורך קוד - נסו לכתוב קוד! 💻",
  content: {
    gameType: "codeEditor",
    instructions: "כתבו קוד HTML פשוט וצפו בתוצאה",
    defaultCode: `<!DOCTYPE html>
<html lang="he">
<head>
    <title>האתר שלי</title>
</head>
<body>
    <h1>שלום עולם!</h1>
    <p>זהו האתר הראשון שלי</p>
</body>
</html>`,
    challenges: [
      {
        title: "הוסיפו כותרת",
        description: "הוסיפו כותרת h2 עם הטקסט 'ברוכים הבאים'",
        hint: "השתמשו בתגית <h2>",
        solution: "<h2>ברוכים הבאים</h2>"
      },
      {
        title: "הוסיפו תמונה",
        description: "הוסיפו תמונה עם alt text",
        hint: "השתמשו בתגית <img>",
        solution: '<img src="image.jpg" alt="תמונה">'
      },
      {
        title: "הוסיפו קישור",
        description: "הוסיפו קישור לאתר אחר",
        hint: "השתמשו בתגית <a>",
        solution: '<a href="https://www.google.com">גוגל</a>'
      }
    ],
    features: {
      syntaxHighlighting: true,
      autoComplete: true,
      livePreview: true,
      errorChecking: true
    },
    feedback: {
      correct: "מעולה! הקוד עובד! 🎉",
      error: "יש שגיאה בקוד, בדקו שוב! 🔍",
      hint: "השתמשו בתגית המתאימה"
    }
  }
}; 