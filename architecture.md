# 🏗️ Israel Cyber Academy - Database Architecture

## 📊 Database Overview
- **Database**: cyber-campus
- **Project**: israel-cyber-academy  
- **Analysis Date**: 2025-07-18T06:08:33.012Z
- **Total Collections**: 12
- **Total Documents**: 1675

## 👥 User System Analysis
- **User Roles Found**: system_manager, student, teacher
- **Total Users**: 262
- **Authentication Issues**: 0

### ✅ No Authentication Issues Found

---

## 🗂️ Collection: `activeSessions`

**Document Count**: 20

### Schema
- **sessionId**: string
- **teacherId**: string
- **lessonId**: string
- **lessonName**: string
- **currentSlide**: number
- **connectedStudents**: number
- **totalStudents**: number
- **startTime**: string
- **lastActivity**: string
- **isLocked**: boolean
- **chatEnabled**: boolean
- **status**: string


### Sample Documents

#### Document 1: `session004`
```json
{
  "sessionId": "session004",
  "teacherId": "teacher10",
  "lessonId": "lesson012",
  "lessonName": "הגנה על פרטיות",
  "currentSlide": 5,
  "connectedStudents": 11,
  "totalStudents": 14,
  "startTime": "2025-07-14T15:19:25.801Z",
  "lastActivity": "2025-07-17T10:13:49.985Z",
  "isLocked": true,
  "chatEnabled": true,
  "status": "active"
}
```


#### Document 2: `session006`
```json
{
  "sessionId": "session006",
  "teacherId": "teacher01",
  "lessonId": "lesson008",
  "lessonName": "זיהוי איומים וחקירות",
  "currentSlide": 11,
  "connectedStudents": 15,
  "totalStudents": 19,
  "startTime": "2025-07-10T15:50:40.978Z",
  "lastActivity": "2025-07-17T09:55:04.572Z",
  "isLocked": false,
  "chatEnabled": true,
  "status": "active"
}
```


#### Document 3: `session011`
```json
{
  "sessionId": "session011",
  "teacherId": "teacher03",
  "lessonId": "lesson011",
  "lessonName": "אבטחת רשתות אלחוטיות",
  "currentSlide": 4,
  "connectedStudents": 6,
  "totalStudents": 8,
  "startTime": "2025-07-08T09:53:34.341Z",
  "lastActivity": "2025-07-17T10:06:22.289Z",
  "isLocked": false,
  "chatEnabled": true,
  "status": "active"
}
```


#### Document 4: `session016`
```json
{
  "sessionId": "session016",
  "teacherId": "teacher07",
  "lessonId": "lesson002",
  "lessonName": "אבטחת מידע וסייבר",
  "currentSlide": 2,
  "connectedStudents": 15,
  "totalStudents": 19,
  "startTime": "2025-07-09T21:16:19.051Z",
  "lastActivity": "2025-07-17T10:29:22.835Z",
  "isLocked": false,
  "chatEnabled": true,
  "status": "active"
}
```


#### Document 5: `session019`
```json
{
  "sessionId": "session019",
  "teacherId": "teacher03",
  "lessonId": "lesson017",
  "lessonName": "תגובה לאירועי סייבר",
  "currentSlide": 9,
  "connectedStudents": 16,
  "totalStudents": 21,
  "startTime": "2025-05-31T07:28:31.492Z",
  "lastActivity": "2025-07-17T09:38:32.069Z",
  "isLocked": false,
  "chatEnabled": true,
  "status": "active"
}
```



---

## 🗂️ Collection: `classEnrollments`

**Document Count**: 250

### Schema
- **studentId**: string
- **classId**: string
- **teacherId**: string
- **enrolledAt**: string
- **status**: string
- **progress**: object


### Sample Documents

#### Document 1: `student001-class01`
```json
{
  "studentId": "student001",
  "classId": "class01",
  "teacherId": "teacher01",
  "enrolledAt": "2025-05-25T18:07:20.457Z",
  "status": "active",
  "progress": {
    "lessonsCompleted": 2,
    "totalTimeSpent": 32055,
    "lastActivity": "2025-07-16T13:56:03.186Z"
  }
}
```


#### Document 2: `student002-class01`
```json
{
  "studentId": "student002",
  "classId": "class01",
  "teacherId": "teacher01",
  "enrolledAt": "2025-06-16T17:07:15.940Z",
  "status": "active",
  "progress": {
    "lessonsCompleted": 2,
    "totalTimeSpent": 7174,
    "lastActivity": "2025-07-17T09:53:46.371Z"
  }
}
```


#### Document 3: `student003-class01`
```json
{
  "studentId": "student003",
  "classId": "class01",
  "teacherId": "teacher01",
  "enrolledAt": "2025-05-01T06:27:45.610Z",
  "status": "active",
  "progress": {
    "lessonsCompleted": 3,
    "totalTimeSpent": 20485,
    "lastActivity": "2025-07-16T18:14:39.943Z"
  }
}
```


#### Document 4: `student004-class01`
```json
{
  "studentId": "student004",
  "classId": "class01",
  "teacherId": "teacher01",
  "enrolledAt": "2025-06-27T19:58:00.236Z",
  "status": "active",
  "progress": {
    "lessonsCompleted": 6,
    "totalTimeSpent": 26042,
    "lastActivity": "2025-07-16T11:01:25.319Z"
  }
}
```


#### Document 5: `student005-class01`
```json
{
  "studentId": "student005",
  "classId": "class01",
  "teacherId": "teacher01",
  "enrolledAt": "2025-04-26T10:29:13.733Z",
  "status": "active",
  "progress": {
    "lessonsCompleted": 7,
    "totalTimeSpent": 2738,
    "lastActivity": "2025-07-17T01:03:20.141Z"
  }
}
```



---

## 🗂️ Collection: `classes`

**Document Count**: 10

### Schema
- **id**: string
- **name**: string
- **description**: string
- **teacherId**: string
- **grade**: number
- **maxStudents**: number
- **currentStudents**: number
- **schedule**: object
- **curriculum**: object
- **analytics**: object
- **isActive**: boolean
- **semester**: string
- **academicYear**: string
- **createdAt**: string
- **updatedAt**: string


### Sample Documents

#### Document 1: `class01`
```json
{
  "id": "class01",
  "name": "Cyber Security Class 1",
  "description": "Advanced cybersecurity education for class 1",
  "teacherId": "teacher01",
  "grade": 11,
  "maxStudents": 25,
  "currentStudents": 25,
  "schedule": {
    "days": [
      "sunday",
      "tuesday",
      "thursday"
    ],
    "startTime": "08:00",
    "endTime": "09:30",
    "timezone": "Asia/Jerusalem"
  },
  "curriculum": {
    "totalLessons": 18,
    "completedLessons": 6,
    "currentLesson": 2,
    "averageProgress": 0.8875524433776705
  },
  "analytics": {
    "totalSessions": 30,
    "averageAttendance": 0.9419572686313704,
    "averageScore": 89.71269336858379,
    "engagementRate": 0.8847051508935584,
    "completionRate": 0.601672805897729
  },
  "isActive": true,
  "semester": "Fall 2024",
  "academicYear": "2024-2025",
  "createdAt": "2025-03-13T12:14:36.663Z",
  "updatedAt": "2025-07-17T10:34:10.268Z"
}
```


#### Document 2: `class02`
```json
{
  "id": "class02",
  "name": "Cyber Security Class 2",
  "description": "Advanced cybersecurity education for class 2",
  "teacherId": "teacher02",
  "grade": 11,
  "maxStudents": 25,
  "currentStudents": 25,
  "schedule": {
    "days": [
      "sunday",
      "tuesday",
      "thursday"
    ],
    "startTime": "08:00",
    "endTime": "09:30",
    "timezone": "Asia/Jerusalem"
  },
  "curriculum": {
    "totalLessons": 18,
    "completedLessons": 13,
    "currentLesson": 1,
    "averageProgress": 0.7853657399555454
  },
  "analytics": {
    "totalSessions": 13,
    "averageAttendance": 0.8419484316458775,
    "averageScore": 84.24163360448458,
    "engagementRate": 0.7080535073390727,
    "completionRate": 0.8221162876446598
  },
  "isActive": true,
  "semester": "Fall 2024",
  "academicYear": "2024-2025",
  "createdAt": "2025-01-22T04:30:59.915Z",
  "updatedAt": "2025-07-17T10:34:10.268Z"
}
```


#### Document 3: `class03`
```json
{
  "id": "class03",
  "name": "Cyber Security Class 3",
  "description": "Advanced cybersecurity education for class 3",
  "teacherId": "teacher03",
  "grade": 11,
  "maxStudents": 25,
  "currentStudents": 25,
  "schedule": {
    "days": [
      "sunday",
      "tuesday",
      "thursday"
    ],
    "startTime": "08:00",
    "endTime": "09:30",
    "timezone": "Asia/Jerusalem"
  },
  "curriculum": {
    "totalLessons": 18,
    "completedLessons": 11,
    "currentLesson": 17,
    "averageProgress": 0.7874206902285383
  },
  "analytics": {
    "totalSessions": 12,
    "averageAttendance": 0.738199932199612,
    "averageScore": 80.26680813408268,
    "engagementRate": 0.78220720727569,
    "completionRate": 0.7527587309953636
  },
  "isActive": true,
  "semester": "Fall 2024",
  "academicYear": "2024-2025",
  "createdAt": "2025-04-25T07:22:00.322Z",
  "updatedAt": "2025-07-17T10:34:10.268Z"
}
```


#### Document 4: `class04`
```json
{
  "id": "class04",
  "name": "Cyber Security Class 4",
  "description": "Advanced cybersecurity education for class 4",
  "teacherId": "teacher04",
  "grade": 12,
  "maxStudents": 25,
  "currentStudents": 25,
  "schedule": {
    "days": [
      "sunday",
      "tuesday",
      "thursday"
    ],
    "startTime": "08:00",
    "endTime": "09:30",
    "timezone": "Asia/Jerusalem"
  },
  "curriculum": {
    "totalLessons": 18,
    "completedLessons": 13,
    "currentLesson": 10,
    "averageProgress": 0.6519600396401535
  },
  "analytics": {
    "totalSessions": 14,
    "averageAttendance": 0.7694866474118001,
    "averageScore": 86.77757869847976,
    "engagementRate": 0.8337773427520502,
    "completionRate": 0.6921208371074267
  },
  "isActive": true,
  "semester": "Fall 2024",
  "academicYear": "2024-2025",
  "createdAt": "2025-05-01T15:13:47.295Z",
  "updatedAt": "2025-07-17T10:34:10.268Z"
}
```


#### Document 5: `class05`
```json
{
  "id": "class05",
  "name": "Cyber Security Class 5",
  "description": "Advanced cybersecurity education for class 5",
  "teacherId": "teacher05",
  "grade": 12,
  "maxStudents": 25,
  "currentStudents": 25,
  "schedule": {
    "days": [
      "sunday",
      "tuesday",
      "thursday"
    ],
    "startTime": "08:00",
    "endTime": "09:30",
    "timezone": "Asia/Jerusalem"
  },
  "curriculum": {
    "totalLessons": 18,
    "completedLessons": 7,
    "currentLesson": 14,
    "averageProgress": 0.5917137533050558
  },
  "analytics": {
    "totalSessions": 18,
    "averageAttendance": 0.9509056918153082,
    "averageScore": 75.37952329380359,
    "engagementRate": 0.780358249261361,
    "completionRate": 0.8637054415454697
  },
  "isActive": true,
  "semester": "Fall 2024",
  "academicYear": "2024-2025",
  "createdAt": "2025-04-28T18:28:40.035Z",
  "updatedAt": "2025-07-17T10:34:10.268Z"
}
```



---

## 🗂️ Collection: `lessons`

**Document Count**: 19

