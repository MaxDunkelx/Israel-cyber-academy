import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Shuffle } from 'lucide-react';

const getCategoryColor = (color) => {
  // Accepts hex or tailwind color
  if (!color) return 'bg-gray-100 text-gray-800 border-gray-300';
  if (color.startsWith('#')) return '';
  return color;
};

const DragDropExercise = ({ exercise, onComplete }) => {
  const categories = exercise.categories || [];
  const items = exercise.items || [];
  const initialState = {
    pool: items.map((item) => ({ ...item })),
  };
  categories.forEach((cat) => {
    initialState[cat.id] = [];
  });

  const [categoryItems, setCategoryItems] = useState(initialState);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Helper to get border color for draggable item
  const getItemBorderColor = (item, parentCategoryId) => {
    if (!parentCategoryId || parentCategoryId === 'pool') return '#d1d5db'; // gray-300
    const cat = categories.find(c => c.id === parentCategoryId);
    return cat?.color || '#d1d5db';
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceList = Array.from(categoryItems[source.droppableId]);
    const [moved] = sourceList.splice(source.index, 1);
    const destList = Array.from(categoryItems[destination.droppableId]);
    destList.splice(destination.index, 0, moved);

    setCategoryItems((prev) => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    }));
  };

  const checkAnswer = () => {
    // For each item, check if it's in the correct category
    let correct = true;
    for (const cat of categories) {
      for (const item of categoryItems[cat.id]) {
        if (item.correctCategory !== cat.id) {
          correct = false;
        }
      }
    }
    // Also check that all items are categorized (pool is empty)
    if (categoryItems.pool.length > 0) correct = false;
    setIsCorrect(correct);
    setIsCompleted(true);
    setTimeout(() => {
      onComplete(correct);
    }, 2000);
  };

  const shuffleItems = () => {
    // Shuffle all items back into pool
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const reset = { pool: shuffled };
    categories.forEach((cat) => {
      reset[cat.id] = [];
    });
    setCategoryItems(reset);
    setIsCompleted(false);
    setIsCorrect(false);
  };

  // Responsive grid: pool + categories (always side by side)
  const gridCols = `grid-cols-${categories.length + 1}`;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-cyber-blue mb-4">
          {exercise.title}
        </h3>
        <p className="text-lg text-cyber-blue leading-relaxed">
          {exercise.instructions || 'גרור כל פריט לקטגוריה המתאימה'}
        </p>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={`grid ${gridCols} gap-4 w-full min-w-0`} style={{ gridAutoFlow: 'column', overflowX: 'auto' }}>
          {/* Pool */}
          <Droppable droppableId="pool">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-gray-100 border-2 border-gray-300 rounded-xl p-3 min-h-[180px] flex flex-col items-center transition-all duration-200 ${snapshot.isDraggingOver ? 'bg-cyber-purple/20' : ''}`}
                style={{ maxHeight: 400, overflowY: 'auto', minWidth: 220 }}
              >
                <div className="font-bold text-cyber-purple mb-2 text-lg">פריטים לגרירה</div>
                {categoryItems.pool.map((item, idx) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`w-full min-w-0 max-w-full p-3 my-2 rounded-lg border-2 cursor-move bg-gray-200 flex items-center gap-2 shadow-md transition-all duration-200 ${snapshot.isDragging ? 'shadow-2xl scale-110 z-50 ring-4 ring-cyber-purple/40' : ''}`}
                        style={{ borderColor: '#d1d5db', opacity: snapshot.isDragging ? 1 : 1 }}
                      >
                        {item.image && (
                          <img src={item.image} alt="" className="w-10 h-10 rounded-full object-cover border mr-2" />
                        )}
                        <span className="font-bold text-cyber-purple text-lg whitespace-normal break-words">{item.text}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* Categories */}
          {categories.map((cat) => (
            <Droppable droppableId={cat.id} key={cat.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-gray-100 border-2 border-gray-300 rounded-xl p-3 min-h-[180px] flex flex-col items-center transition-all duration-200 ${snapshot.isDraggingOver ? 'bg-cyber-blue/10' : ''}`}
                  style={{ maxHeight: 400, overflowY: 'auto', minWidth: 220 }}
                >
                  <div className="font-bold mb-2 text-cyber-blue text-lg">{cat.name}</div>
                  <div className="text-xs text-cyber-blue mb-2">{cat.description}</div>
                  {categoryItems[cat.id].map((item, idx) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`w-full min-w-0 max-w-full p-3 my-2 rounded-lg border-2 cursor-move bg-gray-200 flex items-center gap-2 shadow-md transition-all duration-200 ${snapshot.isDragging ? 'shadow-2xl scale-110 z-50 ring-4 ring-cyber-blue/40' : ''}`}
                          style={{ borderColor: '#d1d5db', opacity: snapshot.isDragging ? 1 : 1 }}
                        >
                          {item.image && (
                            <img src={item.image} alt="" className="w-10 h-10 rounded-full object-cover border mr-2" />
                          )}
                          <span className="font-bold text-cyber-blue text-lg whitespace-normal break-words">{item.text}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <div className="flex justify-center space-x-4 space-x-reverse">
        <button
          onClick={shuffleItems}
          className="btn-secondary"
        >
          <Shuffle className="h-4 w-4 mr-2" />
          ערבב מחדש
        </button>
        <button
          onClick={checkAnswer}
          disabled={isCompleted}
          className="btn-primary disabled:opacity-50"
        >
          בדוק תשובה
        </button>
      </div>
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-6 rounded-lg ${
            isCorrect ? 'bg-cyber-green/10 text-cyber-green' : 'bg-cyber-red/10 text-cyber-red'
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            {isCorrect ? (
              <CheckCircle className="h-8 w-8 mr-3" />
            ) : (
              <XCircle className="h-8 w-8 mr-3" />
            )}
            <span className="text-xl font-bold">
              {isCorrect ? 'מעולה! סיווג נכון!' : 'נסה שוב!'}
            </span>
          </div>
          {!isCorrect && (
            <div className="text-sm">
              <p className="mb-2">הסיווג הנכון:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-2 rounded" style={{ background: cat.color + '22' }}>
                    <strong>{cat.name}:</strong> {items.filter((item) => item.correctCategory === cat.id).map((item) => item.text).join(', ')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DragDropExercise; 