export const slide6aSecurityImplementation = {
  id: "slide-6a",
  type: "presentation",
  title: "כיצד ניישם אבטחה?",
  content: {
    background: "#000000",
    elements: [
      {
        type: "title",
        text: "כיצד ניישם אבטחה?",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem", fontWeight: "bold" }
      },
      {
        type: "columns",
        columns: [
          {
            elements: [
              {
                type: "subtitle",
                text: "Fire Wall •",
                style: { fontSize: "2.2rem", color: "white", textAlign: "center", marginBottom: "1rem", fontWeight: "bold" }
              },
              {
                type: "paragraph",
                text: '"חומה" דמיונית ששומרת על המחשב.\nבודקת מי נכנס ומי יוצא מהמחשב כדי לא לאפשר לגורמים מסוכנים להיכנס.',
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "1.5rem" }
              },
              {
                type: "image",
                src: "https://cdn.pixabay.com/photo/2013/07/12/13/58/firewall-147799_1280.png",
                alt: "Firewall icon",
                style: { width: "120px", margin: "0 auto", display: "block" }
              }
            ]
          },
          {
            elements: [
              {
                type: "subtitle",
                text: "Anti Virus",
                style: { fontSize: "2.2rem", color: "white", textAlign: "center", marginBottom: "1rem", fontWeight: "bold" }
              },
              {
                type: "paragraph",
                text: 'שומר קטן שרץ בתוך המחשב ומחפש וירוסים או תוכנות מזיקות.\nאם הוא מוצא משהו חשוד – הוא חוסם ומנקה אותו!',
                style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "1.5rem" }
              },
              {
                type: "image",
                src: "https://cdn.pixabay.com/photo/2020/04/09/09/53/virus-5015473_1280.png",
                alt: "Antivirus icon",
                style: { width: "120px", margin: "0 auto", display: "block" }
              }
            ]
          }
        ]
      }
    ]
  }
}; 