### Schema
- **id**: string
- **originalId**: number
- **title**: string
- **description**: string
- **category**: string
- **difficulty**: string
- **estimatedDuration**: number
- **language**: string
- **objectives**: array
- **prerequisites**: array
- **learningOutcomes**: array
- **tags**: array
- **totalSlides**: number
- **requiredSlides**: number
- **slideTypes**: object
- **isActive**: boolean
- **isPublished**: boolean
- **version**: string
- **order**: number
- **icon**: string
- **analytics**: object
- **completionRate**: number
- **averageScore**: number
- **createdAt**: timestamp
- **updatedAt**: timestamp


### Sample Documents

#### Document 1: `lesson-001`
```json
{
  "id": "lesson-001",
  "originalId": 1,
  "title": "מבוא לעולם הסייבר",
  "description": "הכרת יסודות עולם הסייבר, איומים דיגיטליים והחשיבות של אבטחת מידע בעולם המודרני",
  "category": "basics",
  "difficulty": "beginner",
  "estimatedDuration": 150,
  "language": "he",
  "objectives": [
    "הבנת המושג סייבר ותחומי הפעילות",
    "זיהוי איומי סייבר בחיי היומיום",
    "הכרת מקצועות ותפקידים בעולם הסייבר"
  ],
  "prerequisites": [],
  "learningOutcomes": [
    "ידע מעמיק במבוא לעולם הסייבר",
    "כישורים מעשיים ויישומיים",
    "יכולת זיהוי ופתרון בעיות"
  ],
  "tags": [
    "basics",
    "beginner",
    "cybersecurity",
    "hebrew"
  ],
  "totalSlides": 30,
  "requiredSlides": 10,
  "slideTypes": {
    "presentation": 5,
    "interactive": 5,
    "quiz": 5,
    "video": 5,
    "simulation": 5,
    "exercise": 5
  },
  "isActive": true,
  "isPublished": true,
  "version": "1.0",
  "order": 1,
  "icon": "🚀",
  "analytics": {
    "totalCompletions": 264,
    "averageCompletionTime": 5434,
    "averageScore": 86.68705359655944,
    "dropoffPoints": [
      5,
      12,
      18,
      25
    ],
    "popularSlides": [
      "slide-001",
      "slide-002",
      "slide-003"
    ]
  },
  "completionRate": 0.8255851803419793,
  "averageScore": 79.66450159461597,
  "createdAt": {
    "_seconds": 1737088589,
    "_nanoseconds": 840000000
  },
  "updatedAt": {
    "_seconds": 1752742978,
    "_nanoseconds": 159000000
  }
}
```


#### Document 2: `lesson-002`
```json
{
  "id": "lesson-002",
  "originalId": 2,
  "title": "רשתות מחשבים ותקשורת",
  "description": "הבנת מבנה רשתות מחשבים, פרוטוקולי תקשורת ויסודות האינטרנט",
  "category": "networking",
  "difficulty": "beginner",
  "estimatedDuration": 150,
  "language": "he",
  "objectives": [
    "הבנת מבנה רשתות מחשבים",
    "הכרת פרוטוקולי TCP/IP",
    "זיהוי נקודות תורפה ברשתות"
  ],
  "prerequisites": [
    "lesson-001"
  ],
  "learningOutcomes": [
    "ידע מעמיק ברשתות מחשבים ותקשורת",
    "כישורים מעשיים ויישומיים",
    "יכולת זיהוי ופתרון בעיות"
  ],
  "tags": [
    "networking",
    "beginner",
    "cybersecurity",
    "hebrew"
  ],
  "totalSlides": 30,
  "requiredSlides": 10,
  "slideTypes": {
    "presentation": 5,
    "interactive": 5,
    "quiz": 5,
    "video": 5,
    "simulation": 5,
    "exercise": 5
  },
  "isActive": true,
  "isPublished": true,
  "version": "1.0",
  "order": 2,
  "icon": "🌐",
  "analytics": {
    "totalCompletions": 229,
    "averageCompletionTime": 3829,
    "averageScore": 89.64637871040492,
    "dropoffPoints": [
      5,
      12,
      18,
      25
    ],
    "popularSlides": [
      "slide-001",
      "slide-002",
      "slide-003"
    ]
  },
  "completionRate": 0.9535150656269611,
  "averageScore": 82.55410436180871,
  "createdAt": {
    "_seconds": 1744751794,
    "_nanoseconds": 726000000
  },
  "updatedAt": {
    "_seconds": 1751678011,
    "_nanoseconds": 815000000
  }
}
```


#### Document 3: `lesson-003`
```json
{
  "id": "lesson-003",
  "originalId": 3,
  "title": "אבטחת מידע וסייבר",
  "description": "עקרונות יסוד באבטחת מידע, CIA Triad וזיהוי איומי סייבר",
  "category": "security",
  "difficulty": "beginner",
  "estimatedDuration": 150,
  "language": "he",
  "objectives": [
    "הבנת עקרונות אבטחת מידע",
    "יישום CIA Triad",
    "זיהוי וסיווג איומים"
  ],
  "prerequisites": [
    "lesson-002"
  ],
  "learningOutcomes": [
    "ידע מעמיק באבטחת מידע וסייבר",
    "כישורים מעשיים ויישומיים",
    "יכולת זיהוי ופתרון בעיות"
  ],
  "tags": [
    "security",
    "beginner",
    "cybersecurity",
    "hebrew"
  ],
  "totalSlides": 30,
  "requiredSlides": 13,
  "slideTypes": {
    "presentation": 5,
    "interactive": 5,
    "quiz": 5,
    "video": 5,
    "simulation": 5,
    "exercise": 5
  },
  "isActive": true,
  "isPublished": true,
  "version": "1.0",
  "order": 3,
  "icon": "🔒",
  "analytics": {
    "totalCompletions": 168,
    "averageCompletionTime": 4149,
    "averageScore": 94.3612000049126,
    "dropoffPoints": [
      5,
      12,
      18,
      25
    ],
    "popularSlides": [
      "slide-001",
      "slide-002",
      "slide-003"
    ]
  },
  "completionRate": 0.8847954065545396,
  "averageScore": 94.61677686761044,
  "createdAt": {
    "_seconds": 1740869783,
    "_nanoseconds": 273000000
  },
  "updatedAt": {
    "_seconds": 1752261670,
    "_nanoseconds": 229000000
  }
}
```


#### Document 4: `lesson-004`
```json
{
  "id": "lesson-004",
  "originalId": 4,
  "title": "התקפות פיישינג וזיהויין",
  "description": "זיהוי והתמודדות עם התקפות פיישינג, הנדסה חברתית ומניפולציה דיגיטלית",
  "category": "threats",
  "difficulty": "intermediate",
  "estimatedDuration": 150,
  "language": "he",
  "objectives": [
    "זיהוי סוגי התקפות פיישינג",
    "הבנת טכניקות הנדסה חברתית",
    "פיתוח יכולת הגנה אישית"
  ],
  "prerequisites": [
    "lesson-003"
  ],
  "learningOutcomes": [
    "ידע מעמיק בהתקפות פיישינג וזיהויין",
    "כישורים מעשיים ויישומיים",
    "יכולת זיהוי ופתרון בעיות"
  ],
  "tags": [
    "threats",
    "intermediate",
    "cybersecurity",
    "hebrew"
  ],
  "totalSlides": 30,
  "requiredSlides": 16,
  "slideTypes": {
    "presentation": 5,
    "interactive": 5,
    "quiz": 5,
    "video": 5,
    "simulation": 5,
    "exercise": 5
  },
  "isActive": true,
  "isPublished": true,
  "version": "1.0",
  "order": 4,
  "icon": "🎣",
  "analytics": {
    "totalCompletions": 186,
    "averageCompletionTime": 4517,
    "averageScore": 88.15161064981208,
    "dropoffPoints": [
      5,
      12,
      18,
      25
    ],
    "popularSlides": [
      "slide-001",
      "slide-002",
      "slide-003"
    ]
  },
  "completionRate": 0.8280321834045751,
  "averageScore": 86.06432028616126,
  "createdAt": {
    "_seconds": 1727954941,
    "_nanoseconds": 287000000
  },
  "updatedAt": {
    "_seconds": 1752464372,
    "_nanoseconds": 959000000
  }
}
```


#### Document 5: `lesson-005`
```json
{
  "id": "lesson-005",
  "originalId": 5,
  "title": "הצפנה וקריפטוגרפיה",
  "description": "עקרונות הצפנה, אלגוריתמים קריפטוגרפיים ושימוש מעשי בהצפנה",
  "category": "encryption",
  "difficulty": "intermediate",
  "estimatedDuration": 150,
  "language": "he",
  "objectives": [
    "הבנת עקרונות ההצפנה",
    "הכרת אלגוריתמים בסיסיים",
    "יישום הצפנה בפועל"
  ],
  "prerequisites": [
    "lesson-004"
  ],
  "learningOutcomes": [
    "ידע מעמיק בהצפנה וקריפטוגרפיה",
    "כישורים מעשיים ויישומיים",
    "יכולת זיהוי ופתרון בעיות"
  ],
  "tags": [
    "encryption",
    "intermediate",
    "cybersecurity",
    "hebrew"
  ],
  "totalSlides": 30,
  "requiredSlides": 12,
  "slideTypes": {
    "presentation": 5,
    "interactive": 5,
    "quiz": 5,
    "video": 5,
    "simulation": 5,
    "exercise": 5
  },
  "isActive": true,
  "isPublished": true,
  "version": "1.0",
  "order": 5,
  "icon": "🔐",
  "analytics": {
    "totalCompletions": 242,
    "averageCompletionTime": 3647,
    "averageScore": 88.26180524649834,
    "dropoffPoints": [
      5,
      12,
      18,
      25
    ],
    "popularSlides": [
      "slide-001",
      "slide-002",
      "slide-003"
    ]
  },
  "completionRate": 0.9658860234016882,
  "averageScore": 88.55902886650779,
  "createdAt": {
    "_seconds": 1746587820,
    "_nanoseconds": 342000000
  },
  "updatedAt": {
    "_seconds": 1750172322,
    "_nanoseconds": 917000000
  }
}
```



---

## 🗂️ Collection: `login-analytics`

**Document Count**: 1

### Schema
- **students**: number
- **teachers**: number
- **modules**: number


### Sample Documents

#### Document 1: `login-analytics`
```json
{
  "students": 250,
  "teachers": 10,
  "modules": 19
}
```



---

## 🗂️ Collection: `security_logs`

**Document Count**: 500

### Schema
- **id**: string
- **eventType**: string
- **userId**: string
- **userRole**: string
- **description**: string
- **severity**: string
- **status**: string
- **sessionId**: string | null
- **ipAddress**: string
- **userAgent**: string
- **location**: string
- **metadata**: object
- **timestamp**: string
- **createdAt**: string
- **updatedAt**: string


### Sample Documents

#### Document 1: `log-1`
```json
{
  "id": "log-1",
  "eventType": "PERMISSION_DENIED",
  "userId": "manager054",
  "userRole": "system_manager",
  "description": "Access denied to restricted resource",
  "severity": "medium",
  "status": "closed",
  "sessionId": "session065",
  "ipAddress": "192.168.143.52",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124",
  "location": "Tel Aviv",
  "metadata": {
    "attemptCount": 1,
    "affectedResources": [
      "session"
    ],
    "responseTime": 802,
    "bytesSent": 9066
  },
  "timestamp": "2025-07-05T20:25:50.217Z",
  "createdAt": "2025-05-16T07:30:38.289Z",
  "updatedAt": "2025-07-17T10:34:10.269Z"
}
```


