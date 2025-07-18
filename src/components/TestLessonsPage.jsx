import React, { useState, useEffect } from 'react';

const TestLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    const testLessons = async () => {
      try {
        setLoading(true);
        
        // Test 1: Try to import local lessons directly
        let localLessons = [];
        try {
          const { lessons: importedLessons } = await import('../data/lessons/index.js');
          localLessons = importedLessons;
          setTestResults(prev => ({ ...prev, localImport: '✅ Success' }));
        } catch (err) {
          setTestResults(prev => ({ ...prev, localImport: `❌ Failed: ${err.message}` }));
        }

        // Test 2: Try content service
        let serviceLessons = [];
        try {
          const { getAllLessons } = await import('../firebase/content-service.js');
          serviceLessons = await getAllLessons(true);
          setTestResults(prev => ({ ...prev, contentService: '✅ Success' }));
        } catch (err) {
          setTestResults(prev => ({ ...prev, contentService: `❌ Failed: ${err.message}` }));
        }

        // Use whichever worked
        const finalLessons = serviceLessons.length > 0 ? serviceLessons : localLessons;
        setLessons(finalLessons);
        
      } catch (err) {
        console.error('Error in test:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testLessons();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', color: 'white' }}>
        <h1>Testing Lessons Loading...</h1>
        <div>Please wait...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <h1>Lessons Test Results</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
        <h2>Test Results:</h2>
        <ul>
          {Object.entries(testResults).map(([test, result]) => (
            <li key={test} style={{ margin: '5px 0' }}>
              <strong>{test}:</strong> {result}
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#ff4444', borderRadius: '8px' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <h2>Loaded Lessons ({lessons.length} total)</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {lessons.map((lesson, index) => (
          <div key={lesson.id} style={{ 
            border: '1px solid #555', 
            padding: '15px', 
            borderRadius: '8px',
            backgroundColor: '#2a2a2a'
          }}>
            <h3 style={{ color: '#4ade80', marginBottom: '10px' }}>{lesson.title}</h3>
            <p><strong>ID:</strong> {lesson.id}</p>
            <p><strong>Original ID:</strong> {lesson.originalId || 'N/A'}</p>
            <p><strong>Description:</strong> {lesson.description}</p>
            <p><strong>Difficulty:</strong> {lesson.difficulty}</p>
            <p><strong>Target Age:</strong> {lesson.targetAge}</p>
            <p><strong>Total Slides:</strong> {lesson.totalSlides || lesson.slides?.length || 0}</p>
            <p><strong>Source:</strong> {lesson.source || 'unknown'}</p>
            <p><strong>Order:</strong> {index + 1}</p>
            {lesson.icon && <p><strong>Icon:</strong> {lesson.icon}</p>}
          </div>
        ))}
      </div>

      {lessons.length === 0 && (
        <div style={{ padding: '20px', backgroundColor: '#ff4444', borderRadius: '8px' }}>
          <h2>No lessons loaded!</h2>
          <p>Check the test results above to see what went wrong.</p>
        </div>
      )}
    </div>
  );
};

export default TestLessonsPage; 