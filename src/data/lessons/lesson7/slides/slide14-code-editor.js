export const slide14CodeEditor = {
  id: "slide-14",
  type: "interactive",
  title: "עורך קוד אינטראקטיבי 🔧",
  content: {
    type: "code-editor",
    instructions: "נסה לכתוב קוד HTML, CSS ו-JavaScript ולצפות בתוצאה בזמן אמת",
    initialHtml: `<h1>שלום עולם!</h1>
<p>זהו האתר הראשון שלי</p>
<button onclick="changeColor()">שנה צבע</button>`,
    initialCss: `body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    font-size: 2.5rem;
}

p {
    color: #666;
    font-size: 1.2rem;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

button:hover {
    background-color: #0056b3;
}`,
    initialJs: `function changeColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

console.log("הקוד פועל!");`,
    duration: 600
  }
}; 