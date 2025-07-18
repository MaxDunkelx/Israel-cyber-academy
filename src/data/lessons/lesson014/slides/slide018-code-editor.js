export const slide18CodeEditor = {
  id: "slide-18",
  type: "interactive",
  title: "עורך קוד אבטחה - Security Code Editor 💻",
  content: {
    gameType: "codeEditor",
    title: "תקנו את הקוד האבטחתי",
    description: "תקנו את הקוד כדי למנוע חולשות אבטחה נפוצות.",
    challenges: [
      {
        id: "challenge1",
        title: "מניעת SQL Injection",
        description: "תקנו את הקוד כדי למנוע SQL Injection",
        language: "javascript",
        initialCode: `// קוד פגיע ל-SQL Injection
function getUserData(username) {
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  return database.execute(query);
}`,
        solution: `// קוד מאובטח עם Prepared Statements
function getUserData(username) {
  const query = "SELECT * FROM users WHERE username = ?";
  return database.execute(query, [username]);
}`,
        hints: [
          "השתמשו ב-Prepared Statements",
          "אל תצרפו משתנים ישירות למחרוזת",
          "השתמשו בפרמטרים"
        ]
      },
      {
        id: "challenge2",
        title: "מניעת XSS",
        description: "תקנו את הקוד כדי למנוע Cross-Site Scripting",
        language: "javascript",
        initialCode: `// קוד פגיע ל-XSS
function displayUserInput(userInput) {
  document.getElementById('output').innerHTML = userInput;
}`,
        solution: `// קוד מאובטח עם Sanitization
function displayUserInput(userInput) {
  const sanitizedInput = userInput.replace(/[<>]/g, '');
  document.getElementById('output').textContent = sanitizedInput;
}`,
        hints: [
          "השתמשו ב-textContent במקום innerHTML",
          "סננו תווים מסוכנים",
          "השתמשו בפונקציות Sanitization"
        ]
      }
    ],
    scoring: {
      correct: "+15 נקודות",
      hints: "-2 נקודות לכל רמז",
      bonus: "+5 נקודות לפתרון מהיר"
    },
    successMessage: "כל הכבוד! כתבת קוד מאובטח! 🔒"
  }
}; 