#### Document 2: `log-10`
```json
{
  "id": "log-10",
  "eventType": "TEACHER_SLOT_CREATED",
  "userId": "student074",
  "userRole": "student",
  "description": "New teacher slot created by system manager",
  "severity": "low",
  "status": "closed",
  "sessionId": "session027",
  "ipAddress": "192.168.206.34",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124",
  "location": "Beer Sheva",
  "metadata": {
    "attemptCount": 1,
    "affectedResources": [
      "users",
      "database"
    ],
    "responseTime": 247,
    "bytesSent": 7062
  },
  "timestamp": "2025-07-05T01:36:23.737Z",
  "createdAt": "2025-05-19T17:26:08.385Z",
  "updatedAt": "2025-07-17T10:34:10.269Z"
}
```


#### Document 3: `log-100`
```json
{
  "id": "log-100",
  "eventType": "SUSPICIOUS_ACTIVITY",
  "userId": "student080",
  "userRole": "student",
  "description": "Unusual user behavior detected",
  "severity": "low",
  "status": "resolved",
  "sessionId": "session097",
  "ipAddress": "192.168.8.82",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124",
  "location": "Haifa",
  "metadata": {
    "attemptCount": 1,
    "affectedResources": [
      "session"
    ],
    "responseTime": 599,
    "bytesSent": 9786
  },
  "timestamp": "2025-06-20T10:52:10.722Z",
  "createdAt": "2025-07-01T22:37:21.421Z",
  "updatedAt": "2025-07-17T10:34:10.270Z"
}
```


#### Document 4: `log-101`
```json
{
  "id": "log-101",
  "eventType": "PERMISSION_DENIED",
  "userId": "student050",
  "userRole": "student",
  "description": "Access denied to restricted resource",
  "severity": "medium",
  "status": "investigating",
  "sessionId": "session056",
  "ipAddress": "192.168.54.35",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124",
  "location": "Beer Sheva",
  "metadata": {
    "attemptCount": 1,
    "affectedResources": [
      "session"
    ],
    "responseTime": 335,
    "bytesSent": 7070
  },
  "timestamp": "2025-04-26T06:22:38.849Z",
  "createdAt": "2025-06-07T18:22:57.562Z",
  "updatedAt": "2025-07-17T10:34:10.270Z"
}
```


#### Document 5: `log-102`
```json
{
  "id": "log-102",
  "eventType": "LOGOUT",
  "userId": "teacher058",
  "userRole": "teacher",
  "description": "User logged out of the system",
  "severity": "high",
  "status": "closed",
  "sessionId": null,
  "ipAddress": "192.168.80.3",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124",
  "location": "Jerusalem",
  "metadata": {
    "attemptCount": 1,
    "affectedResources": [
      "session"
    ],
    "responseTime": 521,
    "bytesSent": 6031
  },
  "timestamp": "2025-05-10T18:09:04.209Z",
  "createdAt": "2025-05-06T21:29:48.021Z",
  "updatedAt": "2025-07-17T10:34:10.270Z"
}
```



---

## 🗂️ Collection: `sessions`

**Document Count**: 100

### Schema
- **id**: string
- **teacherId**: string
- **lessonId**: string
- **classId**: string
- **lessonName**: string
- **sessionName**: string
- **description**: string
- **studentIds**: array
- **connectedStudents**: array
- **maxStudents**: number
- **status**: string
- **currentSlide**: number
- **totalSlides**: number
- **unlockedSlides**: array
- **isLocked**: boolean
- **allowChat**: boolean
- **allowHandRaise**: boolean
- **recordSession**: boolean
- **startTime**: string
- **endTime**: string | null
- **lastActivity**: string
- **estimatedDuration**: number
- **actualDuration**: number | null
- **chatMessages**: array
- **raisedHands**: array
- **studentProgress**: object
- **teacherNotes**: object
- **analytics**: object
- **version**: string
- **platform**: string
- **userAgent**: string
- **createdAt**: string
- **updatedAt**: string


### Sample Documents

#### Document 1: `session001`
```json
{
  "id": "session001",
  "teacherId": "teacher02",
  "lessonId": "lesson002",
  "classId": "class10",
  "lessonName": "אבטחת מידע וסייבר",
  "sessionName": "אבטחת מידע וסייבר - Session 1",
  "description": "Live session for אבטחת מידע וסייבר",
  "studentIds": [
    "student072",
    "student204",
    "student142",
    "student083",
    "student191",
    "student110",
    "student119",
    "student021",
    "student056",
    "student217",
    "student131",
    "student242",
    "student002",
    "student236",
    "student117",
    "student016",
    "student240",
    "student080",
    "student125"
  ],
  "connectedStudents": [],
  "maxStudents": 30,
  "status": "completed",
  "currentSlide": 22,
  "totalSlides": 22,
  "unlockedSlides": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21
  ],
  "isLocked": false,
  "allowChat": true,
  "allowHandRaise": true,
  "recordSession": true,
  "startTime": "2025-05-30T11:46:50.545Z",
  "endTime": "2025-05-30T12:23:05.372Z",
  "lastActivity": "2025-07-17T09:53:20.653Z",
  "estimatedDuration": 88,
  "actualDuration": 2174,
  "chatMessages": [
    {
      "id": "msg-0",
      "sender": "student117",
      "senderName": "Student 4",
      "message": "יש לי שאלה",
      "timestamp": "2025-07-12T06:16:19.666Z",
      "type": "teacher"
    },
    {
      "id": "msg-1",
      "sender": "teacher02",
      "senderName": "Student 18",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-06T09:58:24.533Z",
      "type": "student"
    },
    {
      "id": "msg-2",
      "sender": "teacher02",
      "senderName": "Student 2",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-06-29T11:10:29.576Z",
      "type": "student"
    },
    {
      "id": "msg-3",
      "sender": "teacher02",
      "senderName": "Student 19",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-03T11:08:35.915Z",
      "type": "student"
    },
    {
      "id": "msg-4",
      "sender": "teacher02",
      "senderName": "Teacher 02",
      "message": "יש לי שאלה",
      "timestamp": "2025-07-13T13:20:54.913Z",
      "type": "student"
    },
    {
      "id": "msg-5",
      "sender": "student002",
      "senderName": "Student 18",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-11T12:41:12.181Z",
      "type": "student"
    },
    {
      "id": "msg-6",
      "sender": "teacher02",
      "senderName": "Teacher 02",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-06-29T18:37:01.670Z",
      "type": "student"
    },
    {
      "id": "msg-7",
      "sender": "student191",
      "senderName": "Student 8",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-06-21T23:38:04.940Z",
      "type": "student"
    },
    {
      "id": "msg-8",
      "sender": "student016",
      "senderName": "Student 1",
      "message": "יש לי שאלה",
      "timestamp": "2025-07-06T18:54:39.728Z",
      "type": "student"
    }
  ],
  "raisedHands": [],
  "studentProgress": {
    "student072": {
      "joinedAt": "2025-05-30T12:04:35.369Z",
      "lastActivity": "2025-07-17T10:07:15.147Z",
      "currentSlide": 3,
      "completedSlides": 11,
      "timeSpent": 6705,
      "questionsAnswered": 6,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student204": {
      "joinedAt": "2025-05-30T12:12:07.874Z",
      "lastActivity": "2025-07-17T10:12:15.523Z",
      "currentSlide": 16,
      "completedSlides": 5,
      "timeSpent": 5084,
      "questionsAnswered": 5,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student142": {
      "joinedAt": "2025-05-30T12:07:08.814Z",
      "lastActivity": "2025-07-17T10:32:09.396Z",
      "currentSlide": 13,
      "completedSlides": 2,
      "timeSpent": 5323,
      "questionsAnswered": 9,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student083": {
      "joinedAt": "2025-05-30T11:56:15.703Z",
      "lastActivity": "2025-07-17T10:17:38.525Z",
      "currentSlide": 16,
      "completedSlides": 5,
      "timeSpent": 159,
      "questionsAnswered": 7,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": false
    },
    "student191": {
      "joinedAt": "2025-05-30T11:47:54.385Z",
      "lastActivity": "2025-07-17T10:13:01.477Z",
      "currentSlide": 9,
      "completedSlides": 9,
      "timeSpent": 4812,
      "questionsAnswered": 5,
      "correctAnswers": 6,
      "handRaised": false,
      "isConnected": false
    },
    "student110": {
      "joinedAt": "2025-05-30T12:05:40.770Z",
      "lastActivity": "2025-07-17T09:41:48.589Z",
      "currentSlide": 9,
      "completedSlides": 5,
      "timeSpent": 4732,
      "questionsAnswered": 8,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student119": {
      "joinedAt": "2025-05-30T11:51:00.933Z",
      "lastActivity": "2025-07-17T10:17:33.294Z",
      "currentSlide": 2,
      "completedSlides": 10,
      "timeSpent": 6942,
      "questionsAnswered": 7,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student021": {
      "joinedAt": "2025-05-30T11:57:02.323Z",
      "lastActivity": "2025-07-17T10:00:07.205Z",
      "currentSlide": 11,
      "completedSlides": 4,
      "timeSpent": 2208,
      "questionsAnswered": 6,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": false
    },
    "student056": {
      "joinedAt": "2025-05-30T12:12:06.881Z",
      "lastActivity": "2025-07-17T10:23:35.789Z",
      "currentSlide": 10,
      "completedSlides": 0,
      "timeSpent": 2123,
      "questionsAnswered": 5,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    },
    "student217": {
      "joinedAt": "2025-05-30T11:58:10.710Z",
      "lastActivity": "2025-07-17T10:08:40.101Z",
      "currentSlide": 8,
      "completedSlides": 8,
      "timeSpent": 7127,
      "questionsAnswered": 8,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student131": {
      "joinedAt": "2025-05-30T12:02:44.182Z",
      "lastActivity": "2025-07-17T09:54:26.269Z",
      "currentSlide": 5,
      "completedSlides": 9,
      "timeSpent": 504,
      "questionsAnswered": 8,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": false
    },
    "student242": {
      "joinedAt": "2025-05-30T11:47:51.201Z",
      "lastActivity": "2025-07-17T09:47:53.106Z",
      "currentSlide": 16,
      "completedSlides": 14,
      "timeSpent": 2252,
      "questionsAnswered": 2,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    },
    "student002": {
      "joinedAt": "2025-05-30T12:06:15.047Z",
      "lastActivity": "2025-07-17T09:49:29.260Z",
      "currentSlide": 11,
      "completedSlides": 0,
      "timeSpent": 3234,
      "questionsAnswered": 1,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student236": {
      "joinedAt": "2025-05-30T12:04:40.733Z",
      "lastActivity": "2025-07-17T10:21:28.258Z",
      "currentSlide": 20,
      "completedSlides": 10,
      "timeSpent": 4678,
      "questionsAnswered": 9,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student117": {
      "joinedAt": "2025-05-30T11:47:09.728Z",
      "lastActivity": "2025-07-17T10:08:19.048Z",
      "currentSlide": 0,
      "completedSlides": 14,
      "timeSpent": 3398,
      "questionsAnswered": 5,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student016": {
      "joinedAt": "2025-05-30T11:56:49.470Z",
      "lastActivity": "2025-07-17T10:06:47.968Z",
      "currentSlide": 9,
      "completedSlides": 6,
      "timeSpent": 361,
      "questionsAnswered": 6,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student240": {
      "joinedAt": "2025-05-30T11:56:00.376Z",
      "lastActivity": "2025-07-17T10:07:48.700Z",
      "currentSlide": 3,
      "completedSlides": 6,
      "timeSpent": 3430,
      "questionsAnswered": 3,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student080": {
      "joinedAt": "2025-05-30T11:59:15.847Z",
      "lastActivity": "2025-07-17T10:05:07.939Z",
      "currentSlide": 0,
      "completedSlides": 2,
      "timeSpent": 6150,
      "questionsAnswered": 8,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student125": {
      "joinedAt": "2025-05-30T12:10:37.094Z",
      "lastActivity": "2025-07-17T10:15:53.837Z",
      "currentSlide": 10,
      "completedSlides": 10,
      "timeSpent": 6929,
      "questionsAnswered": 1,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": false
    }
  },
  "teacherNotes": {
    "general": "Session notes for אבטחת מידע וסייבר",
    "slideNotes": {
      "1": "Good engagement from students",
      "5": "Need to spend more time on this concept",
      "10": "Excellent participation in interactive exercise"
    },
    "studentNotes": {
      "student072": "Student showing good progress",
      "student204": "Student showing good progress",
      "student142": "Student showing good progress"
    }
  },
  "analytics": {
    "attendanceCount": 19,
    "averageEngagement": 0.6622380522112324,
    "completionRate": 0.695107539677091,
    "averageSlideTime": 102,
    "chatActivity": 11,
    "handRaiseCount": 3,
    "technicalIssues": 1,
    "satisfactionScore": 8.724787077218185
  },
  "version": "1.0",
  "platform": "web",
  "userAgent": "Mozilla/5.0 Chrome/91.0",
  "createdAt": "2025-05-30T11:46:50.545Z",
  "updatedAt": "2025-07-17T10:34:10.250Z"
}
```


