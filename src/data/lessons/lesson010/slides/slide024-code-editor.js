export const slide24CodeEditor = {
  id: "slide-24",
  type: "interactive",
  title: "עורך קוד - כתיבת סקריפטי האקינג אתי 💻",
  content: {
    gameType: "code-editor",
    description: "כתבו סקריפטים לבדיקת אבטחה",
    exercises: [
      {
        id: "exercise1",
        title: "סקריפט סריקת פורטים",
        description: "כתבו סקריפט Python לסריקת פורטים פתוחים",
        language: "python",
        starterCode: `import socket
import threading
import time

def scan_port(target, port):
    """
    סורק פורט ספציפי
    """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        if result == 0:
            print(f"פורט {port} פתוח")
        sock.close()
    except:
        pass

def scan_target(target, start_port=1, end_port=1024):
    """
    סורק טווח פורטים
    """
    print(f"מתחיל סריקה של {target}")
    
    # כאן כתבו את הקוד שלכם
    
    print("הסריקה הושלמה")

# דוגמה לשימוש
scan_target("127.0.0.1")`,
        solution: `import socket
import threading
import time

def scan_port(target, port):
    """
    סורק פורט ספציפי
    """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        if result == 0:
            print(f"פורט {port} פתוח")
        sock.close()
    except:
        pass

def scan_target(target, start_port=1, end_port=1024):
    """
    סורק טווח פורטים
    """
    print(f"מתחיל סריקה של {target}")
    
    threads = []
    for port in range(start_port, end_port + 1):
        thread = threading.Thread(target=scan_port, args=(target, port))
        threads.append(thread)
        thread.start()
    
    for thread in threads:
        thread.join()
    
    print("הסריקה הושלמה")

# דוגמה לשימוש
scan_target("127.0.0.1")`,
        hints: [
          "השתמשו ב-threading לביצוע מקבילי",
          "צרו thread לכל פורט",
          "המתינו לכל ה-threads להסתיים"
        ]
      },
      {
        id: "exercise2",
        title: "סקריפט בדיקת סיסמאות",
        description: "כתבו סקריפט לבדיקת סיסמאות נפוצות",
        language: "python",
        starterCode: `import hashlib
import itertools
import string

def hash_password(password):
    """
    יוצר hash של סיסמה
    """
    return hashlib.md5(password.encode()).hexdigest()

def check_password(target_hash, password):
    """
    בודק אם סיסמה תואמת ל-hash
    """
    if hash_password(password) == target_hash:
        return True
    return False

def crack_password(target_hash, charset=string.ascii_lowercase, max_length=4):
    """
    מנסה לפרוץ סיסמה
    """
    print(f"מנסה לפרוץ hash: {target_hash}")
    
    # כאן כתבו את הקוד שלכם
    
    return None

# דוגמה לשימוש
target = "5f4dcc3b5aa765d61d8327deb882cf99"  # "password"
result = crack_password(target)
if result:
    print(f"הסיסמה היא: {result}")
else:
    print("לא הצלחתי לפרוץ את הסיסמה")`,
        solution: `import hashlib
import itertools
import string

def hash_password(password):
    """
    יוצר hash של סיסמה
    """
    return hashlib.md5(password.encode()).hexdigest()

def check_password(target_hash, password):
    """
    בודק אם סיסמה תואמת ל-hash
    """
    if hash_password(password) == target_hash:
        return True
    return False

def crack_password(target_hash, charset=string.ascii_lowercase, max_length=4):
    """
    מנסה לפרוץ סיסמה
    """
    print(f"מנסה לפרוץ hash: {target_hash}")
    
    for length in range(1, max_length + 1):
        for guess in itertools.product(charset, repeat=length):
            password = ''.join(guess)
            if check_password(target_hash, password):
                return password
    
    return None

# דוגמה לשימוש
target = "5f4dcc3b5aa765d61d8327deb882cf99"  # "password"
result = crack_password(target)
if result:
    print(f"הסיסמה היא: {result}")
else:
    print("לא הצלחתי לפרוץ את הסיסמה")`,
        hints: [
          "השתמשו ב-itertools.product",
          "נסו אורכים שונים של סיסמאות",
          "בדקו כל שילוב אפשרי"
        ]
      }
    ],
    instructions: [
      "קראו את התיאור בקפידה",
      "השלימו את הקוד החסר",
      "השתמשו ברמזים אם צריך",
      "בדקו שהקוד עובד"
    ],
    tips: [
      "השתמשו ב-comments להסבר",
      "בדקו שגיאות נפוצות",
      "חשבו על ביצועים",
      "שמרו על קוד נקי"
    ]
  }
}; 