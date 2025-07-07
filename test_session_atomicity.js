import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const sessionId = '6R0v9y26fZQYYOr7bE6T';

async function testJoinAtomicity() {
  const students = Array.from({ length: 100 }, (_, i) => ({
    id: uuidv4(),
    name: `Student${i + 1}`,
  }));

  await Promise.all(students.map(student =>
    db.doc(`sessions/${sessionId}`).update({
      connectedStudents: admin.firestore.FieldValue.arrayUnion({
        id: student.id,
        name: student.name,
        joinedAt: admin.firestore.FieldValue.serverTimestamp(),
        lastActivity: admin.firestore.FieldValue.serverTimestamp(),
        currentSlide: 0,
      }),
      lastActivity: admin.firestore.FieldValue.serverTimestamp(),
    })
  ));

  const sessionDoc = await db.doc(`sessions/${sessionId}`).get();
  console.log('After join:', sessionDoc.data().connectedStudents.length, 'students');
  return students;
}

async function testLeaveAtomicity(students) {
  await Promise.all(students.map(student =>
    db.doc(`sessions/${sessionId}`).update({
      connectedStudents: admin.firestore.FieldValue.arrayRemove({
        id: student.id,
        name: student.name,
      }),
      lastActivity: admin.firestore.FieldValue.serverTimestamp(),
    })
  ));

  const sessionDoc = await db.doc(`sessions/${sessionId}`).get();
  console.log('After leave:', sessionDoc.data().connectedStudents.length, 'students');
}

(async () => {
  const students = await testJoinAtomicity();
  // Remove the first 50 students
  await testLeaveAtomicity(students.slice(0, 50));
})();
