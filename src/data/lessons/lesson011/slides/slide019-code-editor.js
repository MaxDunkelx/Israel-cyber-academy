export const slide19CodeEditor = {
  id: "slide-19",
  type: "interactive",
  title: "עורך קוד - כתיבת סקריפטים לניתוח תוכנות זדוניות 💻",
  content: {
    component: "CodeEditor",
    language: "python",
    title: "כתיבת סקריפט לניתוח תוכנה זדונית",
    description: "כתבו סקריפט Python לניתוח קבצים חשודים וזיהוי תוכנות זדוניות.",
    initialCode: `# סקריפט לניתוח תוכנות זדוניות
import hashlib
import os
import re
from pathlib import Path

def analyze_suspicious_file(file_path):
    """
    ניתוח קובץ חשוד לזיהוי תוכנות זדוניות
    """
    results = {
        'file_info': {},
        'strings': [],
        'hashes': {},
        'suspicious_patterns': []
    }
    
    try:
        # מידע בסיסי על הקובץ
        file_stat = os.stat(file_path)
        results['file_info'] = {
            'size': file_stat.st_size,
            'created': file_stat.st_ctime,
            'modified': file_stat.st_mtime
        }
        
        # חישוב hash
        with open(file_path, 'rb') as f:
            content = f.read()
            results['hashes']['md5'] = hashlib.md5(content).hexdigest()
            results['hashes']['sha256'] = hashlib.sha256(content).hexdigest()
        
        # חילוץ מחרוזות
        strings = re.findall(b'[\\x20-\\x7E]{4,}', content)
        results['strings'] = [s.decode('utf-8', errors='ignore') for s in strings[:100]]
        
        # זיהוי דפוסים חשודים
        suspicious_patterns = [
            r'http[s]?://[^\\s]+',  # כתובות URL
            r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',  # אימיילים
            r'\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b',  # כתובות IP
            r'CreateProcess|ShellExecute|WinExec',  # פונקציות חשודות
            r'registry|regedit',  # מניפולציה על רישום
            r'keylogger|spyware|trojan',  # מילות מפתח חשודות
        ]
        
        for pattern in suspicious_patterns:
            matches = re.findall(pattern, str(content), re.IGNORECASE)
            if matches:
                results['suspicious_patterns'].extend(matches)
        
        return results
        
    except Exception as e:
        return {'error': str(e)}

def check_file_type(file_path):
    """
    זיהוי סוג הקובץ לפי הרחבה ותוכן
    """
    file_ext = Path(file_path).suffix.lower()
    
    executable_extensions = ['.exe', '.dll', '.sys', '.scr', '.bat', '.cmd', '.ps1']
    if file_ext in executable_extensions:
        return "קובץ הפעלה - דורש ניתוח מעמיק"
    
    document_extensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
    if file_ext in document_extensions:
        return "קובץ מסמך - בדוק macros"
    
    return "סוג קובץ לא מוכר"

# דוגמה לשימוש
if __name__ == "__main__":
    # החלף את הנתיב לקובץ החשוד שלך
    suspicious_file = "path/to/suspicious/file.exe"
    
    print("=== ניתוח קובץ חשוד ===")
    print(f"סוג קובץ: {check_file_type(suspicious_file)}")
    
    analysis = analyze_suspicious_file(suspicious_file)
    
    if 'error' in analysis:
        print(f"שגיאה: {analysis['error']}")
    else:
        print(f"גודל קובץ: {analysis['file_info']['size']} bytes")
        print(f"MD5: {analysis['hashes']['md5']}")
        print(f"SHA256: {analysis['hashes']['sha256']}")
        
        if analysis['suspicious_patterns']:
            print("\\nדפוסים חשודים שנמצאו:")
            for pattern in set(analysis['suspicious_patterns']):
                print(f"- {pattern}")
        else:
            print("\\nלא נמצאו דפוסים חשודים")
`,
    tasks: [
      {
        title: "משימה 1: הוספת זיהוי דפוסים נוספים",
        description: "הוסיפו דפוסים נוספים לזיהוי תוכנות זדוניות",
        hint: "חפשו דפוסים של הצפנה, תקשורת רשת, או מניפולציה על מערכת"
      },
      {
        title: "משימה 2: שיפור ניתוח המחרוזות",
        description: "שיפרו את ניתוח המחרוזות לזיהוי קוד חשוד",
        hint: "חפשו מחרוזות שמכילות שמות פונקציות חשודות"
      },
      {
        title: "משימה 3: הוספת ניתוח metadata",
        description: "הוסיפו ניתוח metadata של הקובץ",
        hint: "בדקו תאריכי יצירה, הרשאות, ומידע נוסף"
      }
    ],
    expectedOutput: {
      description: "הסקריפט אמור לזהות דפוסים חשודים ולספק מידע על הקובץ",
      examples: [
        "זיהוי כתובות URL חשודות",
        "חישוב hash של הקובץ",
        "זיהוי פונקציות חשודות",
        "ניתוח metadata"
      ]
    },
    tips: [
      "השתמשו ב-regular expressions לזיהוי דפוסים",
      "תעדו כל שלב בניתוח",
      "בדקו את הקוד לפני הרצה",
      "השתמשו בסביבה מבודדת לבדיקות"
    ]
  }
}; 