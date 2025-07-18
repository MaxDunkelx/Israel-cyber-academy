import React, { useState, useEffect } from 'react';
import { getAllLessons } from '../firebase/content-service.js';

const TestLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        setLoading(true);
        const loadedLessons = await getAllLessons(true); // Force refresh
        console.log('Loaded lessons:', loadedLessons);
        setLessons(loadedLessons);
      } catch (err) {
        console.error('Error loading lessons:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  if (loading) {
    return <div>Loading lessons...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Test Lessons ({lessons.length} lessons found)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {lessons.map((lesson, index) => (
          <div key={lesson.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{lesson.title}</h3>
            <p><strong>ID:</strong> {lesson.id}</p>
            <p><strong>Original ID:</strong> {lesson.originalId}</p>
            <p><strong>Description:</strong> {lesson.description}</p>
            <p><strong>Difficulty:</strong> {lesson.difficulty}</p>
            <p><strong>Target Age:</strong> {lesson.targetAge}</p>
            <p><strong>Total Slides:</strong> {lesson.totalSlides || lesson.slides?.length || 0}</p>
            <p><strong>Source:</strong> {lesson.source || 'database'}</p>
            <p><strong>Order:</strong> {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestLessons; 