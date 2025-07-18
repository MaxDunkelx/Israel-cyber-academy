import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getAllLessons } from '../firebase/content-service';
import { getTeacherClasses, getClassStudents } from '../firebase/teacher-service';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const TestTeacherSystem = () => {
  const { currentUser } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState({});
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testTeacherSystem = async () => {
      try {
        setLoading(true);
        
        const teacherId = currentUser?.id || currentUser?.uid;
        console.log('🔍 Testing teacher system with ID:', teacherId);

        // Test 1: Load lessons
        try {
          const lessonsData = await getAllLessons();
          const sortedLessons = lessonsData.sort((a, b) => {
            const aId = a.originalId || a.id || '';
            const bId = b.originalId || b.id || '';
            return aId.localeCompare(bId);
          });
          setLessons(sortedLessons);
          setTestResults(prev => ({ ...prev, lessonsLoaded: `✅ ${sortedLessons.length} lessons loaded` }));
        } catch (err) {
          setTestResults(prev => ({ ...prev, lessonsLoaded: `❌ Failed: ${err.message}` }));
        }

        // Test 2: Load teacher classes
        try {
          const teacherClasses = await getTeacherClasses(teacherId);
          setClasses(teacherClasses);
          setTestResults(prev => ({ ...prev, classesLoaded: `✅ ${teacherClasses.length} classes loaded` }));
        } catch (err) {
          setTestResults(prev => ({ ...prev, classesLoaded: `❌ Failed: ${err.message}` }));
        }

        // Test 3: Load students for each class
        try {
          const studentsData = {};
          for (const classData of teacherClasses) {
            const classStudents = await getClassStudents(classData.id);
            studentsData[classData.id] = classStudents;
          }
          setStudents(studentsData);
          const totalStudents = Object.values(studentsData).flat().length;
          setTestResults(prev => ({ ...prev, studentsLoaded: `✅ ${totalStudents} students loaded` }));
        } catch (err) {
          setTestResults(prev => ({ ...prev, studentsLoaded: `❌ Failed: ${err.message}` }));
        }

        // Test 4: Check lesson unlocking functionality
        try {
          let unlockedStudents = 0;
          for (const classData of teacherClasses) {
            const classStudents = studentsData[classData.id] || [];
            for (const student of classStudents) {
              const userRef = doc(db, 'users', student.uid);
              const userDoc = await getDoc(userRef);
              if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.currentLesson && userData.currentLesson > 0) {
                  unlockedStudents++;
                }
              }
            }
          }
          setTestResults(prev => ({ ...prev, lessonUnlocking: `✅ ${unlockedStudents} students have unlocked lessons` }));
        } catch (err) {
          setTestResults(prev => ({ ...prev, lessonUnlocking: `❌ Failed: ${err.message}` }));
        }

      } catch (err) {
        console.error('Error in teacher system test:', err);
        setTestResults(prev => ({ ...prev, generalError: `❌ General error: ${err.message}` }));
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      testTeacherSystem();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div style={{ padding: '20px', color: 'white' }}>
        <h1>Testing Teacher System...</h1>
        <div>Please wait...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <h1>Teacher System Test Results</h1>
      
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

      <div style={{ marginBottom: '20px' }}>
        <h2>Teacher Classes ({classes.length} total)</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
        {classes.map((classData) => (
          <div key={classData.id} style={{ 
            border: '1px solid #555', 
            padding: '15px', 
            borderRadius: '8px',
            backgroundColor: '#2a2a2a'
          }}>
            <h3 style={{ color: '#4ade80', marginBottom: '10px' }}>{classData.name}</h3>
            <p><strong>ID:</strong> {classData.id}</p>
            <p><strong>Description:</strong> {classData.description}</p>
            <p><strong>Teacher ID:</strong> {classData.teacherId}</p>
            <p><strong>Current Lesson:</strong> {classData.currentLesson || 'None'}</p>
            <p><strong>Students:</strong> {students[classData.id]?.length || 0}</p>
            <p><strong>Unlocked Lessons:</strong> {classData.unlockedLessons?.length || 0}</p>
            
            {classData.unlockedLessons && classData.unlockedLessons.length > 0 && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
                <strong>Unlocked Lessons History:</strong>
                <ul style={{ marginTop: '5px' }}>
                  {classData.unlockedLessons.map((unlocked, index) => (
                    <li key={index} style={{ fontSize: '12px', margin: '2px 0' }}>
                      Lesson {unlocked.lessonId} - {new Date(unlocked.unlockedAt).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {students[classData.id] && students[classData.id].length > 0 && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
                <strong>Students:</strong>
                <ul style={{ marginTop: '5px' }}>
                  {students[classData.id].map((student) => (
                    <li key={student.uid} style={{ fontSize: '12px', margin: '2px 0' }}>
                      {student.displayName} ({student.email})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {classes.length === 0 && (
        <div style={{ padding: '20px', backgroundColor: '#ff4444', borderRadius: '8px' }}>
          <h2>No classes found!</h2>
          <p>This teacher doesn't have any classes yet. Create a class first to test lesson unlocking.</p>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
        <h2>Instructions for Testing:</h2>
        <ol style={{ marginLeft: '20px' }}>
          <li>Create a class in the Student Pool</li>
          <li>Assign students to the class</li>
          <li>Go to Classroom Interface</li>
          <li>Select a lesson from the dropdown to unlock it</li>
          <li>Check that students can now access the unlocked lessons in their Roadmap</li>
        </ol>
      </div>
    </div>
  );
};

export default TestTeacherSystem; 