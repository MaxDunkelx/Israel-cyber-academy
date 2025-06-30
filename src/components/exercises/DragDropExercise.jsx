import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Shuffle } from 'lucide-react';

// Clickable Item Component
const ClickableItem = ({ item, isSelected, onSelect, showRemove = false, onRemove }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className={`p-5 mb-4 rounded-2xl border-4 bg-gray-700/90 shadow-2xl transition-all duration-200 cursor-pointer text-lg md:text-xl lg:text-2xl font-bold tracking-wide select-none focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
        isSelected
          ? 'border-blue-400 bg-blue-800/80 shadow-2xl scale-110'
          : 'border-gray-600 hover:border-purple-400 hover:bg-purple-800/60 hover:scale-105'
      }`}
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {item.image && (
              <img 
                src={item.image} 
                alt={item.text}
              className="w-8 h-8 rounded-lg object-cover"
              />
          )}
          <span className="font-semibold text-white text-lg md:text-xl lg:text-2xl">
            {item.text}
          </span>
        </div>
        {isSelected && (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-400" />
        {showRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
                className="p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          >
                <XCircle className="h-4 w-4 text-white" />
          </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Clickable Drop Zone Component
const ClickableDropZone = ({ id, category, items, onRemove, onItemClick, selectedItem }) => {
  return (
    <div
      className={`min-h-[60px] p-4 rounded-2xl border-4 transition-all duration-300 cursor-pointer text-lg md:text-xl font-bold ${
        selectedItem ? 'border-blue-400 bg-blue-900/60 shadow-2xl scale-105' : 'border-gray-600 bg-gray-800/80'
      }`}
      style={{ 
        borderColor: selectedItem ? '#60a5fa' : category.color,
        backgroundColor: selectedItem ? 'rgba(30, 58, 138, 0.6)' : 'rgba(31, 41, 55, 0.8)'
      }}
      onClick={() => selectedItem && onItemClick(id)}
      tabIndex={0}
    >
      <div className="mb-1">
        <h5 className="font-bold text-lg md:text-xl text-white mb-1" style={{ color: category.color }}>
          {category.name}
        </h5>
        <p className="text-base text-gray-300">{category.description}</p>
      </div>
      
      <div className="space-y-1">
        {items.map((item) => (
          <ClickableItem
            key={item.id}
            item={item}
            isSelected={false}
            onSelect={() => {}}
            onRemove={onRemove}
            showRemove={true}
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-2 text-gray-400 border-2 border-dashed border-gray-600 rounded-lg">
          <div className="text-xl mb-1">📁</div>
          <p className="text-xs font-medium">לחץ על פריט ואז על הקטגוריה</p>
          <p className="text-xs text-gray-500">Click item then category</p>
        </div>
      )}
    </div>
  );
};

// Items Source Component
const ItemsSource = ({ items, onItemSelect, selectedItem }) => {
  return (
    <div className="min-h-[120px] p-4 rounded-2xl border-4 border-dashed border-gray-500 bg-gray-800/60 backdrop-blur-sm">
      <div className="space-y-1">
        {items.map((item) => (
          <ClickableItem
            key={item.id}
            item={item}
            isSelected={selectedItem?.id === item.id}
            onSelect={onItemSelect}
            onRemove={() => {}}
            showRemove={false}
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-3 text-gray-400">
          <div className="text-2xl mb-1">✅</div>
          <p className="text-sm font-medium">כל הפריטים הוצבו</p>
          <p className="text-xs text-gray-500">All items placed</p>
        </div>
      )}
    </div>
  );
};

// Main Click-Based Exercise Component
const DragDropExercise = ({ exercise, onComplete }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const exerciseCategories = exercise?.categories || [];
  const exerciseItems = exercise?.items || [];

  // Initialize exercise state
  useEffect(() => {
    setItems(exerciseItems.map(item => ({
      ...item,
      id: `item-${item.id}`,
      isPlaced: false
    })));
    
    const initialCategories = {};
    exerciseCategories.forEach(cat => {
      initialCategories[cat.id] = {
        ...cat,
        items: []
      };
    });
    setCategories(initialCategories);
  }, [exerciseItems, exerciseCategories]);

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  // Handle category click (place item)
  const handleCategoryClick = (categoryId) => {
    if (!selectedItem) return;

      // Remove from source
    setItems(prev => prev.filter(item => item.id !== selectedItem.id));

      // Add to destination category
      setCategories(prev => ({
        ...prev,
      [categoryId]: {
        ...prev[categoryId],
        items: [...prev[categoryId].items, { ...selectedItem, isPlaced: true }]
        }
      }));

    setSelectedItem(null);
  };

  // Remove item from category
  const removeItem = (itemId) => {
    if (isCompleted) return;

    let foundItem = null;
    let sourceCategoryId = null;

    Object.entries(categories).forEach(([catId, category]) => {
      const itemIndex = category.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        foundItem = category.items[itemIndex];
        sourceCategoryId = catId;
      }
    });

    if (!foundItem || !sourceCategoryId) return;

    // Remove from category
    setCategories(prev => ({
      ...prev,
      [sourceCategoryId]: {
        ...prev[sourceCategoryId],
        items: prev[sourceCategoryId].items.filter(item => item.id !== itemId)
      }
    }));

    // Add back to items
    setItems(prev => [...prev, { ...foundItem, isPlaced: false }]);
  };

  // Check answers
  const checkAnswer = () => {
    let correct = true;
    let totalPlaced = 0;

    Object.values(categories).forEach(category => {
      totalPlaced += category.items.length;
      category.items.forEach(item => {
        if (item.correctCategory !== category.id) {
          correct = false;
        }
      });
    });

    if (totalPlaced !== exerciseItems.length) {
      correct = false;
    }

    setIsCorrect(correct);
    setIsCompleted(true);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      onComplete(correct);
    }, 3000);
  };

  // Reset exercise
  const resetExercise = () => {
    setItems(exerciseItems.map(item => ({
      ...item,
      id: `item-${item.id}`,
      isPlaced: false
    })));

    const initialCategories = {};
    exerciseCategories.forEach(cat => {
      initialCategories[cat.id] = {
        ...cat,
        items: []
      };
    });
    setCategories(initialCategories);
    setIsCompleted(false);
    setIsCorrect(false);
    setShowFeedback(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto h-full flex flex-col">
      {/* Click-Based Exercise Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          {/* Items Source */}
        <div className="space-y-3">
          <h4 className="text-xl font-bold text-blue-300 text-center mb-3">
            פריטים לבחירה
            </h4>
          <ItemsSource 
            items={items} 
            onItemSelect={handleItemSelect}
            selectedItem={selectedItem}
          />
          </div>

          {/* Categories */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-green-300 text-center mb-3">
              קטגוריות
            </h4>
            {exerciseCategories.map(category => (
            <ClickableDropZone
                key={category.id}
                id={category.id}
                category={category}
                items={categories[category.id]?.items || []}
                onRemove={removeItem}
              onItemClick={handleCategoryClick}
              selectedItem={selectedItem}
              />
            ))}
          </div>
        </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 space-x-reverse pt-4">
        <button
          onClick={resetExercise}
          className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200 flex items-center gap-2"
        >
          <Shuffle className="h-5 w-5" />
          התחל מחדש
        </button>
        
        <button
          onClick={checkAnswer}
          disabled={Object.values(categories).reduce((sum, cat) => sum + cat.items.length, 0) !== exerciseItems.length}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="h-5 w-5" />
          בדוק תשובות
        </button>
      </div>

      {/* Progress */}
      <div className="text-center">
        <p className="text-base text-gray-300">
          פריטים שהוצבו: {Object.values(categories).reduce((sum, cat) => sum + cat.items.length, 0)} / {exerciseItems.length}
          </p>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center p-4 rounded-xl border-2 ${
          isCorrect 
            ? 'bg-green-900/30 text-green-200 border-green-500' 
            : 'bg-red-900/30 text-red-200 border-red-500'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            {isCorrect ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
            <span className="text-xl font-bold">
              {isCorrect ? 'מעולה! כל ההתאמות נכונות!' : 'נסה שוב!'}
            </span>
          </div>
          <p className="text-base">
            {isCorrect 
              ? 'כל הכבוד! הצלחת להתאים את כל הפריטים לקטגוריות הנכונות!' 
              : 'יש כמה התאמות שגויות. נסה שוב!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropExercise; 