#### Document 2: `session002`
```json
{
  "id": "session002",
  "teacherId": "teacher07",
  "lessonId": "lesson005",
  "classId": "class06",
  "lessonName": "מלכודות ברשת ופריצות",
  "sessionName": "מלכודות ברשת ופריצות - Session 2",
  "description": "Live session for מלכודות ברשת ופריצות",
  "studentIds": [
    "student084",
    "student049",
    "student122",
    "student182",
    "student218",
    "student145",
    "student050",
    "student208",
    "student036",
    "student043",
    "student096"
  ],
  "connectedStudents": [],
  "maxStudents": 30,
  "status": "completed",
  "currentSlide": 32,
  "totalSlides": 32,
  "unlockedSlides": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ],
  "isLocked": false,
  "allowChat": true,
  "allowHandRaise": true,
  "recordSession": true,
  "startTime": "2025-05-29T15:41:47.384Z",
  "endTime": "2025-05-29T16:59:32.091Z",
  "lastActivity": "2025-07-17T09:39:50.811Z",
  "estimatedDuration": 128,
  "actualDuration": 4664,
  "chatMessages": [
    {
      "id": "msg-0",
      "sender": "teacher07",
      "senderName": "Student 7",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-04T07:11:01.101Z",
      "type": "teacher"
    },
    {
      "id": "msg-1",
      "sender": "student182",
      "senderName": "Student 1",
      "message": "יש לי שאלה",
      "timestamp": "2025-05-30T09:25:03.610Z",
      "type": "teacher"
    },
    {
      "id": "msg-2",
      "sender": "teacher07",
      "senderName": "Student 8",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-10T16:46:54.939Z",
      "type": "student"
    },
    {
      "id": "msg-3",
      "sender": "student050",
      "senderName": "Student 5",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-06-27T12:54:59.906Z",
      "type": "teacher"
    },
    {
      "id": "msg-4",
      "sender": "student218",
      "senderName": "Student 9",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-14T09:40:52.204Z",
      "type": "teacher"
    },
    {
      "id": "msg-5",
      "sender": "student036",
      "senderName": "Teacher 07",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-06-12T20:15:19.068Z",
      "type": "teacher"
    },
    {
      "id": "msg-6",
      "sender": "student036",
      "senderName": "Teacher 07",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-05T22:37:53.997Z",
      "type": "student"
    },
    {
      "id": "msg-7",
      "sender": "student096",
      "senderName": "Student 11",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-13T00:14:59.025Z",
      "type": "teacher"
    },
    {
      "id": "msg-8",
      "sender": "teacher07",
      "senderName": "Student 8",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-06-15T20:56:30.017Z",
      "type": "student"
    },
    {
      "id": "msg-9",
      "sender": "student050",
      "senderName": "Student 11",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-03T20:20:22.991Z",
      "type": "student"
    },
    {
      "id": "msg-10",
      "sender": "student043",
      "senderName": "Student 11",
      "message": "תודה על ההסבר",
      "timestamp": "2025-06-15T05:33:51.708Z",
      "type": "student"
    },
    {
      "id": "msg-11",
      "sender": "student145",
      "senderName": "Student 4",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-06-18T11:59:16.388Z",
      "type": "teacher"
    },
    {
      "id": "msg-12",
      "sender": "teacher07",
      "senderName": "Student 2",
      "message": "יש לי שאלה",
      "timestamp": "2025-06-04T21:20:28.694Z",
      "type": "student"
    },
    {
      "id": "msg-13",
      "sender": "teacher07",
      "senderName": "Teacher 07",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-14T06:34:13.041Z",
      "type": "student"
    },
    {
      "id": "msg-14",
      "sender": "student218",
      "senderName": "Student 11",
      "message": "תודה על ההסבר",
      "timestamp": "2025-05-31T17:05:12.478Z",
      "type": "student"
    },
    {
      "id": "msg-15",
      "sender": "student122",
      "senderName": "Teacher 07",
      "message": "יש לי שאלה",
      "timestamp": "2025-06-19T20:07:51.137Z",
      "type": "student"
    },
    {
      "id": "msg-16",
      "sender": "student208",
      "senderName": "Student 6",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-06-15T16:35:48.529Z",
      "type": "student"
    },
    {
      "id": "msg-17",
      "sender": "student218",
      "senderName": "Student 11",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-06-14T18:19:59.238Z",
      "type": "student"
    },
    {
      "id": "msg-18",
      "sender": "teacher07",
      "senderName": "Student 2",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-05T08:29:22.433Z",
      "type": "student"
    },
    {
      "id": "msg-19",
      "sender": "student218",
      "senderName": "Student 6",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-06-02T07:45:50.518Z",
      "type": "student"
    },
    {
      "id": "msg-20",
      "sender": "teacher07",
      "senderName": "Student 6",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-06-22T15:09:44.527Z",
      "type": "student"
    },
    {
      "id": "msg-21",
      "sender": "student049",
      "senderName": "Student 10",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-06-28T14:47:58.952Z",
      "type": "student"
    },
    {
      "id": "msg-22",
      "sender": "student043",
      "senderName": "Teacher 07",
      "message": "תודה על ההסבר",
      "timestamp": "2025-06-04T08:57:18.271Z",
      "type": "student"
    },
    {
      "id": "msg-23",
      "sender": "student050",
      "senderName": "Student 6",
      "message": "תודה על ההסבר",
      "timestamp": "2025-06-11T12:12:31.578Z",
      "type": "student"
    },
    {
      "id": "msg-24",
      "sender": "student050",
      "senderName": "Student 6",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-06-03T21:44:18.770Z",
      "type": "student"
    },
    {
      "id": "msg-25",
      "sender": "teacher07",
      "senderName": "Teacher 07",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-06-14T16:13:13.051Z",
      "type": "student"
    },
    {
      "id": "msg-26",
      "sender": "teacher07",
      "senderName": "Student 5",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-06-27T18:09:41.235Z",
      "type": "student"
    },
    {
      "id": "msg-27",
      "sender": "student218",
      "senderName": "Student 4",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-07T01:48:32.632Z",
      "type": "student"
    },
    {
      "id": "msg-28",
      "sender": "teacher07",
      "senderName": "Teacher 07",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-06-06T10:22:44.427Z",
      "type": "teacher"
    },
    {
      "id": "msg-29",
      "sender": "student049",
      "senderName": "Student 9",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-15T00:11:19.858Z",
      "type": "student"
    },
    {
      "id": "msg-30",
      "sender": "student036",
      "senderName": "Student 9",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-06-29T22:23:23.113Z",
      "type": "student"
    },
    {
      "id": "msg-31",
      "sender": "student050",
      "senderName": "Student 8",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-11T05:02:04.029Z",
      "type": "student"
    },
    {
      "id": "msg-32",
      "sender": "student043",
      "senderName": "Student 7",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-06-15T20:14:00.355Z",
      "type": "student"
    },
    {
      "id": "msg-33",
      "sender": "student122",
      "senderName": "Teacher 07",
      "message": "תודה על ההסבר",
      "timestamp": "2025-06-21T12:03:43.865Z",
      "type": "student"
    },
    {
      "id": "msg-34",
      "sender": "teacher07",
      "senderName": "Teacher 07",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-09T00:08:10.241Z",
      "type": "teacher"
    },
    {
      "id": "msg-35",
      "sender": "student096",
      "senderName": "Student 6",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-12T23:14:14.339Z",
      "type": "teacher"
    },
    {
      "id": "msg-36",
      "sender": "student036",
      "senderName": "Teacher 07",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-15T04:06:51.924Z",
      "type": "student"
    },
    {
      "id": "msg-37",
      "sender": "student218",
      "senderName": "Student 1",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-06-10T09:36:34.913Z",
      "type": "student"
    }
  ],
  "raisedHands": [],
  "studentProgress": {
    "student084": {
      "joinedAt": "2025-05-29T15:43:05.624Z",
      "lastActivity": "2025-07-17T10:04:38.644Z",
      "currentSlide": 1,
      "completedSlides": 13,
      "timeSpent": 2435,
      "questionsAnswered": 6,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student049": {
      "joinedAt": "2025-05-29T16:00:29.270Z",
      "lastActivity": "2025-07-17T10:01:53.128Z",
      "currentSlide": 2,
      "completedSlides": 14,
      "timeSpent": 6376,
      "questionsAnswered": 0,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student122": {
      "joinedAt": "2025-05-29T15:56:00.943Z",
      "lastActivity": "2025-07-17T10:17:09.439Z",
      "currentSlide": 16,
      "completedSlides": 12,
      "timeSpent": 2237,
      "questionsAnswered": 9,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student182": {
      "joinedAt": "2025-05-29T15:42:47.506Z",
      "lastActivity": "2025-07-17T10:23:01.265Z",
      "currentSlide": 8,
      "completedSlides": 2,
      "timeSpent": 3229,
      "questionsAnswered": 8,
      "correctAnswers": 6,
      "handRaised": false,
      "isConnected": false
    },
    "student218": {
      "joinedAt": "2025-05-29T15:55:08.517Z",
      "lastActivity": "2025-07-17T09:56:15.731Z",
      "currentSlide": 10,
      "completedSlides": 12,
      "timeSpent": 2930,
      "questionsAnswered": 5,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    },
    "student145": {
      "joinedAt": "2025-05-29T15:54:19.569Z",
      "lastActivity": "2025-07-17T09:55:30.440Z",
      "currentSlide": 17,
      "completedSlides": 1,
      "timeSpent": 2836,
      "questionsAnswered": 8,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student050": {
      "joinedAt": "2025-05-29T15:51:14.543Z",
      "lastActivity": "2025-07-17T09:36:04.662Z",
      "currentSlide": 18,
      "completedSlides": 6,
      "timeSpent": 1099,
      "questionsAnswered": 6,
      "correctAnswers": 7,
      "handRaised": false,
      "isConnected": false
    },
    "student208": {
      "joinedAt": "2025-05-29T16:07:47.516Z",
      "lastActivity": "2025-07-17T09:41:56.659Z",
      "currentSlide": 23,
      "completedSlides": 3,
      "timeSpent": 4012,
      "questionsAnswered": 2,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student036": {
      "joinedAt": "2025-05-29T15:55:39.027Z",
      "lastActivity": "2025-07-17T10:12:16.110Z",
      "currentSlide": 15,
      "completedSlides": 14,
      "timeSpent": 6632,
      "questionsAnswered": 8,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student043": {
      "joinedAt": "2025-05-29T16:07:08.857Z",
      "lastActivity": "2025-07-17T10:30:57.184Z",
      "currentSlide": 29,
      "completedSlides": 13,
      "timeSpent": 7017,
      "questionsAnswered": 2,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student096": {
      "joinedAt": "2025-05-29T16:05:04.618Z",
      "lastActivity": "2025-07-17T10:16:32.140Z",
      "currentSlide": 11,
      "completedSlides": 3,
      "timeSpent": 2296,
      "questionsAnswered": 9,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    }
  },
  "teacherNotes": {
    "general": "Session notes for מלכודות ברשת ופריצות",
    "slideNotes": {
      "1": "Good engagement from students",
      "5": "Need to spend more time on this concept",
      "10": "Excellent participation in interactive exercise"
    },
    "studentNotes": {
      "student084": "Student showing good progress",
      "student049": "Student showing good progress",
      "student122": "Student showing good progress"
    }
  },
  "analytics": {
    "attendanceCount": 11,
    "averageEngagement": 0.7695906024957281,
    "completionRate": 0.6943852150207387,
    "averageSlideTime": 201,
    "chatActivity": 13,
    "handRaiseCount": 4,
    "technicalIssues": 0,
    "satisfactionScore": 9.807839091603013
  },
  "version": "1.0",
  "platform": "web",
  "userAgent": "Mozilla/5.0 Chrome/91.0",
  "createdAt": "2025-05-29T15:41:47.384Z",
  "updatedAt": "2025-07-17T10:34:10.250Z"
}
```


