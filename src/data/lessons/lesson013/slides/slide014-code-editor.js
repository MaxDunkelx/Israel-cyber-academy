export const slide14CodeEditor = {
  id: "slide-14",
  type: "interactive",
  title: "עורך קוד - סקריפטי אבטחת רשתות מתקדמת 💻",
  content: {
    editorType: "code",
    title: "כתיבת סקריפטים לאבטחת רשתות מתקדמות",
    description: "כתבו סקריפטים לאוטומציה של משימות אבטחת רשתות מתקדמות.",
    language: "python",
    templates: [
      {
        name: "SDN Flow Rule Manager",
        description: "סקריפט לניהול Flow Rules ב-SDN",
        code: `from opendaylight import SDNController
import json

class SDNSecurityManager:
    def __init__(self, controller_ip, username, password):
        self.controller = SDNController(controller_ip, username, password)
    
    def create_security_flow(self, switch_id, priority, match, actions):
        """יצירת Flow Rule לאבטחה"""
        flow_rule = {
            "table_id": 0,
            "priority": priority,
            "match": match,
            "instructions": {
                "instruction": [{
                    "order": 0,
                    "apply-actions": {
                        "action": actions
                    }
                }]
            }
        }
        
        response = self.controller.add_flow(switch_id, flow_rule)
        return response
    
    def block_suspicious_traffic(self, source_ip, destination_ip):
        """חסימת תעבורה חשודה"""
        match = {
            "ipv4-source": source_ip,
            "ipv4-destination": destination_ip
        }
        
        actions = [{"drop": {}}]
        
        return self.create_security_flow(
            switch_id="all",
            priority=1000,
            match=match,
            actions=actions
        )
    
    def monitor_network_traffic(self):
        """ניטור תעבורת רשת"""
        flows = self.controller.get_flows()
        
        for flow in flows:
            if flow.get("priority", 0) > 500:
                print(f"Flow Rule חשוד: {flow}")
        
        return flows

# שימוש בסקריפט
sdn_manager = SDNSecurityManager("192.168.1.1", "admin", "password")
sdn_manager.block_suspicious_traffic("10.0.0.100", "192.168.1.50")
sdn_manager.monitor_network_traffic()`
      },
      {
        name: "AI-Powered Threat Detection",
        description: "סקריפט לזיהוי איומים מבוסס AI",
        code: `import numpy as np
from sklearn.ensemble import IsolationForest
import pandas as pd

class AIThreatDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1)
        self.training_data = []
    
    def collect_network_data(self, duration=3600):
        """איסוף נתוני רשת"""
        data = []
        
        # סימולציה של איסוף נתונים
        for i in range(duration):
            packet_data = {
                "timestamp": i,
                "source_ip": f"192.168.1.{np.random.randint(1, 255)}",
                "dest_ip": f"10.0.0.{np.random.randint(1, 255)}",
                "packet_size": np.random.randint(64, 1500),
                "protocol": np.random.choice(["TCP", "UDP", "ICMP"]),
                "port": np.random.randint(1, 65535)
            }
            data.append(packet_data)
        
        return pd.DataFrame(data)
    
    def train_model(self, data):
        """אימון מודל AI"""
        features = data[["packet_size", "port"]].values
        self.model.fit(features)
        print("מודל AI אומן בהצלחה!")
    
    def detect_anomalies(self, data):
        """זיהוי אנומליות"""
        features = data[["packet_size", "port"]].values
        predictions = self.model.predict(features)
        
        anomalies = data[predictions == -1]
        
        if len(anomalies) > 0:
            print(f"נמצאו {len(anomalies)} אנומליות!")
            for _, anomaly in anomalies.iterrows():
                print(f"אנומליה: {anomaly['source_ip']} -> {anomaly['dest_ip']}")
        
        return anomalies
    
    def generate_alert(self, anomaly):
        """יצירת התראה"""
        alert = {
            "type": "AI_ANOMALY_DETECTED",
            "severity": "HIGH",
            "source": anomaly["source_ip"],
            "destination": anomaly["dest_ip"],
            "timestamp": anomaly["timestamp"],
            "description": "זוהתה אנומליה על ידי AI"
        }
        
        print(f"התראה: {alert}")
        return alert

# שימוש בסקריפט
detector = AIThreatDetector()
network_data = detector.collect_network_data()
detector.train_model(network_data)
anomalies = detector.detect_anomalies(network_data)

for _, anomaly in anomalies.iterrows():
    detector.generate_alert(anomaly)`
      },
      {
        name: "Zero Trust Network Controller",
        description: "סקריפט לניהול ארכיטקטורת Zero Trust",
        code: `import jwt
import time
from cryptography.fernet import Fernet

class ZeroTrustController:
    def __init__(self):
        self.secret_key = Fernet.generate_key()
        self.cipher_suite = Fernet(self.secret_key)
        self.active_sessions = {}
    
    def authenticate_user(self, user_id, credentials):
        """אימות משתמש"""
        # סימולציה של אימות
        if credentials.get("password") == "correct_password":
            token = jwt.encode(
                {
                    "user_id": user_id,
                    "exp": time.time() + 3600,
                    "permissions": credentials.get("permissions", [])
                },
                self.secret_key,
                algorithm="HS256"
            )
            
            self.active_sessions[user_id] = {
                "token": token,
                "login_time": time.time(),
                "permissions": credentials.get("permissions", [])
            }
            
            return {"status": "success", "token": token}
        else:
            return {"status": "failed", "message": "אימות נכשל"}
    
    def verify_access(self, user_id, resource, action):
        """אימות גישה למשאב"""
        if user_id not in self.active_sessions:
            return {"status": "denied", "reason": "משתמש לא מחובר"}
        
        session = self.active_sessions[user_id]
        
        # בדיקת תוקף הטוקן
        try:
            payload = jwt.decode(session["token"], self.secret_key, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            del self.active_sessions[user_id]
            return {"status": "denied", "reason": "טוקן פג תוקף"}
        
        # בדיקת הרשאות
        required_permission = f"{resource}:{action}"
        if required_permission not in session["permissions"]:
            return {"status": "denied", "reason": "אין הרשאה"}
        
        return {"status": "allowed", "user_id": user_id}
    
    def monitor_session(self, user_id):
        """ניטור סשן משתמש"""
        if user_id in self.active_sessions:
            session = self.active_sessions[user_id]
            session_time = time.time() - session["login_time"]
            
            # בדיקה אם הסשן ארוך מדי
            if session_time > 7200:  # 2 שעות
                del self.active_sessions[user_id]
                return {"status": "expired", "reason": "סשן פג תוקף"}
            
            return {"status": "active", "session_time": session_time}
        
        return {"status": "not_found"}

# שימוש בסקריפט
zt_controller = ZeroTrustController()

# אימות משתמש
auth_result = zt_controller.authenticate_user("user123", {
    "password": "correct_password",
    "permissions": ["database:read", "network:monitor"]
})

if auth_result["status"] == "success":
    # בדיקת גישה
    access_result = zt_controller.verify_access("user123", "database", "read")
    print(f"תוצאת גישה: {access_result}")
    
    # ניטור סשן
    session_status = zt_controller.monitor_session("user123")
    print(f"סטטוס סשן: {session_status}")`
      }
    ],
    challenges: [
      {
        title: "כתבו סקריפט לניהול SDN",
        description: "כתבו סקריפט שמנהל Flow Rules ב-SDN",
        hints: [
          "השתמשו ב-OpenDaylight API",
          "הגדירו Flow Rules לאבטחה",
          "ניטרו תעבורת רשת"
        ]
      },
      {
        title: "כתבו סקריפט AI לזיהוי איומים",
        description: "כתבו סקריפט שמשתמש ב-AI לזיהוי אנומליות",
        hints: [
          "השתמשו ב-scikit-learn",
          "אספו נתוני רשת",
          "אימנו מודל לזיהוי אנומליות"
        ]
      }
    ],
    tips: [
      "תמיד בדקו קוד לפני הפעלה",
      "השתמשו בהרשאות מינימליות",
      "תעדו כל שינוי",
      "בדקו לוגים באופן קבוע"
    ]
  }
}; 