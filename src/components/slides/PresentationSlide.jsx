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
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4"> {/* pt-20 to start after nav bar */}
      <div className="w-full max-w-7xl flex flex-col"> {/* max-w-7xl = 1280px for wider presentation */}
        {/* Removed outer header to avoid double heading */}
        {/* Content Container */}
        <div 
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex flex-col justify-center relative overflow-auto"
          style={{ 
            background: content.background || 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
            minHeight: '600px', /* Consistent height for all slides */
            width: '100%',
            margin: '0 auto'
          }}
        >
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="text-center relative z-10">
            {content.elements?.map((element, index) => {
              switch (element.type) {
                case 'title':
                  return (
                    <h1 
                      key={`${element.type}-${index}-${element.text?.substring(0, 20)}`}
                      style={{
                        ...element.style,
                        textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        fontWeight: '700'
                      }} 
                      className="mb-8 text-5xl md:text-6xl"
                    >
                      {element.text}
                    </h1>
                  );
                case 'subtitle':
                  return (
                    <h2 
                      key={`${element.type}-${index}-${element.text?.substring(0, 20)}`}
                      style={{
                        ...element.style,
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }} 
                      className="mb-6 text-2xl md:text-3xl"
                    >
                      {element.text}
                    </h2>
                  );
                case 'list':
                  return (
                    <ul 
                      key={`${element.type}-${index}-list`}
                      style={{
                        ...element.style,
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }} 
                      className="text-right space-y-3"
                    >
                      {element.items?.map((item, itemIndex) => (
                        <li 
                          key={`item-${itemIndex}-${item?.substring(0, 20)}`}
                          className="mb-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                case 'image':
                  return (
                    <div key={`${element.type}-${index}-${element.src?.substring(0, 20)}`} className="my-8">
                      <img
                        src={element.src}
                        alt={element.alt}
                        style={{
                          ...element.style,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                          borderRadius: '20px',
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                        className="mx-auto transform hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  );
                case 'animation':
                  return (
                    <div 
                      key={`${element.type}-${index}-animation`}
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
      </div>
    </div>
  );
};

export default PresentationSlide; 