#### Document 3: `session003`
```json
{
  "id": "session003",
  "teacherId": "teacher02",
  "lessonId": "lesson011",
  "classId": "class06",
  "lessonName": "אבטחת רשתות אלחוטיות",
  "sessionName": "אבטחת רשתות אלחוטיות - Session 3",
  "description": "Live session for אבטחת רשתות אלחוטיות",
  "studentIds": [
    "student182",
    "student234",
    "student108",
    "student199",
    "student070",
    "student147",
    "student019",
    "student212",
    "student059",
    "student139",
    "student172",
    "student114",
    "student172",
    "student049",
    "student171"
  ],
  "connectedStudents": [],
  "maxStudents": 30,
  "status": "completed",
  "currentSlide": 30,
  "totalSlides": 30,
  "unlockedSlides": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29
  ],
  "isLocked": false,
  "allowChat": true,
  "allowHandRaise": true,
  "recordSession": true,
  "startTime": "2025-07-04T11:53:19.758Z",
  "endTime": "2025-07-04T13:41:02.084Z",
  "lastActivity": "2025-07-17T09:39:18.933Z",
  "estimatedDuration": 120,
  "actualDuration": 6462,
  "chatMessages": [
    {
      "id": "msg-0",
      "sender": "student049",
      "senderName": "Teacher 02",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-14T01:29:11.975Z",
      "type": "student"
    },
    {
      "id": "msg-1",
      "sender": "student114",
      "senderName": "Student 7",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-13T01:39:18.108Z",
      "type": "student"
    },
    {
      "id": "msg-2",
      "sender": "student070",
      "senderName": "Teacher 02",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-15T23:31:08.069Z",
      "type": "student"
    },
    {
      "id": "msg-3",
      "sender": "teacher02",
      "senderName": "Student 7",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-15T14:06:43.921Z",
      "type": "student"
    },
    {
      "id": "msg-4",
      "sender": "teacher02",
      "senderName": "Student 6",
      "message": "יש לי שאלה",
      "timestamp": "2025-07-16T15:24:38.679Z",
      "type": "student"
    },
    {
      "id": "msg-5",
      "sender": "student139",
      "senderName": "Student 15",
      "message": "תודה על ההסבר",
      "timestamp": "2025-07-12T20:06:45.190Z",
      "type": "student"
    },
    {
      "id": "msg-6",
      "sender": "teacher02",
      "senderName": "Teacher 02",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-09T03:29:15.024Z",
      "type": "teacher"
    },
    {
      "id": "msg-7",
      "sender": "student234",
      "senderName": "Student 10",
      "message": "תודה על ההסבר",
      "timestamp": "2025-07-16T07:22:36.481Z",
      "type": "teacher"
    },
    {
      "id": "msg-8",
      "sender": "teacher02",
      "senderName": "Student 8",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-07T04:43:51.979Z",
      "type": "student"
    },
    {
      "id": "msg-9",
      "sender": "student234",
      "senderName": "Teacher 02",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-07T21:16:05.261Z",
      "type": "teacher"
    },
    {
      "id": "msg-10",
      "sender": "student139",
      "senderName": "Student 15",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-05T11:48:38.065Z",
      "type": "student"
    },
    {
      "id": "msg-11",
      "sender": "teacher02",
      "senderName": "Student 5",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-06T08:25:23.093Z",
      "type": "student"
    },
    {
      "id": "msg-12",
      "sender": "student019",
      "senderName": "Teacher 02",
      "message": "תודה על ההסבר",
      "timestamp": "2025-07-13T23:27:28.075Z",
      "type": "student"
    },
    {
      "id": "msg-13",
      "sender": "student182",
      "senderName": "Student 1",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-04T15:01:33.344Z",
      "type": "student"
    },
    {
      "id": "msg-14",
      "sender": "teacher02",
      "senderName": "Teacher 02",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-15T00:55:29.326Z",
      "type": "teacher"
    },
    {
      "id": "msg-15",
      "sender": "teacher02",
      "senderName": "Teacher 02",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-17T06:53:02.478Z",
      "type": "student"
    },
    {
      "id": "msg-16",
      "sender": "student182",
      "senderName": "Student 1",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-15T15:14:11.629Z",
      "type": "student"
    },
    {
      "id": "msg-17",
      "sender": "student059",
      "senderName": "Teacher 02",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-11T03:46:56.519Z",
      "type": "student"
    },
    {
      "id": "msg-18",
      "sender": "student147",
      "senderName": "Student 15",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-07T18:38:51.883Z",
      "type": "student"
    },
    {
      "id": "msg-19",
      "sender": "student108",
      "senderName": "Teacher 02",
      "message": "יש לי שאלה",
      "timestamp": "2025-07-08T09:26:29.690Z",
      "type": "student"
    }
  ],
  "raisedHands": [],
  "studentProgress": {
    "student182": {
      "joinedAt": "2025-07-04T12:04:01.203Z",
      "lastActivity": "2025-07-17T10:22:37.176Z",
      "currentSlide": 29,
      "completedSlides": 4,
      "timeSpent": 1303,
      "questionsAnswered": 7,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student234": {
      "joinedAt": "2025-07-04T12:12:54.422Z",
      "lastActivity": "2025-07-17T10:31:04.162Z",
      "currentSlide": 6,
      "completedSlides": 14,
      "timeSpent": 2426,
      "questionsAnswered": 6,
      "correctAnswers": 7,
      "handRaised": false,
      "isConnected": false
    },
    "student108": {
      "joinedAt": "2025-07-04T12:21:29.653Z",
      "lastActivity": "2025-07-17T10:06:44.559Z",
      "currentSlide": 21,
      "completedSlides": 9,
      "timeSpent": 5386,
      "questionsAnswered": 2,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student199": {
      "joinedAt": "2025-07-04T12:10:48.834Z",
      "lastActivity": "2025-07-17T09:52:12.195Z",
      "currentSlide": 1,
      "completedSlides": 5,
      "timeSpent": 1612,
      "questionsAnswered": 3,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    },
    "student070": {
      "joinedAt": "2025-07-04T12:21:21.063Z",
      "lastActivity": "2025-07-17T10:31:45.217Z",
      "currentSlide": 2,
      "completedSlides": 2,
      "timeSpent": 6034,
      "questionsAnswered": 7,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    },
    "student147": {
      "joinedAt": "2025-07-04T11:54:41.136Z",
      "lastActivity": "2025-07-17T10:16:33.093Z",
      "currentSlide": 20,
      "completedSlides": 7,
      "timeSpent": 6400,
      "questionsAnswered": 4,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": false
    },
    "student019": {
      "joinedAt": "2025-07-04T12:09:25.615Z",
      "lastActivity": "2025-07-17T10:00:02.076Z",
      "currentSlide": 20,
      "completedSlides": 6,
      "timeSpent": 2002,
      "questionsAnswered": 0,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    },
    "student212": {
      "joinedAt": "2025-07-04T12:04:44.806Z",
      "lastActivity": "2025-07-17T10:20:00.388Z",
      "currentSlide": 20,
      "completedSlides": 6,
      "timeSpent": 2517,
      "questionsAnswered": 3,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student059": {
      "joinedAt": "2025-07-04T12:04:26.417Z",
      "lastActivity": "2025-07-17T10:23:28.382Z",
      "currentSlide": 10,
      "completedSlides": 13,
      "timeSpent": 5706,
      "questionsAnswered": 6,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student139": {
      "joinedAt": "2025-07-04T12:17:10.396Z",
      "lastActivity": "2025-07-17T10:01:16.574Z",
      "currentSlide": 23,
      "completedSlides": 9,
      "timeSpent": 2050,
      "questionsAnswered": 4,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": false
    },
    "student172": {
      "joinedAt": "2025-07-04T12:16:49.205Z",
      "lastActivity": "2025-07-17T09:47:53.857Z",
      "currentSlide": 16,
      "completedSlides": 5,
      "timeSpent": 4022,
      "questionsAnswered": 7,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": false
    },
    "student114": {
      "joinedAt": "2025-07-04T11:54:56.478Z",
      "lastActivity": "2025-07-17T09:46:43.007Z",
      "currentSlide": 1,
      "completedSlides": 10,
      "timeSpent": 4396,
      "questionsAnswered": 1,
      "correctAnswers": 6,
      "handRaised": false,
      "isConnected": false
    },
    "student049": {
      "joinedAt": "2025-07-04T12:04:50.519Z",
      "lastActivity": "2025-07-17T10:12:54.914Z",
      "currentSlide": 24,
      "completedSlides": 9,
      "timeSpent": 205,
      "questionsAnswered": 6,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student171": {
      "joinedAt": "2025-07-04T12:09:54.326Z",
      "lastActivity": "2025-07-17T09:43:22.333Z",
      "currentSlide": 9,
      "completedSlides": 3,
      "timeSpent": 3627,
      "questionsAnswered": 2,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    }
  },
  "teacherNotes": {
    "general": "Session notes for אבטחת רשתות אלחוטיות",
    "slideNotes": {
      "1": "Good engagement from students",
      "5": "Need to spend more time on this concept",
      "10": "Excellent participation in interactive exercise"
    },
    "studentNotes": {
      "student182": "Student showing good progress",
      "student234": "Student showing good progress",
      "student108": "Student showing good progress"
    }
  },
  "analytics": {
    "attendanceCount": 15,
    "averageEngagement": 0.9835389959039496,
    "completionRate": 0.6712260645476095,
    "averageSlideTime": 127,
    "chatActivity": 37,
    "handRaiseCount": 4,
    "technicalIssues": 0,
    "satisfactionScore": 9.912144138209966
  },
  "version": "1.0",
  "platform": "web",
  "userAgent": "Mozilla/5.0 Chrome/91.0",
  "createdAt": "2025-07-04T11:53:19.758Z",
  "updatedAt": "2025-07-17T10:34:10.251Z"
}
```


