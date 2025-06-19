import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CheckCircle, XCircle, Shuffle, ArrowRight } from 'lucide-react';

const DragDropExercise = ({ exercise, onComplete }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const exerciseCategories = exercise?.categories || [];
  const exerciseItems = exercise?.items || [];

  // Initialize state
  useEffect(() => {
    // Set up items in the source area
    setItems(exerciseItems.map(item => ({
      ...item,
      id: `item-${item.id}`,
      isPlaced: false
    })));

    // Set up categories
    const initialCategories = {};
    exerciseCategories.forEach(cat => {
      initialCategories[cat.id] = {
        ...cat,
        items: []
      };
    });
    setCategories(initialCategories);
  }, [exerciseItems, exerciseCategories]);

  const handleDragEnd = (result) => {
    if (!result.destination || isCompleted) return;

    const { source, destination, draggableId } = result;

    // If dropping in the same place, do nothing
    if (source.droppableId === destination.droppableId && 
        source.index === destination.index) {
      return;
    }

    const draggedItem = items.find(item => item.id === draggableId) ||
                       Object.values(categories).flatMap(cat => cat.items).find(item => item.id === draggableId);

    if (!draggedItem) return;

    // Remove from source
    if (source.droppableId === 'items') {
      setItems(prev => prev.filter(item => item.id !== draggableId));
    } else {
      setCategories(prev => ({
        ...prev,
        [source.droppableId]: {
          ...prev[source.droppableId],
          items: prev[source.droppableId].items.filter(item => item.id !== draggableId)
        }
      }));
    }

    // Add to destination
    if (destination.droppableId === 'items') {
      setItems(prev => [...prev, { ...draggedItem, isPlaced: false }]);
    } else {
      setCategories(prev => ({
        ...prev,
        [destination.droppableId]: {
          ...prev[destination.droppableId],
          items: [...prev[destination.droppableId].items, { ...draggedItem, isPlaced: true }]
        }
      }));
    }
  };

  const removeItem = (categoryId, itemId) => {
    if (isCompleted) return;

    const item = categories[categoryId].items.find(item => item.id === itemId);
    if (!item) return;

    // Remove from category
    setCategories(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        items: prev[categoryId].items.filter(item => item.id !== itemId)
      }
    }));

    // Add back to items
    setItems(prev => [...prev, { ...item, isPlaced: false }]);
  };

  const checkAnswer = () => {
    let correct = true;
    let totalPlaced = 0;

    // Check each category
    Object.values(categories).forEach(category => {
      totalPlaced += category.items.length;
      
      category.items.forEach(item => {
        if (item.correctCategory !== category.id) {
          correct = false;
        }
      });
    });

    // Check if all items are placed
    if (totalPlaced !== exerciseItems.length) {
      correct = false;
    }

    console.log('Answer check:', { correct, totalPlaced, totalItems: exerciseItems.length });

    setIsCorrect(correct);
    setIsCompleted(true);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      onComplete(correct);
    }, 3000);
  };

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
  };

  // Early return if no data
  if (!exerciseCategories.length || !exerciseItems.length) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">שגיאה: אין נתונים זמינים למשחק</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-cyber-blue mb-4">
            {exercise?.title || 'משחק התאמה'}
          </h3>
          <p className="text-xl text-cyber-blue">
            {exercise?.instructions || 'גרור פריטים לקטגוריות המתאימות'}
          </p>
        </div>

        {/* Status Display */}
        <div className="text-center bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">
            פריטים נותרו: {items.length} | 
            פריטים מונחים: {exerciseItems.length - items.length}
          </p>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Items to Drag */}
          <div>
            <h4 className="text-2xl font-bold text-cyber-purple text-center mb-4">
              פריטים לגרירה ({items.length})
            </h4>
            <Droppable droppableId="items">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] p-4 rounded-lg border-2 transition-colors ${
                    snapshot.isDraggingOver 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 rounded-lg border-2 mb-3 transition-all ${
                            snapshot.isDragging
                              ? 'border-blue-500 bg-blue-50 shadow-lg rotate-2'
                              : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt="" 
                                className="w-10 h-10 rounded-full object-cover" 
                              />
                            )}
                            <span className="font-medium text-gray-800">
                              {item.text}
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-2xl font-bold text-cyber-green text-center mb-4">
              קטגוריות
            </h4>
            <div className="space-y-4">
              {Object.values(categories).map((category) => (
                <Droppable key={category.id} droppableId={category.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 rounded-lg border-2 min-h-[100px] transition-all ${
                        snapshot.isDraggingOver
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                      style={{
                        borderColor: snapshot.isDraggingOver ? '#3b82f6' : category.color,
                        backgroundColor: snapshot.isDraggingOver ? '#eff6ff' : category.color + '10'
                      }}
                    >
                      <div className="text-center mb-3">
                        <h5 className="text-lg font-bold" style={{ color: category.color }}>
                          {category.name}
                        </h5>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      
                      {/* Items in this category */}
                      <div className="space-y-2">
                        {category.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`flex items-center justify-between p-2 bg-white rounded border transition-all ${
                                  snapshot.isDragging ? 'shadow-lg rotate-1' : ''
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {item.image && (
                                    <img 
                                      src={item.image} 
                                      alt="" 
                                      className="w-6 h-6 rounded-full object-cover" 
                                    />
                                  )}
                                  <span className="text-sm text-gray-800">{item.text}</span>
                                </div>
                                {!isCompleted && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeItem(category.id, item.id);
                                    }}
                                    className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <button
            onClick={resetExercise}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Shuffle className="h-5 w-5" />
            התחל מחדש
          </button>
          
          <button
            onClick={checkAnswer}
            disabled={isCompleted || items.length > 0}
            className="bg-cyber-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="h-5 w-5" />
            בדוק תשובה ({items.length} נותרו)
          </button>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`text-center p-6 rounded-lg border-2 ${
            isCorrect 
              ? 'bg-green-50 text-green-800 border-green-500' 
              : 'bg-red-50 text-red-800 border-red-500'
          }`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
              <span className="text-2xl font-bold">
                {isCorrect ? 'מעולה! סיווג נכון!' : 'נסה שוב!'}
              </span>
            </div>
            {!isCorrect && (
              <p className="text-lg">
                בדוק שוב את הסיווג שלך ונסה פעם נוספת
              </p>
            )}
          </div>
        )}

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              {items.length} פריטים נותרו לסיווג
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-cyber-blue h-2 rounded-full transition-all duration-500"
                style={{ width: `${((exerciseItems.length - items.length) / exerciseItems.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default DragDropExercise; 