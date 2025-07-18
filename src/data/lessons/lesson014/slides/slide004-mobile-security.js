export const slide4MobileSecurity = {
  id: "slide-4",
  type: "content",
  title: "אבטחת אפליקציות מובייל - Mobile Application Security 📱",
  content: {
    sections: [
      {
        title: "מהי אבטחת אפליקציות מובייל?",
        content: "אבטחת אפליקציות מובייל כוללת הגנה על אפליקציות iOS ו-Android מפני איומים ייחודיים."
      },
      {
        title: "אתגרי אבטחה במובייל",
        items: [
          {
            platform: "iOS Security",
            challenges: [
              "Jailbreaking",
              "App Store Security",
              "Code Injection",
              "Keychain Attacks"
            ],
            protections: [
              "Code Signing",
              "App Sandboxing",
              "Secure Enclave",
              "App Transport Security"
            ]
          },
          {
            platform: "Android Security",
            challenges: [
              "Rooting",
              "APK Tampering",
              "Reverse Engineering",
              "Malware Distribution"
            ],
            protections: [
              "APK Signing",
              "App Sandboxing",
              "SafetyNet",
              "Google Play Protect"
            ]
          }
        ]
      },
      {
        title: "טכניקות הגנה מתקדמות",
        items: [
          "Code Obfuscation - הסתרת קוד",
          "Anti-Debugging - מניעת דיבוג",
          "Certificate Pinning - קיבוע תעודות",
          "Runtime Protection - הגנה בזמן ריצה",
          "App Hardening - הקשחת אפליקציות",
          "Secure Communication - תקשורת מאובטחת"
        ]
      },
      {
        title: "כלי בדיקה למובייל",
        items: [
          "MobSF (Mobile Security Framework)",
          "OWASP ZAP for Mobile",
          "Burp Suite Mobile",
          "Frida",
          "Objection",
          "MobSF"
        ]
      }
    ],
    tips: [
      "הכירו את הפלטפורמות השונות",
      "השתמשו בכלי הגנה מתקדמים",
      "בדקו אפליקציות באופן קבוע",
      "עקבו אחר עדכוני אבטחה"
    ]
  }
}; 