#### Document 4: `session004`
```json
{
  "id": "session004",
  "teacherId": "teacher10",
  "lessonId": "lesson012",
  "classId": "class08",
  "lessonName": "הגנה על פרטיות",
  "sessionName": "הגנה על פרטיות - Session 4",
  "description": "Live session for הגנה על פרטיות",
  "studentIds": [
    "student010",
    "student103",
    "student067",
    "student050",
    "student204",
    "student212",
    "student188",
    "student230",
    "student118",
    "student136",
    "student052",
    "student146",
    "student051",
    "student152"
  ],
  "connectedStudents": [
    "student010",
    "student103",
    "student067",
    "student050",
    "student204",
    "student212",
    "student188",
    "student230",
    "student118",
    "student136",
    "student052"
  ],
  "maxStudents": 30,
  "status": "active",
  "currentSlide": 5,
  "totalSlides": 28,
  "unlockedSlides": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ],
  "isLocked": false,
  "allowChat": true,
  "allowHandRaise": true,
  "recordSession": true,
  "startTime": "2025-07-14T15:19:25.801Z",
  "endTime": null,
  "lastActivity": "2025-07-17T10:05:40.080Z",
  "estimatedDuration": 112,
  "actualDuration": null,
  "chatMessages": [
    {
      "id": "msg-0",
      "sender": "student136",
      "senderName": "Student 10",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-15T11:08:39.631Z",
      "type": "student"
    }
  ],
  "raisedHands": [],
  "studentProgress": {
    "student010": {
      "joinedAt": "2025-07-14T15:46:37.111Z",
      "lastActivity": "2025-07-17T10:03:44.935Z",
      "currentSlide": 3,
      "completedSlides": 4,
      "timeSpent": 5405,
      "questionsAnswered": 6,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": true
    },
    "student103": {
      "joinedAt": "2025-07-14T15:37:51.788Z",
      "lastActivity": "2025-07-17T10:09:52.845Z",
      "currentSlide": 3,
      "completedSlides": 4,
      "timeSpent": 5278,
      "questionsAnswered": 7,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": true
    },
    "student067": {
      "joinedAt": "2025-07-14T15:26:26.585Z",
      "lastActivity": "2025-07-17T10:08:45.087Z",
      "currentSlide": 1,
      "completedSlides": 1,
      "timeSpent": 863,
      "questionsAnswered": 1,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": true
    },
    "student050": {
      "joinedAt": "2025-07-14T15:42:25.072Z",
      "lastActivity": "2025-07-17T09:38:07.251Z",
      "currentSlide": 0,
      "completedSlides": 0,
      "timeSpent": 4423,
      "questionsAnswered": 8,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": true
    },
    "student204": {
      "joinedAt": "2025-07-14T15:27:30.794Z",
      "lastActivity": "2025-07-17T09:45:50.039Z",
      "currentSlide": 5,
      "completedSlides": 0,
      "timeSpent": 5609,
      "questionsAnswered": 3,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": true
    },
    "student212": {
      "joinedAt": "2025-07-14T15:20:59.639Z",
      "lastActivity": "2025-07-17T10:28:48.111Z",
      "currentSlide": 1,
      "completedSlides": 9,
      "timeSpent": 2519,
      "questionsAnswered": 2,
      "correctAnswers": 6,
      "handRaised": false,
      "isConnected": true
    },
    "student188": {
      "joinedAt": "2025-07-14T15:45:14.757Z",
      "lastActivity": "2025-07-17T10:07:39.775Z",
      "currentSlide": 3,
      "completedSlides": 2,
      "timeSpent": 5356,
      "questionsAnswered": 5,
      "correctAnswers": 6,
      "handRaised": false,
      "isConnected": true
    },
    "student230": {
      "joinedAt": "2025-07-14T15:20:51.953Z",
      "lastActivity": "2025-07-17T10:03:21.715Z",
      "currentSlide": 2,
      "completedSlides": 9,
      "timeSpent": 624,
      "questionsAnswered": 6,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": true
    },
    "student118": {
      "joinedAt": "2025-07-14T15:37:04.596Z",
      "lastActivity": "2025-07-17T10:24:56.758Z",
      "currentSlide": 0,
      "completedSlides": 13,
      "timeSpent": 3935,
      "questionsAnswered": 1,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": true
    },
    "student136": {
      "joinedAt": "2025-07-14T15:25:52.696Z",
      "lastActivity": "2025-07-17T09:38:47.938Z",
      "currentSlide": 4,
      "completedSlides": 11,
      "timeSpent": 1739,
      "questionsAnswered": 0,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": true
    },
    "student052": {
      "joinedAt": "2025-07-14T15:30:55.207Z",
      "lastActivity": "2025-07-17T09:49:00.145Z",
      "currentSlide": 5,
      "completedSlides": 3,
      "timeSpent": 4687,
      "questionsAnswered": 9,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": true
    },
    "student146": {
      "joinedAt": "2025-07-14T15:33:46.830Z",
      "lastActivity": "2025-07-17T09:35:59.659Z",
      "currentSlide": 5,
      "completedSlides": 2,
      "timeSpent": 3924,
      "questionsAnswered": 0,
      "correctAnswers": 5,
      "handRaised": false,
      "isConnected": true
    },
    "student051": {
      "joinedAt": "2025-07-14T15:20:17.418Z",
      "lastActivity": "2025-07-17T09:44:33.079Z",
      "currentSlide": 3,
      "completedSlides": 5,
      "timeSpent": 1059,
      "questionsAnswered": 2,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": true
    },
    "student152": {
      "joinedAt": "2025-07-14T15:33:05.787Z",
      "lastActivity": "2025-07-17T10:07:25.779Z",
      "currentSlide": 2,
      "completedSlides": 8,
      "timeSpent": 7161,
      "questionsAnswered": 7,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": true
    }
  },
  "teacherNotes": {
    "general": "Session notes for הגנה על פרטיות",
    "slideNotes": {
      "1": "Good engagement from students",
      "5": "Need to spend more time on this concept",
      "10": "Excellent participation in interactive exercise"
    },
    "studentNotes": {
      "student010": "Student showing good progress",
      "student103": "Student showing good progress",
      "student067": "Student showing good progress"
    }
  },
  "analytics": {
    "attendanceCount": 14,
    "averageEngagement": 0.6338384370496963,
    "completionRate": 0.545828604945997,
    "averageSlideTime": 232,
    "chatActivity": 47,
    "handRaiseCount": 3,
    "technicalIssues": 2,
    "satisfactionScore": 8.833355329864773
  },
  "version": "1.0",
  "platform": "web",
  "userAgent": "Mozilla/5.0 Chrome/91.0",
  "createdAt": "2025-07-14T15:19:25.801Z",
  "updatedAt": "2025-07-17T10:34:10.251Z"
}
```


#### Document 5: `session005`
```json
{
  "id": "session005",
  "teacherId": "teacher10",
  "lessonId": "lesson014",
  "classId": "class02",
  "lessonName": "הנדסה חברתית",
  "sessionName": "הנדסה חברתית - Session 5",
  "description": "Live session for הנדסה חברתית",
  "studentIds": [
    "student093",
    "student215",
    "student099",
    "student036",
    "student137",
    "student236",
    "student124",
    "student117",
    "student024",
    "student097",
    "student234",
    "student017",
    "student233",
    "student124",
    "student064",
    "student179",
    "student212",
    "student036",
    "student146",
    "student222",
    "student235",
    "student090"
  ],
  "connectedStudents": [],
  "maxStudents": 30,
  "status": "completed",
  "currentSlide": 30,
  "totalSlides": 30,
  "unlockedSlides": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29
  ],
  "isLocked": false,
  "allowChat": true,
  "allowHandRaise": true,
  "recordSession": false,
  "startTime": "2025-07-11T18:30:28.438Z",
  "endTime": "2025-07-11T19:12:57.828Z",
  "lastActivity": "2025-07-17T09:36:06.635Z",
  "estimatedDuration": 120,
  "actualDuration": 2549,
  "chatMessages": [
    {
      "id": "msg-0",
      "sender": "teacher10",
      "senderName": "Student 14",
      "message": "תודה על ההסבר",
      "timestamp": "2025-07-13T01:44:56.599Z",
      "type": "student"
    },
    {
      "id": "msg-1",
      "sender": "student064",
      "senderName": "Student 18",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-12T14:09:40.177Z",
      "type": "student"
    },
    {
      "id": "msg-2",
      "sender": "teacher10",
      "senderName": "Student 22",
      "message": "תודה על ההסבר",
      "timestamp": "2025-07-13T16:58:13.348Z",
      "type": "student"
    },
    {
      "id": "msg-3",
      "sender": "student137",
      "senderName": "Teacher 10",
      "message": "יש לי שאלה",
      "timestamp": "2025-07-13T23:19:39.502Z",
      "type": "student"
    },
    {
      "id": "msg-4",
      "sender": "teacher10",
      "senderName": "Student 19",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-16T22:20:29.359Z",
      "type": "student"
    },
    {
      "id": "msg-5",
      "sender": "student236",
      "senderName": "Student 22",
      "message": "אני לא מבין את התרגיל",
      "timestamp": "2025-07-16T11:17:47.784Z",
      "type": "student"
    },
    {
      "id": "msg-6",
      "sender": "teacher10",
      "senderName": "Student 11",
      "message": "יש לי שאלה",
      "timestamp": "2025-07-12T21:05:07.093Z",
      "type": "teacher"
    },
    {
      "id": "msg-7",
      "sender": "teacher10",
      "senderName": "Teacher 10",
      "message": "תודה על ההסבר",
      "timestamp": "2025-07-12T18:41:53.816Z",
      "type": "teacher"
    },
    {
      "id": "msg-8",
      "sender": "student117",
      "senderName": "Teacher 10",
      "message": "אפשר להסביר שוב?",
      "timestamp": "2025-07-12T06:24:02.350Z",
      "type": "student"
    },
    {
      "id": "msg-9",
      "sender": "student233",
      "senderName": "Student 18",
      "message": "זה מאוד מעניין!",
      "timestamp": "2025-07-14T09:58:11.844Z",
      "type": "teacher"
    }
  ],
  "raisedHands": [],
  "studentProgress": {
    "student093": {
      "joinedAt": "2025-07-11T18:51:13.213Z",
      "lastActivity": "2025-07-17T09:53:44.350Z",
      "currentSlide": 25,
      "completedSlides": 12,
      "timeSpent": 5711,
      "questionsAnswered": 1,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student215": {
      "joinedAt": "2025-07-11T18:31:00.049Z",
      "lastActivity": "2025-07-17T10:30:26.340Z",
      "currentSlide": 16,
      "completedSlides": 4,
      "timeSpent": 5635,
      "questionsAnswered": 8,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student099": {
      "joinedAt": "2025-07-11T18:49:43.964Z",
      "lastActivity": "2025-07-17T10:33:02.537Z",
      "currentSlide": 12,
      "completedSlides": 13,
      "timeSpent": 6965,
      "questionsAnswered": 1,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student036": {
      "joinedAt": "2025-07-11T18:34:31.254Z",
      "lastActivity": "2025-07-17T09:38:33.357Z",
      "currentSlide": 19,
      "completedSlides": 11,
      "timeSpent": 1547,
      "questionsAnswered": 3,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student137": {
      "joinedAt": "2025-07-11T18:43:20.468Z",
      "lastActivity": "2025-07-17T09:55:19.254Z",
      "currentSlide": 16,
      "completedSlides": 7,
      "timeSpent": 5920,
      "questionsAnswered": 6,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    },
    "student236": {
      "joinedAt": "2025-07-11T18:51:15.714Z",
      "lastActivity": "2025-07-17T10:33:57.529Z",
      "currentSlide": 12,
      "completedSlides": 11,
      "timeSpent": 4975,
      "questionsAnswered": 5,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student124": {
      "joinedAt": "2025-07-11T18:43:50.392Z",
      "lastActivity": "2025-07-17T10:06:09.598Z",
      "currentSlide": 14,
      "completedSlides": 5,
      "timeSpent": 5163,
      "questionsAnswered": 6,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student117": {
      "joinedAt": "2025-07-11T18:59:48.939Z",
      "lastActivity": "2025-07-17T10:29:56.152Z",
      "currentSlide": 10,
      "completedSlides": 13,
      "timeSpent": 5122,
      "questionsAnswered": 1,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student024": {
      "joinedAt": "2025-07-11T18:31:45.416Z",
      "lastActivity": "2025-07-17T10:31:28.153Z",
      "currentSlide": 4,
      "completedSlides": 9,
      "timeSpent": 3653,
      "questionsAnswered": 6,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student097": {
      "joinedAt": "2025-07-11T18:55:26.908Z",
      "lastActivity": "2025-07-17T10:25:46.808Z",
      "currentSlide": 7,
      "completedSlides": 14,
      "timeSpent": 2814,
      "questionsAnswered": 2,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student234": {
      "joinedAt": "2025-07-11T18:53:19.716Z",
      "lastActivity": "2025-07-17T10:29:44.274Z",
      "currentSlide": 7,
      "completedSlides": 4,
      "timeSpent": 3106,
      "questionsAnswered": 6,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student017": {
      "joinedAt": "2025-07-11T18:45:39.116Z",
      "lastActivity": "2025-07-17T10:17:19.629Z",
      "currentSlide": 9,
      "completedSlides": 7,
      "timeSpent": 1784,
      "questionsAnswered": 3,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student233": {
      "joinedAt": "2025-07-11T18:44:36.355Z",
      "lastActivity": "2025-07-17T10:11:59.447Z",
      "currentSlide": 14,
      "completedSlides": 3,
      "timeSpent": 4036,
      "questionsAnswered": 8,
      "correctAnswers": 1,
      "handRaised": false,
      "isConnected": false
    },
    "student064": {
      "joinedAt": "2025-07-11T18:48:32.159Z",
      "lastActivity": "2025-07-17T10:22:36.236Z",
      "currentSlide": 3,
      "completedSlides": 6,
      "timeSpent": 5363,
      "questionsAnswered": 9,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student179": {
      "joinedAt": "2025-07-11T18:59:29.975Z",
      "lastActivity": "2025-07-17T10:18:18.326Z",
      "currentSlide": 13,
      "completedSlides": 2,
      "timeSpent": 6283,
      "questionsAnswered": 9,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student212": {
      "joinedAt": "2025-07-11T18:47:43.873Z",
      "lastActivity": "2025-07-17T10:13:48.539Z",
      "currentSlide": 3,
      "completedSlides": 12,
      "timeSpent": 2303,
      "questionsAnswered": 2,
      "correctAnswers": 0,
      "handRaised": false,
      "isConnected": false
    },
    "student146": {
      "joinedAt": "2025-07-11T18:37:25.396Z",
      "lastActivity": "2025-07-17T10:27:21.228Z",
      "currentSlide": 4,
      "completedSlides": 14,
      "timeSpent": 4906,
      "questionsAnswered": 8,
      "correctAnswers": 4,
      "handRaised": false,
      "isConnected": false
    },
    "student222": {
      "joinedAt": "2025-07-11T18:44:32.526Z",
      "lastActivity": "2025-07-17T10:26:26.393Z",
      "currentSlide": 25,
      "completedSlides": 8,
      "timeSpent": 6640,
      "questionsAnswered": 1,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    },
    "student235": {
      "joinedAt": "2025-07-11T18:38:28.256Z",
      "lastActivity": "2025-07-17T10:00:16.508Z",
      "currentSlide": 7,
      "completedSlides": 3,
      "timeSpent": 1517,
      "questionsAnswered": 4,
      "correctAnswers": 3,
      "handRaised": false,
      "isConnected": false
    },
    "student090": {
      "joinedAt": "2025-07-11T18:33:59.194Z",
      "lastActivity": "2025-07-17T10:15:43.584Z",
      "currentSlide": 29,
      "completedSlides": 13,
      "timeSpent": 4246,
      "questionsAnswered": 6,
      "correctAnswers": 2,
      "handRaised": false,
      "isConnected": false
    }
  },
  "teacherNotes": {
    "general": "Session notes for הנדסה חברתית",
    "slideNotes": {
      "1": "Good engagement from students",
      "5": "Need to spend more time on this concept",
      "10": "Excellent participation in interactive exercise"
    },
    "studentNotes": {
      "student093": "Student showing good progress",
      "student215": "Student showing good progress",
      "student099": "Student showing good progress"
    }
  },
  "analytics": {
    "attendanceCount": 22,
    "averageEngagement": 0.8632026837451565,
    "completionRate": 0.8842055453765385,
    "averageSlideTime": 156,
    "chatActivity": 40,
    "handRaiseCount": 7,
    "technicalIssues": 2,
    "satisfactionScore": 9.021017435857786
  },
  "version": "1.0",
  "platform": "web",
  "userAgent": "Mozilla/5.0 Chrome/91.0",
  "createdAt": "2025-07-11T18:30:28.438Z",
  "updatedAt": "2025-07-17T10:34:10.251Z"
}
```



