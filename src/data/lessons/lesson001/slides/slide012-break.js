export const slide10Break = {
  id: 'slide-10',
  type: 'break',
  title: 'הפסקה קצרה',
  content: {
    background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    elements: [
      {
        type: 'title',
        text: 'הפסקה! 🥤',
        style: { fontSize: '2.5rem', color: '#333', textAlign: 'center', marginBottom: '2rem' }
      },
      {
        type: 'subtitle',
        text: 'קחו 15 דקות למנוחה, שתייה וחטיף. ניפגש להמשך השיעור!',
        style: { fontSize: '1.3rem', color: '#666', textAlign: 'center', marginBottom: '1rem' }
      },
      {
        type: 'timer',
        duration: 900, // 15 minutes in seconds
        text: 'הפסקה'
      }
    ]
  }
}; 