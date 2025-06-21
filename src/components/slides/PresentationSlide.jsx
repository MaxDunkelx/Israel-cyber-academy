/**
 * Presentation Slide Component
 * Renders standard presentation slides with rich content
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 */
const PresentationSlide = ({ slide }) => {
  const { content } = slide;
  
  return (
    <div 
      className="h-[calc(100vh-120px)] flex items-center justify-center p-8 rounded-xl relative overflow-hidden"
      style={{ 
        background: content.background || 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
        position: 'relative',
        minHeight: '500px'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="text-center max-w-5xl relative z-10 h-full flex flex-col justify-center">
        {content.elements?.map((element, index) => {
          switch (element.type) {
            case 'title':
              return (
                <h1 
                  key={index} 
                  style={{
                    ...element.style,
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    fontWeight: '700'
                  }} 
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  {element.text}
                </h1>
              );
            case 'subtitle':
              return (
                <h2 
                  key={index} 
                  style={{
                    ...element.style,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }} 
                  className="mb-3 text-lg md:text-xl lg:text-2xl"
                >
                  {element.text}
                </h2>
              );
            case 'list':
              return (
                <ul 
                  key={index} 
                  style={{
                    ...element.style,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }} 
                  className="text-right space-y-1 max-h-48 overflow-y-auto"
                >
                  {element.items?.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className="mb-1 p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              );
            case 'image':
              return (
                <div key={index} className="my-3 flex justify-center">
                  <img
                    src={element.src}
                    alt={element.alt}
                    style={{
                      ...element.style,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      borderRadius: '20px',
                      maxHeight: '300px',
                      maxWidth: '100%',
                      objectFit: 'contain'
                    }}
                    className="mx-auto transform hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              );
            case 'animation':
              return (
                <div 
                  key={index} 
                  style={{
                    ...element.style,
                    animation: 'bounce 2s infinite'
                  }}
                  className="animate-bounce"
                >
                  {element.element}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default PresentationSlide; 