---

## 🗂️ Collection: `system`

**Document Count**: 1

### Schema
- **version**: string
- **status**: string
- **environment**: string
- **settings**: object
- **features**: object
- **performance**: object
- **health**: object
- **maintenance**: object
- **createdAt**: string
- **updatedAt**: string


### Sample Documents

#### Document 1: `config`
```json
{
  "version": "2.1.0",
  "status": "operational",
  "environment": "production",
  "settings": {
    "maxSessionDuration": 7200,
    "maxStudentsPerSession": 30,
    "sessionTimeoutWarning": 300,
    "chatEnabled": true,
    "handRaiseEnabled": true,
    "sessionRecording": true,
    "autoSaveInterval": 30,
    "backupFrequency": "daily"
  },
  "features": {
    "realTimeAnalytics": true,
    "advancedSimulations": true,
    "aiAssistant": false,
    "videoConferencing": true,
    "mobileApp": false,
    "apiAccess": true
  },
  "performance": {
    "databaseResponseTime": 68,
    "activeConnections": 53,
    "memoryUsage": 0.4757805503888996,
    "cpuUsage": 0.48793813354966337,
    "diskUsage": 0.3646155984072605
  },
  "health": {
    "status": "healthy",
    "uptime": 2416226,
    "lastRestart": "2025-07-11T22:47:03.530Z",
    "errorRate": 0.01915384727851351,
    "successRate": 0.9835600735285748
  },
  "maintenance": {
    "nextScheduled": "2025-07-24T10:34:10.274Z",
    "lastCompleted": "2025-07-06T21:13:57.761Z",
    "inProgress": false
  },
  "createdAt": "2024-07-17T10:34:10.274Z",
  "updatedAt": "2025-07-17T10:34:10.274Z"
}
```



---

## 🗂️ Collection: `teacherActivities`

**Document Count**: 166

### Schema
- **teacherId**: string
- **activityType**: string
- **sessionId**: string
- **lessonId**: string
- **details**: object
- **timestamp**: string
- **metadata**: object


### Sample Documents

#### Document 1: `teacher01-activity-1`
```json
{
  "teacherId": "teacher01",
  "activityType": "lesson_started",
  "sessionId": "session022",
  "lessonId": "lesson002",
  "details": {
    "slideNumber": 18,
    "studentsAffected": 2,
    "duration": 284
  },
  "timestamp": "2025-07-01T22:22:11.423Z",
  "metadata": {
    "userAgent": "Mozilla/5.0 Chrome/91.0",
    "ipAddress": "192.168.1.220"
  }
}
```


#### Document 2: `teacher01-activity-10`
```json
{
  "teacherId": "teacher01",
  "activityType": "session_ended",
  "sessionId": "session015",
  "lessonId": "lesson011",
  "details": {
    "slideNumber": 25,
    "studentsAffected": 1,
    "duration": 217
  },
  "timestamp": "2025-06-30T10:19:17.050Z",
  "metadata": {
    "userAgent": "Mozilla/5.0 Chrome/91.0",
    "ipAddress": "192.168.1.81"
  }
}
```


#### Document 3: `teacher01-activity-11`
```json
{
  "teacherId": "teacher01",
  "activityType": "student_helped",
  "sessionId": "session045",
  "lessonId": "lesson005",
  "details": {
    "slideNumber": 14,
    "studentsAffected": 1,
    "duration": 314
  },
  "timestamp": "2025-07-02T05:38:50.129Z",
  "metadata": {
    "userAgent": "Mozilla/5.0 Chrome/91.0",
    "ipAddress": "192.168.1.29"
  }
}
```


#### Document 4: `teacher01-activity-12`
```json
{
  "teacherId": "teacher01",
  "activityType": "session_ended",
  "sessionId": "session034",
  "lessonId": "lesson003",
  "details": {
    "slideNumber": 26,
    "studentsAffected": 6,
    "duration": 159
  },
  "timestamp": "2025-06-27T04:50:57.893Z",
  "metadata": {
    "userAgent": "Mozilla/5.0 Chrome/91.0",
    "ipAddress": "192.168.1.52"
  }
}
```


#### Document 5: `teacher01-activity-13`
```json
{
  "teacherId": "teacher01",
  "activityType": "slide_unlocked",
  "sessionId": "session027",
  "lessonId": "lesson015",
  "details": {
    "slideNumber": 12,
    "studentsAffected": 2,
    "duration": 82
  },
  "timestamp": "2025-07-08T11:31:18.519Z",
  "metadata": {
    "userAgent": "Mozilla/5.0 Chrome/91.0",
    "ipAddress": "192.168.1.185"
  }
}
```



---

## 🗂️ Collection: `teacherNotes`

**Document Count**: 84

### Schema
- **teacherId**: string
- **sessionId**: string
- **lessonId**: string
- **slideNumber**: number
- **noteType**: string
- **content**: string
- **studentId**: null | string
- **isPrivate**: boolean
- **timestamp**: string


### Sample Documents

#### Document 1: `teacher01-note-1`
```json
{
  "teacherId": "teacher01",
  "sessionId": "session007",
  "lessonId": "lesson001",
  "slideNumber": 26,
  "noteType": "reminder",
  "content": "Slow network affecting experience",
  "studentId": null,
  "isPrivate": false,
  "timestamp": "2025-06-27T20:49:58.723Z"
}
```


#### Document 2: `teacher01-note-2`
```json
{
  "teacherId": "teacher01",
  "sessionId": "session013",
  "lessonId": "lesson016",
  "slideNumber": 7,
  "noteType": "observation",
  "content": "Slow network affecting experience",
  "studentId": "student163",
  "isPrivate": true,
  "timestamp": "2025-07-04T11:03:46.314Z"
}
```


#### Document 3: `teacher01-note-3`
```json
{
  "teacherId": "teacher01",
  "sessionId": "session001",
  "lessonId": "lesson016",
  "slideNumber": 9,
  "noteType": "reminder",
  "content": "Great class participation",
  "studentId": null,
  "isPrivate": true,
  "timestamp": "2025-07-07T12:50:17.390Z"
}
```


#### Document 4: `teacher01-note-4`
```json
{
  "teacherId": "teacher01",
  "sessionId": "session025",
  "lessonId": "lesson006",
  "slideNumber": 26,
  "noteType": "reminder",
  "content": "Slow network affecting experience",
  "studentId": "student081",
  "isPrivate": true,
  "timestamp": "2025-07-01T06:58:29.425Z"
}
```


#### Document 5: `teacher01-note-5`
```json
{
  "teacherId": "teacher01",
  "sessionId": "session021",
  "lessonId": "lesson001",
  "slideNumber": 12,
  "noteType": "reminder",
  "content": "Need to spend more time on this concept",
  "studentId": "student035",
  "isPrivate": false,
  "timestamp": "2025-07-06T17:10:09.140Z"
}
```



---

## 🗂️ Collection: `userPresence`

**Document Count**: 262

### Schema
- **userId**: string
- **status**: string
- **lastSeen**: string
- **metadata**: object
- **sessionId**: string | null


### Sample Documents

#### Document 1: `manager01`
```json
{
  "userId": "manager01",
  "status": "offline",
  "lastSeen": "2025-07-17T10:34:10.240Z",
  "metadata": {
    "role": "system_manager"
  }
}
```


#### Document 2: `manager02`
```json
{
  "userId": "manager02",
  "status": "offline",
  "lastSeen": "2025-07-17T10:34:10.240Z",
  "metadata": {
    "role": "system_manager"
  }
}
```


#### Document 3: `student001`
```json
{
  "userId": "student001",
  "status": "offline",
  "lastSeen": "2025-07-17T10:34:10.224Z",
  "sessionId": "session006",
  "metadata": {
    "sessionId": "session006",
    "lessonName": "Lesson 15"
  }
}
```


