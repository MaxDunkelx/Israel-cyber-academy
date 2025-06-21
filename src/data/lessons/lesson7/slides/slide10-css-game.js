export const slide10CssGame = {
  id: "slide-10",
  type: "interactive",
  title: "משחק CSS - גרור והתאם 🎮",
  content: {
    type: "drag-drop",
    instructions: "גרור כל מאפיין CSS לקטגוריה המתאימה לו:",
    items: [
      {
        id: "color",
        text: "color - צבע טקסט",
        correctCategory: "colors",
        icon: "🎨"
      },
      {
        id: "background",
        text: "background-color - צבע רקע",
        correctCategory: "colors",
        icon: "📄"
      },
      {
        id: "font-size",
        text: "font-size - גודל גופן",
        correctCategory: "text",
        icon: "📝"
      },
      {
        id: "text-align",
        text: "text-align - יישור טקסט",
        correctCategory: "text",
        icon: "📍"
      },
      {
        id: "margin",
        text: "margin - מרווח חיצוני",
        correctCategory: "layout",
        icon: "📦"
      },
      {
        id: "padding",
        text: "padding - מרווח פנימי",
        correctCategory: "layout",
        icon: "📦"
      },
      {
        id: "width",
        text: "width - רוחב",
        correctCategory: "size",
        icon: "📐"
      },
      {
        id: "height",
        text: "height - גובה",
        correctCategory: "size",
        icon: "📐"
      }
    ],
    categories: [
      {
        id: "colors",
        name: "צבעים",
        description: "מאפיינים הקשורים לצבעים",
        color: "#4facfe"
      },
      {
        id: "text",
        name: "טקסט",
        description: "מאפיינים הקשורים לטקסט וגופנים",
        color: "#fa709a"
      },
      {
        id: "layout",
        name: "מיקום",
        description: "מאפיינים הקשורים למיקום ומרווחים",
        color: "#a8edea"
      },
      {
        id: "size",
        name: "גודל",
        description: "מאפיינים הקשורים לגודל ורוחב",
        color: "#ffecd2"
      }
    ],
    duration: 300
  }
}; 