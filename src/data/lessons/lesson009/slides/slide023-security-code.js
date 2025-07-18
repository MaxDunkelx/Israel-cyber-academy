export const slide23SecurityCode = {
  id: "slide-23",
  type: "interactive",
  title: "עורך קוד אבטחה - Security Code Editor 💻",
  content: {
    gameType: "codeEditor",
    instructions: "כתבו קוד אבטחה ובדקו אותו",
    challenges: [
      {
        title: "הצפנת AES",
        description: "כתבו פונקציה להצפנת טקסט עם AES",
        language: "python",
        starterCode: `from cryptography.fernet import Fernet
import base64

def encrypt_text(text, key):
    # כתבו כאן את הקוד להצפנה
    pass

def decrypt_text(encrypted_text, key):
    # כתבו כאן את הקוד לפענוח
    pass`,
        solution: `from cryptography.fernet import Fernet
import base64

def encrypt_text(text, key):
    f = Fernet(key)
    encrypted = f.encrypt(text.encode())
    return encrypted

def decrypt_text(encrypted_text, key):
    f = Fernet(key)
    decrypted = f.decrypt(encrypted_text)
    return decrypted.decode()`,
        hints: [
          "השתמשו ב-Fernet להצפנה",
          "המירו טקסט לבייטים לפני הצפנה",
          "המירו בייטים לטקסט אחרי פענוח"
        ]
      },
      {
        title: "בדיקת סיסמה חזקה",
        description: "כתבו פונקציה לבדיקת חוזק סיסמה",
        language: "python",
        starterCode: `import re

def check_password_strength(password):
    # בדקו אם הסיסמה חזקה
    # צריכה להכיל: אותיות גדולות, קטנות, מספרים, סימנים
    pass`,
        solution: `import re

def check_password_strength(password):
    if len(password) < 8:
        return False
    
    if not re.search(r"[A-Z]", password):
        return False
    
    if not re.search(r"[a-z]", password):
        return False
    
    if not re.search(r"\d", password):
        return False
    
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    
    return True`,
        hints: [
          "בדקו אורך מינימלי",
          "השתמשו בביטויים רגולריים",
          "בדקו כל דרישה בנפרד"
        ]
      }
    ],
    features: {
      syntaxHighlighting: true,
      autoComplete: true,
      liveValidation: true,
      errorChecking: true,
      runCode: true
    },
    feedback: {
      correct: "מעולה! הקוד עובד כמו שצריך! 🎉",
      error: "יש שגיאה בקוד, בדקו שוב! 🔍",
      hint: "השתמשו ברמזים לעזרה"
    }
  }
}; 