#### Document 4: `student002`
```json
{
  "userId": "student002",
  "status": "offline",
  "lastSeen": "2025-07-17T10:34:10.224Z",
  "sessionId": null,
  "metadata": {}
}
```


#### Document 5: `student003`
```json
{
  "userId": "student003",
  "status": "offline",
  "lastSeen": "2025-07-17T10:34:10.224Z",
  "sessionId": null,
  "metadata": {}
}
```



---

## 🗂️ Collection: `users`

**Document Count**: 262

### Schema
- **uid**: string
- **email**: string
- **displayName**: string
- **firstName**: string
- **lastName**: string
- **role**: string
- **password**: string
- **permissions**: array
- **department**: string
- **accessLevel**: string
- **managedSystems**: array
- **adminStats**: object
- **isActive**: boolean
- **isOnline**: boolean
- **hasFirebaseAuth**: boolean
- **isSlot**: boolean
- **status**: string
- **lastLogin**: string
- **lastActivityDate**: string
- **createdAt**: string
- **updatedAt**: string | timestamp
- **classId**: string
- **teacherId**: string
- **grade**: number
- **school**: string
- **progress**: object
- **sessionHistory**: array
- **currentSession**: string | null
- **loginAttempts**: number
- **authStatusUpdated**: timestamp
- **authEmail**: string
- **authUid**: string
- **phone**: string
- **assignedClasses**: array
- **teacherClasses**: array
- **specializations**: array
- **certification**: string
- **activeSessions**: array
- **teachingStats**: object
- **lessonSettings**: object


### Sample Documents

#### Document 1: `manager01`
```json
{
  "uid": "manager01",
  "email": "manager01@cyber.academy",
  "displayName": "System Manager 1",
  "firstName": "Manager",
  "lastName": "1",
  "role": "system_manager",
  "password": "password123",
  "permissions": [
    "all"
  ],
  "department": "IT",
  "accessLevel": "admin",
  "managedSystems": [
    "firestore",
    "authentication",
    "analytics",
    "monitoring"
  ],
  "adminStats": {
    "usersManaged": 262,
    "systemChanges": 83,
    "securityEventsHandled": 57,
    "lastSystemBackup": "2025-07-12T06:46:19.108Z"
  },
  "isActive": true,
  "isOnline": false,
  "hasFirebaseAuth": true,
  "isSlot": true,
  "status": "available",
  "lastLogin": "2025-07-16T08:17:58.025Z",
  "lastActivityDate": "2025-07-17T04:32:09.298Z",
  "createdAt": "2023-12-07T11:32:23.573Z",
  "updatedAt": "2025-07-17T10:34:10.240Z"
}
```


#### Document 2: `manager02`
```json
{
  "uid": "manager02",
  "email": "manager02@cyber.academy",
  "displayName": "System Manager 2",
  "firstName": "Manager",
  "lastName": "2",
  "role": "system_manager",
  "password": "password123",
  "permissions": [
    "all"
  ],
  "department": "IT",
  "accessLevel": "admin",
  "managedSystems": [
    "firestore",
    "authentication",
    "analytics",
    "monitoring"
  ],
  "adminStats": {
    "usersManaged": 262,
    "systemChanges": 99,
    "securityEventsHandled": 27,
    "lastSystemBackup": "2025-07-17T09:10:34.228Z"
  },
  "isActive": true,
  "isOnline": false,
  "hasFirebaseAuth": true,
  "isSlot": true,
  "status": "available",
  "lastLogin": "2025-07-16T13:54:47.110Z",
  "lastActivityDate": "2025-07-17T03:28:32.421Z",
  "createdAt": "2025-06-27T05:38:17.547Z",
  "updatedAt": "2025-07-17T10:34:10.240Z"
}
```


#### Document 3: `student001`
```json
{
  "uid": "student001",
  "email": "student001@cyber.academy",
  "displayName": "Student 1",
  "firstName": "Student",
  "lastName": "1",
  "role": "student",
  "password": "password123",
  "classId": "class01",
  "teacherId": "teacher01",
  "grade": 7,
  "school": "School 1",
  "progress": {
    "currentLesson": 18,
    "completedLessons": [
      1,
      2
    ],
    "totalTimeSpent": 32055,
    "achievements": [
      "first_lesson",
      "quick_learner",
      "cyber_detective"
    ],
    "streak": 0,
    "lastLessonCompleted": "2025-07-16T20:45:26.270Z"
  },
  "sessionHistory": [
    {
      "sessionId": "session001",
      "joinedAt": "2025-06-01T16:18:12.300Z",
      "duration": 223,
      "completionRate": 0.6749065369876683
    },
    {
      "sessionId": "session002",
      "joinedAt": "2025-06-15T17:34:14.035Z",
      "duration": 2418,
      "completionRate": 0.963088614041457
    },
    {
      "sessionId": "session003",
      "joinedAt": "2025-06-02T19:12:00.521Z",
      "duration": 2638,
      "completionRate": 0.012316706966238211
    },
    {
      "sessionId": "session004",
      "joinedAt": "2025-07-12T16:55:43.323Z",
      "duration": 2676,
      "completionRate": 0.49082658805749224
    },
    {
      "sessionId": "session005",
      "joinedAt": "2025-05-23T14:14:30.794Z",
      "duration": 1522,
      "completionRate": 0.004122200986356406
    },
    {
      "sessionId": "session006",
      "joinedAt": "2025-06-20T12:09:40.436Z",
      "duration": 557,
      "completionRate": 0.13351481752922334
    },
    {
      "sessionId": "session007",
      "joinedAt": "2025-06-15T19:05:16.759Z",
      "duration": 3114,
      "completionRate": 0.6367379396670503
    },
    {
      "sessionId": "session008",
      "joinedAt": "2025-05-28T09:27:54.130Z",
      "duration": 1117,
      "completionRate": 0.17550226585141449
    }
  ],
  "isActive": true,
  "isOnline": false,
  "currentSession": "session006",
  "lastLogin": "2025-07-12T11:38:44.398Z",
  "lastActivityDate": "2025-07-16T13:56:03.186Z",
  "loginAttempts": 0,
  "hasFirebaseAuth": true,
  "isSlot": true,
  "status": "available",
  "createdAt": "2025-02-03T12:20:25.718Z",
  "updatedAt": "2025-07-17T10:34:10.224Z"
}
```


#### Document 4: `student002`
```json
{
  "uid": "student002",
  "email": "student002@cyber.academy",
  "displayName": "Student 2",
  "firstName": "Student",
  "lastName": "2",
  "role": "student",
  "password": "password123",
  "classId": "class01",
  "teacherId": "teacher01",
  "grade": 8,
  "school": "School 1",
  "progress": {
    "currentLesson": 15,
    "completedLessons": [
      1,
      2
    ],
    "totalTimeSpent": 7174,
    "achievements": [
      "first_lesson",
      "quick_learner",
      "cyber_detective"
    ],
    "streak": 12,
    "lastLessonCompleted": "2025-06-19T18:59:36.026Z"
  },
  "sessionHistory": [
    {
      "sessionId": "session001",
      "joinedAt": "2025-06-08T02:58:31.267Z",
      "duration": 769,
      "completionRate": 0.4374397986358143
    }
  ],
  "isActive": true,
  "isOnline": false,
  "currentSession": null,
  "lastLogin": "2025-07-14T20:56:21.724Z",
  "lastActivityDate": "2025-07-17T09:53:46.371Z",
  "loginAttempts": 0,
  "hasFirebaseAuth": true,
  "isSlot": true,
  "status": "available",
  "createdAt": "2025-06-07T09:17:29.325Z",
  "updatedAt": "2025-07-17T10:34:10.224Z"
}
```


#### Document 5: `student003`
```json
{
  "uid": "student003",
  "email": "student003@cyber.academy",
  "displayName": "Student 3",
  "firstName": "Student",
  "lastName": "3",
  "role": "student",
  "password": "password123",
  "classId": "class01",
  "teacherId": "teacher01",
  "grade": 12,
  "school": "School 1",
  "progress": {
    "currentLesson": 11,
    "completedLessons": [
      1,
      2,
      3
    ],
    "totalTimeSpent": 20485,
    "achievements": [
      "first_lesson",
      "quick_learner",
      "cyber_detective"
    ],
    "streak": 7,
    "lastLessonCompleted": "2025-07-10T23:15:34.427Z"
  },
  "sessionHistory": [
    {
      "sessionId": "session001",
      "joinedAt": "2025-06-09T09:43:07.501Z",
      "duration": 3547,
      "completionRate": 0.3152908155329661
    },
    {
      "sessionId": "session002",
      "joinedAt": "2025-06-28T18:43:25.335Z",
      "duration": 1912,
      "completionRate": 0.17303072466308445
    },
    {
      "sessionId": "session003",
      "joinedAt": "2025-06-28T20:09:45.233Z",
      "duration": 3348,
      "completionRate": 0.6290607453755137
    },
    {
      "sessionId": "session004",
      "joinedAt": "2025-06-28T16:36:13.817Z",
      "duration": 790,
      "completionRate": 0.4217873943039512
    },
    {
      "sessionId": "session005",
      "joinedAt": "2025-07-07T20:04:06.726Z",
      "duration": 2637,
      "completionRate": 0.6978808798728184
    },
    {
      "sessionId": "session006",
      "joinedAt": "2025-06-14T14:52:38.381Z",
      "duration": 3307,
      "completionRate": 0.9997504469182146
    },
    {
      "sessionId": "session007",
      "joinedAt": "2025-06-05T21:38:37.999Z",
      "duration": 2050,
      "completionRate": 0.9021141259572627
    },
    {
      "sessionId": "session008",
      "joinedAt": "2025-06-24T16:10:32.852Z",
      "duration": 139,
      "completionRate": 0.421902897203817
    },
    {
      "sessionId": "session009",
      "joinedAt": "2025-06-02T23:32:53.387Z",
      "duration": 1,
      "completionRate": 0.6412997364655761
    },
    {
      "sessionId": "session010",
      "joinedAt": "2025-06-07T17:15:39.913Z",
      "duration": 3244,
      "completionRate": 0.9301868239020998
    }
  ],
  "isActive": true,
  "isOnline": false,
  "currentSession": null,
  "lastLogin": "2025-07-13T15:48:41.699Z",
  "lastActivityDate": "2025-07-16T18:14:39.943Z",
  "loginAttempts": 2,
  "hasFirebaseAuth": true,
  "isSlot": true,
  "status": "available",
  "createdAt": "2025-02-11T10:05:04.542Z",
  "updatedAt": "2025-07-17T10:34:10.224Z"
}
```



---


## 🔍 Analysis Results

### Collection Summary
- **activeSessions**: 20 documents
- **classEnrollments**: 250 documents
- **classes**: 10 documents
- **lessons**: 19 documents
- **login-analytics**: 1 documents
- **security_logs**: 500 documents
- **sessions**: 100 documents
- **system**: 1 documents
- **teacherActivities**: 166 documents
- **teacherNotes**: 84 documents
- **userPresence**: 262 documents
- **users**: 262 documents

### User Analysis

**Users by Role:**
- **system_manager**: Found in database
- **student**: Found in database
- **teacher**: Found in database


### ✅ No Collection Access Errors

## 🔧 Authentication Flow Analysis

Based on the database structure, here's how authentication should work:

1. **Firebase Auth** → User logs in with email/password
2. **Profile Lookup** → System queries `users` collection by email
3. **Role Assignment** → User gets redirected based on `role` field:
      - **system_manager** → `/system-manager/dashboard`
   - **student** → `/student/roadmap`
   - **teacher** → `/teacher/dashboard`

## 🚨 Root Cause Analysis











## 💡 Immediate Action Items

1. **Priority 1**: 🟢 Users exist
2. **Priority 2**: 🟢 User roles are defined
3. **Priority 3**: 🟢 No authentication issues
4. **Priority 4**: 🟢 No access errors

---
*Generated by database-reader.cjs on 2025-07-18T06:08:36.685Z*
