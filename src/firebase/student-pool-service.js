import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  arrayUnion, 
  arrayRemove,
  writeBatch,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase-config';
import { logSecurityEvent } from '../utils/security';

/**
 * Student Pool Service (Multi-Class Model)
 * Handles all database operations for the student pool system
 * Each student can only be assigned to ONE class at a time
 * Teachers can have multiple classes with different progression
 */
class StudentPoolService {
  
  // Collection references
  usersRef = collection(db, 'users');
  classesRef = collection(db, 'classes');
  enrollmentsRef = collection(db, 'classEnrollments');

  /**
   * Get all students in the pool (unassigned students)
   * @param {string} teacherId - Current teacher's ID
   * @param {Object} filters - Search and filter options
   * @returns {Promise<Array>} Array of unassigned student objects
   */
  async getAllStudents(teacherId, filters = {}) {
    try {
      // Simple query - just get all users and filter client-side
      const snapshot = await getDocs(this.usersRef);
      let students = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));

      // Filter students with role 'student'
      students = students.filter(student => student.role === 'student');

      // Filter unassigned students (no assignedClass field or assignedClass is null)
      students = students.filter(student => !student.assignedClass);

      // Apply search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        students = students.filter(student => 
          student.displayName?.toLowerCase().includes(searchLower) ||
          student.email?.toLowerCase().includes(searchLower)
        );
      }

      // Sort by display name
      students.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''));

      return students;
    } catch (error) {
      console.error('Error fetching unassigned students:', error);
      throw new Error('שגיאה בטעינת התלמידים');
    }
  }

  /**
   * Get all classes for a teacher
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<Array>} Array of class objects
   */
  async getTeacherClasses(teacherId) {
    try {
      if (!teacherId) {
        console.error('Teacher ID is undefined');
        throw new Error('מזהה המורה לא תקין');
      }

      // Simple query - just get all classes and filter client-side
      const snapshot = await getDocs(this.classesRef);
      let classes = snapshot.docs.map(doc => ({
        classId: doc.id,
        ...doc.data()
      }));

      // Filter classes for this teacher
      classes = classes.filter(classObj => classObj.instructorId === teacherId);

      // Filter active classes
      classes = classes.filter(classObj => classObj.status === 'active');

      // Sort by class number
      classes.sort((a, b) => (a.classNumber || 0) - (b.classNumber || 0));

      // Enrich with student information
      for (let classObj of classes) {
        classObj.students = await this.getStudentsForClass(classObj.classId);
        classObj.studentCount = classObj.students.length;
      }

      return classes;
    } catch (error) {
      console.error('Error fetching teacher classes:', error);
      throw new Error('שגיאה בטעינת הכיתות');
    }
  }

  /**
   * Get students for a specific class
   * @param {string} classId - Class ID
   * @returns {Promise<Array>} Array of student objects
   */
  async getStudentsForClass(classId) {
    try {
      const q = query(
        this.enrollmentsRef,
        where('classId', '==', classId),
        where('status', '==', 'active')
      );

      const snapshot = await getDocs(q);
      const enrollmentIds = snapshot.docs.map(doc => doc.data().studentId);

      if (enrollmentIds.length === 0) return [];

      // Get student details
      const students = [];
      for (const studentId of enrollmentIds) {
        const studentDoc = await getDoc(doc(this.usersRef, studentId));
        if (studentDoc.exists()) {
          students.push({
            uid: studentDoc.id,
            ...studentDoc.data()
          });
        }
      }

      return students;
    } catch (error) {
      console.error('Error fetching students for class:', error);
      throw new Error('שגיאה בטעינת תלמידי הכיתה');
    }
  }

  /**
   * Create a new class
   * @param {Object} classData - Class information
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<Object>} Created class
   */
  async createClass(classData, teacherId) {
    try {
      if (!teacherId) {
        console.error('Teacher ID is undefined');
        throw new Error('מזהה המורה לא תקין');
      }

      // Get the next available class number for this teacher
      const existingClasses = await this.getTeacherClasses(teacherId);
      const nextClassNumber = existingClasses.length + 1;

      // Create lesson information with robust date handling
      let lessonDate;
      try {
        if (classData.startDate) {
          // Handle different date formats
          if (typeof classData.startDate === 'string') {
            lessonDate = new Date(classData.startDate);
          } else if (classData.startDate instanceof Date) {
            lessonDate = classData.startDate;
          } else if (typeof classData.startDate === 'number') {
            lessonDate = new Date(classData.startDate);
          } else {
            lessonDate = new Date();
          }
          
          // Validate the date
          if (isNaN(lessonDate.getTime())) {
            console.warn('Invalid date, using current date');
            lessonDate = new Date();
          }
        } else {
          lessonDate = new Date();
        }
      } catch (dateError) {
        console.warn('Date parsing error, using current date:', dateError);
        lessonDate = new Date();
      }

      const lessonInfo = {
        name: `שיעור ${nextClassNumber}`,
        date: lessonDate,
        time: classData.schedule?.time || '16:00-18:00',
        duration: '2 שעות',
        status: 'scheduled'
      };

      const newClass = {
        ...classData,
        classNumber: nextClassNumber,
        className: `Class ${nextClassNumber}`,
        instructorId: teacherId,
        students: [],
        studentCount: 0,
        currentLesson: 1, // Start at first lesson
        lessonProgress: {}, // Empty progress object
        lessonInfo: lessonInfo, // Add lesson information
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(this.classesRef, newClass);

      // Log security event
      logSecurityEvent('CLASS_CREATED', {
        teacherId,
        classId: docRef.id,
        className: newClass.className,
        classNumber: nextClassNumber
      });

      return {
        classId: docRef.id,
        ...newClass
      };
    } catch (error) {
      console.error('Error creating class:', error);
      throw new Error('שגיאה ביצירת הכיתה');
    }
  }

  /**
   * Assign student to class (one-to-one model)
   * @param {string} studentId - Student's UID
   * @param {string} classId - Class ID
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<Object>} Assignment result
   */
  async assignStudentToClass(studentId, classId, teacherId) {
    const batch = writeBatch(db);

    try {
      // Validate assignment
      await this.validateAssignment(studentId, classId, teacherId);

      // Get class and student data
      const [classDoc, studentDoc] = await Promise.all([
        getDoc(doc(this.classesRef, classId)),
        getDoc(doc(this.usersRef, studentId))
      ]);

      if (!classDoc.exists()) {
        throw new Error('הכיתה לא נמצאה');
      }

      if (!studentDoc.exists()) {
        throw new Error('התלמיד לא נמצא');
      }

      const classData = classDoc.data();
      const studentData = studentDoc.data();

      // Check if student is already assigned to a class
      if (studentData.assignedClass) {
        throw new Error('התלמיד כבר רשום לכיתה אחרת');
      }

      // Check class capacity
      if (classData.studentCount >= classData.maxStudents) {
        throw new Error('הכיתה מלאה');
      }

      // Update class document
      batch.update(doc(this.classesRef, classId), {
        students: arrayUnion(studentId),
        studentCount: (classData.studentCount || 0) + 1,
        updatedAt: serverTimestamp()
      });

      // Update student document (single class assignment)
      batch.update(doc(this.usersRef, studentId), {
        assignedClass: classId, // Single class assignment
        updatedAt: serverTimestamp()
      });

      // Create enrollment record
      const enrollmentData = {
        classId,
        studentId,
        instructorId: teacherId,
        status: 'active',
        enrolledAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const enrollmentRef = doc(this.enrollmentsRef);
      batch.set(enrollmentRef, enrollmentData);

      // Commit all changes
      await batch.commit();

      // Log security event
      logSecurityEvent('STUDENT_ASSIGNED_TO_CLASS', {
        teacherId,
        studentId,
        classId,
        studentName: studentData.displayName,
        className: classData.className
      });

      return {
        success: true,
        message: `התלמיד ${studentData.displayName} נוסף לכיתה ${classData.className}`,
        enrollmentId: enrollmentRef.id
      };

    } catch (error) {
      console.error('Error assigning student to class:', error);
      throw error;
    }
  }

  /**
   * Remove student from class
   * @param {string} studentId - Student's UID
   * @param {string} classId - Class ID
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<Object>} Removal result
   */
  async removeStudentFromClass(studentId, classId, teacherId) {
    const batch = writeBatch(db);

    try {
      // Get class and student data
      const [classDoc, studentDoc] = await Promise.all([
        getDoc(doc(this.classesRef, classId)),
        getDoc(doc(this.usersRef, studentId))
      ]);

      if (!classDoc.exists()) {
        throw new Error('הכיתה לא נמצאה');
      }

      if (!studentDoc.exists()) {
        throw new Error('התלמיד לא נמצא');
      }

      const classData = classDoc.data();
      const studentData = studentDoc.data();

      // Check if student is in class
      if (studentData.assignedClass !== classId) {
        throw new Error('התלמיד לא רשום לכיתה זו');
      }

      // Update class document
      batch.update(doc(this.classesRef, classId), {
        students: arrayRemove(studentId),
        studentCount: Math.max(0, (classData.studentCount || 0) - 1),
        updatedAt: serverTimestamp()
      });

      // Update student document (remove class assignment)
      batch.update(doc(this.usersRef, studentId), {
        assignedClass: null, // Remove class assignment
        updatedAt: serverTimestamp()
      });

      // Update enrollment status
      const enrollmentQuery = query(
        this.enrollmentsRef,
        where('classId', '==', classId),
        where('studentId', '==', studentId)
      );

      const enrollmentSnapshot = await getDocs(enrollmentQuery);
      if (!enrollmentSnapshot.empty) {
        batch.update(doc(this.enrollmentsRef, enrollmentSnapshot.docs[0].id), {
          status: 'dropped',
          droppedAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Commit all changes
      await batch.commit();

      // Log security event
      logSecurityEvent('STUDENT_REMOVED_FROM_CLASS', {
        teacherId,
        studentId,
        classId,
        studentName: studentData.displayName,
        className: classData.className
      });

      return {
        success: true,
        message: `התלמיד ${studentData.displayName} הוסר מהכיתה ${classData.className}`
      };

    } catch (error) {
      console.error('Error removing student from class:', error);
      throw error;
    }
  }

  /**
   * Transfer student from one class to another
   * @param {string} studentId - Student's UID
   * @param {string} fromClassId - Current class ID
   * @param {string} toClassId - New class ID
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<Object>} Transfer result
   */
  async transferStudent(studentId, fromClassId, toClassId, teacherId) {
    const batch = writeBatch(db);

    try {
      // Validate transfer
      await this.validateTransfer(studentId, fromClassId, toClassId, teacherId);

      // Get class and student data
      const [fromClassDoc, toClassDoc, studentDoc] = await Promise.all([
        getDoc(doc(this.classesRef, fromClassId)),
        getDoc(doc(this.classesRef, toClassId)),
        getDoc(doc(this.usersRef, studentId))
      ]);

      if (!fromClassDoc.exists() || !toClassDoc.exists()) {
        throw new Error('אחת מהכיתות לא נמצאה');
      }

      if (!studentDoc.exists()) {
        throw new Error('התלמיד לא נמצא');
      }

      const fromClassData = fromClassDoc.data();
      const toClassData = toClassDoc.data();
      const studentData = studentDoc.data();

      // Check if student is in the from class
      if (studentData.assignedClass !== fromClassId) {
        throw new Error('התלמיד לא רשום לכיתה המקור');
      }

      // Check if target class has capacity
      if (toClassData.studentCount >= toClassData.maxStudents) {
        throw new Error('כיתת היעד מלאה');
      }

      // Remove from old class
      batch.update(doc(this.classesRef, fromClassId), {
        students: arrayRemove(studentId),
        studentCount: Math.max(0, (fromClassData.studentCount || 0) - 1),
        updatedAt: serverTimestamp()
      });

      // Add to new class
      batch.update(doc(this.classesRef, toClassId), {
        students: arrayUnion(studentId),
        studentCount: (toClassData.studentCount || 0) + 1,
        updatedAt: serverTimestamp()
      });

      // Update student assignment
      batch.update(doc(this.usersRef, studentId), {
        assignedClass: toClassId,
        updatedAt: serverTimestamp()
      });

      // Update enrollment records
      const enrollmentQuery = query(
        this.enrollmentsRef,
        where('classId', '==', fromClassId),
        where('studentId', '==', studentId)
      );

      const enrollmentSnapshot = await getDocs(enrollmentQuery);
      if (!enrollmentSnapshot.empty) {
        // Drop old enrollment
        batch.update(doc(this.enrollmentsRef, enrollmentSnapshot.docs[0].id), {
          status: 'dropped',
          droppedAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Create new enrollment
      const newEnrollmentData = {
        classId: toClassId,
        studentId,
        instructorId: teacherId,
        status: 'active',
        enrolledAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const newEnrollmentRef = doc(this.enrollmentsRef);
      batch.set(newEnrollmentRef, newEnrollmentData);

      // Commit all changes
      await batch.commit();

      // Log security event
      logSecurityEvent('STUDENT_TRANSFERRED_CLASS', {
        teacherId,
        studentId,
        fromClassId,
        toClassId,
        studentName: studentData.displayName,
        fromClassName: fromClassData.className,
        toClassName: toClassData.className
      });

      return {
        success: true,
        message: `התלמיד ${studentData.displayName} הועבר מ${fromClassData.className} ל${toClassData.className}`,
        enrollmentId: newEnrollmentRef.id
      };

    } catch (error) {
      console.error('Error transferring student:', error);
      throw error;
    }
  }

  /**
   * Advance class to next lesson
   * @param {string} classId - Class ID
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<Object>} Advancement result
   */
  async advanceClassToNextLesson(classId, teacherId) {
    try {
      const classRef = doc(this.classesRef, classId);
      const classDoc = await getDoc(classRef);

      if (!classDoc.exists()) {
        throw new Error('הכיתה לא נמצאה');
      }

      if (classDoc.data().instructorId !== teacherId) {
        throw new Error('אין לך הרשאה לקדם כיתה זו');
      }

      const classData = classDoc.data();
      const currentLesson = classData.currentLesson || 1;
      const nextLesson = currentLesson + 1;

      // Update class progression
      const lessonProgress = classData.lessonProgress || {};
      lessonProgress[currentLesson] = {
        ...lessonProgress[currentLesson],
        completedAt: serverTimestamp(),
        averageScore: classData.averageScore || null,
        studentCompletion: classData.studentCount || 0
      };

      await updateDoc(classRef, {
        currentLesson: nextLesson,
        lessonProgress,
        updatedAt: serverTimestamp()
      });

      // Log security event
      logSecurityEvent('CLASS_ADVANCED_LESSON', {
        teacherId,
        classId,
        fromLesson: currentLesson,
        toLesson: nextLesson,
        className: classData.className
      });

      return {
        success: true,
        message: `הכיתה ${classData.className} התקדמה לשיעור ${nextLesson}`,
        currentLesson: nextLesson
      };

    } catch (error) {
      console.error('Error advancing class:', error);
      throw error;
    }
  }

  /**
   * Update class information
   * @param {string} classId - Class ID
   * @param {Object} updates - Updates to apply
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<Object>} Updated class
   */
  async updateClass(classId, updates, teacherId) {
    try {
      const classRef = doc(this.classesRef, classId);
      const classDoc = await getDoc(classRef);

      if (!classDoc.exists()) {
        throw new Error('הכיתה לא נמצאה');
      }

      if (classDoc.data().instructorId !== teacherId) {
        throw new Error('אין לך הרשאה לערוך כיתה זו');
      }

      await updateDoc(classRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      // Log security event
      logSecurityEvent('CLASS_UPDATED', {
        teacherId,
        classId,
        updates: Object.keys(updates)
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating class:', error);
      throw error;
    }
  }

  /**
   * Delete a class
   * @param {string} classId - Class ID
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteClass(classId, teacherId) {
    const batch = writeBatch(db);

    try {
      const classRef = doc(this.classesRef, classId);
      const classDoc = await getDoc(classRef);

      if (!classDoc.exists()) {
        throw new Error('הכיתה לא נמצאה');
      }

      if (classDoc.data().instructorId !== teacherId) {
        throw new Error('אין לך הרשאה למחוק כיתה זו');
      }

      // Remove all students from class
      const classData = classDoc.data();
      for (const studentId of classData.students || []) {
        // Update student document
        batch.update(doc(this.usersRef, studentId), {
          assignedClass: null, // Remove class assignment
          updatedAt: serverTimestamp()
        });

        // Update enrollment status
        const enrollmentQuery = query(
          this.enrollmentsRef,
          where('classId', '==', classId),
          where('studentId', '==', studentId)
        );

        const enrollmentSnapshot = await getDocs(enrollmentQuery);
        if (!enrollmentSnapshot.empty) {
          batch.update(doc(this.enrollmentsRef, enrollmentSnapshot.docs[0].id), {
            status: 'dropped',
            droppedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      }

      // Delete class
      batch.delete(classRef);

      // Commit all changes
      await batch.commit();

      // Log security event
      logSecurityEvent('CLASS_DELETED', {
        teacherId,
        classId,
        className: classData.className
      });

      return {
        success: true,
        message: `הכיתה ${classData.className} נמחקה בהצלחה`
      };

    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  }

  /**
   * Validate student assignment
   * @param {string} studentId - Student's UID
   * @param {string} classId - Class ID
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<void>}
   */
  async validateAssignment(studentId, classId, teacherId) {
    // Check if teacher owns the class
    const classDoc = await getDoc(doc(this.classesRef, classId));
    if (!classDoc.exists() || classDoc.data().instructorId !== teacherId) {
      throw new Error('אין לך הרשאה להוסיף תלמידים לכיתה זו');
    }

    // Check if student exists and is actually a student
    const studentDoc = await getDoc(doc(this.usersRef, studentId));
    if (!studentDoc.exists() || studentDoc.data().role !== 'student') {
      throw new Error('המשתמש אינו תלמיד תקין');
    }

    // Check if student is already assigned to a class
    if (studentDoc.data().assignedClass) {
      throw new Error('התלמיד כבר רשום לכיתה אחרת');
    }
  }

  /**
   * Validate student transfer
   * @param {string} studentId - Student's UID
   * @param {string} fromClassId - Current class ID
   * @param {string} toClassId - New class ID
   * @param {string} teacherId - Teacher's ID
   * @returns {Promise<void>}
   */
  async validateTransfer(studentId, fromClassId, toClassId, teacherId) {
    // Check if teacher owns both classes
    const [fromClassDoc, toClassDoc] = await Promise.all([
      getDoc(doc(this.classesRef, fromClassId)),
      getDoc(doc(this.classesRef, toClassId))
    ]);

    if (!fromClassDoc.exists() || fromClassDoc.data().instructorId !== teacherId) {
      throw new Error('אין לך הרשאה להעביר תלמידים מהכיתה המקור');
    }

    if (!toClassDoc.exists() || toClassDoc.data().instructorId !== teacherId) {
      throw new Error('אין לך הרשאה להעביר תלמידים לכיתת היעד');
    }

    // Check if student exists and is actually a student
    const studentDoc = await getDoc(doc(this.usersRef, studentId));
    if (!studentDoc.exists() || studentDoc.data().role !== 'student') {
      throw new Error('המשתמש אינו תלמיד תקין');
    }
  }

  /**
   * Get real-time updates for unassigned students
   * @param {string} teacherId - Teacher's ID
   * @param {Function} callback - Callback function for updates
   * @returns {Function} Unsubscribe function
   */
  subscribeToUnassignedStudents(teacherId, callback) {
    const q = query(
      this.usersRef,
      where('role', '==', 'student'),
      orderBy('displayName')
    );

    return onSnapshot(q, async (snapshot) => {
      const students = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));

      // Filter unassigned students client-side
      const unassignedStudents = students.filter(student => !student.assignedClass);
      callback(unassignedStudents);
    });
  }

  /**
   * Get real-time updates for teacher's classes
   * @param {string} teacherId - Teacher's ID
   * @param {Function} callback - Callback function for updates
   * @returns {Function} Unsubscribe function
   */
  subscribeToClasses(teacherId, callback) {
    const q = query(
      this.classesRef,
      where('instructorId', '==', teacherId),
      where('status', '==', 'active'),
      orderBy('classNumber')
    );

    return onSnapshot(q, async (snapshot) => {
      const classes = snapshot.docs.map(doc => ({
        classId: doc.id,
        ...doc.data()
      }));

      // Enrich with student information
      for (let classObj of classes) {
        classObj.students = await this.getStudentsForClass(classObj.classId);
      }

      callback(classes);
    });
  }
}

// Export singleton instance
export const studentPoolService = new StudentPoolService();
export default studentPoolService; 