/**
 * Drag and Drop Exercise Component - Israel Cyber Academy
 * 
 * This component creates an interactive drag-and-drop exercise where users
 * must categorize items by dragging them to the correct categories.
 * 
 * Key Features:
 * - Drag and drop functionality using react-beautiful-dnd
 * - Real-time feedback and validation
 * - Visual feedback for correct/incorrect placements
 * - Reset functionality for retry attempts
 * - Progress tracking and completion handling
 * 
 * Exercise Flow:
 * 1. Items are displayed in a source area
 * 2. Users drag items to appropriate categories
 * 3. System validates placements in real-time
 * 4. Feedback is provided on completion
 * 5. Exercise can be reset for retry
 */

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CheckCircle, XCircle, Shuffle, ArrowRight } from 'lucide-react';

/**
 * Drag and Drop Exercise Component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise configuration data
 * @param {Function} props.onComplete - Callback when exercise is completed
 */
const DragDropExercise = ({ exercise, onComplete }) => {
  // Exercise state management
  const [items, setItems] = useState([]); // Items available for dragging
  const [categories, setCategories] = useState({}); // Categories with placed items
  const [isCompleted, setIsCompleted] = useState(false); // Exercise completion status
  const [isCorrect, setIsCorrect] = useState(false); // Answer correctness
  const [showFeedback, setShowFeedback] = useState(false); // Feedback display state

  // Extract exercise configuration
  const exerciseCategories = exercise?.categories || [];
  const exerciseItems = exercise?.items || [];

  /**
   * Initialize exercise state
   * Sets up items in source area and empty categories
   */
  useEffect(() => {
    // Set up items in the source area with unique IDs
    setItems(exerciseItems.map(item => ({
      ...item,
      id: `item-${item.id}`,
      isPlaced: false
    })));

    // Set up categories with empty item arrays
    const initialCategories = {};
    exerciseCategories.forEach(cat => {
      initialCategories[cat.id] = {
        ...cat,
        items: []
      };
    });
    setCategories(initialCategories);
  }, [exerciseItems, exerciseCategories]);

  /**
   * Handle drag end event
   * Manages item movement between source and categories
   * 
   * @param {Object} result - Drag result from react-beautiful-dnd
   */
  const handleDragEnd = (result) => {
    if (!result.destination || isCompleted) return;

    const { source, destination, draggableId } = result;

    // If dropping in the same place, do nothing
    if (source.droppableId === destination.droppableId && 
        source.index === destination.index) {
      return;
    }

    // Find the dragged item from either source or categories
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

  /**
   * Remove item from category and return to source
   * 
   * @param {string} categoryId - ID of the category
   * @param {string} itemId - ID of the item to remove
   */
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

  /**
   * Check if all answers are correct
   * Validates that all items are placed in correct categories
   */
  const checkAnswer = () => {
    let correct = true;
    let totalPlaced = 0;

    // Check each category for correct placements
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

    // Show feedback for 3 seconds then call completion callback
    setTimeout(() => {
      setShowFeedback(false);
      onComplete(correct);
    }, 3000);
  };

  /**
   * Reset exercise to initial state
   * Allows users to retry the exercise
   */
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          {exercise?.title || "משחק גרירה והתאמה"}
        </h3>
        <p className="text-xl text-gray-200 leading-relaxed">
          {exercise?.instructions || "גרור פריטים לקטגוריות המתאימות"}
        </p>
      </div>

      {/* Drag and Drop Area */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Items Source */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-blue-300 text-center mb-4">
              פריטים לגרירה
            </h4>
            <Droppable droppableId="items">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] p-4 rounded-xl border-2 border-dashed transition-colors ${
                    snapshot.isDraggingOver
                      ? 'border-blue-400 bg-blue-900/30'
                      : 'border-gray-500 bg-gray-800/50'
                  }`}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 mb-3 rounded-lg border-2 cursor-move transition-all duration-200 ${
                            snapshot.isDragging
                              ? 'border-blue-400 bg-blue-800/50 shadow-lg scale-105'
                              : 'border-gray-600 bg-gray-700/50 hover:border-purple-400 hover:bg-purple-800/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.text}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <span className="font-semibold text-white">
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
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-green-300 text-center mb-4">
              קטגוריות
            </h4>
            {exerciseCategories.map(category => (
              <Droppable key={category.id} droppableId={category.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[120px] p-4 rounded-xl border-2 transition-all duration-200 ${
                      snapshot.isDraggingOver
                        ? 'border-blue-400 bg-blue-900/30 shadow-lg'
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                    style={{ borderColor: category.color }}
                  >
                    <div className="mb-3">
                      <h5 className="font-bold text-lg text-white" style={{ color: category.color }}>
                        {category.name}
                      </h5>
                      <p className="text-sm text-gray-300">{category.description}</p>
                    </div>
                    
                    {categories[category.id]?.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="p-2 mb-2 rounded-lg bg-gray-700/50 border border-gray-600"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.text}
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <span className="text-sm font-medium text-white">{item.text}</span>
                          </div>
                          <button
                            onClick={() => removeItem(category.id, item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 space-x-reverse pt-6">
        <button
          onClick={resetExercise}
          className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200 flex items-center gap-2"
        >
          <Shuffle className="h-5 w-5" />
          התחל מחדש
        </button>
        
        <button
          onClick={checkAnswer}
          disabled={items.length > 0 || isCompleted}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight className="h-5 w-5" />
          בדוק תשובות
        </button>
      </div>

      {/* Progress */}
      <div className="text-center">
        <p className="text-lg text-gray-300">
          פריטים שהוצבו: {exerciseItems.length - items.length} / {exerciseItems.length}
        </p>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center p-6 rounded-xl border-2 ${
          isCorrect 
            ? 'bg-green-900/30 text-green-200 border-green-500' 
            : 'bg-red-900/30 text-red-200 border-red-500'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            {isCorrect ? (
              <CheckCircle className="h-8 w-8" />
            ) : (
              <XCircle className="h-8 w-8" />
            )}
            <span className="text-2xl font-bold">
              {isCorrect ? 'מעולה! כל הפריטים במקום הנכון!' : 'נסה שוב!'}
            </span>
          </div>
          <p className="text-lg">
            {isCorrect 
              ? 'כל הכבוד! הצלחת למיין את כל הפריטים לקטגוריות הנכונות!' 
              : 'יש כמה פריטים שלא במקום הנכון. נסה שוב!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropExercise; 